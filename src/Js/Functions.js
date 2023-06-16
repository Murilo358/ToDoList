export const addToList = (todo) => {
  const savedWatchlist = localStorage.getItem("watchlist");
  const currentDate = dayjs().format("DD-MM-YYYY");
  if (savedWatchlist) {
    const watchlist = JSON.parse(savedWatchlist);
    const todoInWatchlist = watchlist.find((item) => item.id === todo.id);

    if (!todoInWatchlist) {
      todo.dateAdded = currentDate;
      todo.watched = false;
      watchlist.push(todo);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      alert("Filme adicionado à watchlist!");
    } else {
      alert("Este filme já está na watchlist!");
    }
  } else {
    todo.dateAdded = currentDate;
    const watchlist = [todo];
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert("Filme adicionado à watchlist!");
  }
};
