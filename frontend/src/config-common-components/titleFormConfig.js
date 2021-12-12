import { Box, Checkbox, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { CheckBox } from '../common-components/checkBoxCustom';
import GridWidth from './common/grid-width';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function TitleFormConfig(props){

    const {property, updatePropertyComponent} = props

    const defaultValue = {
        label: "label",
        kolor: "black"
    }




    const [state, setState] = useState({
        fontSize: property?property.fontSize:defaultValue.fontSize,
        kolor: property?property.kolor:defaultValue.kolor,
        label: property?property.label:defaultValue.label,
        
        gridWidth: property?property.gridWidth:4
    });
    
    const onLabelChange = (e) => {
        let value = e?.target?.value;
        setState({
            ...state,
            label: value
        });
    }

    useEffect(() => {
        console.log(state.kolor)
        updatePropertyComponent({
            fontSize: state.fontSize,
            kolor: state.kolor,
            label: state.label,
            gridWidth: state.gridWidth
        })
        console.log(property)
    }, [state])

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

    return(
        <Box
            sx={{
                display: "flex",
                flexDirection:"column"
            }}
        >
            <TextField 
                id="checkbox-label" 
                label="Label" 
                variant="standard" 
                style={{marginBottom: "20px", width: "inherit"}} 
                InputLabelProps={{ shrink: true }}
                value={state?.label}
                onChange={(e) => onLabelChange(e)}
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
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">FontSize</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.fontSize}
                fontSize="large"
                onChange={fontSizeChange}
                >
                <MenuItem value={"xx-large"}>XX-LARGE</MenuItem>
                <MenuItem value={"large"}>LARGE</MenuItem>
                <MenuItem value={"medium"}>YELLOW</MenuItem>
                <MenuItem value={"small"}>SMALL</MenuItem>
                </Select>
            </FormControl>
            <GridWidth
                gridWidth={state?.gridWidth}
                onGridWidthChange={(gridWidth) => {setState({...state, gridWidth: gridWidth})}}
            />
            <Checkbox></Checkbox>
            <input type="checkbox" id="myCheck" onclick="myFunction()"></input>  Check is compulsory
        </Box>
        
    )
}

export default TitleFormConfig