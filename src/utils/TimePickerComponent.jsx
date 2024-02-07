import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function BasicTimePicker({ updateEventValue }) {
    const handleTimeChange = (selectedTime) => {
        updateEventValue(selectedTime);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
                <TimePicker label="Pilih Jam Keluar/ Masuk"
                    onChange={handleTimeChange}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}