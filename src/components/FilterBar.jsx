import { CiSearch } from "react-icons/ci";

const FilterBar = ({ years, year, setYear, months, month, setMonth, days, day, setDay, times, time, setTime, handleFilterChange }) => {
  
  const handleChange = (e, setState, isTime = false) => {
    setState(isTime ? e.target.value : Number(e.target.value));
  };

  const filters = [
    { label: "Year", state: year, setState: setYear, options: years },
    { label: "Month", state: month, setState: setMonth, options: months },
    { label: "Day", state: day, setState: setDay, options: days },
    { label: "Time", state: time, setState: setTime, options: times, isTime: true }
  ];

  return (
    <form className="row g-3 justify-content-center mb-4 align-items-end">
      {filters.map(({ label, state, setState, options, isTime = false }) => (
        <div className="col-auto" key={label}>
          <label htmlFor={label.toLowerCase()} className="form-label">{label}</label>
          <select
            className="form-select"
            id={label.toLowerCase()}
            value={state}
            onChange={(e) => handleChange(e, setState, isTime)}
          >
            {options.map(option => (
              <option value={option} key={option}>{option}</option>
            ))}
          </select>
        </div>
      ))}
      <div className="col-auto d-grid gap-2">
        <button
          type="button"
          className="btn btn-light btn-icon"
          aria-label="Search"
          onClick={handleFilterChange}
        >
          <CiSearch />
        </button>
      </div>
    </form>
  );
}

export default FilterBar;
