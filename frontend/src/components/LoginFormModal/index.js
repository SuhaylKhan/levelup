import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

import "./LoginForm.css";

function LoginForm({ prop }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const { setForm } = prop;

  let errorUl;

  if (errors.length > 0) {
    errorUl = (
      <ul className="error-list">
        {errors.map((error, idx) => (
          <li key={idx} className="error-item">
            {error}
          </li>
        ))}
      </ul>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      Log in
      <div>
        Don't have an account?
        <span onClick={() => setForm("signup")}>Sign up</span>
      </div>
      <label className="auth-label">
        <input
          className="auth-input"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder="Username or Email"
        />
      </label>
      <label className="auth-label">
        <input
          className="auth-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </label>
      {errorUl}
      <button className="generic-button auth-button" type="submit">
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
