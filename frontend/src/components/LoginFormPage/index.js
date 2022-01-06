import { useDispatch } from "react-redux";
import { useState } from "react";

import { login } from "../../store/session";

const LoginFormPage = () => {
  const dispatch = useDispatch();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(login({ credential, password }));
      }}
    >
      <label for="credential">Username or Email</label>
      <input
        type="text"
        name="credential"
        value={credential}
        onChange={(e) => setCredential(e.target.value)}
      />

      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginFormPage;
