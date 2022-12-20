import { useQuery,useMutation } from '@apollo/client'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React from 'react'
import { EXAM_BY_ID } from '../api/graphql/query/exam'
import { useExam } from './examContextProvider'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

import QueCard from './QueCard'
import { useState } from 'react'
import { useAuth } from '../lib/auth'
import { CREATE_RESULT } from '../api/graphql/mutation/EXAM_RESULT'
// Styled component for the form
const Form = styled('form')(({ theme }) => ({
  maxWidth: 400,
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`
}))
function Quiz() {
    const { getUser } = useAuth()
    const user= getUser()
    console.log("user",user)
  const { getCompName, updateCompName } = useExam()
  const [attempted, setAttempted] = useState([])
  const [createExamResult, { data:createResultData, loading:createResulltLoading, error:createResultError }]= useMutation(CREATE_RESULT)
  const data = getCompName()
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
  const myanswers = []
  examData.exam.data.attributes.qbs.data.map((qb, index) => {
    const myarr = []
    qb.attributes.options.map((option, index) => {
      myarr.push(false)
    })
    myanswers[index] = myarr
  })

  if(createResultError){
    return <h2>Error in Result Submit</h2>
  }
  if(createResulltLoading){
    return <h2>Need to create Spinner for loading result submit</h2>
  }
  const resultCreator = () => {
    
    const assessment = []
    examData.exam.data.attributes.qbs.data.map((val, index) => {
      const result = {
        attempted: false,
        correct: false,
        actual: [],
        que: index + 1,
        quetitle: val.attributes.quetitle,
        quetype: '',
        expected: []
      }
      const answers = myanswers[index]
      const expectedOption = val.attributes.options
      result.quetype = val.attributes.quetype
      result.expected = expectedOption
      result.actual = answers
      const quetype = val.attributes.quetype
      if(answers&&answers.length>0){
        if (quetype === 'sc') {
            for (var i = 0; i < expectedOption.length; i++) {
            if (expectedOption[i].answer && answers[i]) {
                result.correct = true
            } else if (expectedOption[i].answer && answers[i]) {
                result.correct = false
            }
            }
            if (answers.includes(true)) {
            result.attempted = true
            }
        }
        if (quetype === 'mcq') {
            let flag = true

            for (var i = 0; i < expectedOption.length; i++) {
            if (expectedOption[i].answer && !answers[i]) {
                flag = false
            }
            if (!expectedOption[i].answer && answers[i]) {
                flag = false
            }
            }
            if (flag && answers.includes(true)) {
            result.correct = true
            }
            if (flag && answers.includes(true)) {
            result.correct = true
            }
            if (answers.includes(true)) {
            result.attempted = true
            }
        }
    }
    assessment.push(result)
    })
    let total=assessment.length, correct=0,attempted=0,score=0.0,level=1,duration=0.0,details={...assessment},users_permissions_user=user.id,exam=examData.exam.data.id;
    
    assessment.map((res)=>{
        if(res.attempted){
            attempted++
        }
        if(res.correct){
            correct++
        }
    })
    const ResultInput={total,correct,attempted,wrong:attempted-correct, na:total-attempted,score,level,duration,details,users_permissions_user,exam}
    console.log("Assesment", ResultInput)
    createExamResult({variables:{ResultInput}}).then(resp=>{
        console.log("Resp",resp)
        updateCompName({'comp':"RESULT",details:assessment})
    })
  }
  const handleAnserOptopns = (number, position, option, type, options) => {
    if (type === 'MCQ') {
      myanswers[number][position] = !myanswers[number][position]
    }
    if (type === 'SC') {
      const myans = []
      // myans.push(new Array(options.length).fill(false))
      myans[position] = true
      myanswers[number] = myans
    }
  }
  const getQuiz = () => {
    return examData.exam.data.attributes.qbs.data.map((qb, index) => {
      //return getButtonOptions(qb, index)
      return <QueCard qb={qb} index={index} handleAnserOptopns={handleAnserOptopns} />
    })
  }
  return (
    <div>
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
      <Button
        onClick={() => {
          updateCompName({ comp: 'RESULT' })
        }}
      >
        RESULT
      </Button>
      <Typography variant='h6'>
        Krishna! Your Exam <b>{data.details.name}</b> Started now 🥳
      </Typography>
      {getQuiz()}
      <br />
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
        <Button variant='contained' sx={{ padding: theme => theme.spacing(1.75, 5.5) }} onClick={()=>{resultCreator()}}>
          Submit
        </Button>
      </Box>
    </div>
  )
}

export default Quiz
