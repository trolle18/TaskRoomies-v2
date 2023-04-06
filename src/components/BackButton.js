import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function BackButton({link}) {
  return (
    <>
      <div className="back-button">
        <Link 
        to={link ? (link) : ("/")}
        className="back-button__link"
        >
          <AiOutlineArrowLeft/> 
        </Link>
      </div>
    </>
  )
};
