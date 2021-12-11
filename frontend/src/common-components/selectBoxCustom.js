import React, { useEffect, useState } from 'react';

import { Box, FormGroup, FormControlLabel, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

function SelectBoxCustom(props){
    let {property, onChoseOneComponent} = props;

    const [state, setState] = useState()

    const defaultValue = {
        label: "label",
    }

    useEffect(() => {
        let value = defaultValue;
        if (property){
            if (property.label){
                value.label = property.label
            }
        }
        setState(value)
    }, [property])

    return(
        <React.Fragment>   
                     
            <Box sx={{ minWidth: 10 }}>
            {()=>onChoseOneComponent("textfield")}
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Age
                </InputLabel>
                <NativeSelect
                inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                }}
                >
                <option value={10}>Ten</option>
                
                </NativeSelect>
            </FormControl>
            </Box>
        </React.Fragment>
    )
}

export {SelectBoxCustom as SelectBox}