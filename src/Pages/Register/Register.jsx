import React from "react";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { ImSpinner9 } from "react-icons/im";
import RegisterImg from "../../assets/RegisterImg.svg";
import "../LoginAndRegister.css";

function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const {
    createUser,
    error: authError,
    loading,
    success,
  } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais");
      return;
    }

    const res = await createUser(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className="register-container">
      <div className="register-content">
        <img className="undraw" src={RegisterImg} alt="" />
        <div className="register-main-content">
          <h1>Cadastre-se</h1>
          <p>Crie seu usuario para organizar suas tarefas</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Nome:</span>
              <input
                type="text"
                name="displayName"
                required
                placeholder="Nome do usuario"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </label>
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
            <label>
              <span>Senha:</span>
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="Confirme a sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>

            {!loading && <button>Cadastrar</button>}
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
        </div>
      </div>
    </div>
  );
}

export default Register;
