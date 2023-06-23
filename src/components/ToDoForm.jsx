import { useState } from "react";
import "../css/ToDoForm.css";
import ReactQuill from "react-quill";
import { useAuthValue } from "../contexts/AuthContext";
import "react-quill/dist/quill.snow.css";
import { ImSpinner9 } from "react-icons/im";
import Swal from "sweetalert2";
import { AiOutlinePlus } from "react-icons/ai";

import { useInsertTasks } from "../hooks/useInsertTasks";

function ToDoForm() {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);
  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertTasks("tasks");

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setFormError("");
    setSuccess("");
    //Insert to db

    if (!title || !category || !description) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Preencha todos os campos!",
      });
      return;
    }
    insertDocument({
      title,
      category,
      description,
      uid: user.uid,
      createdBy: user.displayName,
      isCompleted: false,
    });

    if (insertDocument) {
      Swal.fire({
        icon: "success",
        title: "Tarefa criada",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setTitle("");
    setCategory("");
    setDescription("");
  };

  return (
    <div className="ToDoForm">
      <div className="ToDoForm-container">
        <h2>CRIAR TAREFA</h2>

        <form onSubmit={handleSubmit} className="ToDoForm-form">
          <input
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="Digite o nome da tarefa"
            className="ToDoForm-form__input"
            type="text"
          />
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            <option disabled value="">
              Selecione uma categoria
            </option>
            <option value="Trabalho">Trabalho</option>
            <option value="Pessoal">Pessoal</option>
            <option value="Estudos">Estudos</option>
          </select>
          <h5>DESCRIÇÃO</h5>

          <ReactQuill
            value={description}
            onChange={setDescription}
            className="editor"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                [{ font: [] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }],
                [{ background: [] }],
                [{ align: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
                [{ "custom-toolbar-button": [] }],
              ],
            }}
          />

          {formError && <p className="error">{formError}</p>}
          {!response.loading && (
            <button
              className="sideBar-newTask__button"
              onClick={() => setViewForm(!viewForm)}
            >
              Criar nova tarefa <AiOutlinePlus />
            </button>
          )}
          {response.loading && (
            <button className="sideBar-newTask__button" disabled>
              <ImSpinner9 className="spinner" />{" "}
            </button>
          )}
          {response.error && <p className="error">{response.error}</p>}
        </form>
      </div>
    </div>
  );
}

export default ToDoForm;
