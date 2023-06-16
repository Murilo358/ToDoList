import "../css/Filter.css";

import { IoChevronUp, IoChevronDownSharp } from "react-icons/io5";

function Filter({ filter, setFilter, setSort, setSortDate }) {
  return (
    <div className="filter">
      <h2>Filtrar</h2>
      <div className="filter-options">
        <div className="filter-options-select">
          <p>Por status</p>
          <select value={filter} onChange={(ev) => setFilter(ev.target.value)}>
            <option value="All">Todas</option>
            <option value="Completed">Completas</option>
            <option value="Incompleted">Incompletas</option>
          </select>
        </div>
        <div className="filter-options-buttons-div">
          <p>Por data</p>
          <div className="filter-option-buttons">
            <button
              onClick={() => {
                setSortDate("Crescente");
              }}
            >
              <IoChevronUp />
            </button>
            <button
              onClick={() => {
                setSortDate("Decrescente");
              }}
            >
              <IoChevronDownSharp />
            </button>
          </div>
        </div>
        <div className="filter-options-buttons-div">
          <p>Ordem Alfabetica:</p>
          <div className="filter-option-buttons">
            <button
              onClick={() => {
                setSort("Crescente");
              }}
            >
              <IoChevronUp />
            </button>
            <button
              onClick={() => {
                setSort("Decrescente");
              }}
            >
              <IoChevronDownSharp />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
