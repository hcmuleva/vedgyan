

import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'

import { Alert } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Radio from '@mui/material/Radio'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
function ResultOptionsView({resultdata, filterby}) {
   console.log("resultdata=>",resultdata) 
  const resultElement = resultdata.attributes
  console.log("resultElement",resultElement)
  const dataarr = resultdata.attributes.details
console.log("DATA ARR ", dataarr)
  const getAlertColor = (expected, actual) => {
    if (expected && actual) {
      return 'success'
    } else if ((expected && !actual) || (!expected && actual)) {
      return 'error'
    } else if (!expected && !actual) {
      return 'info'
    }
  }
  const getCheckBox = (actual, index, opt) => {
    return (
      <>
        {' '}
        <Checkbox checked={actual} />
        <TextField label={opt.option} />
      </>
    )
  }
  const getRadioButton = (actual, index, opt) => {
    return (
      <>
        {' '}
        <Radio checked={actual} />
        <TextField label={opt.option} />
      </>
    )
  }
  const getButtonOptions = (number, title, actualOption, expectedOption, status, quetype, attempted) => {
    return (
      <>
        {' '}
        {status ? (
          <Alert severity='success'>CORRECT</Alert>
        ) : (
          <Alert severity='error'>
            <Typography id={number}>
              Que<b>{number + 1}</b>:{title}
              WRONG
            </Typography>
          </Alert>
        )}
        {quetype === 'mcq' &&
          expectedOption.map((opt, index) => {
            //const severity=opt.answer&&actualOption[index]?"success":"error"
            const severity = getAlertColor(opt.answer, actualOption[index])
            return <Alert severity={severity}>{getCheckBox(actualOption[index], index, opt)}</Alert>
          })}
        {quetype === 'sc' &&
          expectedOption.map((opt, index) => {
            const severity = getAlertColor(opt.answer, actualOption[index])

            return <Alert severity={severity}>{getRadioButton(actualOption[index], index, opt)}</Alert>
          })}
        <br />
      </>
    )
  }
  const getQueDetails = (queNumber, title, actualOption, expectedOption, status, quetype, attempted) => {
    return (
      <Card>
        <CardContent
          sx={{
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
          }}
        >
          {/* <Typography variant='h6' sx={{ marginBottom: 2.75 }}>
            {qb.attributes.quetype === 'sc'?"SINGLE CHOICE":"MULTIPLE CHOICE"}
          </Typography> */}
          {getButtonOptions(queNumber, title, actualOption, expectedOption, status, quetype, attempted)}
          {/* <Button variant='contained' sx={{ padding: theme => theme.spacing(1.75, 5.5) }}>
            Contact Now
          </Button> */}
        </CardContent>
      </Card>
    )
  }

  const getReviewResult = () => {
    console.log("data arra ",dataarr)
    const keys = Object.keys(dataarr)
    return keys.map((key, index) => {
        switch(filterby){
            case 'CORRECT':
                if( dataarr[key].correct){
                    return getQueDetails(
                        index,
                        dataarr[key].quetitle,
                        dataarr[key].actual,
                        dataarr[key].expected,
                        dataarr[key].correct,
                        dataarr[key].quetype,
                        dataarr[key].attempted
                      )
                    
                }
                break;
            case 'ATTEMPTED':
                if( dataarr[key].attempted){
                    return getQueDetails(
                        index,
                        dataarr[key].quetitle,
                        dataarr[key].actual,
                        dataarr[key].expected,
                        dataarr[key].correct,
                        dataarr[key].quetype,
                        dataarr[key].attempted
                      )
                    
                }
                break;
            case 'WRONG':
                if( dataarr[key].attempted&&!dataarr[key].correct){
                    return getQueDetails(
                        index,
                        dataarr[key].quetitle,
                        dataarr[key].actual,
                        dataarr[key].expected,
                        dataarr[key].correct,
                        dataarr[key].quetype,
                        dataarr[key].attempted
                      )
                    
                }
                break;
            case 'NOTATTEMPTED':
                if( !dataarr[key].attempted){
                    return getQueDetails(
                        index,
                        dataarr[key].quetitle,
                        dataarr[key].actual,
                        dataarr[key].expected,
                        dataarr[key].correct,
                        dataarr[key].quetype,
                        dataarr[key].attempted
                      )
                    
                }
                break;
            default:
                return getQueDetails(
                    index,
                    dataarr[key].quetitle,
                    dataarr[key].actual,
                    dataarr[key].expected,
                    dataarr[key].correct,
                    dataarr[key].quetype,
                    dataarr[key].attempted
                  )
        }
    }) 
  }

  return (
    getReviewResult()
  )
}

export default ResultOptionsView