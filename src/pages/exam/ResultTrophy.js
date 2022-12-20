// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import Chart from 'react-apexcharts'
import { useAuth } from '../lib/auth'
import { useState } from 'react'
import ResultViewDialog from './ResultViewDialog'

// Styled component for the triangle shaped background image
const CircularImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})
const DipakImg = styled('img')({
  right: 0,
  bottom: 0,
  width: 300,
  height: 170,
  position: 'absolute'
})
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 10,
  top: 20,
  height: 98,
  position: 'absolute'
})

const ResultTrophy = ({ resultData }) => {
  const [open, setOpen] = useState(false)
  const [filterby, setFilterby] = useState('ALL')
  const resultElement = resultData.attributes
  console.log('Res resultElement ', resultElement)
  const score = resultElement.score
  const total = resultElement.total
  const attempted = resultElement.attempted
  const correct = resultElement.correct
  const wrong = resultElement.wrong
  const examName = resultElement.exam.data.attributes.name
  // ** Hook
  const { getUser } = useAuth()
  const userdata = getUser()
  console.log('ResultTropy', getUser())
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'
  const options = {
    colors: ['#FF0000', '#00FF00'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        expandOnClick: true,
        offsetX: 0,
        offsetY: 0,
        customScale: 1,
        dataLabels: {
          offset: 0,
          minAngleToShowLabel: 10
        },
        donut: {
          size: '65%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: undefined,
              offsetY: -10,
              formatter: function (val) {
                return val
              }
            },
            value: {
              show: true,
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              color: undefined,
              offsetY: 16,
              formatter: function (val) {
                return val
              }
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              fontSize: '22px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: '#373d3f',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b
                }, 0)
              }
            }
          }
        }
      }
    }
  }

  const series = [wrong, correct]
  const labels = ['Wrong', 'Correct']
  const handleClose = () => {
    setOpen(false)
  }
  const handleClickOpen = () => {
    setOpen(true)
  }
  return (
    <Card sx={{ position: 'relative' }}>
      {open ? (
        <ResultViewDialog
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          resultData={resultData}
          filterby={filterby}
        />
      ) : (
        ''
      )}
      <CardContent>
        {score > 40 ? <Typography variant='h6'>Congratulations {userdata.username}! 🥳</Typography> : ''}
        <Chart options={options} series={series} type='donut' width='300' />

        <Typography
          variant='body2'
          sx={{ letterSpacing: '0.15px' }}
          onClick={() => {
            setOpen(true)
          }}
        >
          <b>{name}</b>, Your Result of <b>{examName}</b> Test is :
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'left' }}>
         <Box sx={{ mx: 4,my: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
            <Button
              variant='outlined'
              onClick={() => {
                setFilterby('TOTAL')
                handleClickOpen
              }}
            >
              <Typography variant='h6' sx={{ color: 'info.main' }}>
                Total:{total}
              </Typography>
            </Button>
        </Box>
        
         <Box sx={{ mx: 1,my: 4,  flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
            <Button
              variant='outlined'
              onClick={() => {
                setFilterby('ATTEMPTED')
                setOpen(true)
              }}
            >
              <Typography variant='h6' sx={{ color: 'primary.main' }}>
                Attempted:{attempted}
              </Typography>
            </Button>
          </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'left' }}>
           <Box sx={{ mx: 4,my: 4,  flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
            <Button
              variant='outlined'
              onClick={() => {
                setFilterby('CORRECT')
                setOpen(true)
              }}
            >
              <Typography variant='h6' sx={{ color: 'success.main' }}>
                Correct:{correct}
              </Typography>
            </Button>
          </Box>
           <Box sx={{ mx: 4,my: 4,  flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
            <Button
              variant='outlined'
              onClick={() => {
                setFilterby('WRONG')
                setOpen(true)
              }}
            >
              <Typography variant='h6' sx={{ color: 'error.main' }}>
                Wrong:{wrong}
              </Typography>
            </Button>
          </Box>
          </Box>
        {/* <DipakImg alt='triangle background' src={`/images/harish/transparent.gif`} /> */}
        {/* <TriangleImg alt='triangle background' src={`/images/harish/garland1.jpg`} /> */}
        {/* <CircularImg alt='triangle background' src={`/images/harish/circular.jpg`} /> */}
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default ResultTrophy
