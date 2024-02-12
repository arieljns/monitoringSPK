import * as React from 'react';
import dayjs from 'dayjs'; // Import dayjs
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function BasicTimePicker({ updateEventValue }) {
  const handleTimeChange = (selectedTime) => {
    const formattedTime = dayjs(selectedTime).format('HH:mm');
    updateEventValue(formattedTime);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker
          label="Pilih Jam Keluar/ Masuk"
          onChange={handleTimeChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
