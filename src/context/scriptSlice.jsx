import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapData: {
    type: "FeatureCollection",
    features: [],
  },
  scriptData: "",
};

export const scriptSlice = createSlice({
  name: "script",
  initialState,
  reducers: {
    setMapData(state) {
      state.mapData = state.mapData;
    },
    setScriptData(state) {
      state.scriptData = state.scriptData;
    },
  },
});

export const scriptAction = scriptSlice.actions;
