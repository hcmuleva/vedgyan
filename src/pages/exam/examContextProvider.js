import React, { useState, useContext, createContext } from 'react'
const examContext = createContext()

export  default function ExamProvider({children}){
    const exam = useProvideExam()
    return <examContext.Provider value={exam}>
        {children}
    </examContext.Provider>
}

export const useExam = () => {
    return useContext(examContext)
  }
function useProvideExam(){
    const [examData,setExamData]=useState("")
    const [ansData,setAnsData]= useState("")
    const [compName,setCompName] = useState({comp:'RESULT', "details":{"id":1}})
    const getCompName=()=>{return compName}
    const updateCompName=(name)=>{
        setCompName(name)
    }
    const getExamData=()=>{
        return examData;
    }
    
    const updateExamData=(data)=>{
        setExamData(data)
        return examData
    }
    const getAnsData=()=>{
        return ansData
    }
    const updateAnsData=(data)=>{
        setAnsData(data)
        return ansData
    }
    return {getAnsData, getExamData, updateAnsData,updateExamData,updateCompName,getCompName}
}