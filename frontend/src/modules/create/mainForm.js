import React, { useEffect, useRef, useState } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {List, ListItem, ListItemButton, ListItemText, ListItemIcon, Fab } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SettingsIcon from '@mui/icons-material/Settings';
import { CheckBox } from "../../common-components/checkBoxCustom";
import CheckBoxConfig from "../../config-common-components/checkBoxConfig"
import RadioButtonConfig from "../../config-common-components/radioButtonConfig";
import TextFieldConfig from "../../config-common-components/textFieldConfig";
import { RadioButton } from "../../common-components/radioButtonCustom";
import { TextField } from "../../common-components/textFieldCustom";
import { DateTime } from "../../common-components/datetimeCustom";
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import TestDrag from "./testdrag";
import typeInput from "./typeInput";
import { useDrop } from "react-dnd"
import DatetimeConfig from "../../config-common-components/datetimeConfig";
import SelectBoxConfig from "../../config-common-components/selectBoxConfig";
import { SelectBox } from "../../common-components/selectBoxCustom";
import TitleFormConfig from "../../config-common-components/titleFormConfig";
import { TitleForm } from "../../common-components/titleFormCustom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { TextField as TextFieldTemplate } from "@mui/material";

import Dialog from '@mui/material/Dialog';
import { DialogTitle } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import { getAllForms, createForm } from "../../helper/formRequest";
function MainForm(props){

    const {backCreateEdit} = props;

    const [tieude, settieude] = useState("")
    const [formProperty, setFormProperty] = useState({
        name: props.form?props.form.name:"Tên form",
        id: props.form?props.form.id:(new Date).toISOString(),
        width: 500
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

    const [dialogConfigStatus, setDialogConfigStatus] = useState(false)

    return(
        <Box 
            sx={{
                height: "100vh"
            }}
            style={{
                width: "100vw"
            }}
        >

        <Dialog
            open={dialogConfigStatus}
        >
            <DialogTitle>Configure form</DialogTitle>
            <Grid
                container
                style={{
                    padding: "10px"
                }}
                spacing={2}
            >   
                <Grid item xs={8}>
                    <TextFieldTemplate id="form-name" label="Name" variant="outlined" style={{width:"100%"}}
                        value={formProperty?.name}
                        onChange={(e) => {let value = e.target.value; setFormProperty({...formProperty, name: value?value:""})}}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextFieldTemplate id="outlined-basic" label="Width (px)" variant="outlined"
                        type={"number"}
                        value={formProperty?.width}
                        onChange={(e) => {let value = e.target.value; setFormProperty({...formProperty, width: value?value:""})}}
                    />
                </Grid>
            </Grid>            
            <DialogActions>
                <Button onClick={()=>setDialogConfigStatus(false)}>Close</Button>
            </DialogActions>
        </Dialog>


        <Paper style={{height: "3em", display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: "1em", paddingRight: "1em"}}>
            <div style={{display: "flex", alignItems: "center"}}>
                {backCreateEdit &&
                <KeyboardBackspaceIcon onClick={backCreateEdit}/>
                }
            </div>
            <div>{formProperty?.name}</div>
            <div>
                <Fab size="small" color="primary" aria-label="add" style={{marginLeft: "5px", marginRight: "5px"}}>
                    <VisibilityIcon />
                </Fab>
                <Fab size="small" color="success" aria-label="add" style={{marginLeft: "5px", marginRight: "5px"}}>
                    <SettingsIcon onClick={()=>setDialogConfigStatus(true)}/>
                </Fab>
                <Fab size="small" color="secondary" aria-label="add" style={{marginLeft: "5px", marginRight: "5px"}} 
                        onClick={onSaveForm}>
                    <DoneAllIcon />
                </Fab>
            </div>
        </Paper>
        
        <Box
            sx={{
                width: "100vw",
                height: "calc(100vh - 3em);",
                display: 'flex'
            }}>  

            {/* Box lấy các thành phần */}
            <Box                
                sx={{                    
                    height: "100%"                
                }}
            >
                <List>                    
                    <ListItem disablePadding>                        
                        <TestDrag 
                            name={typeInput.CheckBox}
                        />
                    </ListItem>         
                    <ListItem disablePadding>                        
                        <TestDrag 
                            name={typeInput.RadioButton}
                        />
                    </ListItem>       
                    <ListItem disablePadding>                        
                        <TestDrag 
                            name={typeInput.TextField}
                        />
                    </ListItem>       
                    <ListItem disablePadding>                        
                        <TestDrag 
                            name={typeInput.Datetime}
                        />
                    </ListItem>     
                    <ListItem disablePadding>                        
                        <TestDrag 
                            name={typeInput.SelectBox}
                        />
                    </ListItem>  
                    <ListItem disablePadding>                        
                        <TestDrag 
                            name={typeInput.TitleForm}
                        />
                    </ListItem>          
                </List>               
            </Box>

            {/* Box giao diện edit */}
            <Box
                sx={{
                height: "100%",
                overflow: "scroll",
                display: 'block',
                backgroundColor: 'primary.main',
                border: "3px solid black",
                boxSizing: "border-box",
                position: "relative",
                // '&:hover': {
                //     backgroundColor: 'primary.main',
                //     opacity: [0.9, 0.8, 0.7],
                // },
                }}
                style={{
                    backgroundColor: "gray",
                    width: "100%",
                    overflow: "scroll",
                }}
                onScroll={refUpdatePositionComponent(componentArray.current)}
            >  
                <Paper 
                    id="main-form"
                    ref={drop}
                    elevation={3}
                    sx={{
                        width: (formProperty?formProperty.width:500) + "px",
                        height: "fit-content",
                        // height: "200vh",
                        padding: "1cm",
                        boxSizing: "border-box",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}

                    style={{
                        position: "absolute",
                        margin: "auto auto auto auto",
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }}
                    
                    >

                    <SortableList 
                        formStruct={formStruct}
                        onSortEnd={({oldIndex, newIndex}) => {
                            let arrayAddress = [...formStruct];
                            let tmp = arrayAddress[newIndex]
                            arrayAddress[newIndex] = arrayAddress[oldIndex]
                            arrayAddress[oldIndex] = tmp
                            // arrayAddress = arrayMove(arrayAddress, oldIndex, newIndex);
                            setFormStruct(arrayAddress)
                        }}
                        distance={1}
                        axis={"xy"}
                        typeInput={typeInput}
                        onChoseOneComponent={onChoseOneComponent}
                        refUpdateComponent={refUpdateComponent}
                    />

                </Paper>

            </Box>
            
            {/* Box cái đặt thuộc tính cho component */}
            <Box
                style={{
                    minWidth: "200px",
                    maxWidth: "200px",
                    width:"200px",
                    padding: "10px",
                    boxSizing: "border-box"
                }}
            >
                {
                    elementChose && elementChose.type === typeInput.CheckBox &&
                    <CheckBoxConfig 
                        property={formStruct?formStruct[elementChose.index].property:null}
                        updatePropertyComponent={(newProperty) => updatePropertyComponent(elementChose.index, newProperty)}
                    />
                }
                {
                    elementChose && elementChose.type === typeInput.RadioButton &&
                    <RadioButtonConfig 
                        property={formStruct?formStruct[elementChose.index].property:null}
                        updatePropertyComponent={(newProperty) => updatePropertyComponent(elementChose.index, newProperty)}
                    />
                }
                {
                    elementChose && elementChose.type === typeInput.TextField &&
                    <TextFieldConfig 
                        property={formStruct?formStruct[elementChose.index].property:null}
                        updatePropertyComponent={(newProperty) => updatePropertyComponent(elementChose.index, newProperty)}
                    />
                }

                {
                    elementChose && elementChose.type === typeInput.Datetime &&
                    <DatetimeConfig 
                        property={formStruct?formStruct[elementChose.index].property:null}
                        updatePropertyComponent={(newProperty) => updatePropertyComponent(elementChose.index, newProperty)}
                    />
                }

                {
                    elementChose && elementChose.type === typeInput.SelectBox &&
                    <SelectBoxConfig 
                        property={formStruct?formStruct[elementChose.index].property:null}
                        updatePropertyComponent={(newProperty) => updatePropertyComponent(elementChose.index, newProperty)}
                    />
                }
                 {
                    elementChose && elementChose.type === typeInput.TitleForm &&
                    <TitleFormConfig 
                        property={formStruct?formStruct[elementChose.index].property:null}
                        updatePropertyComponent={(newProperty) => updatePropertyComponent(elementChose.index, newProperty)}
                    />
                }


            </Box>
        </Box>
        
        </Box>
    
    )
}

export default MainForm



const SortableList = SortableContainer((props) => {
    let {formStruct, typeInput, onChoseOneComponent, refUpdateComponent } = props
    return (        
        <Grid container spacing={1} 
        // style={{border: "2px solid green"}}
        >
        {
            formStruct && formStruct.length>0 &&
            formStruct.map((item, index) => (  
                <SortableItem 
                    item={item}       
                    index1={index}    
                    index={index}
                    typeInput={typeInput}
                    onChoseOneComponent={onChoseOneComponent}
                    refUpdateComponent={refUpdateComponent}                
                    key={"grid" + index}
                />                              
            ))
        } 
        </Grid>
    )
  });
  
const SortableItem = SortableElement((props) =>{
    let {item, index1, typeInput, onChoseOneComponent, refUpdateComponent} = props
    return(
        <Grid 
            item xs={item?.property?.gridWidth?item.property.gridWidth:4} md={item?.property?.gridWidth?item.property.gridWidth:4} 
            ref={(element) => refUpdateComponent(element, index1)}   
            sx={{zIndex: 2000000000}}  
            // style={{
            //     border: "1px solid blue",
            //     boxSizing: "border-box"
            // }}
        >
            {
                item.type===typeInput.CheckBox &&
                <CheckBox 
                    isEdit={true}
                    property={item.property}
                    onChoseOneComponent={(typeComponent)=>onChoseOneComponent(index1, typeComponent)}
                />
            }
            {
                item.type===typeInput.RadioButton &&
                <RadioButton
                    isEdit={true}
                    property={item.property}
                    onChoseOneComponent={(typeComponent)=>onChoseOneComponent(index1, typeComponent)}
                />
            }
            {
                item.type===typeInput.TextField &&
                <TextField
                    isEdit={true}
                    property={item.property}
                    onChoseOneComponent={(typeComponent)=>onChoseOneComponent(index1, typeComponent)}
                />
            }
            {
                item.type===typeInput.Datetime &&
                <DateTime
                    isEdit={true}
                    property={item.property}
                    onChoseOneComponent={(typeComponent)=>onChoseOneComponent(index1, typeComponent)}
                />
            }
            {
                item.type===typeInput.SelectBox &&
                <SelectBox
                    isEdit={true}
                    property={item.property}
                    onChoseOneComponent={(typeComponent)=>onChoseOneComponent(index1, typeComponent)}
                />
            }
            {
                item.type===typeInput.TitleForm &&
                <TitleForm
                    isEdit={true}
                    property={item.property}
                    onChoseOneComponent={(typeComponent)=>onChoseOneComponent(index1, typeComponent)}
                />
            }

        </Grid> 
    )
});