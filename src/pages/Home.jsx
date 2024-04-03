import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { CircleLoader } from "react-spinners";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { Container, Grid, Paper, Typography } from "@mui/material";

const Home = () => {

  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const features = t("featuresList", { returnObjects: true });
  const technologies = t("technologiesUsedList", { returnObjects: true });

  return (
    loading ? (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }} role="status">
        <CircleLoader
          color={'#123abc'}
          loading={loading}
          size={150}
        />
      </div>
    ) : (
      <>
        <NavBar />
        <hr className="my-0 mb-5" />
        <div className="App">
          <div className="container mt-2">
            <header className="text-center mb-4">
              <h1 className="mb-3">
                {t('projectTitle')}
              </h1>
              <p className="lead">
                {t('overview')}
              </p>
            </header>
            <Container>
              <section className="my-4 features">
                <h2 className="text-center">Feautres</h2>
                <Grid item xs={12}>
                  <Paper elevation={3} className="p-3">
                    <ul className="text-start">
                      {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </Paper>
                </Grid>
              </section>

              <section className="my-4 technologies">
                <h2 className="text-center">{t('technologiesUsedTitle')}</h2>
                <p className="text-center">
                  {t('technologiesUsedSubtitle')}
                </p>
                <Grid container spacing={4}>
                  {technologies.map((techCategory, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Paper elevation={3} className="p-3">
                        <Typography variant="h5">{techCategory.category}</Typography>
                        <ul className="text-start mt-2">
                          {techCategory.items.map((item, itemIndex) => {
                            const [techName, techDescription] = item.split(": ", 2);
                            return (
                              <li key={itemIndex}>
                                <strong>{techName}:</strong> {techDescription}
                              </li>
                            );
                          })}
                        </ul>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </section>
              <section className="my-4 insights">
                <h2 className="text-center">{t('implementationInsightsTitle')}</h2>
                <p className="text-center">
                  {t('implementationInsightsDescription')}
                </p>
              </section>
              <section className="my-4 acknowledgments">
                <h2 className="text-center">{t('acknowledgmentsTitle')}</h2>
                <p className="text-center">
                  {t('acknowledgmentsText')}
                </p>
              </section>
            </Container>
          </div>
        </div>
        <Footer />
      </>
    )
  );
}

export default Home;