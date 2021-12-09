import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
function MainForm(props){

    const [formStruct, setFormStruct] = useState([
        new Array(3)
    ])

    useEffect(() => {
        console.log(formStruct)
    }, [formStruct])

    return(
        <Box
            sx={{
            width: "100vw",
            display: 'flex',
            justifyContent: "center"
            // backgroundColor: 'primary.dark',
            // '&:hover': {
            //     backgroundColor: 'primary.main',
            //     opacity: [0.9, 0.8, 0.7],
            // },
            }}
        >            
            <Paper elevation={3}
                sx={{
                    width: "300px",
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}>
                    <h1>12123</h1>
                    </Grid>
                    <Grid item xs={6} md={4}>
                    <h1>321</h1>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    
    )
}

export default MainForm