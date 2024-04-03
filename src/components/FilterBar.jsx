import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";

const FilterBar = ({ years, year, setYear, months, month, setMonth, days, day, setDay, times, time, setTime, handleFilterChange }) => {

  const { t } = useTranslation();

  const handleChange = (e, setState, isTime = false) => {
    setState(isTime ? e.target.value : Number(e.target.value));
  };

  const filters = [
    { label: 'year', state: year, setState: setYear, options: years },
    { label: 'month', state: month, setState: setMonth, options: months },
    { label: 'day', state: day, setState: setDay, options: days },
    { label: 'time', state: time, setState: setTime, options: times, isTime: true }
  ];

  return (
    <form className="row g-3 justify-content-center mb-4 align-items-end">
      {filters.map(({ label, state, setState, options, isTime = false }) => (
        <div className="col-auto" key={label}>
          <label htmlFor={label.toLowerCase()} className="form-label">
            {t(label)}
          </label>
          <select
            className="form-select"
            id={label}
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
          aria-label={t('search')}
          onClick={handleFilterChange}
        >
          <CiSearch />
        </button>
      </div>
    </form>
  );
}

export default FilterBar;
