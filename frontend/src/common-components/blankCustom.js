import React, { useEffect, useState } from 'react';

import { Box} from '@mui/material';
import TitleFormConfig from '../config-common-components/titleFormConfig';
function BlankCustom(props){
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
            onClick={()=>onChoseOneComponent("textfield")}          
            <Box
                
            >
                <p>
                {state?state.label:"abc"}
            
                </p>
                
            </Box>
        </React.Fragment>
    )
}

export {BlankCustom as Blank}