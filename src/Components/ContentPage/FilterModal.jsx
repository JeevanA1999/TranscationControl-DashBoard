import React, { useState, useEffect } from "react";
import "./FilterModal.css";

const FilterModal = ({ isOpen, onClose, onApplyFilters }) => {
  const [stageStatus, setStageStatus] = useState("");
  const [responsibleParty, setResponsibleParty] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  useEffect(() => {
    if (!isOpen) {
      setStageStatus("");
      setResponsibleParty("");
      setDateRange({ start: "", end: "" });
    }
  }, [isOpen]);

  const handleApplyFilters = () => {
    onApplyFilters({ stageStatus, responsibleParty, dateRange });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="filter-overlay" onClick={onClose}>
      <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
        <div className="filter-header">
          <h2>Filters</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="filter-body">
          <label>Stage Status</label>
          <select value={stageStatus} onChange={(e) => setStageStatus(e.target.value)}>
            <option value="">Choose</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <label>Responsible Party</label>
          <select value={responsibleParty} onChange={(e) => setResponsibleParty(e.target.value)}>
            <option value="">Choose</option>
            <option value="John Doe">John Doe</option>
            <option value="Alice Smith">Alice Smith</option>
            <option value="Bob Johnson">Bob Johnson</option>
          </select>

          <label>End Date Range</label>
          <div className="date-range">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
            <span> - </span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </div>
        </div>

        <div className="filter-footer">
          <button className="clear-btn" onClick={() => {
            setStageStatus("");
            setResponsibleParty("");
            setDateRange({ start: "", end: "" });
          }}>
            Clear Filters
          </button>
          <button className="apply-btn" onClick={handleApplyFilters}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;

