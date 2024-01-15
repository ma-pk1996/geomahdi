import { useEffect } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { useDispatch, useSelector } from "react-redux";
import { scriptAction } from "../../context";
import L from "leaflet";



export function Geoman() {
  const context = useLeafletContext();
  
  const dispatch = useDispatch();
  const scriptData = useSelector((state) => state.script.scriptData);

  useEffect(() => {
    let jsoni = "";
    const leafletContainer = context.layerContainer || context.map;
    leafletContainer.pm.addControls({
      drawMarker: false,
    });
    leafletContainer.pm.setGlobalOptions({ pmIgnore: false });
    leafletContainer.on("pm:create", (e) => {
      if (e.layer && e.layer.pm) {
        let shape = e;
        jsoni = JSON.stringify(leafletContainer.pm.getGeomanLayers(true).toGeoJSON())
        fetchi(jsoni)
        leafletContainer.pm
          .getGeomanLayers()
          .map((layer, index) => layer.bindPopup(`I am figure N° ${index}`))
          shape.layer.pm.enable();
          shape.layer.on("pm:edit", (e) => {
          const event = e;
          jsoni = JSON.stringify(leafletContainer.pm.getGeomanLayers(true).toGeoJSON())
          fetchi(jsoni)
        });
      }
    });
    
    const geojsonLayer = L.geoJSON().addTo(leafletContainer);
    
    if(geojsonLayer) {
      geojsonLayer.clearLayers();
      geojsonLayer.addData(scriptData);
    }
    
    geojsonLayer.eachLayer((layer) => {
      layer.pm.enable();
      layer.on("pm:edit", (e) => {
        const event = e;
        jsoni = JSON.stringify(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
        fetchi(jsoni);
      });
    });

    leafletContainer.on("pm:remove", (e) => {
      console.log("object removed");
      jsoni = JSON.stringify(leafletContainer.pm.getGeomanLayers(true).toGeoJSON())
      fetchi(jsoni)
    });

    return () => {
      leafletContainer.removeLayer(geojsonLayer);
      leafletContainer.off("pm:edit")
      leafletContainer.off("pm:create")
      leafletContainer.pm.removeControls();
      leafletContainer.pm.setGlobalOptions({ pmIgnore: true });
    };
  }, [context, scriptData]);
  
  function fetchi(data) {
    if(data.length !== 0) {
      dispatch(scriptAction.setMapData(JSON.parse(data)));
    }
  }
  

  return null;
};
