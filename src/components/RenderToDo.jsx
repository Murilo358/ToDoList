import "../css/RenderToDo.css";
import React from "react";

function RenderToDo({ todo, removeToDo, completeToDo }) {
  return (
    <div
      className="todo-list-container"
      style={{
        textDecoration: todo.isCompleted ? "line-through" : "none",
        color: todo.isCompleted ? "green" : "var(--primary-color)",
      }}
    >
      <div className="todo-list-content">
        <p className="todo-list-content__text">Para fazer: {todo.text}</p>
        <p className="todo-list-content__category">
          Categoria: ({todo.category})
        </p>
      </div>
      <div className="buttons">
        {" "}
        <button onClick={() => completeToDo(todo.id)} className="complete">
          Completar
        </button>
        <button onClick={() => removeToDo(todo.id)} className="delete">
          X
        </button>
      </div>
    </div>
  );
}

export default RenderToDo;
