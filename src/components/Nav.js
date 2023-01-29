import { NavLink } from "react-router-dom";
import { AiOutlineUser, AiOutlineHome, AiOutlineTeam, AiOutlineCarryOut } from "react-icons/ai";


export default function Nav() {

    return (
        <nav>
            <div className="nav-links">
                <NavLink to="/">
                    <AiOutlineHome />
                    <span className="nav-link"> Home </span>
                </NavLink>

                <NavLink to="/groupcreate">
                    <AiOutlineTeam/>
                    {/* <AiOutlineCarryOut /> */}
                    <span className="nav-link"> Group tasks </span>
                </NavLink>

                <NavLink to="/create">
                    <AiOutlineCarryOut />
                    <span className="nav-link"> Tasks </span>
                </NavLink>

                <NavLink to="/profile"> 
                    <AiOutlineUser />
                    <span className="nav-link"> Profile </span>
                </NavLink>
            </div>
        </nav>
    );
}