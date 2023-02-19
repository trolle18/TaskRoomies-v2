import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { onSnapshot, query, orderBy, addDoc, serverTimestamp } from "@firebase/firestore"; 
import { groupRef } from "../firebase-config";
import { AiOutlineArrowLeft, AiOutlineUsergroupAdd } from "react-icons/ai";
import GroupForm from "../components/GroupForm";


export default function CreateGroupPage() {
    const [group, setGroup] = useState([]); 
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const q = query(groupRef, orderBy("createdAt", "desc"))
        const unsubscribe = onSnapshot(q, (data) => {
            const groupData = data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
            setGroup(groupData);
        })
        return () => unsubscribe()
    }, [])


    async function handleSubmit(createGroup) {
        createGroup.createdAt = serverTimestamp()
        createGroup.uid = auth.currentUser.uid
        await addDoc(groupRef, createGroup)
        navigate("/")
    }

    return (
        <section className="page">

            <section className="card">
                <Link to="/">
                    <AiOutlineArrowLeft size={30}/>
                </Link>
                <div className="page-title">
                    <AiOutlineUsergroupAdd/>
                    <h2>Create group</h2>
                </div>
                <section className="form-cntr">
                    <GroupForm saveGroup={handleSubmit} group={group} />
                </section>
            </section>
        </section>
    )
};

