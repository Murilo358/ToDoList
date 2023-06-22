import { db } from "../services/firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export const useCompleteTask = async (taskId) => {
  try {
    const taskRef = doc(db, "tasks", taskId);

    const taskSnapshot = await getDoc(taskRef);
    const currentIsCompleted = taskSnapshot.data().isCompleted;

    await updateDoc(taskRef, { isCompleted: !currentIsCompleted });
    console.log("Status da tarefa alterado com sucesso!");
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao alterar o status da tarefa.");
  }
};
