import React, { useState } from "react";
import "./SideBar.css";
import { LiveScript } from "../CodeMirror/LiveScript";


const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };
  

  return (
    <div className={`sidebar ${isVisible ? "visible" : ""}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isVisible ? ">" : "<"}
      </button>
      {!isVisible && <LiveScript />}
    </div>
  );
};

export default Sidebar;
