import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import HomeAddForm from './HomeAddForm';

function HomeAddFormModal() {
  const [showAddHomeModal, setAddHomeShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setAddHomeShowModal(true)}>Add a home</button>
      {showAddHomeModal && (
        <Modal onClose={() => setAddHomeShowModal(false)}>
          <HomeAddForm />
        </Modal>
      )}
    </>
  );
}

export default HomeAddFormModal;
