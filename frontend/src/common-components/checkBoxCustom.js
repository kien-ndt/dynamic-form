import React, { useEffect, useState } from 'react';

import { Box, FormGroup, FormControlLabel, Checkbox, TextField } from '@mui/material';

function CheckBoxCustom(props){
    let {property, onChoseOneComponent} = props;

    const [state, setState] = useState()

    const [kolor, setColor] = useState()

    const defaultValue = {
        label: "label checkbox",
        content: ["Choice 1"]
    }
    
    const defaultColor = {
        kolor: "black"
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
        console.log("da doi mau")
        setState(value)
    }, [property])

    useEffect(() => {
        
        let value = defaultColor;
        if (property){
            if (property.kolor){
                value.kolor = property.kolor
            }
            if (property.content && property.content.length > 0){
                value.content = property.content
            }
        }
        setColor(value)
    }, [property])

    useEffect(() => {
    }, [state])

    return(
        <React.Fragment>            
            <Box
                onClick={() => onChoseOneComponent("checkbox")}
            >
                <label style={{color:kolor?kolor:defaultColor.kolor}}>{state?state.label:"label"}</label>
                <FormGroup style={{display: "flex", flexDirection:"row"}}>
                    {
                        state && state.content && state.content.length > 0 &&
                        state.content.map((item, index) => {
                            return <FormControlLabel style={{color:kolor?kolor:defaultColor.kolor}}
                            key={"formcontroll" + index}                            
                            value={item}
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