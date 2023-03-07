import { useCallback, useState, useMemo } from 'react'
import { Header } from './components/Header/Header'
import { Layout } from './components/Layout/Layout'
import './App.css';
import { MapViz } from './components/Viz/MapViz/MapViz';
import sourceData from './mocks/track.json';
import { MultiLineString } from 'geojson';

function App() {

  const processedData = useMemo(() => {
    const initialCoords = ((sourceData as GeoJSON.FeatureCollection).features[0].geometry as MultiLineString
  ).coordinates[0]

  },[])

  return (
    <div className="App">
      <Layout 
        header={<Header />}
        left={<MapViz geoJsonData={sourceData as GeoJSON.FeatureCollection}/>}
        right={<MapViz geoJsonData={sourceData as GeoJSON.FeatureCollection} />}
      />
    </div>
  )
}

export default App
