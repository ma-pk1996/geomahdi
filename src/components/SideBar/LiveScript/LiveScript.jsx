import MonacoEditor from "react-monaco-editor";
import { useDispatch, useSelector } from "react-redux";
import { scriptAction } from "../../../context";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";


export function LiveScript() {
  const mapdata = useSelector((state) => state.script.mapData);
  const theme = useSelector(state => state.theme.lightTheme);

  const dispatch = useDispatch();
  
  

  function onChange(value, e) {
    dispatch(scriptAction.setScriptData(JSON.parse(value)));
  }
  

  return (
    <div style={{ width: "290px", height: "450px", borderRadius: "8px" }}>
      <MonacoEditor
        language="javascript"
        theme={theme ? "vs" : "vs-dark"}
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
