import { useEffect, useState } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { useDispatch, useSelector } from "react-redux";
import { scriptAction } from "../../context/scriptSlice";

export const Geoman = () => {
  const context = useLeafletContext();
  const leafletContainer = context.layerContainer || context.map;
  let shape;
  leafletContainer.pm.addControls({
    drawMarker: false,
  });
  const dispatch = useDispatch();
  const scriptData = useSelector((state) => state.script.scriptData);
  leafletContainer.pm.setGlobalOptions({ pmIgnore: false });


  useEffect(() => {
    console.log(scriptData);
  }, [scriptData]);
  let jsoni = "";

  
  
  leafletContainer.on("pm:create", (e) => {
    if(e.layer && e.layer.pm) {
      shape = e;
      jsoni = JSON.stringify(leafletContainer.pm.getGeomanLayers(true).toGeoJSON())
    }
    fetchi(jsoni);
  })

  leafletContainer.on("pm:remove", (e) => {
    console.log("object removed");
    console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
  });

  function fetchi(data) {
    if(data.length !== 0) {
      dispatch(scriptAction.setMapData(data));
      console.log("dispatched", typeof data);
    }
    console.log(data);
  }

  useEffect(() => {
    const leafletContainer = context.layerContainer || context.map;
    leafletContainer.pm.addControls({
      drawMarker: false,
    });

    leafletContainer.pm.setGlobalOptions({ pmIgnore: false });
    leafletContainer.on("pm:create", (e) => {
      if (e.layer && e.layer.pm) {
        const shape = e;
        leafletContainer.pm
          .getGeomanLayers()
          .map((layer, index) => layer.bindPopup(`I am figure N° ${index}`));
          shape.layer.pm.enable();
          shape.layer.on("pm:edit", (e) => {
          const event = e;
          console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
        });
      }
    });

    return () => {
      leafletContainer.pm.removeControls();
      leafletContainer.pm.setGlobalOptions({ pmIgnore: true });
    };
  }, [context]);
  

  return null;
};
