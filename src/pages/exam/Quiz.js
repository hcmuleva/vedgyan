import { useQuery } from '@apollo/client'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React from 'react'
import { EXAM_BY_ID } from '../api/graphql/query/exam'
import { useExam } from './examContextProvider'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

import QueCard from './QueCard'
import { useState } from 'react'
// Styled component for the form
const Form = styled('form')(({ theme }) => ({
  maxWidth: 400,
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`
}))
function Quiz() {
  const { getCompName, updateCompName } = useExam()
  const [attempted,setAttempted] = useState([])

  const data = getCompName()
  console.log('data  from quiz', data.details.name, ' and id ', data.details.id)
  const {
    data: examData,
    loading: examLoading,
    error: examError
  } = useQuery(EXAM_BY_ID, { variables: { id: data.details.id } })
  if (examError) {
    return 'Error in getting exam'
  }
  if (examLoading) {
    return <h2>exam is loading</h2>
  }
  console.log('DATA by ExamID ', examData.exam.data.attributes.qbs.data)
  const myanswers = [];
  examData.exam.data.attributes.qbs.data.map((qb, index) => {
    const myarr=[]
    qb.attributes.options.map((option,index)=>{myarr.push(false)})
    // const myarr=[new Array(qb.attributes.options.length).fill(false)]
    myanswers[index]=myarr
  })
 
  
 
 
//  if (examData?.exam?.data) {
//     examData.exam.data.attributes.qbs.map((val, index) => {
//      myanswers.push(new Array(val.attributes.options.length).fill(false));
//    });
//  }
 const handleAnserOptopns= (number,position, option, type,options)=>{
    

    if(type ==='MCQ'){
        myanswers[number][position]=!myanswers[number][position]   
        console.log("Check you MCQ Logic here")
    }
    if(type ==='SC'){
        const myans = []
        // myans.push(new Array(options.length).fill(false))
        myans[position]=true
        myanswers[number]=myans
        console.log("Check you SC Logic here")
    }
    console.log("QueNum",number,"position", position, " Option", option)
    console.log("MYanswer::",myanswers)
 }
  const getQuiz = () => {
    return examData.exam.data.attributes.qbs.data.map((qb, index) => {
      //return getButtonOptions(qb, index)
      return <QueCard qb={qb} index={index} handleAnserOptopns={handleAnserOptopns}/>
    })
  }
  return (
    <div>
      Quiz: {data.title} and ID: {data.id}
      <Button
        onClick={() => {
          updateCompName({ comp: 'SUBJECT' })
        }}
      >
        Subject
      </Button>
      <Button
        onClick={() => {
          updateCompName({ comp: 'EXAM' })
        }}
      >
        Exam
      </Button>
      <Typography variant='h6'>
        Krishna! Your Exam <b>{data.details.name}</b> Started now 🥳
      </Typography>
      {getQuiz()}
      <br/>
      <Box
      component='footer'
      className='layout-footer'
      sx={{
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
        <Button variant='contained' sx={{ padding: theme => theme.spacing(1.75, 5.5) }}>
          Submit
        </Button>
        </Box>
    </div>
  )
}

export default Quiz
