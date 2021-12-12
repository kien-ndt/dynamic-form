import React, { useEffect, useRef, useState } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {List, ListItem, ListItemButton, ListItemText, ListItemIcon, Fab } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SettingsIcon from '@mui/icons-material/Settings';
import { CheckBox } from "../../common-components/checkBoxCustom";
import { RadioButton } from "../../common-components/radioButtonCustom";
import { TextField } from "../../common-components/textFieldCustom";
import { DateTime } from "../../common-components/datetimeCustom";
import typeInput from "../create/typeInput";
import { useDrop } from "react-dnd"
import { SelectBox } from "../../common-components/selectBoxCustom";
import { TitleForm } from "../../common-components/titleFormCustom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { getAllForms, createForm } from "../../helper/formRequest";
function ViewForm(props){

    const {backCreateEdit} = props;

    const [tieude, settieude] = useState("")
    const [formProperty, setFormProperty] = useState({
        name: props.form?props.form.name:"Tên form",
        id: props.form?props.form.id:(new Date).toISOString()
    })
    const [formStruct, setFormStruct] = useState(
        props.formElement?props.formElement:[]
        // [     

        // {
        //     type: typeInput.SelectBox,
        //     property:{
        //         label: "ví dụ 1",
        //         gridWidth: 4
        //     }
        // },
        // {
        //     type: typeInput.TextField,
        //     property:{
        //         label: "ví dụ 2",
        //         content: ["lựa chọn 1", "lựa chọn 2 saklfjsklfsjf klsiougs kjweursdf"],
        //     }
        // },
    // ]
    )

    const [elementChose, setElementChose] = useState({
        index: null,
        type: "",
    })

    const componentPosition = useRef([]);            // Vị trí component cuối mouse di qua
    const componentDropPosition = useRef(null);             // Vị trí chuột thả component
    const componentArray = useRef([])
    const refFormStruct = useRef()
    const refUpdateComponent = (element, index) => {
        if (index === 0){
            componentArray.current = []
            componentPosition.current = []
        }
        if (element){
            componentArray.current.push(element)
            try{
                let domrect = element.getBoundingClientRect();
                componentPosition.current.push({
                    x: domrect.x,
                    y: domrect.y,
                    width: domrect.width,
                    height: domrect.height
                })
            }
            catch(e){
            }
        }        
    };
    const  refUpdatePositionComponent = (componentArr) => {
        componentPosition.current=[];
        if (componentArr && componentArr.length !==0){
            componentArr.map((item, index) => {
                try {                    
                    let domrect = item.getBoundingClientRect();
                    componentPosition.current.push({
                        x: domrect.x,
                        y: domrect.y,
                        width: domrect.width,
                        height: domrect.height
                    })
                } catch (error) {
                    
                }
            })
        }
    }

    const [{}, drop] = useDrop(() => ({
        accept: 'BOX',
        drop: (item) => {
            try{
                updateFormStructAfterMove(item.name, componentDropPosition.current, componentPosition.current)
            }
            catch(e){}
        },
        collect: (monitor) => ({
        })
    }))   



    const updateFormStructAfterMove = (type, dropPos, arrPos) => {
        let indexPos = arrPos?arrPos.length:0;
        if (arrPos && arrPos.length > 0){
            let minx=9999999, miny=999999999999;
            arrPos.map((item, index) => {
                let disx = Math.abs(dropPos.x - item.x - item.width/2);
                let disy = Math.abs(dropPos.y - item.y - item.height/2);
                let actx = dropPos.x - item.x - item.width/2;
                if (disx <= minx && disy <= miny){
                    if (actx < 0){
                        indexPos = index;
                    }
                    else {
                        indexPos = index+1;
                    }
                    minx = disx;
                    miny = disy;
                }
            })
        }
        let prevForm = refFormStruct.current.slice(0)
        if (!prevForm || prevForm.length === 0){
            prevForm = [{type: type}]
        }
        else{
            prevForm.splice(indexPos, 0, {
                type: type,
                property: {}
            })
        }
        setFormStruct(prevForm)
    }

    const updatePropertyComponent = (index, newProperty) => {
        let newFormStruct = [...formStruct];
        newFormStruct[index].property = newProperty;
        setFormStruct(newFormStruct);
    }

    const onChoseOneComponent = (index, type) => {
        console.log(index, "onChoseOneComponent")
        setElementChose({
            index: index,
            type: type
        })
    }

    const onSaveForm = () => {
        // console.log(formStruct)
        createForm({id: formProperty.id, name: formProperty.name, formElement: formStruct})
        // getAllForms().then((data) => console.log(JSON.stringify(data.data) + " askdfksdksdfkjsd"));
    }

    useEffect(() => {   
            //  getElementById("main-form")
        // document.addEventListener('mousemove', (e) => {
        //     componentDropPosition.current = {
        //         x: e.clientX,
        //         y: e.clientY
        //     }
        //     console.log(e.clientX, e.clientY)
        // });
        document.getElementById("main-form").addEventListener('dragover', (e) => {
            componentDropPosition.current = {
                x: e.clientX,
                y: e.clientY
            }
        });
        // document.getElementById("main-form").addEventListener('onScroll', (e) => {
        //     console.log("askdjajkdasjkd")
            
        // });
        // document.body.addEventListener('onscroll', (e) => {
        //     refUpdatePositionComponent(componentArray.current)
        // });      
    }, [])

    useEffect(() => {
        if (formStruct){
            refFormStruct.current = [...formStruct] 
            setTimeout(() => {                
                refUpdateComponent(componentArray.current)
            },100)           
        }
        console.log(formStruct)
    }, [formStruct])

    return(     
        
            <Paper 
                id="main-form"
                ref={drop}
                elevation={3}
                sx={{
                    width: "800px",
                    height: "fit-content",
                    // height: "200vh",
                    padding: "1cm",
                    boxSizing: "border-box",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
                >
                    
                <Grid container spacing={1} 
                // style={{border: "2px solid green"}}
                >
                {
                    formStruct && formStruct.length>0 &&
                    formStruct.map((item, index) => (                          
                        <Grid 
                            item xs={item?.property?.gridWidth?item.property.gridWidth:4} md={item?.property?.gridWidth?item.property.gridWidth:4} 
                            ref={(element) => refUpdateComponent(element, index)}   
                            sx={{zIndex: 2000000000}}  
                            // style={{
                            //     border: "1px solid blue",
                            //     boxSizing: "border-box"
                            // }}
                        >
                            {
                                item.type===typeInput.CheckBox &&
                                <CheckBox 
                                    property={item.property}
                                    onChoseOneComponent={(typeComponent)=>onChoseOneComponent(index, typeComponent)}
                                />
                            }
                            {
                                item.type===typeInput.RadioButton &&
                                <RadioButton
                                    property={item.property}
                                    onChoseOneComponent={(typeComponent)=>onChoseOneComponent(index, typeComponent)}
                                />
                            }
                            {
                                item.type===typeInput.TextField &&
                                <TextField
                                    property={item.property}
                                    onChoseOneComponent={(typeComponent)=>onChoseOneComponent(index, typeComponent)}
                                />
                            }
                            {
                                item.type===typeInput.Datetime &&
                                <DateTime
                                    property={item.property}
                                    onChoseOneComponent={(typeComponent)=>onChoseOneComponent(index, typeComponent)}
                                />
                            }
                            {
                                item.type===typeInput.SelectBox &&
                                <SelectBox
                                    property={item.property}
                                    onChoseOneComponent={(typeComponent)=>onChoseOneComponent(index, typeComponent)}
                                />
                            }
                            {
                                item.type===typeInput.TitleForm &&
                                <TitleForm
                                    property={item.property}
                                    onChoseOneComponent={(typeComponent)=>onChoseOneComponent(index, typeComponent)}
                                />
                            }

                        </Grid>                              
                    ))
                } 
                </Grid>

            </Paper>
    
    )
}

export default ViewForm
