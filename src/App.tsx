import { useCallback, useState, useMemo } from "react";
import { Header } from "./components/Header/Header";
import { Layout } from "./components/Layout/Layout";
import "./App.css";
import { MapViz } from "./components/Viz/MapViz/MapViz";
import sourceData from "./mocks/track.json";
import { MultiLineString, Position } from "geojson";
import kalmanModule from "kalman-filter";
import { set } from "lodash";

const { KalmanFilter } = kalmanModule;

const filter = new KalmanFilter({
  observation: { name: "sensor", sensorDimension: 4 },
});

function App() {
  const processedData = useMemo(() => {
    const initialCoords = (
      (sourceData as GeoJSON.FeatureCollection).features[0]
        .geometry as MultiLineString
    ).coordinates[0];
    const mutatedObject = sourceData;
    const filteredCoords = filter.filterAll(initialCoords);

    if (initialCoords.length === filteredCoords.length) {
      const merged = filteredCoords.map((filtered: Position, index: number) => {
        const [newX, newY, ...rest] = filtered;
        const [oldX, oldY, oldH, oldT] = initialCoords[index];
        return [newX, newY, oldH, oldT];
      });
      set(
        mutatedObject,
        ["features", "0", "geometry", "coordinates", "0"],
        merged
      );
    }

    return mutatedObject;
  }, []);

  return (
    <div className="App">
      <Layout
        header={<Header />}
        left={<MapViz geoJsonData={sourceData as GeoJSON.FeatureCollection} />}
        right={
          <MapViz geoJsonData={processedData as GeoJSON.FeatureCollection} />
        }
      />
    </div>
  );
}

export default App;
