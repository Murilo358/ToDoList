import { useState } from "react";
import "./App.css";
import RenderToDo from "./components/RenderToDo";
import { useFetchTasks } from "./hooks/useFetchTasks";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./components/SideBar";
import { ImSpinner9 } from "react-icons/im";

import { GrMenu } from "react-icons/gr";

function Home() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Crescente");
  const [viewForm, setViewForm] = useState(false);
  const [showSidebar, setShowSideBar] = useState(false);
  const [sortDate, setSortDate] = useState("Crescente");
  const { tasks, loading } = useFetchTasks("tasks");

  return (
    <div className="app ">
      <div className="desktop-menu">
        <SideBar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          setSort={setSort}
          setSortDate={setSortDate}
          setShowSideBar={setShowSideBar}
          setViewForm={setViewForm}
          viewForm={viewForm}
        />
      </div>

      <div className="app-content">
        <div className="app-content-appName">
          <GrMenu
            className="mobile-sidebar-icon"
            onClick={() => setShowSideBar(!showSidebar)}
          />

          <h1 className="app-name"> TaskMaster</h1>
        </div>
        <div className="mobile-sidebar">
          {showSidebar && (
            <SideBar
              search={search}
              setSearch={setSearch}
              filter={filter}
              setFilter={setFilter}
              setSort={setSort}
              setSortDate={setSortDate}
              setShowSideBar={setShowSideBar}
              setViewForm={setViewForm}
              viewForm={viewForm}
            />
          )}
        </div>

        <div className="todo-list">
          <h1>Lista de tarefas</h1>

          {loading && <ImSpinner9 className="spinner" />}
          {tasks && tasks.length === 0 && (
            <p className="d-flex align-self-center">
              Crie uma tarefa no menu ao lado
            </p>
          )}
          {tasks &&
            tasks
              .filter((todo) =>
                filter === "All"
                  ? true
                  : filter === "Completed"
                  ? todo.isCompleted
                  : !todo.isCompleted
              )
              .filter((todo) =>
                todo.title.toLowerCase().includes(search.toLowerCase())
              )
              .sort((a, b) =>
                sort === "Crescente"
                  ? b.title.localeCompare(a.title)
                  : a.title.localeCompare(b.title)
              )
              .sort((a, b) =>
                sortDate === "Crescente"
                  ? b.createdAt
                      .toDate()
                      .toLocaleString()
                      .localeCompare(a.createdAt)
                  : a.createdAt
                      .toDate()
                      .toLocaleString()
                      .localeCompare(b.createdAt)
              )
              .map((todo) => <RenderToDo key={todo.id} todo={{ todo }} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
