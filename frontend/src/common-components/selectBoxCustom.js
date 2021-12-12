import React, { useEffect, useState } from 'react';

import { Box, FormGroup, FormControlLabel, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

function SelectBoxCustom(props){
    let {property, onChoseOneComponent} = props;

    const [state, setState] = useState()

    const defaultValue = {
        kolor: "black",
        label: "Label",
        content: ["Choice 1"],
        fontSize: "large"
    }

    useEffect(() => {
        let value = defaultValue;
        if (property){
            if (property.label){
                value.label = property.label
            }
            if (property.kolor){
                value.kolor = property.kolor
            }
            if (property.fontSize){
                value.fontSize = property.fontSize
            }
            if (property.content && property.content.length > 0){
                value.content = property.content
            }
        }
        setState(value)
    }, [property])

    return(
        <React.Fragment>   
                     
            <Box sx={{ minWidth: 10 }} onClick={()=>onChoseOneComponent("selectbox")}>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native" style={{color:state?state.kolor:"black", fontSize:state?state.fontSize:"large"}}>
                {state?.label}
                </InputLabel>
                <NativeSelect
                
                style={{color:state?state.kolor:"black", fontSize:state?state.fontSize:"large"}}
                defaultValue={1}
                
                inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                }}
                >
                    {
                        state && state.content && state.content.length > 0 &&
                        state.content.map((item, index) => (
                            <option value={index}>{item}</option>
                        ))
                    }
                </NativeSelect>
            </FormControl>
            </Box>
        </React.Fragment>
    )
}

export {SelectBoxCustom as SelectBox}