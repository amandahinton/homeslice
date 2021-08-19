import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal() {
  const [showSignUpModal, setSignupShowModal] = useState(false);

  return (
    <>
      <button className="secondaryButton" onClick={() => setSignupShowModal(true)}>Sign Up</button>
      {showSignUpModal && (
        <Modal onClose={() => setSignupShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
