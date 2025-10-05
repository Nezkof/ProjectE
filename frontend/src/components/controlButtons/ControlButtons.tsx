import { Link, useLocation } from "react-router-dom";
import Button from "../button/Button";
import "./controlButtons.css";

import Chart from "/icons/chart.svg";
import Disc from "/icons/disc-add.svg";
import List from "/icons/list.svg";
import Scale from "/icons/scale.svg";
import Table from "/icons/table.svg";
import Ruler from "/icons/ruler.svg";

const ControlButtons = () => {
   const links = {
      import: "/import",
      cook: "/cook",
      hamming: "/hamming",
      decision: "/decision",
      rating: "/rating",
      empty: "/",
   };

   const location = useLocation();
   const currentPage = location.pathname;

   return (
      <>
         <aside className="control-buttons">
            <Link to={links.import}>
               <Button
                  iconPath={Disc}
                  alt=""
                  className={currentPage === links.import ? ["active"] : [""]}
               ></Button>
            </Link>
            <Link to={links.hamming}>
               <Button
                  iconPath={Ruler}
                  alt=""
                  className={currentPage === links.hamming ? ["active"] : [""]}
               ></Button>
            </Link>
            <Link to={links.cook}>
               <Button
                  iconPath={Table}
                  alt=""
                  className={currentPage === links.cook ? ["active"] : [""]}
               ></Button>
            </Link>
            <Link to={links.decision}>
               <Button
                  iconPath={Scale}
                  alt=""
                  className={currentPage === links.decision ? ["active"] : [""]}
               ></Button>
            </Link>
            <Link to={links.rating}>
               <Button
                  iconPath={Chart}
                  alt=""
                  className={currentPage === links.rating ? ["active"] : [""]}
               ></Button>
            </Link>
            <Link to={links.empty}>
               <Button
                  iconPath={List}
                  alt=""
                  className={currentPage === links.empty ? ["active"] : [""]}
               ></Button>
            </Link>
         </aside>
      </>
   );
};

export default ControlButtons;
