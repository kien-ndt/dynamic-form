import { Box, FormGroup, FormControlLabel, Checkbox, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import GridWidth from './common/grid-width';
import * as React from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CheckBox } from '../common-components/checkBoxCustom';

import { Button } from '@mui/material';

function CheckBoxConfig(props){
    const defaultColor = {
        kolor: "black"
    }

    const {property, updatePropertyComponent, onDeleteComponent} = props


    
    
    const defaultValue = {
        fontSize: "large",
        kolor: "black",
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
        fontSize: property?property.fontSize:defaultValue.fontSize,
        kolor: property?property.kolor:defaultColor.kolor,
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
        console.log("DA set Label")
    }

    const handleChange = (event) => {
        let value = event?.target?.value;
        setState({
            ...state,
            kolor:value
        })
        console.log(value)
    };
    const fontSizeChange= (event) => {
        let value = event?.target?.value;
        setState({
            ...state,
            fontSize:value
        })
        console.log(value)
    };



    

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
        console.log(state.kolor)
        updatePropertyComponent({
            fontSize: state.fontSize,
            kolor: state.kolor,
            label: state.label,
            content: convertStringToArrayRowToElement(state.content),
            gridWidth: state.gridWidth
        })
        console.log(property)
    }, [state])


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
                onCanPlay={handleChange}
            />
            
                
            

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Color</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.kolor}
                label="Color"
                onChange={handleChange}
                >
                <MenuItem value={"black"}>Black</MenuItem>
                <MenuItem value={"red"}>Red</MenuItem>
                <MenuItem value={"yellow"}>Yellow</MenuItem>
                <MenuItem value={"blue"}>Blue</MenuItem>
                <MenuItem value={"green"}>Green</MenuItem>
                <MenuItem value={"purple"}>Purple</MenuItem>
                </Select>
                
            </FormControl>
            <div style={{marginBottom: "20px", width: "inherit"}}></div>
            <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">FontSize</InputLabel>
                <Select
                style={{marginBottom: "20px", width: "inherit"}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.fontSize}
                fontSize="large"
                onChange={fontSizeChange}
                >
                <MenuItem value={"xx-large"}>XX-LARGE</MenuItem>
                <MenuItem value={"large"}>LARGE</MenuItem>
                <MenuItem value={"medium"}>MEDIUM</MenuItem>
                <MenuItem value={"small"}>SMALL</MenuItem>
                </Select>
            </FormControl>
            <GridWidth
                gridWidth={state?.gridWidth}
                onGridWidthChange={(gridWidth) => {setState({...state, gridWidth: gridWidth})}}
            />
            <input type="checkbox" id="myCheck" onclick="myFunction()"></input>  Check is compulsory

            <Button onClick={onDeleteComponent}>Delete</Button>
        </Box>
        
    )
}

export default CheckBoxConfig