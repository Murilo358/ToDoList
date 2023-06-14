import "../css/Filter.css";

function Filter({ filter, setFilter, setSort }) {
  return (
    <div className="filter">
      <h2>Filtrar:</h2>
      <div className="filter-options">
        <div>
          <p>Status:</p>
          <select value={filter} onChange={(ev) => setFilter(ev.target.value)}>
            <option value="All">Todas</option>
            <option value="Completed">Completas</option>
            <option value="Incompleted">Incompletas</option>
          </select>
          <div>
            <p>Ordem Alfabetica:</p>
            <button
              onClick={() => {
                setSort("Crescente");
              }}
            >
              Crescente
            </button>
            <button
              onClick={() => {
                setSort("Decrescente");
              }}
            >
              Decrescente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
