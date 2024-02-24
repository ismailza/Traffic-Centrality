import { useEffect, useState } from "react"
import MapComponent from "../components/MapComponent"
import NavBar from "../components/NavBar"
import { CircleLoader } from "react-spinners"
import Footer from "../components/Footer"

const Home = () => {

  const [url, setUrl] = useState('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060])
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(true)

  const [year, setYear] = useState(2021)
  const [month, setMonth] = useState(5)
  const [day, setDay] = useState(9)
  const [time, setTime] = useState("11:00-12:00AM")

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 0; i < 24; i++) {
      const startHour = i;
      const endHour = (i + 1) % 24;
      const start = `${startHour % 12 === 0 ? 12 : startHour % 12}:00`;
      const end = `${endHour % 12 === 0 ? 12 : endHour % 12}:00${endHour < 12 ? 'AM' : 'PM'}`;
      slots.push(`${start}-${end}`);
    }
    return slots;
  }

  const years = Array.from({ length: 2022 - 2019 }, (_, i) => 2021 - i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const times = generateTimeSlots()

  const fetchData = async () => {
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const datasetUrl = `data/dataset_${formattedDate}.json`;

    try {
      const response = await fetch(datasetUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const fetchedData = await response.json();
      processDataset(fetchedData);
    } catch (error) {
      alert("Failed to fetch data. Please try again later.");
      console.error("Failed to fetch data:", error);
      setPositions([]);
    }
  };

  const processDataset = (fetchedData) => {
    if (fetchedData && fetchedData[time]) {
      const positions = fetchedData[time].map(entry => ({
        position: [entry.Latitude, entry.Longitude],
        from: entry.From,
        to: entry.To,
        title: entry.RoadwayName,
        value: entry.flow,
      }));
      setPositions(positions);
    } else {
      alert("No data available for the selected time slot.");
      console.log("No data available for the selected time slot.");
      setPositions([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }, [year, month, day, time]);

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
                Traffic Centrality Map of the New York City
              </h1>
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
              <form className="row g-3 justify-content-center mb-4">
                {[{ label: "Year", state: year, setState: setYear, options: years },
                { label: "Month", state: month, setState: setMonth, options: months },
                { label: "Day", state: day, setState: setDay, options: days },
                { label: "Time", state: time, setState: setTime, options: times }]
                  .map(({ label, state, setState, options, formatOption = (o) => o }) => (
                    <div className="col-auto" key={label}>
                      <label htmlFor={label.toLowerCase()} className="form-label">{label}</label>
                      <select
                        className="form-select"
                        id={label.toLowerCase()}
                        value={state}
                        onChange={e => setState(Number(e.target.value))}
                      >
                        {options.map(option => (
                          <option value={option} key={option}>{formatOption(option)}</option>
                        ))}
                      </select>
                    </div>
                  ))}
              </form>
              <MapComponent
                url={url}
                mapCenter={mapCenter}
                positions={positions}
              />
            </main>
          </div>
        </div>
        <Footer />
      </>
    )
  );
}

export default Home