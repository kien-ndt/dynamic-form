import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import GridWidth from './common/grid-width';


function TitleFormConfig(props){

    const {property, updatePropertyComponent} = props

    const defaultValue = {
        label: "label",
    }

    
    const [state, setState] = useState({
        label: property?property.label:defaultValue.label,
        gridWidth: property?property.gridWidth:4
    });

    const [labelform, setLabelform] = useState(
        {labelform: "label form"}
    )
    
    const onLabelChange = (e) => {
        let value = e?.target?.value;
        setState({
            ...state,
            label: value
        });
        setLabelform({
            ...labelform,
            labelform: value})
        console.log("Da set label form")
    }

    useEffect(() => {
        updatePropertyComponent({
            label: state.label,
            gridWidth: state.gridWidth,
            labelform: labelform.labelform
        })
    }, [state])


    return(
        <Box
            sx={{
                display: "flex",
                flexDirection:"column"
            }}
        >
            <p>{labelform}
            onChange={(e) => onLabelChange(e)}
            </p>         
            <GridWidth
                gridWidth={state?.gridWidth}
                onGridWidthChange={(gridWidth) => {setState({...state, gridWidth: gridWidth})}}
            />

        </Box>
    )
}

export default TitleFormConfig