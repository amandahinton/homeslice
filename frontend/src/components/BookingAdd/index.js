import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import BookingLoader from '../BookingAddLoader';

function BookingAddFormModal() {
  const [showAddBookingModal, setAddBookingShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setAddBookingShowModal(true)}>Add to home</button>
      {showAddBookingModal && (
        <Modal onClose={() => setAddBookingShowModal(false)}>
          <BookingLoader />
        </Modal>
      )}
    </>
  );
}

export default BookingAddFormModal;
