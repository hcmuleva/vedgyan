// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'
import Button from '@mui/material/Button'
import { useExam } from './examContextProvider'

const ExamCard = props => {
  // ** Props
  const { updateCompName } = useExam()

  console.log("props of Examcard",props)
  const { id,title, subtitle, color, icon, stats, trend, trendNumber } = props

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', marginBottom: 5.5, alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Avatar sx={{ boxShadow: 3, marginRight: 4, color: 'common.white', backgroundColor: `${color}.main` }}>
            {icon}
          </Avatar>
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        </Box>
        <Typography sx={{ fontWeight: 800, fontSize: '0.975rem' }}>{title}</Typography>
        <Typography variant='caption'>{subtitle}</Typography>
        <Box sx={{ marginTop: 1.5, display: 'flex', flexWrap: 'wrap', marginBottom: 1.5, alignItems: 'flex-start' }}>
          <Typography   sx={{ mr: 2 ,fontSize: '0.875rem'}}>
            {stats}
          </Typography>
          <Typography
            component='sup'
            variant='caption'
            sx={{ color: trend === 'positive' ? 'success.main' : 'error.main' }}
          >
            {trendNumber}
          </Typography>
        </Box>
        <Button onClick={()=>{
            console.log("Exam Clicked ", title, " and id ", id)
            updateCompName({comp:'QUIZ',"details":{"name":title, "id":id}})
        }}>Start</Button>
      </CardContent>
    </Card>
  )
}

export default ExamCard

ExamCard.defaultProps = {
  color: 'primary',
  trend: 'positive'
}
