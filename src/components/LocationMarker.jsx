import { Circle, Popup } from "react-leaflet"
import 'leaflet/dist/leaflet.css';

const LocationMarker = ({index, position, color, title, description, value}) => {

  const calculateRadius = (value) => {
    return value * 1000
  }

  return (
    <Circle 
      key={index}
      center={position}
      pathOptions={{ color: color }}
      radius={calculateRadius(value)}
    >
      <Popup>
        <li style={{listStyleType: 'none'}}>
          <strong>{title}</strong>
          <p>{description}</p>
        </li>
        <li style={{listStyleType: 'none'}}>
          <strong>Value:</strong> {value}
        </li>
      </Popup>
    </Circle>
  )
}

export default LocationMarker