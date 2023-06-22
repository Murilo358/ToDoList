import { db } from "../services/firebaseConfig";
import { collection, doc, deleteDoc } from "firebase/firestore";

export const deleteTask = async (taskId) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
    console.log("Tarefa excluída com sucesso!");
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao excluir a tarefa.");
  }
};
