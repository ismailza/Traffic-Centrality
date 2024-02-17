import { useEffect, useState } from "react"
import MapComponent from "../components/MapComponent"
import NavBar from "../components/NavBar"
import { CircleLoader } from "react-spinners"
import Footer from "../components/Footer"

const Home = () => {

  const [url, setUrl] = useState('')
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    if (url && positions.length > 0) {
      setLoading(false)
    }
  }, [url, positions])

  return (
    loading ? (
      <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}} role="status">
        <CircleLoader 
          color={'#123abc'} 
          loading={loading} 
          size={150}
        />
      </div>
    ) : (
      <>
        <NavBar />
          <div className="App">
            <div className="container mt-2">
              <header className="text-center mb-4">
                <h1 className="mb-3">Kolmogorov Team - Map Centrality</h1>
                <p className="lead">
                  Explore the heart of connectivity and significance across locations with our Map Centrality project. Dive into dynamic visualizations that bring data to life, uncovering patterns and insights in geographic centrality.
                </p>
              </header>
              <main
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column'
                }}
              >
                <MapComponent
                  url={url}
                  positions={positions}
                />
              </main>
            </div>
          </div>
        <Footer />
      </>
    )
  )
}

export default Home