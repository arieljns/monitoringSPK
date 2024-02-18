import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { namaPjk, namaKaryawan } from "../data/employeeName"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 280,
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        },
    },
};



function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function TextFieldComponent({ updateEventValue, props, }) {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState("");

    const handleChange = (event) => {
        setPersonName(event.target.value);
        updateEventValue(event.target.value);
    };
    

    var freeVar = null;

    if (props === "karyawan") {
        freeVar = namaKaryawan;
    } else {
        freeVar = namaPjk;
    }

    return (
        <div>
            <FormControl sx={{ width: 250 }}>
                <InputLabel>Name</InputLabel>
                <Select
                    single
                    input={<OutlinedInput label="Name" />}
                    onChange={handleChange}
                >
                    {freeVar.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

