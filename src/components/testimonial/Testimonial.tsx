import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

const userTestimonials = [
   {
      avatar: <Avatar alt='Carlos E.' src='/static/images/avatar/6.jpg' />,
      name: 'Carlos E.',
      occupation: 'CDO',
      testimonial:
         'La biblioteca digital me ha resultado increíblemente útil para gestionar mis lecturas. Ahora puedo consultar la disponibilidad de los libros en cualquier momento y hacer reservas de manera eficiente. No necesito molestar a otros usuarios para saber si han terminado con un libro específico, lo que agiliza todo el proceso. Este sistema no solo organiza mejor los préstamos, sino que también hace que el acceso a los libros sea más conveniente y sencillo.',
   },
   {
      avatar: <Avatar alt='Tammy G.' src='/static/images/avatar/2.jpg' />,
      name: 'Tammy G.',
      occupation: 'Lead Product Designer',
      testimonial:
         'Me parece que la biblioteca digital es de gran utilidad para el registro de libros. Me permite saber en qué momento puedo reservar y en qué momento los libros se liberan sin tener que estar preguntando a las personas si ya han terminado o no. Creo que este sistema pone orden y hace que el proceso de préstamo de libros sea más cómodo y fácil.',
   },
   {
      avatar: <Avatar alt='Laura U.' src='/static/images/avatar/3.jpg' />,
      name: 'Laura U.',
      occupation: 'CDO',
      testimonial:
         'El proyecto de la Biblioteca Virtual Siloé me encanta, con ventajas de tener el catálogo de libros a un click, mayor control del inventario, saber la disponibilidad de los mismos es mucho más fácil y lo mejor, es una forma de fomentar la lectura en la comunidad.',
   },
];

const whiteLogos = [
   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg',
   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
];

const darkLogos = [
   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
   'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

const logoStyle = {
   width: '64px',
   opacity: 0.3,
};

export default function Testimonials() {
   const theme = useTheme();
   const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

   return (
      <Container
         id='testimonials'
         sx={{
            pt: { xs: 4, sm: 12 },
            pb: { xs: 8, sm: 16 },
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 3, sm: 6 },
         }}
      >
         <Box
            sx={{
               width: { sm: '100%', md: '60%' },
               textAlign: { sm: 'left', md: 'center' },
            }}
         >
            <Typography component='h2' variant='h4' color='text.primary'>
               Testimonios
            </Typography>
         </Box>
         <Grid container spacing={2}>
            {userTestimonials.map((testimonial, index) => (
               <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
                  <Card
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        flexGrow: 1,
                        p: 1,
                     }}
                  >
                     <CardContent>
                        <Typography variant='body2' color='text.secondary'>
                           {testimonial.testimonial}
                        </Typography>
                     </CardContent>
                     <Box
                        sx={{
                           display: 'flex',
                           flexDirection: 'row',
                           justifyContent: 'space-between',
                           pr: 2,
                        }}
                     >
                        <CardHeader avatar={testimonial.avatar} title={testimonial.name} subheader={testimonial.occupation} />
                        <img src={logos[index]} alt={`Logo ${index + 1}`} style={logoStyle} />
                     </Box>
                  </Card>
               </Grid>
            ))}
         </Grid>
      </Container>
   );
}
