import { NavLink } from "react-router-dom";
import { AiOutlineUser, AiOutlineHome, AiOutlineShoppingCart, AiOutlineCarryOut } from "react-icons/ai";


export default function Nav() {

    return (
        <nav>
            <div className="nav-links">
                <NavLink to="/">
                    <AiOutlineHome />
                    <span className="nav-link"> Home </span>
                </NavLink>

                <NavLink to="/groupcreate">
                    <AiOutlineCarryOut />
                    <span className="nav-link"> Tasks </span>
                </NavLink>

                <NavLink to="/create">
                    <AiOutlineShoppingCart />
                    <span className="nav-link"> Shopping list </span>
                </NavLink>

                <NavLink to="/profile"> 
                    <AiOutlineUser />
                    <span className="nav-link">Profile</span>
                </NavLink>
            </div>
        </nav>
    );
}