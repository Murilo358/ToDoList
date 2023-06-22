import React from "react";
import Home from "./Home.jsx";
import Login from "./Pages/Login/Login.jsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from "./Pages/Register/Register.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ImSpinner9 } from "react-icons/im";
import Header from "./components/Header.jsx";
//Hooks
import { useAuthentication } from "./hooks/useAuthentication.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return (
      <div className="loading-div">
        <ImSpinner9 className="spinner" />
      </div>
    );
  }

  return (
    <div>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to={"/Login"} />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to={"/"} />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to={"/"} />}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
