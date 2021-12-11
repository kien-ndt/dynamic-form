import { Box, FormGroup, FormControlLabel, Checkbox, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import GridWidth from './common/grid-width';
import * as React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CheckBox } from '../common-components/checkBoxCustom';

function CheckBoxConfig(props){
    const defaultColor = {
        kolor: "black"
    }

    const {property, updatePropertyComponent} = props

    const [kolor, setColor] = useState({
        kolor: property?property.kolor:defaultColor.kolor,
    });

    const handleChange = (event) => {
        setColor(event.target.value);
    };

    
    const defaultValue = {
        label: "label checkbox",
        content: ["Choice 1"]
    }
    
    const convertArrayToStringElementToRow = (arr) => {
        let strRes = ""
        if (arr && arr.length > 0){
            arr.forEach(element => {
                strRes += '\n'
                strRes += element;
            });
        }
        if (strRes.length > 0){
            strRes = strRes.slice(1)
        }
        return strRes;
    }

    const [state, setState] = useState({
        label: property?property.label:defaultValue.label,
        content: property?convertArrayToStringElementToRow(property.content):convertArrayToStringElementToRow(defaultValue.content),
        gridWidth: property?property.gridWidth:4
    });


    
    const onLabelChange = (e) => {
        
        let value = e?.target?.value;
        setState({
            ...state,
            label: value
        })
    }

    const onColorChange = (e) => {
        
        let value = e?.target?.value;
        setColor({
            ...kolor,
            kolor: value
        })

    }

    const onContentChange = (e) => {
        let value = e?.target?.value;
        setState({
            ...state,
            content: value
        })
    }


    const convertStringToArrayRowToElement = (strRes) => {
        console.log(strRes)
        let arr = []        
        if (strRes && strRes.length > 0){
            arr = strRes.split("\n");
        }
        if (arr && arr.length > 0){
            arr = arr.filter(r => r != '');
        }
        return arr;
    }


    useEffect(() => {
        console.log("da update mau")
        updatePropertyComponent({
            label: state.label,
            content: convertStringToArrayRowToElement(state.content),
            gridWidth: state.gridWidth
        })
    }, [state])
    useEffect(() => {
        
        updatePropertyComponent({
            kolor: state.kolor,
            
        })
    }, [kolor])


    return(
        <Box>
            <TextField 
                id="checkbox-label" 
                label="Label" 
                variant="standard" 
                style={{marginBottom: "20px", width: "inherit"}} 
                InputLabelProps={{ shrink: true }}
                value={state?.label}
                onChange={(e) => onLabelChange(e)}
            />
            <TextField 
                id="checkbox-content" 
                label="Content (each choice in 1 row)" 
                variant="standard" 
                multiline rows={4} 
                InputLabelProps={{ shrink: true }}
                value={state.content}
                onChange={(e) => onContentChange(e)}
            />
            
                
            

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Color</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={kolor}
                label="Color"
                onChange={handleChange}
                onChange={(e) => onColorChange(e)}
                >
                <MenuItem value={"black"}>Black</MenuItem>
                <MenuItem value={"red"}>Red</MenuItem>
                <MenuItem value={"yellow"}>Yellow</MenuItem>
                <MenuItem value={"blue"}>Blue</MenuItem>
                <MenuItem value={"green"}>Green</MenuItem>
                <MenuItem value={"purple"}>Purple</MenuItem>
                </Select>
            </FormControl>
            <GridWidth
                gridWidth={state?.gridWidth}
                onGridWidthChange={(gridWidth) => {setState({...state, gridWidth: gridWidth})}}
            />
            <input type="checkbox" id="myCheck" onclick="myFunction()"></input>  Check is compulsory
        </Box>
        
    )
}

export default CheckBoxConfig