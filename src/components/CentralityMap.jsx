import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LocationMarker from './LocationMarker';
import GeoCoder from './GeoCoder';

const MapComponent = ({ url, mapCenter, positions }) => {

  const calculateRadius = (value) => {
    return value * 1000
  }

  const calculateColor = (value) => {
    if (value < 0.3) {
      return 'green'
    } else if (value < 0.5) {
      return 'yellow'
    } else {
      return 'red'
    }
  }

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
        marker.position && marker.position.length === 2 ?
          <LocationMarker
            key={index}
            position={marker.position}
            title={marker.title ? marker.title : ''}
            description={'coordinates: ' + marker.position}
            value={marker.value ? calculateRadius(marker.value) : 0}
            color={calculateColor(marker.value)}
          />
          : null
      ))}
    </MapContainer>
  )
}

export default MapComponent