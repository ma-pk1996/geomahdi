import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useDispatch, useSelector } from "react-redux";
import { scriptAction } from "../../context/scriptSlice";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";

export function LiveScript() {
  const mapdata = useSelector((state) => state.script.mapData);
  const dispatch = useDispatch();

  function onChange(value) {
    dispatch(scriptAction.setScriptData(value));
  }
  
  const geoJson = JSON.stringify({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [2.326678, 48.862116],
            [2.322237, 48.86607],
            [2.327193, 48.870021],
          ],
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [2.354649, 48.841445],
              [2.336116, 48.843366],
              [2.34933, 48.849579],
              [2.354649, 48.841445],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [2.344696, 48.881085],
              [2.344696, 48.886842],
              [2.352762, 48.886842],
              [2.352762, 48.881085],
              [2.344696, 48.881085],
            ],
          ],
        },
      },
    ],
  }, null, 2);



  return (
    <div style={{ width: "290px", height: "450px" }}>
      <MonacoEditor
        language="javascript"
        theme="vs-light"
        value={geoJson}
        options={{
          automaticLayout: true,
          wordWrap: "on",
          readOnly: false,
        }}
        onChange={onChange}
        onLoad={monaco => monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
          validate: true,
          schemas: [],
          enableSchemaRequest: true,
          allowComments: true,
        })}
      />
    </div>
  );
};
