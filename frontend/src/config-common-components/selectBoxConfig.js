import { Box, Checkbox, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import GridWidth from './common/grid-width';

import { Button } from '@mui/material';
function SelectBoxConfig(props){

    const {property, updatePropertyComponent, onDeleteComponent} = props

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
        label: property?property.label:"label",
        content: property?convertArrayToStringElementToRow(property.content):"choice 1",
        gridWidth: property?property.gridWidth:4,
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
        <Box
            sx={{
                display: "flex",
                flexDirection:"column"
            }}
        >
            <TextField 
                id="selectbox-label" 
                label="Label" 
                
                variant="standard" 
                
                InputLabelProps={{ shrink: true }}
                value={state?(state.label?state.label:""):""}
                onChange={(e) => onLabelChange(e)}
            />      
            <TextField 
                id="selectbox-content" 
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
            <input type="checkbox" id="myCheck" onclick="myFunction()"></input>  Check is compulsory
            
            <Button onClick={onDeleteComponent}>Delete</Button>
        </Box>
    )
}

export default SelectBoxConfig