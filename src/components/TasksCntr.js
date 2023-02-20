import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md"
import TaskPost from "../components/TaskPost";


export default function TasksCntr( {tasks} ) {
    return (
        <>
            <section className="tasks-cntr">
                <div className="tasks-inner-cntr">

                    <div className="tasks-inner-cntr__title">
                        <h2>Tasks</h2>
                        <Link to="/create-task" className="add-btn">
                            <MdAddCircle/>
                        </Link>
                    </div>

                    <div className="task-posts-cntr">
                        {tasks?.map( (task) => (
                            <TaskPost task={task} key={task.id} /> 
                        ))}
                    </div>

                </div>
            </section>
        </>
    )
};

