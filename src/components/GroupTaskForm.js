import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GroupTaskForm({ saveGroupTask, grouptask }) {
    const [title, setTitle] = useState("");
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

            <button type="submit">Gem</button>
        </form>
    );
}