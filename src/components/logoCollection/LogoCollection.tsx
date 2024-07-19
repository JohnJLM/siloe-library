import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

const whiteLogos = [
   'https://firebasestorage.googleapis.com/v0/b/siloe-library.appspot.com/o/logos%2Flogo-nuevo-paulinas-png.png?alt=media&token=bdc6d020-6c4a-4cbf-af49-646590b283b8',
   'https://firebasestorage.googleapis.com/v0/b/siloe-library.appspot.com/o/logos%2Fclaret.png?alt=media&token=6352aca7-f8d3-43f4-b338-828341d49e48',
   'https://firebasestorage.googleapis.com/v0/b/siloe-library.appspot.com/o/logos%2Fcpl.jpg?alt=media&token=bc1ff25d-b324-4e58-b928-3b30f3d12351',
   'https://firebasestorage.googleapis.com/v0/b/siloe-library.appspot.com/o/logos%2FmundoNegro.jpg?alt=media&token=1a6c7140-7b35-40aa-bf77-d06e23116b86',
   'https://firebasestorage.googleapis.com/v0/b/siloe-library.appspot.com/o/logos%2Fobelisco.png?alt=media&token=ab62ba9b-eef3-455a-ade8-c78654e8e2a0',
   'https://firebasestorage.googleapis.com/v0/b/siloe-library.appspot.com/o/logos%2FSalTerrae.png?alt=media&token=c620f705-d00d-4ee1-9d66-c75a2050bec0',
   'https://firebasestorage.googleapis.com/v0/b/siloe-library.appspot.com/o/logos%2FverboDivino.png?alt=media&token=680038e6-f3b8-4e95-8994-d2d570bdd506',
];

const darkLogos = [
   'https://firebasestorage.googleapis.com/v0/b/siloe-library.appspot.com/o/logos%2Flogo-nuevo-paulinas-png.png?alt=media&token=bdc6d020-6c4a-4cbf-af49-646590b283b8',
   'https://firebasestorage.googleapis.com/v0/b/siloe-library.appspot.com/o/logos%2Fclaret.png?alt=media&token=6352aca7-f8d3-43f4-b338-828341d49e48',
   'https://firebasestorage.googleapis.com/v0/b/siloe-library.appspot.com/o/logos%2Fcpl.jpg?alt=media&token=bc1ff25d-b324-4e58-b928-3b30f3d12351',
   'https://firebasestorage.googleapis.com/v0/b/siloe-library.appspot.com/o/logos%2FmundoNegro.jpg?alt=media&token=1a6c7140-7b35-40aa-bf77-d06e23116b86',
   'https://firebasestorage.googleapis.com/v0/b/siloe-library.appspot.com/o/logos%2Fobelisco.png?alt=media&token=ab62ba9b-eef3-455a-ade8-c78654e8e2a0',
   'https://firebasestorage.googleapis.com/v0/b/siloe-library.appspot.com/o/logos%2FSalTerrae.png?alt=media&token=c620f705-d00d-4ee1-9d66-c75a2050bec0',
   'https://firebasestorage.googleapis.com/v0/b/siloe-library.appspot.com/o/logos%2FverboDivino.png?alt=media&token=680038e6-f3b8-4e95-8994-d2d570bdd506',
];

const logoStyle = {
   width: '100px',
   height: '80px',
   margin: '0 32px',
   opacity: 0.9,
   borderRadius: '20px',
};

export default function LogoCollection() {
   const theme = useTheme();
   const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

   return (
      <Box id='logoCollection' sx={{ py: 4, mt: '2em' }}>
         <Typography component='h4' variant='h4' align='center' color='text.secondary'>
            Con libros de las siguientes editoriales
         </Typography>
         <Grid container justifyContent='center' sx={{ mt: '2em' }}>
            {logos.map((logo, index) => (
               <Grid item key={index}>
                  <img src={logo} alt={`Fake company number ${index + 1}`} style={logoStyle} />
               </Grid>
            ))}
         </Grid>
      </Box>
   );
}
