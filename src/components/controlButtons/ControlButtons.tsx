import { Link } from "react-router-dom";
import Button from "../button/Button";
import "./controlButtons.css";

import Chart from "/icons/chart.svg";
import Disc from "/icons/disc-add.svg";
import List from "/icons/list.svg";
import Scale from "/icons/scale.svg";

const ControlButtons = () => {
   return (
      <>
         <aside className="control-buttons">
            <Link to="/import">
               <Button iconPath={Disc} alt=""></Button>
            </Link>
            <Link to="/decision">
               <Button iconPath={Scale} alt=""></Button>
            </Link>
            <Link to="/rating">
               <Button iconPath={Chart} alt=""></Button>
            </Link>
            <Link to="/">
               <Button iconPath={List} alt=""></Button>
            </Link>
         </aside>
      </>
   );
};

export default ControlButtons;
