import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs, query, orderBy } from "@firebase/firestore";
import { groupRef } from "../firebase-config";


export default function GroupTaskForm({ saveGroup }) {
    const [group, setGroup] = useState([]);
    const [title, setTitle] = useState("");
    // const [member, setMember] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        if (group) {   
            setTitle(group.title);
            // setMember(group.member);
            setDate(group.date);
        }
    }, [group]);


    function handleSubmit(event) {
        event.preventDefault(); 

        const groupData = { 
            title: title,
            // member: member,
            date: date,
        };
        saveGroup(groupData); 
        // navigate("/"); 
    }


    useEffect(() => {
        async function getGroup() {
            const q = query(groupRef, orderBy("title"));
            const data = await getDocs(q);
            const groupData = data.docs.map(doc => {
                return { ...doc.data(), id: doc.id }; // changing the data structure so it's all gathered in one object
            });
            setGroup(groupData);
            console.log(groupData);
        }

        getGroup();
    }, []);



    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>Name your group</p>
                    <input type="text" placeholder="Groupname..." value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                {/* <div>
                    <p>Add groupmembers via email</p>
                    <input type="text" placeholder="Groupmember, ..." value={member} onChange={(e) => setMember(e.target.value)} />
                </div>
                 */}
                <button type="submit">Save</button>
            </form>
    </>
    );
}