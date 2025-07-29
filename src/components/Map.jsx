import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon-2x.png"
import "./Map.css";
import L, { Icon } from "leaflet";
import { useEffect, useRef } from "preact/hooks";

export default function Map({ location, zoom, markers }) {
  const mapRef = useRef(null);
  const actualMapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    if (actualMapRef.current) {
      return;
    }

    actualMapRef.current = L.map(mapRef.current, {
      crs: L.CRS.Simple,
    }).setView(location, zoom).addEventListener("click", console.log);


    L.tileLayer("/map/tile_{z}-{x}-{y}.png", {
      maxZoom: 3,
      minZoom: 0,
      noWrap: true,
    }).addTo(actualMapRef.current);

    markers.forEach(marker => {
      L.marker(marker.location, {
        ...marker.options,
        icon: new Icon({ iconUrl: markerIconPng.src, iconSize: [25, 41], iconAnchor: [12, 41] })
      }).addTo(actualMapRef.current);
    });
  }, [mapRef.current, actualMapRef.current]);

  return <div className="Map" ref={mapRef}></div>;
}
