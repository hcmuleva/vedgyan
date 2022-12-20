// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`© ${new Date().getFullYear()}, Made with `}
        <Box component='span' sx={{ color: 'error.main' }}>
          ❤️
        </Box>
        {` by `}
        <Link target='_blank' href='https://eksamaj.in/'>
          Harish Muleva
        </Link>
      </Typography>
      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <Link
            target='_blank'
            href='https://eksamaj.in/exam'
          >
            Register for Education
          </Link>
          <Link target='_blank' href='https://emeelan.in/'>
            Register for marriage
          </Link>
          <Link
            target='_blank'
            href='https://github.com/hcmuleva'
          >
            JOB Opportunity
          </Link>
          <Link
            target='_blank'
            href='https://eksamaj.in'
          >
            Carrier Counselling 
          </Link>
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
