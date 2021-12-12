import { Box, Checkbox, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import GridWidth from './common/grid-width';

import { Button } from '@mui/material';
function BlankConfig(props){

    const {property, updatePropertyComponent, onDeleteComponent} = props

    const defaultValue = {
        label: "",
    }

    const [isCompulsory, setCompulsory] = useState(false);



    
    const [state, setState] = useState({
        
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
            
            </p>         

            <div>
                <Checkbox>abc</Checkbox>
            </div>
            <GridWidth
                gridWidth={state?.gridWidth}
                onGridWidthChange={(gridWidth) => {setState({...state, gridWidth: gridWidth})}}
            />

            <Button onClick={onDeleteComponent}>Delete</Button>
        </Box>
    )
}

export default BlankConfig