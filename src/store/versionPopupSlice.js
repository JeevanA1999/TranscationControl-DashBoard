import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  documentDetails: null,
};

const versionPopupSlice = createSlice({
  name: "versionPopup",
  initialState,
  reducers: {
    openPopup: (state, action) => {
      console.log("Opening Popup with Data:", action.payload); // Debugging log
      state.isOpen = true;
      state.documentDetails = action.payload;
    },
    closePopup: (state) => {
      console.log("Closing Popup"); // Debugging log
      state.isOpen = false;
      state.documentDetails = null;
    },
  },
});

export const { openPopup, closePopup } = versionPopupSlice.actions;
export default versionPopupSlice.reducer;
