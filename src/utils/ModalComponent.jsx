import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';



const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, handleReset } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  function handleClick(){
    handleReset()
  }

  return (
    <div className='modal-container'>
      <Dialog onClose={handleClose} open={open}>
        <img src='teamwork02_221005.svg' alt='teamwork' width={128} height={168} />
        <Typography variant='h4' sx={{ fontWeight: "bold", color: "#1976D2" }}>Terima Kasih Atas Responnya </Typography>
        <Button onClick={handleClick} >OK</Button>
      </Dialog>
    </div>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  handleReset:PropTypes.func.isRequired,
};

export default function SimpleDialogDemo({handleReset, isModalOpen, setIsModalOpen}) {
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  
  const handleClickOpen = () => {
    setIsModalOpen(true);
    handleReset()
  };

  const handleClose = (value) => {
    setIsModalOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        Respon Sudah Selesai
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Unggah & Kirim
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={isModalOpen}
        onClose={handleClose}
        handleReset={handleReset}
      />
    </div>
  );
}
