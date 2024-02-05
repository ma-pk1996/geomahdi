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
  let geojsonLayer = null;

  useEffect(() => {
    let jsonData = "";

    const leafletContainer = context.layerContainer || context.map;
    leafletContainer.pm.addControls({
      drawMarker: {
        icon : L.icon({
          iconUrl: require("../../assets/mapmarker.png"),
          iconSize : [30, 30],
          iconAnchor : [10, 35]
        })
      },
    });
    
    leafletContainer.pm.setGlobalOptions({ pmIgnore: false });

    leafletContainer.on("pm:create", (e) => {
      if (e.layer && e.layer.pm) {
        let shape = e;
        jsonData = JSON.stringify(
          leafletContainer.pm.getGeomanLayers(true, true).toGeoJSON()
        );
        fetchJsonHandler(jsonData);
        leafletContainer.pm
          .getGeomanLayers()
          .map((layer, index) => layer.bindPopup(`I am figure N° ${index}`));
        shape.layer.pm.enable();
        shape.layer.on("pm:edit", (e) => {
          const event = e;
          jsonData = JSON.stringify(
            leafletContainer.pm.getGeomanLayers(true, true).toGeoJSON()
          );
          fetchJsonHandler(jsonData);
        });
      }
    });

    leafletContainer.on("pm:remove", (e) => {
      console.log("object removed");
      jsonData = JSON.stringify(
        leafletContainer.pm.getGeomanLayers(true, true).toGeoJSON()
      );
      fetchJsonHandler(jsonData);
    });

    if (!geojsonLayer) {
      geojsonLayer = L.geoJSON().addTo(leafletContainer);
    }

    geojsonLayer.eachLayer((layer) => {
      leafletContainer.pm.disableLayer(layer);
      leafletContainer.pm.addLayer(layer);
      layer.on("pm:edit", (e) => {
        const event = e;
        jsonData = JSON.stringify(
          leafletContainer.pm.getGeomanLayers(true, true).toGeoJSON()
        );
        fetchJsonHandler(jsonData);
      });
    });

    if (scriptData) {
      geojsonLayer.clearLayers();
      geojsonLayer.addData(scriptData);
    }

    return () => {
      geojsonLayer.eachLayer((layer) => {
        layer.off("pm:edit");
      });
      leafletContainer.pm.removeControls();
      leafletContainer.pm.setGlobalOptions({ pmIgnore: true });
    };
  }, [context, scriptData]);

  function fetchJsonHandler(data) {
    if (data.length !== 0) {
      dispatch(scriptAction.setLiveScriptJson(JSON.parse(data)));
    }
  }

  return null;
}
