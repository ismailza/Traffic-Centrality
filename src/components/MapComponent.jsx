import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LocationMarker from './LocationMarker';
import GeoCoder from './GeoCoder';

const MapComponent = ({ url, mapCenter, positions }) => {

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      style={{ height: '560px', width: '1200px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url={url}
      />
      <GeoCoder />
      {positions && positions.map((marker, index) => (
        <LocationMarker
          index={index}
          position={marker.position}
          title={marker.title}
          description={'lat: ' + marker.position[0] + ', lng: ' + marker.position[1]}
          value={marker.value}
        />
      ))}
    </MapContainer>
  )
}

export default MapComponent