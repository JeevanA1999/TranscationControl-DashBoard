import React, { useState } from "react";
import MuamelatLogo from "../../assets/Muamelat-logo.svg";
import UserProfile from "../../assets/userProfile.jpg";
import "./SideBar.css";

const menuItems = [
  { name: "Panoroma", "hover-name": "Panoroma", icon: "Panoroma.svg" },
  { name: "Transaction", "hover-name": "Muamele", icon: "transaction.svg" },
  { name: "Documents", "hover-name": "Dökümanlar", icon: "documents.svg" },
  { name: "E-Mails", "hover-name": "E-Postalar", icon: "envelope.svg" },
  { name: "Reports", "hover-name": "Reporlama", icon: "reports.svg" },
  { name: "Managements Panel", "hover-name": "Yönetim Paneli", icon: "sliders.svg" },
  { name: "Transaction Calendar", "hover-name": "Muamele Takvimi", icon: "calender.svg" }
];

const SideBar = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const handleMouseEnter = (index) => {
    if (activeIndex !== index) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="sidebar-container">
      <div className="logo">
        <img src={MuamelatLogo} alt="Muamelat Logo" />
        Muamelat
      </div>
      <div className="menu-container">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
            className={`menu-item 
                ${hoveredIndex === index ? "menu-item-hovered" : ""}
                ${activeIndex === index ? "menu-item-active" : ""}
            `}
          >
            <img src={require(`../../assets/${item.icon}`)} alt={item.name} />
            <span className="menu-text">
              {hoveredIndex === index || activeIndex === index
                ? item["hover-name"]
                : item.name}
            </span>
          </div>
        ))}
      </div>
      <div className="user-profile-container">
        <img className="user-profile" alt="User Profile" src={UserProfile} />
      </div>
    </div>
  );
};

export default SideBar;
