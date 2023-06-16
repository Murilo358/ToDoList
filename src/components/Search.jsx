import "../css/search.css";

const Search = ({ search, setSearch }) => {
  return (
    <div className="search">
      <h2>Pesquisar</h2>
      <input
        type="text"
        placeholder="Pesquise pelo titulo &#x1F50E;"
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
      />
    </div>
  );
};

export default Search;
