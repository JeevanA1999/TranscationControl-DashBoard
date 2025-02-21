import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ContentPage.css";
import file from "../../assets/word.svg";
import { HiDownload } from "react-icons/hi";
import { BiFilterAlt } from "react-icons/bi";
import VersionPopup from "./VersionPopup";
import FilterModal from "./FilterModal";
import { FaArrowRightLong } from "react-icons/fa6";
import { toggleSidebar } from "../../store/sidebarSlice";
import { FaHome } from "react-icons/fa";
import chevronRight from "../../assets/chevron-right.svg";
import RightBar from "../RightBar/RightBar";

const TransactionContents = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const menuItems = useSelector((state) => state.menu.menuItems);
  const [expandedRows, setExpandedRows] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    stageStatus: "",
    responsibleParty: "",
    dateRange: { start: "", end: "" },
  });

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };
  // State for Popup
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Debounce Search Input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Toggle function to expand/collapse sub-items
  const toggleRow = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Function to calculate total documents for a stage including its sub-items
  const getTotalDocuments = (item) => {
    const subDocs = item.subItems
      ? item.subItems.reduce((total, sub) => total + (sub.documents || 0), 0)
      : 0;
    return (item.documents || 0) + subDocs;
  };

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Open Popup with Document Details
  const handleOpenPopup = (documentDetails) => {
    console.log("Popup Opened with details:", documentDetails); // Debug log
    setSelectedDocument(documentDetails);
    setPopupOpen(true);
  };
  // Close Popup
  const handleClosePopup = () => {
    console.log("Popup Closed");
    setPopupOpen(false);
    setSelectedDocument(null);
  };
  // Sort menuItems based on current sortConfig
  const sortedItems = [...menuItems].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === "documents") {
      aValue = getTotalDocuments(a);
      bValue = getTotalDocuments(b);
    }

    if (aValue === undefined || aValue === null) return 1;
    if (bValue === undefined || bValue === null) return -1;

    if (typeof aValue === "string") aValue = aValue.toLowerCase();
    if (typeof bValue === "string") bValue = bValue.toLowerCase();

    return sortConfig.direction === "asc"
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
      ? 1
      : -1;
  });

  // Filtering function
  const filteredItems = sortedItems.filter((item) => {
    const search = debouncedSearch.toLowerCase();
    const matchesSearch =
      item.titleName.toLowerCase().includes(search) ||
      (item.responsible && item.responsible.toLowerCase().includes(search)) ||
      (item.status && item.status.toLowerCase().includes(search)) ||
      (item.updateDate && item.updateDate.toLowerCase().includes(search));

    const matchesStatus = statusFilter === "" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  // Download CSV function
  const downloadCSV = () => {
    const headers = [
      "Phase",
      "Status",
      "Documents",
      "Responsible Party",
      "Update Date",
    ];
    const rows = filteredItems.map((item) => [
      item.titleName,
      item.status,
      getTotalDocuments(item),
      item.responsible || "N/A",
      item.updateDate || "11.12.2022",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transaction_contents.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="transaction-container">
      {/* Main Content */}
    <div className="transaction-contents">
      {/* <h2>Transaction Contents</h2> */}
      {/* Filter Modal */}
      {/* Toolbar */}
      <div className="div-col">
        <div className="button-toggle">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="toggle-button1"
          >
            {!isOpen && <FaArrowRightLong />}
          </button>
          <FaHome
            onClick={() => (window.location.href = "/")}
            style={{ cursor: "pointer" }}
          />
          <img src={chevronRight} />
          {"CLIENT"}
          <img src={chevronRight} />
          {"MATTER"}
          <img src={chevronRight} />
          {"TRANSCATION DETAILS PAGE"} <img src={chevronRight} />
          <h3>TRANSACTION CONTENTS</h3>
        </div>
        <div className="toolbar">
          <input
            type="text"
            placeholder="Search by Phase, Status, or Responsible Party"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={downloadCSV}>
            <HiDownload />
          </button>
          <button onClick={() => setIsFilterModalOpen(true)}>
            <BiFilterAlt />
          </button>{" "}
          {/* Placeholder for filter settings */}
        </div>
      </div>
      {/* Table */}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              #{" "}
              {sortConfig.key === "id"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : "▼"}
            </th>
            <th onClick={() => handleSort("titleName")}>
              Phase{" "}
              {sortConfig.key === "titleName"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : "▼"}
            </th>
            <th onClick={() => handleSort("status")}>
              Status{" "}
              {sortConfig.key === "status"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : "▼"}
            </th>
            <th onClick={() => handleSort("documents")}>
              Documents{" "}
              {sortConfig.key === "documents"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : "▼"}
            </th>
            <th onClick={() => handleSort("responsible")}>
              Responsible Party{" "}
              {sortConfig.key === "responsible"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : "▼"}
            </th>
            <th onClick={() => handleSort("updateDate")}>
              Update Date{" "}
              {sortConfig.key === "updateDate"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : "▼"}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <React.Fragment key={index}>
              <tr
                className="parent-row"
                onClick={() => item.subItems && toggleRow(index)}
              >
                <td>
                  {item.subItems && (
                    <span className="toggle-icon">
                      {expandedRows[index] ? "▼" : "▶"}
                    </span>
                  )}
                  {index + 1}
                </td>
                <td>{item.titleName}</td>
                <td
                  className={`status-${item.status
                    ?.toLowerCase()
                    .replace(/\s/g, "-")}`}
                >
                  {item.status || "Not Started"}
                </td>
                <td>
                  {getTotalDocuments(item) > 0 ? (
                    <span className="document-icon">
                      <img src={file} alt="Document" className="file-icon" />
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="responsible">{item.responsible || "N/A"}</td>
                <td>{item.updateDate || "11.12.2022"}</td>
              </tr>
              {item.subItems &&
                expandedRows[index] &&
                item.subItems.map((subItem, subIndex) => (
                  <tr key={`${index}-${subIndex}`} className="sub-stage">
                    <td>
                      {index + 1}.{subIndex + 1}
                    </td>
                    <td>{subItem.title}</td>
                    <td
                      className={`status-${subItem.status
                        ?.toLowerCase()
                        .replace(/\s/g, "-")}`}
                    >
                      {subItem.status || "Not Started"}
                    </td>
                    <td>
                      {subItem.documents > 0 ? (
                        <span
                          className="document-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenPopup(subItem); // Pass subItem, not item
                          }}
                        >
                          <img
                            src={file}
                            alt="Document"
                            className="file-icon"
                          />{" "}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="responsible">
                      {subItem.responsible || "N/A"}
                    </td>
                    <td>{subItem.updateDate || "11.12.2022"}</td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {isFilterModalOpen && (
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApplyFilters={handleApplyFilters}
        />
      )}
      {popupOpen && selectedDocument && (
        <VersionPopup
          isOpen={popupOpen}
          onClose={handleClosePopup}
          documentDetails={selectedDocument}
        />
      )}{" "}
    </div>
     {/* Right Sidebar */}
      <RightBar />
    </div>
  );
};

export default TransactionContents;
