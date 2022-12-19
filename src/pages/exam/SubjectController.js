import ElevatorPassengerOffOutline from 'mdi-material-ui/ElevatorPassengerOffOutline'
import React from 'react'
import { useExam } from './examContextProvider'
import ExamView from './ExamView'
import Quiz from './Quiz'
import SubjectList from './SubjectList'

function SubjectController() {
  const { getCompName } = useExam()
  const mydata = getCompName()
  if(mydata.comp ==='SUBJECT'){
    return <SubjectList/>
  }else if(mydata.comp==="QUIZ"){
    return <Quiz/>
  }else {
    return <ExamView/>
  }

  return <SubjectList />
}

export default SubjectController
