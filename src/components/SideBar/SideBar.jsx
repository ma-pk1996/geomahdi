import React, { useState } from "react";
import classes from "./SideBar.module.css";
import { useSelector } from "react-redux";
import { LiveScript } from "./LiveScript";

export function SideBar() {
  const [isVisible, setIsVisible] = useState(true);
  const geojson = useSelector((state) => state.script.scriptData);
  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };
  function exportHandler() {
    const data = JSON.stringify(geojson);
    const blob = new Blob([data], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "exported.geojson";

    const fileName = prompt("Enter the file name:");
    if (fileName) {
      link.setAttribute("download", `${fileName}.geojson`);
      link.click();
    }
  }

  return (
    <div className={`${classes.sidebar} ${isVisible ? classes.visible : ""}`}>
      <button className={classes.toggleButton} onClick={toggleSidebar}>
        {isVisible ? "<" : ">"}
      </button>
      {!isVisible && (
        <>
          <LiveScript />
          <button onClick={exportHandler} className={classes.btn}>
            Export Geojson
          </button>
        </>
      )}
    </div>
  );
}
