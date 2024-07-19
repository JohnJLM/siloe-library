import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTheme } from '@mui/material';

const logoStyle = {
   width: '140px',
   height: 'auto',
};

function Copyright() {
   return (
      <Typography variant='body2' color='text.secondary' mt={1}>
         {'Copyright © '}
         <Link href='/'>JL Websites&nbsp;</Link>
         {new Date().getFullYear()}
      </Typography>
   );
}

export default function Footer({ detail }) {
   const theme = useTheme();
   const logo =
      theme.palette.mode === 'dark'
         ? 'https://firebasestorage.googleapis.com/v0/b/siloe-library.appspot.com/o/cruzB.png?alt=media&token=17ecf55c-8abc-4a9d-833b-07063fb0c686'
         : 'https://firebasestorage.googleapis.com/v0/b/siloe-library.appspot.com/o/CruzN.png?alt=media&token=90d327c2-f7cd-4cb8-8ba3-869c3ef90732';

   return (
      <Container
         sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 4, sm: 8 },
            py: { xs: 8, sm: 10 },
            textAlign: { sm: 'center', md: 'left', xs: 'center' },
         }}
      >
         <Box
            sx={{
               display: 'flex',
               flexDirection: { xs: 'column', sm: 'row' },
               width: '100%',
               justifyContent: 'space-between',
            }}
         >
            {!detail && (
               <Box
                  sx={{
                     display: 'flex',
                     flexDirection: 'row',
                     gap: 4,
                     minWidth: { xs: '100%', sm: '60%' },
                     justifyContent: 'space-between',
                  }}
               >
                  <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
                     <Box sx={{ ml: '-15px' }}>
                        <img src={logo} style={logoStyle} alt='logo of sitemark' />
                     </Box>
                     <Typography variant='body2' fontWeight={600} gutterBottom>
                        Biblioteca Siloé
                     </Typography>
                     <Typography variant='body2' color='text.secondary' mb={2}>
                        Subscribete para obtener mas información (Aún no está operativo 😅)
                     </Typography>
                     <Stack
                        direction='row'
                        spacing={1}
                        useFlexGap
                        sx={{ display: { xs: 'flex' }, flexDirection: { xs: 'column' } }}
                     >
                        <TextField
                           id='outlined-basic'
                           hiddenLabel
                           size='small'
                           variant='outlined'
                           fullWidth
                           aria-label='Coloca tu email'
                           placeholder='Coloca tu email'
                           // value={'Enter your email address'}
                        />
                        <Button variant='contained' color='primary' sx={{ flexShrink: 0 }}>
                           Subscribirse
                        </Button>
                     </Stack>
                  </Box>
               </Box>
            )}
            <Box
               sx={{
                  display: { xs: 'flex', sm: 'flex' },
                  mt: { xs: '35px' },
                  flexDirection: 'column',
                  gap: 1,
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: '100%',
               }}
            >
               {detail && (
                  <Box
                     sx={{
                        ml: { xs: '-15px' },
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignContent: 'center',
                     }}
                  >
                     <div
                        style={{
                           display: 'flex',
                           flexDirection: 'column',
                           justifyContent: 'center',
                           alignContent: 'center',
                        }}
                     >
                        <img src={logo} style={logoStyle} alt='logo of sitemark' />
                        <Typography variant='body2' fontWeight={600} gutterBottom sx={{ textAlign: 'center' }}>
                           Biblioteca Siloé
                        </Typography>
                     </div>
                  </Box>
               )}
               <Typography variant='h5' fontWeight={500} align='center' sx={{ fontSize: '1.8em', color: '#617e4d' }}>
                  ¿Alguna pregunta?
               </Typography>
               <Typography variant='body2' fontWeight={500} align='center' sx={{ fontSize: '1.1em' }}>
                  Para solicitar información sobre qué libro puede irte mejor, contactar con el padre Òscar: +34 650 05 04 49
               </Typography>
               <Typography variant='body2' fontWeight={500} align='center' sx={{ fontSize: '1.1em' }}>
                  Para solicitar información o alguna duda sobre la disponibilidad de los libros, contactar con Juanse: +34 645 78
                  77 55
               </Typography>
               <Typography variant='body2' fontWeight={500} align='center' sx={{ fontSize: '1.1em' }}>
                  Para solicitar información sobre la página web, contactar con John: +34 600 28 95 52
               </Typography>
            </Box>
         </Box>

         <Box
            sx={{
               display: 'flex',
               justifyContent: 'space-between',
               pt: { xs: 4, sm: 8 },
               width: '100%',
               borderTop: '1px solid',
               borderColor: 'divider',
            }}
         >
            <div>
               <Link color='text.secondary' href='#'>
                  Privacy Policy
               </Link>
               <Typography display='inline' sx={{ mx: 0.5, opacity: 0.5 }}>
                  &nbsp;•&nbsp;
               </Typography>
               <Link color='text.secondary' href='#'>
                  Terms of Service
               </Link>
               <Copyright />
            </div>
            <Stack
               direction='row'
               justifyContent='left'
               spacing={1}
               useFlexGap
               sx={{
                  color: 'text.secondary',
               }}
            >
               <IconButton
                  target='_blank'
                  color='inherit'
                  href='https://github.com/JohnJLM'
                  aria-label='GitHub'
                  sx={{ alignSelf: 'center' }}
               >
                  <FacebookIcon sx={{ fontSize: '1.6em', color: '#000985' }} />
               </IconButton>
               <IconButton
                  target='_blank'
                  color='inherit'
                  href='https://www.linkedin.com/in/john-leal-/'
                  aria-label='LinkedIn'
                  sx={{ alignSelf: 'center' }}
               >
                  <LinkedInIcon sx={{ fontSize: '1.8em', color: '#114c8d' }} />
               </IconButton>
            </Stack>
         </Box>
      </Container>
   );
}
