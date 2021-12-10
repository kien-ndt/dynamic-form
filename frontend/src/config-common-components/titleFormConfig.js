import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import GridWidth from './common/grid-width';

function TitleFormConfig(props){

    const {property, updatePropertyComponent} = props

    const [state, setState] = useState({
        
        gridWidth: property.gridWidth
    });
    
    const onLabelChange = (e) => {
        let value = e?.target?.value;
        setState({
            ...state,
            
        })
    }

    useEffect(() => {
        updatePropertyComponent({
        
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
                
                variant="standard" 
                style={{marginBottom: "20px", width: "inherit"}} 
                InputLabelProps={{ shrink: true }}
                onChange={(e) => onLabelChange(e)}
            />            
            <GridWidth
                gridWidth={state?.gridWidth}
                onGridWidthChange={(gridWidth) => {setState({...state, gridWidth: gridWidth})}}
            />

        </Box>
    )
}

export default TitleFormConfig