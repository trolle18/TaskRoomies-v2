import { NavLink } from "react-router-dom";
import { AiOutlineUser, AiOutlineHome, AiOutlineTeam, AiOutlineCarryOut } from "react-icons/ai";


export default function Nav() {

    return (
        <nav>
            <div className="nav-links">
                <NavLink to="/">
                    <AiOutlineHome />
                    <span>Home</span>
                </NavLink>

                <NavLink to="/create-grouptask">
                    <AiOutlineTeam/>
                    <span>Group tasks</span>
                </NavLink>

                <NavLink to="/create-task">
                    <AiOutlineCarryOut />
                    <span>Tasks</span>
                </NavLink>

                <NavLink to="/profile"> 
                    <AiOutlineUser />
                    <span>Profile</span>
                </NavLink>
            </div>
        </nav>
    );
}