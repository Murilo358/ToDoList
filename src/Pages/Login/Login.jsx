import React, { useEffect, useContext, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useAuthentication } from "../../hooks/useAuthentication";
import { Link } from "react-router-dom";
import loginImage from "../../assets/LoginImg.svg";

import "../LoginAndRegister.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { login, error: authError, loading, success } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className="login-container">
      <div className="login-content">
        <img className="undraw" src={loginImage} alt="svg icon" />
        <div className="login-main-content">
          <h1>LOGIN</h1>
          <p>Faça login para utilizar o TaskMaster</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>E-mail:</span>
              <input
                type="email"
                name="email"
                required
                placeholder="E-mail do usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <span>Senha:</span>
              <input
                type="password"
                name="password"
                required
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {!loading && <button>Entrar</button>}
            {loading && (
              <button disabled>
                <ImSpinner9 className="spinner" />{" "}
              </button>
            )}
            {success && (
              <p className="success">Usuario registrado com sucesso!!</p>
            )}
            {error && <p className="error">{error}</p>}
          </form>
          <Link to={"/register"}>Ainda não tem uma conta?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
