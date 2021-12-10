import React, { useEffect, useRef, useState } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { CheckBox } from "../../common-components/checkbox";
import CheckBoxConfig from "../../config-common-components/checkbox"
import RadioButtonConfig from "../../config-common-components/radiobutton";
import { RadioButton } from "../../common-components/radiobutton";
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import TestDrag from "./testdrag";
import typeInput from "./typeInput";
import { useDrop } from "react-dnd"


function MainForm(props){

    const [formStruct, setFormStruct] = useState([
        {
            type: typeInput.CheckBox,
            property:{
                label: "ví dụ 1",
                content: ["lựa chọn 1", "lựa chọn 2"],
                gridWidth: 4
            }
        },
        {
            type: typeInput.RadioButton,
            property:{
                label: "ví dụ 2",
                content: ["lựa chọn 1", "lựa chọn 2 saklfjsklfsjf klsiougs kjweursdf"],
            }
        },
    ])

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
        
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: 'flex'
            }}>  

            {/* Box lấy các thành phần */}
            <Box
                sx={{
                    width: "25vw",
                    height: "100vh"                
                }}
            >
                <Grid container spacing={2}
                    sx={{
                        border: "1px solid black"
                    }}
                >
                    <Grid item xs={2}>
                        <TestDrag 
                            name={typeInput.CheckBox}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TestDrag 
                            name={typeInput.RadioButton}
                        />
                    </Grid>
                </Grid>
            </Box>

            {/* Box giao diện edit */}
            <Box
                sx={{
                width: "75vw",
                height: "100vh",
                overflow: "scroll",
                display: 'block',
                backgroundColor: 'primary.dark',
                border: "3px solid black",
                boxSizing: "border-box",
                padding: 5
                // '&:hover': {
                //     backgroundColor: 'primary.main',
                //     opacity: [0.9, 0.8, 0.7],
                // },
                }}
                onScroll={refUpdatePositionComponent(componentArray.current)}
                >            
                <Paper 
                    id="main-form"
                    ref={drop}
                    elevation={3}
                    sx={{
                        width: "100vw",
                        height: "fit-content",
                        // height: "200vh",
                        padding: "1cm",
                        boxSizing: "border-box",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}>

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
                        <button onClick={() => {console.log(formStruct)}}>23132123123</button>
            </Box>

            {/* Box cái đặt thuộc tính cho component */}
            <Box
                sx={{
                    padding: "10px"
                }}
            >
                {
                    elementChose && elementChose.type === 'checkbox' &&
                    <CheckBoxConfig 
                        property={formStruct?formStruct[elementChose.index].property:null}
                        updatePropertyComponent={(newProperty) => updatePropertyComponent(elementChose.index, newProperty)}
                    />
                }
                {
                    elementChose && elementChose.type === 'radiobutton' &&
                    <RadioButtonConfig 
                        property={formStruct?formStruct[elementChose.index].property:null}
                        updatePropertyComponent={(newProperty) => updatePropertyComponent(elementChose.index, newProperty)}
                    />
                }
            </Box>
        </Box>
        
    
    )
}

export default MainForm



const SortableList = SortableContainer((props) => {
    let {formStruct, typeInput, onChoseOneComponent, refUpdateComponent } = props
    return (        
        <Grid container spacing={2}>
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
            style={{
                border: "1px solid blue"
            }}
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
        </Grid> 
    )
});