import { useQuery } from '@apollo/client'
import { Grid } from 'mdi-material-ui'
import React from 'react'
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

import CardStatsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import { EXAM_FILTER_QUERY } from '../api/graphql/query/exam'
import ExamCard from './ExamCard'

function ExamList() {
    const filterInput={
        "filters": {
           //"class": {"eq": 5},
         
        }
      }
    const { data:examData,loading:examLoading, error:examError } = useQuery(EXAM_FILTER_QUERY,{ variables: filterInput})
  if(examError){
    return "Error in getting exam"
  }
  if(examLoading){
    return <h2>exam is loading</h2>
  }
  console.log("ExamData",examData.exams.data)
  const getCard=(exam)=>{
    console.log("CAlLED")
   return  (  <ExamCard
            id={exam.id}
          stats='$25.6k'
          icon={<Poll />}
          color='error'
          trendNumber='+42%'
          title={exam.attributes.name}
          subtitle='Weekly Profit'
        />
       
   )
     
  }
  
  return (
        <>  
       
       { examData.exams.data.map((exam)=>{return(  getCard(exam) )
})}
   
   
   
      
       </>
  )
}

export default ExamList