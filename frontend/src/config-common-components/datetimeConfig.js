import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import GridWidth from './common/grid-width';

function DatetimeConfig(props){

    const {property, updatePropertyComponent} = props

    const [state, setState] = useState({
        label: property.label,
        gridWidth: property.gridWidth
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
                id="datetime-label" 
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

        </Box>
    )
}

export default DatetimeConfig