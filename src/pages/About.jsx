import { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const About = () => {
  const [loading, setLoading] = useState(true);

  const teamMembers = [
    "Ismail ZAHIR",
    "Khaoula ABASSI",
    "Mohamed JEBBANEMA",
    "El Mehdi Salah BEN SOUDA"
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    loading ? (
      <div className="vh-100 d-flex justify-content-center align-items-center" role="status">
        <CircleLoader color={'#123abc'} loading={loading} size={150} />
      </div>
    ) : (
      <>
        <NavBar />
        <hr className="my-0 mb-5" />
        <div className="container my-5">
          <div className="p-5 mb-4 bg-light rounded-3 border">
            <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold">About the Kolmogorov Team</h1>
              <p className="col fs-4">
                Discover the innovation behind our Map Centrality project. Our team focuses on creating insightful visualizations to explore network centrality in geographic data, revealing new patterns and relationships.
              </p>
            </div>
          </div>

          <section className="mb-5">
            <h2 className="mb-4">Meet Our Team</h2>
            <p className="mb-4">
              We are a team of software engineering students at Faculty of Sciences and Technology of Mohammedia.
            </p>
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {teamMembers.map((name, index) => (
                <div className="col" key={index}>
                  <div className="card h-100">
                    <img src="https://avatars.githubusercontent.com/u/59634965?v=4" className="card-img-top" alt={`${name}'s profile`} />
                    <div className="card-body">
                      <h5 className="card-title">{name}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <Footer />
      </>
    )
  );
};

export default About;
