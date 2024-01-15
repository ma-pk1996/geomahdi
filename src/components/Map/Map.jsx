import classes from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Geoman } from "../Geoman";

export function Map() {
  const ref = useRef();
  const theme = useSelector((state) => state.theme.lightTheme);
  const position = [48.863247, 2.350747];
  const zoomLv = 13;
  const scriptData = useSelector((state) => state.script.scriptData);
  const light = "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png";
  const dark =
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";

  useEffect(() => {
    if (ref.current) {
      ref.current.setUrl(theme ? light : dark);
    }
  }, [theme]);

  return (
    <div className={classes.container}>
      <MapContainer
        style={{ height: "100%" }}
        center={position}
        zoom={zoomLv}
        scrollWheelZoom={true}
      >
        <TileLayer
          ref={ref}
          url={theme ? light : dark}
          attribution='&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={20}
        />
        <Geoman key={JSON.stringify(scriptData)} />
      </MapContainer>
    </div>
  );
};
