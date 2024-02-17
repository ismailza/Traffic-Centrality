import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LocationMarker from './LocationMarker';
import GeoCoder from './GeoCoder';
import { useState } from 'react';
import RoutingMachine from './RoutingMachine';

const MapComponent = ({url, positions}) => {

  const defaultPosition = [51.505, -0.09]
  const [mapCenter, setMapCenter] = useState(defaultPosition);

  return (
    <MapContainer 
      center={mapCenter}
      zoom={13} 
      style={{ height: '500px', width: '1200px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={url}
      />
      <GeoCoder />
      <RoutingMachine waypoints={[{ lat: 57.74, lng: 11.94 }, { lat: 57.6792, lng: 11.949 }]} />
      {positions && positions.map((marker, index) => (
        <LocationMarker 
          index={index} 
          position={marker.position} 
          color={'red'} 
          title={marker.title} 
          description={'short description'} 
          value={marker.value} 
        />
      ))}
    </MapContainer>
  )
}

export default MapComponent