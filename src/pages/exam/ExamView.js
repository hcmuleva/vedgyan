import { Button } from '@mui/material'
import React from 'react'
import { useExam } from './examContextProvider'
import ExamList from './ExamList'

function ExamView() {
    const { getCompName,updateCompName } = useExam()
    const compData=getCompName()
  return (
    <div>ExamView
        <Button onClick={()=>{ updateCompName({comp:'SUBJECT',details:{}})}}>Subject</Button>
        <ExamList/>
    </div>
  )
}

export default ExamView