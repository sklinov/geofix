import {
  MapContainer,
  Polyline,
  GeoJSON,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import {
  FeatureCollection,
  GeoJSON as GeoJSONType,
  MultiLineString,
} from "geojson";

import "leaflet/dist/leaflet.css";
import { useCallback, useMemo } from "react";
import { LatLngExpression } from "leaflet";

interface MapVizProps {
  geoJsonData: FeatureCollection;
}

interface Bbox {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

const INITIAL_BBOX: Bbox = {
  minX: Number.POSITIVE_INFINITY,
  maxX: Number.NEGATIVE_INFINITY,
  minY: Number.POSITIVE_INFINITY,
  maxY: Number.NEGATIVE_INFINITY,
};

const avg = (...args: number[]) => {
  return args.reduce((acc, curr) => acc + curr, 0) / args.length;
};

export const MapViz = ({ geoJsonData }: MapVizProps) => {
  const center: LatLngExpression = useMemo(() => {
    const bbox = (
      geoJsonData.features[0].geometry as MultiLineString
    ).coordinates[0].reduce<Bbox>((acc, curr) => {
      return {
        minX: Math.min(acc.minX, curr[1]),
        maxX: Math.max(acc.maxX, curr[1]),
        minY: Math.min(acc.minY, curr[0]),
        maxY: Math.max(acc.maxX, curr[0]),
      };
    }, INITIAL_BBOX);
    return [avg(bbox.maxX, bbox.minX), avg(bbox.maxY, bbox.minY)];
  }, []);

  return (
    <MapContainer
      style={{ width: "calc(50vw - 20px)", height: "calc(95vh - 20px)" }}
      center={center}
      zoom={13}
      maxZoom={17}
      
    >
      <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
      <GeoJSON data={geoJsonData} />
    </MapContainer>
  );
};
