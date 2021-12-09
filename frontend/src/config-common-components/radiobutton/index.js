import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

function RadioButtonConfig(props){

    const {updatePropertyComponent} = props

    const [state, setState] = useState({
        label: "",
        content: []
    });
    
    useEffect(() => {
        setState(state)
    }, [props])

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
            content: convertStringToArrayRowToElement(state.content)
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
                id="radiobutton-label" 
                label="Label" 
                variant="standard" 
                style={{marginBottom: "20px", width: "inherit"}} 
                InputLabelProps={{ shrink: true }}
                value={state?.label}
                onChange={(e) => onLabelChange(e)}
            />
            <TextField 
                id="radiobutton-content" 
                label="Content (each choice in 1 row)" 
                variant="standard" 
                multiline rows={4} 
                InputLabelProps={{ shrink: true }}
                value={state.content}
                onChange={(e) => onContentChange(e)}
            />
            <TextField 
                id="radiobutton-content-11" 
                label="Content (each choice in 1 row)" 
                variant="standard" 
                multiline rows={4} 
                InputLabelProps={{ shrink: true }}
                value={state.content}
                onChange={(e) => onContentChange(e)}
            />

        </Box>
    )
}

export default RadioButtonConfig