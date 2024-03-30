import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LocationMarker from './LocationMarker';
import GeoCoder from './GeoCoder';

const ClustersMap = ({ url, mapCenter, positions }) => {

  const colors = ['blue', 'red', 'green', 'orange', 'purple', 'darkred', 'lightred', 'beige', 'darkblue', 'darkgreen', 'cadetblue', 'darkpurple', 'pink', 'lightblue', 'lightgreen', 'gray', 'black', 'darkorange', 'darkcyan', 'lightgray', 'darkgray', 'lightgray', 'lightyellow', 'darkmagenta', 'lightpink', 'darkolivegreen', 'darkslategray', 'lightseagreen', 'powderblue', 'rosybrown', 'tomato', 'violet', 'wheat', 'yellowgreen', 'turquoise', 'thistle', 'teal', 'tan', 'springgreen', 'mediumblue', 'mediumorchid', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive']

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
      {positions && positions.map((clusters, clusterIndex) => {
        return clusters.positions.map((cluster, index) => (
          <LocationMarker
            key={`${clusterIndex}-${index}`}
            position={cluster.position}
            title={cluster.title || 'Cluster' + clusterIndex}
            description={'coordinates: ' + cluster.position}
            value={300}
            color={colors[clusterIndex % colors.length]}
          />
        ))
      })}
    </MapContainer>
  )
}

export default ClustersMap