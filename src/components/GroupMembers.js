import 'firebase/database';
import { getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { HiMinusCircle } from "react-icons/hi";
import { usersRef } from '../firebase-config';



export default function GroupMembers() {
    const [group, setGroup] = useState([]);


        // Get Group 
        useEffect (() => {
            async function getGroup() {
                const q = query(usersRef, orderBy("name", "asc"));
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
                 {group.map( groupmember => (          
                    
                    <div className="group-members-box" key={groupmember.id}>
                        <div className="user-img">
                            <img src={groupmember.image} alt=""/>
                        </div>
                        <div className="group-members-details">
                            <p>{groupmember.name}</p>
                            <p>{groupmember.email}</p>
                            {/* <input  type="text" className="group-member"  value={users.name} name="name" placeholder="name"/>
                            <input type="email"  className="group-member" value={users.email} name="email" placeholder="email"/> */}
                        </div>
                        <button  className="remove-btn"> <HiMinusCircle /> </button>
                    </div>
                    
                ))}

        </>
    );

}
