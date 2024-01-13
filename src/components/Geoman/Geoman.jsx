import { useEffect, useState } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { useDispatch, useSelector } from "react-redux";
import { scriptAction } from "../../context/scriptSlice";
import L from "leaflet";



export const Geoman = () => {
  const context = useLeafletContext();
  const leafletContainer = context.layerContainer || context.map;
  let shape;
  let geojsonLayer;
  let geojsonPmLayer;
  const geojsonData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [2.326678, 48.862116],
            [2.322237, 48.86607],
            [2.327193, 48.870021],
          ],
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [2.354649, 48.841445],
              [2.336116, 48.843366],
              [2.34933, 48.849579],
              [2.354649, 48.841445],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [2.344696, 48.881085],
              [2.344696, 48.886842],
              [2.352762, 48.886842],
              [2.352762, 48.881085],
              [2.344696, 48.881085],
            ],
          ],
        },
      },
    ],
  }
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
      dispatch(scriptAction.setMapData(JSON.parse(data)));
      console.log("dispatched", typeof data);
    }
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

    return () => {
      leafletContainer.pm.removeControls();
      leafletContainer.pm.setGlobalOptions({ pmIgnore: true });
    };
  }, [context]);
  

  return null;
};
