import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../store/sidebarSlice";
import { FaArrowLeftLong } from "react-icons/fa6";
import filterIcon from "../../assets/filter-bars.svg";
import documentIcon from "../../assets/documents.svg";
import "./TranscationBar.css";

const TranscationBar = () => {
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const listmenuItems = useSelector((state) => state.menu.menuItems);
    const totalDocuments = useSelector((state) => state.menu.totalDocuments);
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(null);
    const [sideStageItems, setSideStageItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterOf,setFilterOf]=useState(true);
    const handleFilterOF=()=>{
      setFilterOf(!filterOf)

    }

    // Toggle submenu visibility
    const handleToggleSubListMenu = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        const stages = listmenuItems.length || 0;
        const subFolders = listmenuItems.reduce(
            (total, item) => total + (item.subItems ? item.subItems.length : 0),
            0
        );

        setSideStageItems([
            { number: stages, name: "Stages" },
            { number: subFolders, name: "SubFolders" },
            { number: totalDocuments, name: "Documents" }, // Fetched from Redux
        ]);
    }, [listmenuItems, totalDocuments]);

    return (
        <div className={`transaction-sidebar ${isOpen ? "open" : "closed"}`}>
            {/* Sidebar Header */}
            <div className="transaction-sidebar-header-container">
                <div className="transaction-sidebar-header">
                    <h3>Transaction Contents</h3>

                    <div className="transaction-sidebar-stages">
                        {sideStageItems.map((item, index) => (
                            <div key={index} className="transaction-stage-item">
                                <h2 className="transaction-pName">{item.number}</h2>
                                <p className="transaction-pline">{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Controls */}
                <div className="transaction-sidebar-controls">
                    <button
                        onClick={() => dispatch(toggleSidebar())}
                        className="transaction-toggle-button"
                    >
                        {isOpen && <FaArrowLeftLong />}
                    </button>
                    <img src={filterIcon} onClick={handleFilterOF} alt="filter" className="transaction-filter-icon" />
                </div>
            </div>
  {filterOf && 
           
            <div className="transaction-filter-container">
                <label className="transaction-filter-label">Filter By:</label>
                <input 
                    type="text"
                    placeholder="Client/Matter name"
                    className="transaction-filter-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>}

            {/* Sidebar Menu List */}
            <ul className="transaction-listmenu-list">
                {listmenuItems
                    .filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((item, index) => (
                        <li
                            key={index}
                            className={`transaction-listmenu-item ${activeIndex === index ? "active" : ""}`}
                            onClick={() => handleToggleSubListMenu(index)}
                        >
                            <div className="transaction-listmenu-title">
                                {item.subItems ? (
                                    <span className="transaction-listmenu-submenu-icon">
                                        {activeIndex === index ? "▼" : "▶"}
                                    </span>
                                ) : (
                                    <span className="transaction-empty-placeholder"></span>
                                )}

                                <img src={documentIcon} alt="icon" className="transaction-menu-icon" />
                                <span>{item.title}</span>
                            </div>

                            {item.subItems && activeIndex === index && (
                                <ul className="transaction-listmenu-submenu-list">
                                    {item.subItems.map((subItem, subIndex) => (
                                        <li key={subIndex} className="transaction-listmenu-submenu-item">
                                            {subItem.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default TranscationBar;
