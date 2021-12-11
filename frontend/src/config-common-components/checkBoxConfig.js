import { Box, FormGroup, FormControlLabel, Checkbox, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import GridWidth from './common/grid-width';

function CheckBoxConfig(props){

    const {property, updatePropertyComponent} = props

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
        updatePropertyComponent({
            label: state.label,
            content: convertStringToArrayRowToElement(state.content),
            gridWidth: state.gridWidth
        })
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
            />
            <GridWidth
                gridWidth={state?.gridWidth}
                onGridWidthChange={(gridWidth) => {setState({...state, gridWidth: gridWidth})}}
            />
        </Box>
    )
}

export default CheckBoxConfig