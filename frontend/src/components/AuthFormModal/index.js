import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal";
import SignupForm from "../SignupFormModal";

import "./AuthForm.css";

function AuthFormModal() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState("");

  const onClose = () => {
    setShowModal(false);
    setForm("");
  };

  return (
    <>
      <button
        className="nav-auth-link button"
        onClick={() => {
          setShowModal(true);
          setForm("login");
        }}
      >
        Log in
      </button>
      <button
        className="nav-auth-link button"
        onClick={() => {
          setShowModal(true);
          setForm("signup");
        }}
      >
        Sign up
      </button>
      {showModal && form === "login" && (
        <Modal onClose={onClose}>
          <LoginForm prop={{ setForm }} />
        </Modal>
      )}
      {showModal && form === "signup" && (
        <Modal onClose={onClose}>
          <SignupForm prop={{ setForm }} />
        </Modal>
      )}
    </>
  );
}

export default AuthFormModal;
