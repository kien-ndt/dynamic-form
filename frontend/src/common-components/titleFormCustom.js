import React, { useEffect, useState } from 'react';

import { Box} from '@mui/material';
import TitleFormConfig from '../config-common-components/titleFormConfig';
import { fontSize } from '@mui/system';
function TitleFormCustom(props){
    let {property, onChoseOneComponent} = props;

    const [state, setState] = useState()


    const defaultValue = {
        kolor: "black",
        label: "label checkbox",
        content: ["Choice 1"],
        fontSize: "large"
    }
    
    const defaultColor = {
        kolor: "black"
    }

    useEffect(() => {
        
        let value = defaultValue;
        if (property){
            if (property.label){
                value.label = property.label
            }
            if (property.kolor){
                value.kolor = property.kolor
            }
            if (property.fontSize){
                value.fontSize = property.fontSize
            }
            if (property.content && property.content.length > 0){
                value.content = property.content
            }
        }
    
        setState(value)
        console.log(property)
        
    }, [property] )

    return(
        <React.Fragment>            
            <Box
                onClick={()=>onChoseOneComponent("titleform")}
            >
                <p style={{fontSize:state.fontSize?state.fontSize:"large", color:state.color?state.color:"black", wordBreak: "break-all"}}>
                {state?state.label:"abc"}
            
                </p>
                
            </Box>
        </React.Fragment>
    )
}

export {TitleFormCustom as TitleForm}