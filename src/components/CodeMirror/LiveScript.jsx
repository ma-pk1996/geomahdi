import React, { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useDispatch, useSelector } from 'react-redux';
import { scriptAction } from '../../context/scriptSlice';

export function LiveScript() {
  const mapdata = useSelector(state => state.script.mapData);
  console.log('mapdatalivescript', mapdata);
  const dispatch = useDispatch();

  // const [input, setInput] = useState("console.log(input);");
  // const [output, setOutput] = useState("console.log(output);");
  const onChange = useCallback((val, viewUpdate) => {
    dispatch(scriptAction.setScriptData(val))
    console.log(val);
  },[])
  return <CodeMirror value={mapdata} height="450px" width="290px" extensions={[javascript({ jsx: true })]} onChange={onChange}/>;
}
