import * as React from 'react';
import dayjs from 'dayjs'; 
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { Stack } from '@mui/material';

export default function BasicTimePicker({ updateEventValue }) {
  const handleTimeChange = (selectedTime) => {
    const formattedTime = dayjs(selectedTime).format('HH:mm');
    updateEventValue(formattedTime);
  };

  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <Stack sx={{ maxWidth: 250 }} >
          <MobileTimePicker
            label="Pilih Jam Keluar/ Masuk"
            onChange={handleTimeChange}
          />
        </Stack>
      </DemoContainer>
    </LocalizationProvider>

  );
}
