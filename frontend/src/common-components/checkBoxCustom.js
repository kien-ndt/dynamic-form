import React, { useEffect, useState } from 'react';

import { Box, FormGroup, FormControlLabel, Checkbox, TextField } from '@mui/material';

function CheckBoxCustom(props){
    let {property, onChoseOneComponent} = props;

    const [state, setState] = useState()


    const defaultValue = {
        kolor: "black",
        label: "label checkbox",
        content: ["Choice 1"],
        fontSize: "large"
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
        console.log(property)
        
    }, [property] )



    return(
        <React.Fragment>            
            <Box
                onClick={() => onChoseOneComponent("checkbox")}
            >
                <label style={{color:state?state.kolor:"black", fontSize:state?state.fontSize:"xx-large"}}>{state?state.label:"label"}</label>
                <FormGroup style={{display: "flex", flexDirection:"column"}}>
                    {
                        state && state.content && state.content.length > 0 &&
                        state.content.map((item, index) => {
                            return <FormControlLabel style={{color:state?state.kolor:"black"}}
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