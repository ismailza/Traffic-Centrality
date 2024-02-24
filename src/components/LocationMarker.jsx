import { Circle, Popup } from "react-leaflet"
import 'leaflet/dist/leaflet.css';

const LocationMarker = ({index, position, title, description, value}) => {

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
    <Circle 
      key={index}
      center={position}
      pathOptions={{ color: calculateColor(value) }}
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