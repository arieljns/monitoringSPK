import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import BasicTextFieldComponent from './BasicTextFieldComponent'
import { useState } from 'react';

export default function CheckboxLabels({ updateEventValue, props }) {

    const [form, setForm] = useState("")
    const [selectedOption, setSelectedOption] = useState(null);

    const satuanTarget = ['Rumah Tangga', 'Perusahaan ', 'Blok Sensus', 'satuan', <BasicTextFieldComponent/> ]
    const kehadiran = ['hadir', 'sakit', 'cuti']


    if (props === "kehadiran") {
        var freeVariable = kehadiran
    } else {
         freeVariable = satuanTarget
    }

    const handleCheckboxClick = (option) => {
        setSelectedOption(option);
        updateEventValue(option)
    };

    console.log(form)

    return (

        <FormGroup>
            {
                freeVariable.map((target, index) => (
                    <FormControlLabel
                        key={index}
                        control={<Checkbox disabled={selectedOption !== null && selectedOption !== target} />}
                        label={typeof target === 'string' ? target : null}
                        onClick={() => handleCheckboxClick(target)}
                    />
                ))
            }
        </FormGroup>
    );
}