import { useState } from "react";
import "../css/ToDoForm.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dayjs from "dayjs";

function ToDoForm({ addToDo }) {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!title || !category || !description) return;
    //Adicionar toDo e limpar os campos
    const date = dayjs().format("DD-MM-YYYY");
    addToDo(title, category, description, date);
    setTitle("");
    setCategory("");
    setDescription("");
  };

  return (
    <div className="ToDoForm">
      <div className="ToDoForm-container">
        <h2>Criar tarefa:</h2>

        <form onSubmit={handleSubmit} className="ToDoForm-form">
          <input
            required
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="Digite o nome da tarefa"
            className="ToDoForm-form__input"
            type="text"
          />
          <select
            value={category}
            required
            onChange={(ev) => setCategory(ev.target.value)}
          >
            <option disabled value="">
              Selecione uma categoria
            </option>
            <option value="Trabalho">Trabalho</option>
            <option value="Pessoal">Pessoal</option>
            <option value="Estudos">Estudos</option>
          </select>
          <h5>Descrição</h5>
          <ReactQuill
            className="editor"
            theme="snow"
            value={description}
            onChange={setDescription}
          />
          <button className="create-task__button" type="submit">
            Criar tarefa
          </button>
        </form>
      </div>
    </div>
  );
}

export default ToDoForm;
