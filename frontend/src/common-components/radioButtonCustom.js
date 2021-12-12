import React, { useEffect, useState } from 'react';

import { Box, FormGroup, FormControlLabel, Radio } from '@mui/material';

function RadioButtonCustom(props){
    let {property, onChoseOneComponent} = props;

    const [state, setState] = useState()

    const defaultValue = {
        fontSize: "large",
        kolor: "black",
        label: "label",
        content: ["Choice 1"]
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

    useEffect(() => {
        console.log(state + "asdasdsad")
    }, [state])

    return(
        <React.Fragment>            
            <Box
                onClick={()=>onChoseOneComponent("radiobutton")}
            >
                <label style={{color:state?state.kolor:"black", fontSize:state?state.fontSize:"large"}}>{state?state.label:"label"}</label>
                <FormGroup style={{color:state?state.kolor:"black", fontSize:"xx-large"}}>
                    {
                        state && state.content && state.content.length > 0 &&
                        state.content.map((item, index) => {
                            return <FormControlLabel style={{color:state?state.kolor:"black", fontSize:state?state.fontSize:"xx-large"}}
                            key={"formcontroll" + index}
                            value={item}
                            control={<Radio  key={"checkbox" + index}/>} label={item} />
                        })
                    }
                    {/* <FormControlLabel disabled control={<Checkbox defaultChecked/>} label="Disabled" /> */}
                </FormGroup>
            </Box>
        </React.Fragment>
    )
}

export {RadioButtonCustom as RadioButton}