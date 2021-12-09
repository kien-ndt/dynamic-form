import React, { useEffect, useState } from 'react';

import { Box, FormGroup, FormControlLabel, Checkbox, TextField } from '@mui/material';

function CheckBoxCustom(props){
    let {property} = props;

    const [state, setState] = useState()

    const defaultValue = {
        label: "label",
        content: ["Choice 1"]
    }

    useEffect(() => {
        let value = defaultValue;
        if (property){
            if (property.label){
                value.label = property.label
            }
            if (property.content && property.content.length > 0){
                value.content = property.content
            }
        }
        setState(value)
    }, [property])

    useEffect(() => {
        console.log(state + "asdasdsad")
    }, [state])

    return(
        <React.Fragment>            
            <Box>
                <label>{state?state.label:"label"}</label>
                <FormGroup>
                    {
                        state && state.content && state.content.length > 0 &&
                        state.content.map((item, index) => {
                            return <FormControlLabel 
                            key={"formcontroll" + index}
                            control={<Checkbox key={"checkbox" + index}/>} label={item} />
                        })
                    }
                    {/* <FormControlLabel disabled control={<Checkbox defaultChecked/>} label="Disabled" /> */}
                </FormGroup>
            </Box>
        </React.Fragment>
    )
}

export {CheckBoxCustom as CheckBox}