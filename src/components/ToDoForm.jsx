import { useState } from "react";
import "../css/ToDoForm.css";

function ToDoForm({ addToDo }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!title || !category) return;
    //Adicionar toDo e limpar os campos
    addToDo(title, category);
    setTitle("");
    setCategory("");
  };

  return (
    <div className="ToDoForm">
      <h2>Criar tarefa:</h2>
      <form onSubmit={handleSubmit} className="ToDoForm-form">
        <input
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Digite o titulo"
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
        <button type="submit">Criar tarefa</button>
      </form>
    </div>
  );
}

export default ToDoForm;
