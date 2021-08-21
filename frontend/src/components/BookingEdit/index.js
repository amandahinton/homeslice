import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import BookingLoader from '../BookingEditLoader';

function BookingEditFormModal() {
  const [showEditBookingModal, setEditBookingShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setEditBookingShowModal(true)}>Edit task</button>
      {showEditBookingModal && (
        <Modal onClose={() => setEditBookingShowModal(false)}>
          <BookingLoader />
        </Modal>
      )}
    </>
  );
}

export default BookingEditFormModal;
