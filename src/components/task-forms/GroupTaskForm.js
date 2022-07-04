import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs, query, orderBy } from "@firebase/firestore";
import { usersRef } from "../../firebase-config";
import "./TaskForms.css";


export default function GroupTaskForm({ saveGroupTask, grouptask }) {
    const [group, setGroup] = useState([]);
    const [title, setTitle] = useState("");
    const [person, setPerson] = useState("");
    const [date, setDate] = useState("");
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (grouptask) {   
            setTitle(grouptask.title);
            setPerson(grouptask.person);
            setDate(grouptask.date);
            setCompleted(grouptask.completed);
        }
    }, [grouptask]);


    function handleSubmit(event) {
        event.preventDefault(); 

        const grouptaskData = { 
            title: title,
            person: person,
            date: date,
            completed: completed,
        };
        saveGroupTask(grouptaskData); 
        navigate("/"); 
    }


    useEffect(() => {
        async function getGroup() {
            const q = query(usersRef, orderBy("name"));
            const data = await getDocs(q);
            const groupData = data.docs.map(doc => {
                return { ...doc.data(), id: doc.id }; // changing the data structure so it's all gathered in one object
            });
            setGroup(groupData);
            // console.log(groupData);
        }

        getGroup();
    }, []);



    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Task title</span>
                    <input placeholder="New task ..." type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>

                <label>
                    <span>Who is doing the task?</span>
                    <select value={person} onChange={(e) => setPerson(e.target.value)} >
                        <option>Choose</option>
                        <option value="fælles">Fælles</option>
                        {group.map(person => (
                            <option value={person.uid} key={person.uid}>{person.name}</option>
                        ))}
                        
                    </select>
                </label>
                
                <label>
                    <span>When?</span>
                    <input type="date" pattern="\d{4}-\d{2}-\d{2}" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>

                <button type="submit">Save</button>
            </form>
    </>
    );
}