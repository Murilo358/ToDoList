import { useState, useEffect } from "react";
import "./App.css";
import RenderToDo from "./components/RenderToDo";

import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./components/SideBar";
import { GrMenu } from "react-icons/gr";

function App() {
  const [todo, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Crescente");
  const [viewForm, setViewForm] = useState(false);
  const [showSidebar, setShowSideBar] = useState(false);
  const [sortDate, setSortDate] = useState("Crescente");

  useEffect(() => {
    const savedList = localStorage.getItem("list");
    if (savedList) {
      setTodos(JSON.parse(savedList));
    }
  }, []);

  const removeToDo = (id) => {
    const newTodos = todo.filter((todo) => (todo.id !== id ? todo : null));
    localStorage.setItem("list", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const addToDo = (text, category, description, date) => {
    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      text,
      category,
      description,
      date,
      isCompleted: false,
    };

    const savedList = localStorage.getItem("list");

    if (savedList) {
      const list = JSON.parse(savedList);
      const toDoInList = list.find((item) => item.id === newTodo.id);

      if (!toDoInList) {
        list.push(newTodo);
        localStorage.setItem("list", JSON.stringify(list));
      }
    } else {
      const list = [newTodo];
      localStorage.setItem("list", JSON.stringify(list));
    }

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const completeToDo = (id) => {
    const newToDos = todo.map((todos) => {
      if (todos.id === id) {
        const newToDos = {
          ...todos,
          isCompleted: !todos.isCompleted,
        };

        localStorage.setItem(
          "list",
          JSON.stringify(todo.map((m) => (m.id === id ? newToDos : m)))
        );

        return newToDos;
      }
      return todos;
    });

    setTodos(newToDos);
  };

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
          addToDo={addToDo}
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
              addToDo={addToDo}
              viewForm={viewForm}
            />
          )}
        </div>

        <div className="todo-list">
          <h1>Lista de tarefas</h1>
          {todo.length === 0 && (
            <p className="d-flex align-self-center">
              Crie uma tarefa no menu ao lado
            </p>
          )}
          {todo
            .filter((todo) =>
              filter === "All"
                ? true
                : filter === "Completed"
                ? todo.isCompleted
                : !todo.isCompleted
            )
            .filter((todo) =>
              todo.text.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) =>
              sort === "Crescente"
                ? a.text.localeCompare(b.text)
                : b.text.localeCompare(a.text)
            )
            .sort((a, b) =>
              sortDate === "Crescente"
                ? b.date.localeCompare(a.date)
                : a.date.localeCompare(b.date)
            )

            .map((todo) => (
              <RenderToDo
                key={todo.id}
                todo={todo}
                removeToDo={removeToDo}
                completeToDo={completeToDo}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
