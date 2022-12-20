import ElevatorPassengerOffOutline from 'mdi-material-ui/ElevatorPassengerOffOutline'
import React from 'react'
import { useExam } from './examContextProvider'
import ExamView from './ExamView'
import Quiz from './Quiz'
import ResultView from './ResultView'
import SubjectList from './SubjectList'

function SubjectController() {
  const { getCompName } = useExam()
  const mydata = getCompName()
  console.log(mydata,"MYDATA for componsner")
  const getExamControllerComp=()=>{
    switch(mydata.comp){
      case 'SUBJECT':
        return <SubjectList/>
        break;
      case 'QUIZ':
        return <Quiz/>
        break;
      case 'EXAM':
        return <ExamView/>
        break;
      case 'RESULT':
        return <ResultView/>
        break;
      
    }
  }
  

  return <>{getExamControllerComp()}</>
}

export default SubjectController
