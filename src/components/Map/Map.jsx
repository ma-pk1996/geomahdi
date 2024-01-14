import classes from "./Map.module.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Geoman } from "../Geoman/Geoman";


export const Map = () => {
  const position = [48.863247, 2.350747];
  const zoomLv = 13;

  return (
    <div className={classes.container}>
    <MapContainer style={{ height: '36rem' }} center={position} zoom={zoomLv} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={20}
      />
      <Geoman />
    </MapContainer>
    </div>
  );
};
