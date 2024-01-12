import { configureStore } from "@reduxjs/toolkit";
import { scriptSlice } from "./scriptSlice";

export const store = configureStore({
    reducer: { script: scriptSlice.reducer }
})




