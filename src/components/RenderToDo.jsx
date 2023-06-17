import "../css/RenderToDo.css";

import { AiOutlineCheck } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";

function RenderToDo({ todo, removeToDo, completeToDo }) {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="renderToDo">
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
          <button
            onClick={toggleDescription}
            className="todo-list-content__buttons-seeDetails"
          >
            Ver detalhes
          </button>

          <div>
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
      </div>
      {showDescription && (
        <div className="todo-details">
          <hr />
          <p>Categoria: {todo.category}</p>

          <p>Descrição:</p>
          <div
            className="todo-description"
            dangerouslySetInnerHTML={{ __html: todo.description }}
          />
        </div>
      )}
    </div>
  );
}

export default RenderToDo;
