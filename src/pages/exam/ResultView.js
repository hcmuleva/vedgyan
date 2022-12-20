import React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useExam } from './examContextProvider'
import Slider from '@mui/material/Slider'
import { RESULTS_QUERY } from '../api/graphql/query/result'
import ResultTrophy from './ResultTrophy'
import { useAuth } from '../lib/auth'
import ResultOptionsView from './ResultOptionsView'
import { useQuery } from '@apollo/client'



function ResultView() {
  const { getCompName, updateCompName } = useExam()
  const { getUser } = useAuth()

  const userdata = getUser()

  const resultdetails = getCompName()
  const {
    data: resultData,
    loading: resultLoading,
    error: resultError
  } = useQuery(RESULTS_QUERY, { variables: { filters: { users_permissions_user: { id: { eq: userdata.id } } } } })
  if (resultError) {
    return <h2>Error in getting result</h2>
  }
  if (resultLoading) {
    return <h3>ResultLoading</h3>
  }
  // console.log('Result data FirstElement', resultData.results.data[1])
  // const resultElement = resultData.results.data[1].attributes
  return (
    <div>
      ResultView
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
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <ResultTrophy resultData={resultData.results.data[1]} />
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
      <Slider
        defaultValue={30}
        sx={{
          width: 300,
          color: 'success.main'
        }}
      />
      <ResultOptionsView resultdata={ resultData.results.data[1]} filterby={"CORRECT"}/>
    </div>
  )
}

export default ResultView
