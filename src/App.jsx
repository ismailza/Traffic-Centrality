import { useState } from 'react'
import MapComponent from './components/MapComponent'

import './App.css'


function App() {

  const [url, setUrl] = useState('')
  const [positions, setPositions] = useState([])

  fetch('data001.json')
    .then(response => response.json())
    .then(data => {
      setUrl(data.url)
      setPositions(data.positions.map(p => {
        return {
          position: [p.lat, p.lon],
          title: p.name,
          value: p.value
        }
      }))
    })

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Centrality Map</h1>
        </header>
        <main>
          <MapComponent
            url={url}
            positions={positions}
          />
        </main>
      </div>
    </>
  )
}

export default App
