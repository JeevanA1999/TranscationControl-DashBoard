import { createSlice } from "@reduxjs/toolkit";

// Function to calculate total documents, including nested sub-items
const calculateTotalDocuments = (menuItems) => {
  return menuItems.reduce((total, item) => {
    const subItemDocs = item.subItems ? calculateTotalDocuments(item.subItems) : 0;
    return total + (item.documents || 0) + subItemDocs;
  }, 0);
};

// Initial menu items with different titles, title names, and responsible persons
const menuItems = [
  {
    title: "Planning Phase",
    titleName: "Project Stage",
    status: "Ongoing",
    documents: 2,
    version: 4,
    responsible: "John Doe",
    subItems: [
      {
        title: "Requirement Analysis",
        titleName: "Analysis Step",
        status: "Completed",
        documents: 3,
        version: "2.2",
        responsible: "Analyst",
      },
      {
        title: "Initial Prototyping",
        titleName: "Design Phase",
        status: "In Progress",
        documents: 2,
        version: "1.5",
        responsible: "UI/UX Designer",
      },
    ],
  },
  {
    title: "Development Phase",
    titleName: "Coding Stage",
    status: "Completed",
    responsible: "Sarah Wilson",
    subItems: [
      {
        title: "Frontend Implementation",
        titleName: "UI Development",
        status: "Completed",
        documents: 5,
        version: "3.1",
        responsible: "David Lee",
        subItems: [
          {
            title: "React Component Structure",
            titleName: "Code Module",
            status: "Completed",
            documents: 2,
            version: "1.0",
            responsible: "React Developer",
          },
        ],
      },
      {
        title: "Backend Setup",
        titleName: "API Development",
        status: "Completed",
        documents: 4,
        version: "2.0",
        responsible: "Backend Engineer",
        subItems: [
          {
            title: "Database Schema",
            titleName: "Data Model",
            status: "In Review",
            documents: 3,
            version: "1.3",
            responsible: "Daniel White",
          },
          {
            title: "API Endpoints",
            titleName: "Service Layer",
            status: "Completed",
            documents: 2,
            version: "2.1",
            responsible: "Sophia Martinez",
          },
        ],
      },
    ],
  },
  {
    title: "Testing & QA",
    titleName: "Validation Stage",
    status: "In Progress",
    documents: 1,
    responsible: "QA Lead",
    subItems: [
      {
        title: "Unit Testing",
        titleName: "Component Testing",
        status: "Pending",
        documents: 2,
        version: "1.2",
        responsible: "Ethan Hall",
      },
    ],
  },
  { title: "Deployment", titleName: "Release Phase", status: "Not Started", documents: 0, responsible: "Liam Walker" },
  { title: "Maintenance", titleName: "Support Phase", status: "Not Started", documents: 0, responsible: "Ava Young" },
  { title: "Security Review", titleName: "Audit Stage", status: "Not Started", documents: 0, responsible: "Noah Scott" },
  {
    title: "Final Report",
    titleName: "Closure Phase",
    status: "Ongoing",
    documents: 0,
    responsible: "Mia Adams",
    subItems: [
      {
        title: "Client Feedback",
        titleName: "Review Stage",
        status: "Completed",
        documents: 3,
        version: "1.7",
        responsible: "Benjamin",
      },
      {
        title: "Final Documentation",
        titleName: "Handbook Completion",
        status: "Pending",
        documents: 2,
        version: "1.3",
        responsible: "Charlotte",
      },
    ],
  },
  { title: "Archival", titleName: "Storage Stage", status: "Not Started", documents: 0, responsible: "Lucas" },
  { title: "Future Planning", titleName: "Next Steps", status: "Not Started", documents: 0, responsible: "Analyst" },
];

// Initial state
const initialState = {
  menuItems,
  totalDocuments: calculateTotalDocuments(menuItems), // ✅ Correctly calculates total documents
};

// Create Redux slice
const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    recalculateTotalDocuments: (state) => {
      state.totalDocuments = calculateTotalDocuments(state.menuItems);
    },
  },
});

// Export actions and reducer
export const { recalculateTotalDocuments } = menuSlice.actions;
export default menuSlice.reducer;
  