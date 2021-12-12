import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { CheckBox } from '../common-components/checkBoxCustom';
import GridWidth from './common/grid-width';

import { Button } from '@mui/material';
function TextFieldConfig(props){

    const {property, updatePropertyComponent, onDeleteComponent} = props

    const defaultValue = {
        label: "label",
    }

    
    const [state, setState] = useState({
        label: property?property.label:defaultValue.label,
        gridWidth: property?property.gridWidth:4
    });
    
    const onLabelChange = (e) => {
        let value = e?.target?.value;
        setState({
            ...state,
            label: value
        })
    }

    useEffect(() => {
        updatePropertyComponent({
            label: state.label,
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
                id="textfield-label" 
                label="Label" 
                variant="standard" 
                style={{marginBottom: "20px", width: "inherit"}} 
                InputLabelProps={{ shrink: true }}
                value={state?(state.label?state.label:""):""}
                onChange={(e) => onLabelChange(e)}
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

export default TextFieldConfig