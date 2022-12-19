import { useQuery } from '@apollo/client'
import Grid from '@mui/material/Grid'

import React from 'react'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { SUBJECT_FILTER_QUERY } from '../api/graphql/query/subject'
import { useExam } from './examContextProvider'
import SubjectCard from './SubjectCard'

function SubjectList() {
    const {getExamData} = useExam()
    const mySubjectdata=getExamData()
    const filterInput={
        "filters": {
           "class": {"eq": 5},
         
        }
      }
    const { data:subjectData,loading:subjectLoading, error:subjectError } = useQuery(SUBJECT_FILTER_QUERY,{ variables: filterInput})
  if(subjectError){
    return "Error in getting subject"
  }
  if(subjectLoading){
    return <h2>subject is loading</h2>
  }
    console.log("SubjectList",subjectData.subjects)
    const getComponent = (name, classname)=>{
       return <SubjectCard name={name} classname={classname}/>
    }
    
    return (
      <Grid container spacing={6}>
       
            { subjectData.subjects.data.map(

(subject)=>{ 
    return <Grid item xs={12} md={6} lg={4}>{getComponent(subject.attributes.name,subject.attributes.class)} </Grid> 
})}
        
        
        
        </Grid>
    )
  
}

export default SubjectList