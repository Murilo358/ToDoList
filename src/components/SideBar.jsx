import Search from "./Search";
import Filter from "./Filter";
import { GrClose } from "react-icons/gr";
import "../css/SideBar.css";
import RenderToDoForm from "./ToDoForm";

function SideBar({
  search,
  setSearch,
  filter,
  setFilter,
  setSort,
  setSortDate,
  setShowSideBar,
  setViewForm,
  addToDo,
  viewForm,
}) {
  return (
    <div className="sideBar">
      <div className="sideBar-search">
        <GrClose
          className="close-sidebar__button"
          onClick={() => setShowSideBar(false)}
        />
        <Search search={search} setSearch={setSearch} />
      </div>{" "}
      <Filter
        filter={filter}
        setFilter={setFilter}
        setSort={setSort}
        setSortDate={setSortDate}
      />
      <div className="sideBar-newTask-container">
        <RenderToDoForm />
      </div>
    </div>
  );
}

export default SideBar;
