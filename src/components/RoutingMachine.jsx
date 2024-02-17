import { useEffect } from "react"
import L from "leaflet"
import { useMap } from "react-leaflet"

import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"

const RoutingMachine = ({waypoints}) => {
  
  const map = useMap()
  useEffect(() => {
    L.Routing.control({
      waypoints: waypoints.map(waypoint => L.latLng(waypoint.lat, waypoint.lng)),
      lineOptions: {
        styles: [{ 
          color: '#f00', 
          opacity: 0.8, 
          weight: 6
        }]
      },
      routeWhileDragging: true,
      geocoder: L.Control.Geocoder.nominatim(),
      reverseWaypoints: true,
      showAlternatives: true,
      altLineOptions: {
        styles: [{ 
          color: 'blue', 
          opacity: 0.6, 
          weight: 4
        }]
      },
      fitSelectedRoutes: 'smart',
      dragableWaypoints: false,
      show: false,
    }).addTo(map)
  }, [])

  return null
}

export default RoutingMachine