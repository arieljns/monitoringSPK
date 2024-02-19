import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Stack } from '@mui/material';


export default function BasicDatePicker({ updateEventValue }) {



  function handleDateChange(selectedDate) {
    const formattedDate = dayjs(selectedDate).format('DD-MM-YYYY');
    updateEventValue(formattedDate);
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <Stack sx={{ maxWidth: 250 }} >
          <DatePicker label="Pilih Tanggal" onChange={handleDateChange} />
        </Stack>
      </DemoContainer>
    </LocalizationProvider>

  );
}
