import React, { useEffect, useState } from 'react';

import { Box, FormGroup, FormControlLabel, TextField, Datet } from '@mui/material';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

function DateTimeCustom(props){
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
            <Box
                onClick={()=>onChoseOneComponent("datetime")}
            >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} label="kajsfhjksf" resize={{fontSize: "50px"}}/>}
                    // label="DateTimePicker"
                    
                    InputLabelProps={{ shrink: true }}
                    // value={value}
                    // onChange={(newValue) => {
                    // setValue(newValue);
                    // }}
                />
                </LocalizationProvider>
            </Box>
        </React.Fragment>
    )
}

export {DateTimeCustom as DateTime}