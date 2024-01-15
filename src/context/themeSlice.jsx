import { createSlice } from "@reduxjs/toolkit";

const initialState = { lightTheme : true }

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers : {
        toggle(state) {
            state.lightTheme = !state.lightTheme;
        }
    }
})
export const themeAction = themeSlice.actions;