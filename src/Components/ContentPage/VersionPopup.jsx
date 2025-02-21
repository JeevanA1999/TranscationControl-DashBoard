import React, { useEffect } from "react";
import "./VersionPopup.css";

const VersionPopup = ({ isOpen, onClose, documentDetails }) => {
  
  const dummyData = {
    version: "3.1",
    userImage: "https://via.placeholder.com/40", 
    updatedBy: "Alice Johnson",
    updatedAt: "2025-02-18 14:35",
    note: "Updated document with the latest compliance guidelines.",
    fileSize: "256",
    fileType: "DOCX",
    fileName: "Project_Report_V3.1.docx",
    department: "Legal Compliance",
    comments: [
      {
        commenter: "Bob Smith",
        comment: "Reviewed the changes, looks good.",
        date: "2025-02-18 15:00",
      },
      {
        commenter: "Sarah Lee",
        comment: "Added a few notes for clarity.",
        date: "2025-02-18 15:45",
      },
    ],
  };

  
const data = dummyData;
  useEffect(() => {
    console.log("Popup Visibility:", isOpen);
    console.log("Document Details:", data);
  }, [isOpen, data]);

  if (!isOpen) return null; 

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* Header */}
        <div className="popup-header">
          <h2>V. {data.version || "1.0"}</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        {/* Body */}
        <div className="popup-body">
          {/* User Info */}
          <div className="user-info">
            <img src={data.userImage} alt="User" />
            <div>
              <p className="username">{data.updatedBy || "Unknown User"}</p>
              <p className="update-date">Last Update: {data.updatedAt || "N/A"}</p>
            </div>
          </div>

          {/* Department Info */}
          <p className="department"><strong>Department:</strong> {data.department || "N/A"}</p>

          {/* Note Section */}
          <p className="note-title"><strong>Note:</strong></p>
          <p className="note-text">{data.note || "No additional information available."}</p>

          {/* File Info */}
          <div className="file-info">
            <span><strong>File:</strong> {data.fileName || "Unknown File"}</span>
            <span>({data.fileSize || "N/A"} KB, {data.fileType || "N/A"})</span>
            <img src="word-icon.png" alt="Word File" className="file-icon" />
          </div>

          {/* Comments Section */}
          {data.comments && data.comments.length > 0 && (
            <div className="comments-section">
              <p className="comments-title"><strong>Comments:</strong></p>
              <ul className="comments-list">
                {data.comments.map((comment, index) => (
                  <li key={index} className="comment-item">
                    <p className="comment-text">"{comment.comment}"</p>
                    <p className="comment-meta">- {comment.commenter}, {comment.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VersionPopup;
