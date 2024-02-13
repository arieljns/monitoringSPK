import React, { useState } from 'react';
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useEffect } from "react"


// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function ModalComponent({ handleReset, isModalOpen, setIsModalOpen }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.position = 'fixed';
    } else {
      document.body.style.position = 'static';
    }

    return () => {
      document.body.style.position = 'static';
    };
  }, [isModalOpen]);

  function closeModal() {
    setIsModalOpen(false);
    handleReset()
  }

  return (
    <div className='modal-container'>

      <Modal
        className="modal"
        style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Thank You Modal"
      >
        <img src='woman_carrying_file_folders_221005.svg' width={198} height={198} />
        <Typography variant='h4' sx={{ fontWeight: "bold" }}>Terima Kasih Untuk Respon Anda</Typography>
        <Button variant="contained" onClick={closeModal}>Close</Button>
      </Modal>
    </div>
  );
}

export default ModalComponent;





