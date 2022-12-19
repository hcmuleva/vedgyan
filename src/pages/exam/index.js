import React from 'react'
import ExamProvider, { useExam } from './examContextProvider'
import SubjectController from './SubjectController'

function ExamView() {
    
  return (
    <ExamProvider>
    <SubjectController/>
    </ExamProvider>
  )
}

export default ExamView