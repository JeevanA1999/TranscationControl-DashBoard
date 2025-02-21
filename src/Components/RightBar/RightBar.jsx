import React, { useState } from "react";
import { 
  FaHome, FaTasks, FaLayerGroup, FaUserCheck, FaBookmark, 
  FaChartPie, FaCalendarAlt, FaHistory 
} from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";
import "./RightBar.css";

const RightBar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const menuItems = [
    { icon: <FaHome />, name: "Home", path: "/" },
    { icon: <MdOutlineContentCopy />, name: "Contents" },
    { icon: <FaTasks />, name: "Tasks" },
    { icon: <FaLayerGroup />, name: "Phases" },
    { icon: <FaUserCheck />, name: "Sign Tracking" },
    { icon: <FaBookmark />, name: "Critical Info" },
    { icon: <FaChartPie />, name: "Analysis" },
    { icon: <FaCalendarAlt />, name: "Calendars" },
    { icon: <FaHistory />, name: "Activity Log" },
  ];

  const handleClick = (name, path) => {
    setActiveItem(name);
    if (path) {
      window.location.href = path;
    }
  };

  return (
    <div className="rightbar">
      
      <ul className="rightbar-menu">
        {menuItems.map((item) => (
          <li 
            key={item.name} 
            className={activeItem === item.name ? "active" : ""}
            onClick={() => handleClick(item.name, item.path)}
          >
            {item.icon}
            {/* <span>{item.name}</span> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightBar;
