import React, { useState } from "react";
import TextInput from "../../utils/textInput/textInput";
import { useAuth } from "./hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, isLoading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Logging In..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;