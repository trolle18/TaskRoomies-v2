import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function BackButton() {
  return (
    <>
      <div className="back-button">
        <Link to="/" className="back-button__link">
          <AiOutlineArrowLeft/> 
        </Link>
      </div>
    </>
  )
};
