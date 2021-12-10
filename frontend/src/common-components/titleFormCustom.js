import React, { useEffect, useState } from 'react';

import { Box, FormGroup, FormControlLabel, TextField } from '@mui/material';

function TitleFormCustom(props){
    let {property, onChoseOneComponent} = props;

    const [state, setState] = useState()

    const defaultValue = {
        
    }

    

    return(
        <React.Fragment>            
            <Box
                onClick={()=>onChoseOneComponent("titleform")}
            >
                <TextField 
                    id="titleform-label" 
                    variant="standard" 
                    InputLabelProps={{ shrink: true }}
                    // value={state?(state.label?state.label:""):""}
                    // onChange={(e) => onLabelChange(e)}
                />
            </Box>
        </React.Fragment>
    )
}

export {TitleFormCustom as TitleForm}