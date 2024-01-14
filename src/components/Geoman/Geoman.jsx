import { useEffect, useState } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { useDispatch, useSelector } from "react-redux";
import { scriptAction } from "../../context/scriptSlice";
import L from "leaflet";



export const Geoman = () => {
  const context = useLeafletContext();
  let geojsonLayer;
  let geojsonPmLayer;
  let jsoni = "";

  const dispatch = useDispatch();
  const scriptData = useSelector((state) => state.script.scriptData);


  useEffect(() => {
    console.log(scriptData);
  }, [scriptData]);
  

  useEffect(() => {

    const leafletContainer = context.layerContainer || context.map;
    leafletContainer.pm.addControls({
      drawMarker: false,
    });

    leafletContainer.pm.setGlobalOptions({ pmIgnore: false });
    leafletContainer.on("pm:create", (e) => {
      if (e.layer && e.layer.pm) {
        const shape = e;
        jsoni = JSON.stringify(leafletContainer.pm.getGeomanLayers(true).toGeoJSON())
        fetchi(jsoni)
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
    if(!geojsonLayer) {
      geojsonLayer = L.geoJSON(geojsonData);
      geojsonLayer.addTo(leafletContainer);
    }
    geojsonPmLayer =  geojsonLayer.getLayers()[0];
    geojsonPmLayer.pm.enable()
    geojsonLayer.eachLayer((layer) => {
      layer.pm.enable()
    })
    geojsonPmLayer.on("pm:edit", (e) => {
      const event = e;
      console.log(geojsonLayer.toGeoJSON());
    });

    leafletContainer.on("pm:remove", (e) => {
      console.log("object removed");
      console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
    });

    return () => {
      geojsonPmLayer.off("pm:edit")
      shape.layer.off("pm:edit")
      leafletContainer.off("pm:create")
      leafletContainer.pm.removeControls();
      leafletContainer.pm.setGlobalOptions({ pmIgnore: true });
    };
  }, [context]);
  
  function fetchi(data) {
    if(data.length !== 0) {
      dispatch(scriptAction.setMapData(JSON.parse(data)));
    }
  }
  

  return null;
};
