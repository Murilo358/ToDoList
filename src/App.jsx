import { useState } from "react";
import "./App.css";
import RenderToDo from "./components/RenderToDo";
import RenderToDoForm from "./components/ToDoForm";
import Search from "./components/Search";
import Filter from "./components/Filter";

//Armazena os dados iniciais, como se fosse uma chamada de uma API
//const [todos, setTodos] = useState();
//Ja tendo algo para manipular e preencher

function App() {
  const [todo, setTodos] = useState([
    {
      id: 1,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
    },
  ]);

  const addToDo = (text, category) => {
    const newTodos = [
      ...todo,
      {
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted: false,
      },
    ];
    setTodos(newTodos);
  };

  const removeToDo = (id) => {
    const newToDos = [...todo];
    const filteredToDos = newToDos.filter((todo) =>
      todo.id !== id ? todo : null
    );
    setTodos(filteredToDos);
  };

  const completeToDo = (id) => {
    const newToDos = [...todo];
    newToDos.map((todo) =>
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );
    setTodos(newToDos);
  };

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [sort, setSort] = useState("Crescente");

  return (
    <div className="app">
      <h1>Lista de tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
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
          .map((todo) => (
            <RenderToDo
              key={todo.id}
              todo={todo}
              removeToDo={removeToDo}
              completeToDo={completeToDo}
            />
          ))}
      </div>
      <RenderToDoForm addToDo={addToDo} />
    </div>
  );
}

export default App;
