import { Circle, Popup } from "react-leaflet"
import 'leaflet/dist/leaflet.css';

const LocationMarker = ({ position, title, description, value, color }) => {

  return (
    <Circle
      center={position}
      pathOptions={{ color: color }}
      radius={value}
    >
      <Popup>
        <li style={{ listStyleType: 'none' }}>
          <strong>{title}</strong>
          <p>{description}</p>
        </li>
        <li style={{ listStyleType: 'none' }}>
          <strong>Value:</strong> {value}
        </li>
      </Popup>
    </Circle>
  )
}

export default LocationMarker