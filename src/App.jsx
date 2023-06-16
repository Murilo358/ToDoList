import { useState, useEffect } from "react";
import "./App.css";
import RenderToDo from "./components/RenderToDo";
import RenderToDoForm from "./components/ToDoForm";
import Search from "./components/Search";
import Filter from "./components/Filter";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [todo, setTodos] = useState([]);

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

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [sort, setSort] = useState("Crescente");

  const [sortDate, setSortDate] = useState("Crescente");

  return (
    <div className="app ">
      <Search search={search} setSearch={setSearch} />
      <Filter
        filter={filter}
        setFilter={setFilter}
        setSort={setSort}
        setSortDate={setSortDate}
      />
      <RenderToDoForm addToDo={addToDo} />
      <h1>Lista de tarefas</h1>
      <div className="todo-list">
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
  );
}

export default App;
