import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

import "./SignupForm.css";

function SignupForm({ prop }) {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  console.log(errors)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ fullName, email, username, password })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      Sign up
      <div className="form-toggle-text">
        Already have an account?
        <span className="fake-button" onClick={() => setForm("login")}>
          Log in
        </span>
      </div>
      <label className="auth-label">
        <input
          className="auth-input"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
        />
      </label>
      <label className="auth-label">
        <input
          className="auth-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </label>
      <label className="auth-label">
        <input
          className="auth-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
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
      <label className="auth-label">
        <input
          className="auth-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
      </label>
      {errorUl}
      <button className="auth-button generic-button" type="submit">
        Sign Up
      </button>
    </form>
  );
}

export default SignupForm;
