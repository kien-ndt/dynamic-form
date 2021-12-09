import React, { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {CheckBox} from "../../common-components/checkbox";
import CheckBoxConfig from "../../config-common-components/checkbox"


function MainForm(props){

    const [formStruct, setFormStruct] = useState([{
        property:{}
    }])

    useEffect(() => {
        // console.log(formStruct)
    }, [formStruct])

    const updatePropertyComponent = (index, newProperty) => {
        let newFormStruct = [...formStruct];
        newFormStruct[0].property = newProperty;
        setFormStruct(newFormStruct);
    }

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
                    <Grid item xs={8}>
                        asdadasd
                    </Grid>
                </Grid>
            </Box>

            {/* Box giao diện edit */}
            <Box
                sx={{
                width: "75vw",
                height: "100vh",
                overflow: "scroll",
                display: 'flex',
                justifyContent: "center",
                backgroundColor: 'primary.dark',
                // '&:hover': {
                //     backgroundColor: 'primary.main',
                //     opacity: [0.9, 0.8, 0.7],
                // },
                }}>            
                <Paper elevation={3}
                    sx={{
                        width: "500px",
                        height: "fit-content",
                        padding: "1cm",
                        boxSizing: "border-box"
                    }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={8}>
                            <CheckBox
                                isEdit={true}
                                property={formStruct[0].property}
                            />
                        </Grid>                        
                    </Grid>
                </Paper>
            </Box>

            {/* Box cái đặt thuộc tính cho component */}
            <Box
                sx={{
                    padding: "10px"
                }}
            >
                    <CheckBoxConfig 
                        updatePropertyComponent={(newProperty) => updatePropertyComponent(0, newProperty)}
                    />
            </Box>
        </Box>

        
    
    )
}

export default MainForm