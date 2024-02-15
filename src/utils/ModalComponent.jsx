import Modal from 'react-modal';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useEffect } from "react"

Modal.setAppElement('#root');

function ModalComponent({ handleError, handleReset, isModalOpen, setIsModalOpen, errorMessage }) {

  console.log("This is handleError value:", handleError)
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
      {handleError ? <Modal
        className="modal"
        style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Thank You Modal"
      >
        <img alt="error" src='download.svg' width={198} height={198} />
        <Typography variant='h4' sx={{ fontWeight: "bold" }}>Sayang Sekali data Anda tidak Terkirim</Typography>
        <Button variant="contained" onClick={closeModal}>Close</Button>
      </Modal> : <Modal
        className="modal"
        style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Thank You Modal"
      >
        <img alt='success' src='sukses.svg' width={198} height={198} />
        <Typography variant='h4' sx={{ fontWeight: "bold", maxWidth:390, fontSize:25 }}>TERIMA KASIH UNTUK RESPON ANDA</Typography>
        <Button sx={{width:200}} variant="contained" onClick={closeModal}>Close</Button>
      </Modal>}

    </div>
  );
}

export default ModalComponent;





