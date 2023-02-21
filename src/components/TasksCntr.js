import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md"
import TaskPost from "../components/TaskPost";


export default function TasksCntr({ tasks, headline, createUrl, updateUrl }) {
    return (
        <>
            <section className="tasks-cntr">
                <div className="tasks-inner-cntr">

                    <div className="tasks-inner-cntr__title">
                        <h2>{headline}</h2>
                        <Link to={createUrl} className="add-btn">
                            <MdAddCircle/>
                        </Link>
                    </div>

                    <div className="task-posts-cntr">
                        {tasks?.map( (task) => (
                            <TaskPost task={task} key={task.id} updateUrl={updateUrl} /> 
                        ))}
                    </div>

                </div>
            </section>
        </>
    )
};

