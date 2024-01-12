import { useEffect, useState } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { useDispatch, useSelector } from "react-redux";
import { scriptAction } from "../../context/scriptSlice";

export const Geoman = () => {
  const context = useLeafletContext();
  // const scriptData = useSelector(state => state.script.scriptData);
  // useEffect(() => {
  //   console.log(scriptData)
  // }, [scriptData])
  let jsoni = "";
  
  
  useEffect(() => {
    const leafletContainer = context.layerContainer || context.map;
    leafletContainer.pm.addControls({
      drawMarker: false
    });

    leafletContainer.pm.setGlobalOptions({ pmIgnore: false });
    leafletContainer.on("pm:create", (e) => {
      if (e.layer && e.layer.pm) {
        const shape = e;
        console.log(e);

        // enable editing of circle
        shape.layer.pm.enable();

        console.log(`object created: ${shape.layer.pm.getShape()}`);
        // console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
        jsoni = JSON.stringify(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
        console.log(jsoni);
        leafletContainer.pm
          .getGeomanLayers(true)
          .bindPopup("i am whole")
          .openPopup();
        leafletContainer.pm
          .getGeomanLayers()
          .map((layer, index) => layer.bindPopup(`I am figure N° ${index}`));
        shape.layer.on("pm:edit", (e) => {
          const event = e;
          // console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
        });
      }
    });

    leafletContainer.on("pm:remove", (e) => {
      console.log("object removed");
      // console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
    });


    return () => {
      leafletContainer.pm.removeControls();
      leafletContainer.pm.setGlobalOptions({ pmIgnore: true });
    };
  }, [context]);
  

  return null;
};

