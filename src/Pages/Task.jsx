import React from "react";
import { useParams, ScrollRestoration } from "react-router-dom";

function Task() {
  const { id } = useParams();
  console.log(id);
  const savedList = localStorage.getItem("list");
  const list = JSON.parse(savedList);
  const toDoInList = list.find((item) => item.id == id);

  console.log(toDoInList);
  return (
    <div>
      <h1>{toDoInList.text}</h1>
      <p>{toDoInList.category}</p>
      <div
        className="desc"
        dangerouslySetInnerHTML={{ __html: toDoInList.description }}
      />
    </div>
  );
}

export default Task;
