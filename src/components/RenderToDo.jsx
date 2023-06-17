import "../css/RenderToDo.css";
import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineCheck } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

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
      </div>{" "}
      <p className="todo-list-content__date">{todo.date}</p>
      <div className="todo-list-content__buttons-date">
        <Link to={`task/${todo.id}`}>
          <button className="todo-list-content__buttons-seeDetails">
            Ver detalhes
          </button>
        </Link>
        <button
          onClick={() => completeToDo(todo.id)}
          className="complete todo-list-content__button"
        >
          <AiOutlineCheck />
        </button>
        <button
          onClick={() => removeToDo(todo.id)}
          className="delete todo-list-content__button"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
}

export default RenderToDo;
