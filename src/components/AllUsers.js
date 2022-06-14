import 'firebase/database';
import { HiMinusCircle } from "react-icons/hi";



export default function AllUsers({ allUsers }) {
    // Gets users from firebase
    // useEffect(() => {
    //     const q = query(usersRef, orderBy("createdAt", "desc"));    // Order by: lastest
    //     const unsubscribe = onSnapshot(q, (data) => {    // Refers to quary instead of postRef, which returns filtered results - Unsub enables ability to watch components from a different page
    //             const allUsersData = data.docs.map((doc) => {
    //             return { ...doc.data(), id: doc.id };   // Gets data from firebase (...doc.data) and with id: doc.id - gets the users id
    //         });
    //         setAllUsers(allUsersData);
    //         console.log(allUsersData)
    //     });
    //     return () => unsubscribe();
    // }, []);
    


    return (      
        <>
            <div className="group-members-box" key={allUsers.id}>
                <div className="user-img">
                    <img src={allUsers.image} alt=""/>
                </div>
                <div className="group-members-details">
                    <p>{allUsers.name}</p>
                    <p>{allUsers.email}</p>
                    {/* <input  type="text" className="group-member"  value={users.name} name="name" placeholder="name"/>
                    <input type="email"  className="group-member" value={users.email} name="email" placeholder="email"/> */}
                </div>
                <button  className="remove-btn"> <HiMinusCircle /> </button>
            </div>
        </>
    );
}