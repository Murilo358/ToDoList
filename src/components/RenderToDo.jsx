import "../css/RenderToDo.css";

import { AiOutlineCheck } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { FaUndo } from "react-icons/fa";
import { deleteTask } from "../hooks/useDeleteTask";
import { useCompleteTask } from "../hooks/useCompleteTask";
function RenderToDo({ todo }) {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="renderToDo">
      <div
        className={`todo-list-container ${
          todo.todo.isCompleted ? "completed" : ""
        }`}
      >
        <div className="todo-list-content">
          <p className="todo-list-content__text">
            Para fazer: {todo.todo.title}
          </p>
        </div>{" "}
        <p className="todo-list-content__date">
          {todo.todo.createdAt.toDate().toLocaleString().slice(0, 10)}
        </p>
        <div className="todo-list-content__buttons-date">
          <button
            onClick={toggleDescription}
            className="todo-list-content__buttons-seeDetails"
          >
            {!showDescription ? "Ver mais" : "Ver menos"}
          </button>

          <div>
            <button
              onClick={() => useCompleteTask(todo.todo.id)}
              className="complete todo-list-content__button"
            >
              {todo.todo.isCompleted ? <FaUndo /> : <AiOutlineCheck />}
            </button>

            <button
              onClick={() => deleteTask(todo.todo.id)}
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
          <p>Categoria: {todo.todo.category}</p>

          <p>Descrição:</p>
          <div
            className="todo-description"
            dangerouslySetInnerHTML={{ __html: todo.todo.description }}
          />
        </div>
      )}
    </div>
  );
}

export default RenderToDo;
