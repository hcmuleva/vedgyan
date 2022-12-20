import React from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import ResultOptionsView from './ResultOptionsView';
import CloseIcon from '@mui/icons-material/Close';


function ResultViewDialog({open, setOpen,handleClose, resultData,filterby}) {
    console.log("filterby",filterby, " resultObject",resultData)

  return (
    <Dialog onClose={handleClose} open={open} scroll={'body'}>
    
    <DialogTitle id="id">
         <Box display="flex" alignItems="center">
                <Box flexGrow={1} >Result for Quick Review</Box>
                <Box>
                   
                          <CloseIcon onClick={handleClose}/>
                  
                </Box>
          </Box>
  </DialogTitle>
    <ResultOptionsView resultdata={resultData} filterby={filterby} />
    <Button onClick={()=>{setOpen(false)}}>Close</Button>
    </Dialog>
  )
}

export default ResultViewDialog