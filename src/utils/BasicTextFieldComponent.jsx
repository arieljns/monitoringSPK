import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function TextFieldHiddenLabel({ props, updateEventValue }) {

    const [number, setNumber] = useState(0)


    function handleNumberChange(selectedNumber) {
        setNumber(selectedNumber)

    }
    updateEventValue(number)
    return (
        <Stack
            component="form"
            sx={{
                width: '25ch',
            }}
            spacing={2}
            noValidate
            autoComplete="off"
        >
            {props === "text" ? <TextField
                hiddenLabel
                id="filled-hidden-label-normal"
                variant="outlined"
                type='text'
                onChange={handleNumberChange}
                multiline
            />
                : <TextField
                    hiddenLabel
                    id="filled-hidden-label-normal"
                    variant="outlined"
                    type="number"
                    onChange={handleNumberChange}
                />
            }

        </Stack>
    );
}