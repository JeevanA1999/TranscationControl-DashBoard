import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import menuReducer from "./menuSlice";
import versionPopupReducer from "./versionPopupSlice"; // ✅ Import slice

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    menu: menuReducer,
    versionPopup: versionPopupReducer, // ✅ Add it here
  },
});
