import { useState, useEffect } from "react";
import { db } from "../services/firebaseConfig";
import { useAuthValue } from "../contexts/AuthContext";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  QuerySnapshot,
} from "firebase/firestore";

export const useFetchTask = (docCollection) => {
  const [tasks, setTasks] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const { user } = useAuthValue();

  //Deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        let q;

        //Search

        q = query(
          collectionRef,
          where("uid", "==", user.uid),

          orderBy("createdAt", "desc")
        );
        await onSnapshot(q, (querySnapshot) => {
          setTasks(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    }
    loadData();
  }, [docCollection, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { tasks, loading, error };
};
