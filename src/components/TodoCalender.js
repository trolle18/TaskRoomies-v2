import { useState } from "react";
import Calendar from "react-calendar";


const TodoCalendar = ({ date, setDate }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const handleChange = (value) => {
        setDate(value);
        setShowCalendar(false);
    };



    return (
        <div>
            <input value={date.toLocalString()} onFocus={() => setShowCalendar(true)} />
            <Calendar className={showCalendar ? "" : "hide"} value={date} onChange={handleChange}  />
        </div>
    );
};

export default TodoCalendar;