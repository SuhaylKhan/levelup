import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="nav-auth-link button"
        onClick={() => setShowModal(true)}
      >
        Log in
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
