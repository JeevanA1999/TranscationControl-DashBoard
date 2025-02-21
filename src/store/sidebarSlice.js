import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: true,
    rightBar: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    toggleRightBar: (state) => {
      state.rightBar = !state.rightBar;
    },
  },
});

export const { toggleSidebar, toggleRightBar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
