import { configureStore } from "@reduxjs/toolkit";
import { scriptSlice } from "./scriptSlice";
import { themeSlice } from "./themeSlice";

export const store = configureStore({
    reducer: { script: scriptSlice.reducer, theme: themeSlice.reducer }
})




