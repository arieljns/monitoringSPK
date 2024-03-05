import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import BasicTextFieldComponent from './BasicTextFieldComponent'
import { useState, useCallback } from 'react';


export default function CheckboxLabels({ updateEventValue, props }) {

    const [selectedOption, setSelectedOption] = useState(null);
    const [click, setClick] = useState(false)

    const satuanTarget = ['Rumah Tangga', 'Perusahaan ', 'Blok Sensus', 'Sls', <BasicTextFieldComponent props="text" />]
    const kehadiran = ['hadir', 'cuti']
    const kegiatan = ['ya', 'tidak']
    const jenisKegiatan = ['Tahunan', 'Semesteran', 'Triwulanan', 'Bulanan', 'ad Hoc', <BasicTextFieldComponent props="text" />]


    if (props === "kehadiran") {
        var freeVariable = kehadiran
    } else if (props === 'satuanTarget') {
        freeVariable = satuanTarget
    } else if (props === "jenisKegiatan") {
        freeVariable = jenisKegiatan
    } else {
        freeVariable = kegiatan
    }

    const handleCheckboxClick = useCallback((option) => {
        if (option.type === BasicTextFieldComponent) {
            console.log("This is a BasicTextFieldComponent");
        }
        setClick((prevClick) => !prevClick);
        setSelectedOption((prevOption) => {
            const newOption = option === prevOption ? null : option;
            newOption && updateEventValue(newOption);
            return newOption;
        });
    }, [updateEventValue]);


    const renderLabel = (target) => {
        if (React.isValidElement(target) && target.type === BasicTextFieldComponent) {
            return React.cloneElement(target, { updateEventValue });
        }
        return target;
    }

    return (

        <FormGroup>
            {
                freeVariable.map((target, index) => (
                    <FormControlLabel
                        key={index}
                        control={<Checkbox
                            onClick={() => handleCheckboxClick(target)}
                            disabled={click && selectedOption !== target}
                        />}
                        label={renderLabel(target)}

                    />
                ))
            }
        </FormGroup>
    );
}