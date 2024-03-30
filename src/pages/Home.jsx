import { useEffect, useState } from "react";
import MapComponent from "../components/CentralityMap";
import NavBar from "../components/NavBar";
import { CircleLoader } from "react-spinners";
import Footer from "../components/Footer";
import FilterBar from "../components/FilterBar";
import { toast } from "react-toastify";

const Home = () => {
  const [url] = useState('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  const [mapCenter] = useState([40.7128, -74.0060]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for filters
  const [year, setYear] = useState(2019);
  const [month, setMonth] = useState(10);
  const [day, setDay] = useState(12);
  const [time, setTime] = useState("11:00-12:00AM");
  const [times, setTimes] = useState([]);

  // Filter options for years, months, and days
  const years = Array.from({ length: 2022 - 2019 }, (_, i) => 2021 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const fetchData = async () => {
    // Construct dataset URL with current filters
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const datasetUrl = `data/dataset_${formattedDate}.json`;

    try {
      const response = await fetch(datasetUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const fetchedData = await response.json();

      // Update the time slots based on the fetched data
      const fetchedTimes = Object.keys(fetchedData);
      setTimes(fetchedTimes);

      processDataset(fetchedData);
    } catch (error) {
      toast.error("Failed to fetch data. Please try again later.");
      console.error("Failed to fetch data:", error);
      setPositions([]);
    }
  };

  const processDataset = (fetchedData) => {
    if (fetchedData) {
      const selectedData = fetchedData[time];
      if (!selectedData) {
        toast.error("No data available for the selected time slot.");
        setPositions([]);
        return;
      }

      const positions = selectedData.map(entry => ({
        position: [entry.Latitude, entry.Longitude],
        from: entry.From,
        to: entry.To,
        title: entry.RoadwayName,
        direction: entry.Direction,
        value: entry.flow,
      }));
      setPositions(positions);
    } else {
      toast.error("No data available for the selected time slot.");
      setPositions([]);
    }
  };

  const updateMap = () => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }

  useEffect(() => {
    if (year && month && day && time) {
      setLoading(true);
      fetchData().finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    if (times.length > 0 && !times.includes(time)) {
      setTime(times[0]);
    }
  }, [times]);

  const handleFilterChange = (e) => {
    if (year && month && day && time) {
      setLoading(true);
      fetchData().finally(() => setLoading(false));
    }
  }

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
              <FilterBar years={years} year={year} setYear={setYear} months={months} month={month} setMonth={setMonth} days={days} day={day} setDay={setDay} times={times} time={time} setTime={setTime} handleFilterChange={handleFilterChange} />
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

export default Home;