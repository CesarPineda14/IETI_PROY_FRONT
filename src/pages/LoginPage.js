import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../services/auth";
import '../styles/LoginPage.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.login(email, password);
      if (response.success) {
        navigate("/");
      } else {
        setError("Credenciales incorrectas. Por favor, intenta nuevamente.");
      }
    } catch (err) {
      setError("Ocurrió un error. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        <div className="form-group">
          <label htmlFor="email">Nombre de usuario</label>
          <input
            type="string"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;