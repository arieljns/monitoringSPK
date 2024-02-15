import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function TextFieldHiddenLabel({ props, updateEventValue }) {

    const [number, setNumber] = useState()
    const [change, setChange] = useState("")

    function handleNumberChange(selectedNumber) {
        const numberChange = selectedNumber.target.value
        setNumber(numberChange)
        updateEventValue(numberChange)
    }

    function handleChange(changes) {
        const textChange = changes.target.value
        setChange(textChange)
        updateEventValue(textChange)
    }

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
                onChange={handleChange}
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