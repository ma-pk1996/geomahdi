import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapData: {
    type: "FeatureCollection",
    features: [],
  },
  scriptData: {
    type: "FeatureCollection",
    features: [],
  }
};

export const scriptSlice = createSlice({
  name: "script",
  initialState,
  reducers: {
    setLiveScriptJson(state, action) {
      state.mapData = action.payload;
    },
    setGeomanJson(state, action) {
      state.scriptData = action.payload;
    },
  },
});

export const scriptAction = scriptSlice.actions;
