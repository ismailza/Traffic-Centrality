import { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const About = () => {
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  const teamMembers = [
    {
      name: "Ismail ZAHIR",
      github: "https://github.com/ismailza",
      linkedin: "https://www.linkedin.com/in/ismailzahir01/",
    },
    {
      name: "Khaoula ABASSI",
      github: "https://github.com/Wahya1",
      linkedin: "https://www.linkedin.com/in/khaoula-abassi/",
    },
    {
      name: "Mohamed JEBBANEMA",
      github: "https://github.com/medjebb",
      linkedin: "https://www.linkedin.com/in/mohamed-jebbanema/",
    },
    {
      name: "El Mehdi Salah BEN SOUDA",
      github: "https://github.com/Mehdi-Ben-Souda",
      linkedin: "https://www.linkedin.com/in/el-mehdi-salah-ben-souda/",
    },
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
              <h1 className="display-5 fw-bold">{t('aboutUsTitle')}</h1>
              <p className="col fs-4">
                {t('aboutUsSubtitle')}
              </p>
            </div>
          </div>

          <section className="mb-5">
            <h2 className="mb-4">{t('teamSectionTitle')}</h2>
            <p className="mb-4">
              {t('aboutUsText')}
            </p>
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {teamMembers.map((member, index) => (
                <div className="col" key={index}>
                  <div className="card h-100">
                    <img src="https://avatars.githubusercontent.com/u/59634965?v=4" className="card-img-top" alt={`${name}'s profile`} />
                    <div className="card-body">
                      <h5 className="card-title">{member.name}</h5>
                      <div className="d-flex justify-content-around">
                        <a href={member.github} target="_blank" aria-label="GitHub">
                          <FaGithub /> {t('github')}
                        </a>
                        <a href={member.linkedin} target="_blank" aria-label="LinkedIn">
                          <FaLinkedin /> {t('linkedin')}
                        </a>
                      </div>
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
