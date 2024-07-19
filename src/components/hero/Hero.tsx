import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Hero() {
   return (
      <Box
         id='hero'
         sx={(theme) => ({
            width: '100vw',
            backgroundImage:
               theme.palette.mode === 'light'
                  ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                  : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
            backgroundSize: '100% 20%',
            backgroundRepeat: 'no-repeat',
         })}
      >
         <Container
            sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               pt: { xs: 14, sm: 20 },
               pb: { xs: 8, sm: 12 },
            }}
         >
            <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
               <Typography
                  component='h1'
                  variant='h1'
                  sx={{
                     display: 'flex',
                     flexDirection: { xs: 'column', md: 'row' },
                     alignSelf: 'center',
                     textAlign: 'center',
                     fontSize: '3em',
                     color: '#3c5e24',
                  }}
               >
                  Expande tus conocimientos con los mejores libros 😎✝️🤓
               </Typography>
               {/* <Typography variant='body1' textAlign='center' color='text.secondary'>
                  Explore our cutting-edge dashboard, delivering high-quality solutions tailored to your needs. <br />
                  Elevate your experience with top-tier features and services.
               </Typography> */}
               {/* <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  alignSelf='center'
                  spacing={1}
                  useFlexGap
                  sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
               >
                  <TextField
                     id='outlined-basic'
                     hiddenLabel
                     size='small'
                     variant='outlined'
                     aria-label='Enter your email address'
                     placeholder='Your email address'
                     inputProps={{
                        autocomplete: 'off',
                        ariaLabel: 'Enter your email address',
                     }}
                  />
                  <Button variant='contained' color='primary'>
                     Start now
                  </Button>
               </Stack> */}
            </Stack>
         </Container>
      </Box>
   );
}
