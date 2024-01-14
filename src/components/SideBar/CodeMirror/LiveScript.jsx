import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useDispatch, useSelector } from "react-redux";
import { scriptAction } from "../../../context/scriptSlice";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";

export function LiveScript() {
  const mapdata = useSelector((state) => state.script.mapData);
  useEffect(() => {
    console.log(mapdata)
  }, [mapdata])
  const dispatch = useDispatch();

  function onChange(value, e) {
    dispatch(scriptAction.setScriptData(`${value}`));
    console.log(value);
  }
  

  return (
    <div style={{ width: "290px", height: "450px" }}>
      <MonacoEditor
        language="javascript"
        theme="vs-light"
        value={JSON.stringify(mapdata, null, 2)}
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
