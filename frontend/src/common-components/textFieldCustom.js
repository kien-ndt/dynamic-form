import React, { useEffect, useState } from 'react';

import { Box, FormGroup, FormControlLabel, TextField } from '@mui/material';

function TextFieldCustom(props){
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
                onClick={()=>onChoseOneComponent("textfield")}
            >
                <TextField 
                    id="textfield-label" 
                    label={state?state.label:""}
                    variant="standard" 
                    InputLabelProps={{ shrink: true }}
                    // value={state?(state.label?state.label:""):""}
                    // onChange={(e) => onLabelChange(e)}
                />
            </Box>
        </React.Fragment>
    )
}

export {TextFieldCustom as TextField}