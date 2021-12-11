// import * as React from 'react';
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import { Button, Box } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import DeleteIcon from '@mui/icons-material/Delete';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import EditIcon from '@mui/icons-material/Edit';
import PageviewIcon from '@mui/icons-material/Pageview';

import { getAllForms, deleteForm } from '../../helper/formRequest';
import { yellow, red, pink } from '@mui/material/colors';
import MainForm from '../create/mainForm';


import Dialog from '@mui/material/Dialog';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function TableManagement() {

    const [allForms, setAllForms] = useState([])

    useEffect(() => {
        getAllForms().then((data) => {
            setAllForms(data);
        })
    },[])

    const [dialogStatus, setDialogStatus] = useState(false)
    const [formSelected, setFormSelected] = useState()

    const handleCloseDialog = () => {
        setDialogStatus(false)        
        getAllForms().then((data) => {
            setAllForms(data);
        })
    }

    const onCreateNew = () => {
        setDialogStatus(true)
        setFormSelected(null)      
    }

    const onEdit = (form) => {
        setDialogStatus(true)
        setFormSelected(form)
    }

    const onDelete = (form) => {
        deleteForm(form.id).then(
            setTimeout(() => {
                getAllForms().then((data) => {
                    setAllForms(data);
                })                
            }, 2000)
        )
    }

    useEffect(() => {
        console.log(formSelected, " kaskasd")
    }, [formSelected])

    return (
        <React.Fragment>
        <Dialog        
            fullScreen
            open={dialogStatus}
            onClose={handleCloseDialog}
            // TransitionComponent={Transition}
        >
            <MainForm formElement={formSelected?.formElement} 
                        backCreateEdit={handleCloseDialog}
                        form={formSelected}
            />
        </Dialog>
        <Box sx={{ width: '100%'}}>
            <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>

                <Button variant="outlined" align="right" style={{marginRight: 0}} onClick={onCreateNew}>New form</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ordinal</TableCell>
                            <TableCell align="left">Id</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {allForms && allForms.length>0 && allForms.map((form, index) => (
                            <TableRow
                            key={form.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index}
                                </TableCell>
                                <TableCell align="left">{form.id}</TableCell>
                                <TableCell align="left">{form.name}</TableCell>
                                <TableCell align="right">
                                    <PageviewIcon color='success'/>
                                    <EditIcon sx={{ color: yellow[500] }} onClick={() => onEdit(form)}/>
                                    <ToggleOnIcon sx={{ color: pink[500] }}/>
                                    <DeleteIcon sx={{ color: red[500] }} onClick={() => onDelete(form)}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>            
            </TableContainer>
            
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={2}
                rowsPerPage={4}
                page={3}
            //   onPageChange={handleChangePage}
            //   onRowsPerPageChange={handleChangeRowsPerPage}
            />        
    </Box>
    </React.Fragment>
    );
}
export default TableManagement