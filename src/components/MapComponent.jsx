import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({url, positions}) => {

  const calculateRadius = (value) => {
    return value * 1000
  }

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px', width: '1200px' }}>
      <TileLayer
        url={url}
      />
      {positions && positions.map((marker, index) => (
        <Circle 
          key={index}
          center={marker.position}
          pathOptions={{ color: 'red' }}
          radius={calculateRadius(marker.value)}
        >
          <Popup>
            {marker.title} <br /> Value: {marker.value}
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  )
}

export default MapComponent