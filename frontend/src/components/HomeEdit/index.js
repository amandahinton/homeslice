import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
// import HomeEditForm from './HomeEditForm';
import HomeLoader from '../HomeLoader';

function HomeEditFormModal() {
  const [showEditHomeModal, setEditHomeShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setEditHomeShowModal(true)}>Edit home</button>
      {showEditHomeModal && (
        <Modal onClose={() => setEditHomeShowModal(false)}>
          <HomeLoader />
        </Modal>
      )}
    </>
  );
}

export default HomeEditFormModal;
