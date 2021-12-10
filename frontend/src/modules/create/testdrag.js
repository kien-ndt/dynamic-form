import { useDrag } from "react-dnd";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import typeInput from "./typeInput";
import React, { useEffect, useRef, useState } from "react";

function TestDrag(props) {
    let {name} = props

    const [properties, setProperties] = useState()

    useEffect(() => {
        if (props){
            let icon;
            switch(name){
                case typeInput.CheckBox: 
                    icon = <CheckBoxIcon fontSize="large" color="primary"/> 
                    break;
                case typeInput.RadioButton: 
                    icon = <RadioButtonCheckedIcon fontSize="large" color="primary"/>
                    break;
            }
            setProperties({
                name: name,
                icon: icon
            })
        }
    }, [props])

    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
		// "type" is required. It is used by the "accept" specification of drop targets.
        type: 'BOX',
        item: {name: name},
            // The collect function utilizes a "monitor" instance (see the Overview for what this is)
            // to pull important pieces of state from the DnD system.
        collect: (monitor) => ({
        isDragging: monitor.isDragging()
        })
    }))
        
    return (
        <div ref={drag} style={{cursor: "pointer"}}>
            {properties?.icon}
        </div>
        // <div style={{width: "15px", height:"15px", backgroundColor:"red", cursor: "pointer"}} ref={drag}>

        // </div>
    );
}

export default TestDrag;
