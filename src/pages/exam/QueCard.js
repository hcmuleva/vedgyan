// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import FormControl from '@mui/material/FormControl'
import Checkbox from '@mui/material/Checkbox'

import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
// ** Icons Imports
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'

const QueCard = ({qb, index,handleAnserOptopns}) => {

    const getRadioButtonOption = (number,id, quetitle, options) => {
        const quetype ="(SC)"
        return (
          <>
            {' '}
            <Typography>Que<b>{number+1}</b>:{quetitle} {quetype}</Typography>
            <FormControl>
              <RadioGroup row aria-label={id + '' + quetitle} name={id + '' + quetitle}>
                {options.map((opt, index) => (
                    <Grid container spacing={6}>
                         <Grid item xs={12} md={4}>
                  <FormControlLabel value={index} label={'' + opt.option} control={<Radio  onChange={()=>handleAnserOptopns(number,index,opt.option,'SC',options)}/>} />
                  </Grid>
                  </Grid>
                ))}
              </RadioGroup>
            </FormControl>
            <br/>
          </>
        )
      }
      const getCheckBox = (number,id, quetitle, options) => {
        const quetype ="(MCQ)"
    
        return(<>
          <Typography id={number}>Que<b>{number+1}</b>:{quetitle} {quetype}</Typography>
          {options.map((opt, index) => (
            <FormControlLabel
            id={index}
            label={'' + opt.option}
            onChange={()=>handleAnserOptopns(number,index,opt.option, 'MCQ',options)}
            control={<Checkbox name={id+quetitle}/>}
            sx={{ '& .MuiButtonBase-root': { paddingTop: 0, paddingBottom: 0 } }}
          />
            
          ))}
         <br/>
        </>)
      }
      const getButtonOptions = (qb,number) => {
        if (qb.attributes.quetype === 'sc') {

          return getRadioButtonOption(number,qb.id, qb.attributes.quetitle, qb.attributes.options)
        } else {
         return getCheckBox(number,qb.id, qb.attributes.quetitle, qb.attributes.options)
        }
      }
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
        {getButtonOptions(qb,index)}
        {/* <Button variant='contained' sx={{ padding: theme => theme.spacing(1.75, 5.5) }}>
          Contact Now
        </Button> */}
      </CardContent>
    </Card>
  )
}

export default QueCard
