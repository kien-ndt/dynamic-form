import React, { useEffect, useState } from 'react';

import { Box} from '@mui/material';
import TitleFormConfig from '../config-common-components/titleFormConfig';
function TitleFormCustom(props){
    let {property, onChoseOneComponent} = props;

    const [state, setState] = useState()
    const [labelform, setLabelform] = useState()

    const defaultValue = {
        label: "label",
    }

    useEffect(() => {
        
        let value = defaultValue;
        if (property){
            if (property.label){
                value.label = property.label
            }
        }
        setState(value);
        setLabelform({
            ...labelform,
            labelform: value})
    
            
        }, [property])

    return(
        <React.Fragment>            
            <Box
                onClick={()=>onChoseOneComponent("textfield")}
            >
                <p style={{wordBreak: "break-all"}}>
                {state?state.label:"abc"}
            
                </p>
                
            </Box>
        </React.Fragment>
    )
}

export {TitleFormCustom as TitleForm}