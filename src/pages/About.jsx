import { useEffect, useState } from "react"
import { CircleLoader } from "react-spinners"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

const About = () => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

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
                Explore the heart of connectivity and significance across locations with our Map Centrality project. 
                Dive into dynamic visualizations that bring data to life, uncovering patterns and insights in geographic centrality.
              </p>
            </header>
            <main>
              <section className="team-members">
                <h2>Meet Our Team</h2>
                <p>
                  We are a team of software engineering students at Faculty of Sciences and Technology of Mohammedia.
                </p>
                <div className="row">
                  <div className="col-md-3">
                    <div className="card">
                      <img src="https://avatars.githubusercontent.com/u/59634965?v=4" className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title">Ismail ZAHIR</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card">
                      <img src="https://avatars.githubusercontent.com/u/59634965?v=4" className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title">Khaoula ABBASSI</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card">
                      <img src="https://avatars.githubusercontent.com/u/59634965?v=4" className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title">Mohamed JEBBANEMA</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card">
                      <img src="https://avatars.githubusercontent.com/u/59634965?v=4" className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title">El Mehdi Salah BEN SOUDA</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
        <Footer />
      </>
    )
  )
}

export default About