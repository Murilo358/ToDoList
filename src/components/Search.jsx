import "../css/Search.css";

const Search = ({ search, setSearch }) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Pesquise por uma tarefa &#x1F50E;"
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
      />
    </div>
  );
};

export default Search;
