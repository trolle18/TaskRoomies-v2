import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdHandyman, MdLocalDining, MdCleanHands, MdWaterDrop, MdBed, MdChair, MdShower } from "react-icons/md";


export default function GroupTaskForm({ saveGroupTask, grouptask }) {
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");
    const [person, setPerson] = useState("");
    const [date, setDate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (grouptask) {   
            setTitle(grouptask.title);
        }
    }, [grouptask]);


    function handleSubmit(event) {
        event.preventDefault(); 

        const grouptaskData = { 
            title: title,
            icon: icon,
            person: person,
            date: date,
        };
        saveGroupTask(grouptaskData); 
        navigate("/"); 
    }



    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input placeholder="New task ..." type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>

            <label>
                <select placeholder="" value={icon} onChange={(e) => setIcon(e.target.value)}>
                    <option value="">Icon</option>
                    <option value="tools"> <MdHandyman /></option>
                    <option value="cutlery"> <MdLocalDining /> </option>
                    <option value="wash"> <MdCleanHands/> </option>
                    <option value="water"> <MdWaterDrop/> </option>
                    <option value="bed"> <MdBed/> </option>
                    <option value="couch"> <MdChair/> </option>
                    <option value="bath"> <MdShower/> </option>
                </select>
            </label>

            <label>
                <select placeholder="" value={person} onChange={(e) => setPerson(e.target.value)} >
                    <option value="">Whos doing the task?</option>
                    <option value="fælles">Fælles</option>
                    <option value="Mikkel">Mikkel</option>
                    <option value="Sofie">Sofie</option>
                </select>
            </label>
            
            <label>
                When?
                <input placeholder="" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>

            <button type="submit">Save</button>
        </form>
    );
}