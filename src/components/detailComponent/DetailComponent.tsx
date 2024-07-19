import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../hooks/redux-hooks';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Card, CardActionArea, CardMedia } from '@mui/material';
import { get } from 'lodash';
import CircleIcon from '@mui/icons-material/Circle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import EditIcon from '@mui/icons-material/Edit';
import EditBookDialog from '../editBook/editBook';
import { useDispatch } from 'react-redux';
import { getCurrentBookError, setCurrentBook } from '../../store/slices/books.store';
import { getBookById } from '../../firebase/fb';
import './DetailComponent.css';
import { isDesktop } from '../../utils/isDesktop.util';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';

export default function DetailComponent() {
   const [showEditDialog, setShowEditDialog] = useState({ show: false, book: null });
   const booksStore = useAppSelector((store) => store.books);
   const { list, current } = booksStore;
   const params = useParams();
   const { id } = params;
   const authStore = useAppSelector((store) => store.auth);
   const { admin } = authStore;
   const dispacth = useDispatch();
   const isDesktopDevice = isDesktop();

   useEffect(() => {
      if (!current && list) dispacth(setCurrentBook(list.filter((book) => book.id === id)));
      else if (!current && !list) getBookOnBBDD();
   }, []);

   async function getBookOnBBDD() {
      const book = await getBookById(id);
      if (book) dispacth(setCurrentBook(book));
      else dispacth(getCurrentBookError());
   }

   return (
      <Box id='DetailComponent' sx={{ pb: '100px', mt: '95px' }}>
         {current && (
            <div>
               <Typography
                  component='h1'
                  variant='h1'
                  align='center'
                  color='text.primary'
                  sx={{ mb: '0.5em', fontSize: '3.5em', color: '#3c5e24' }}
               >
                  {current.title}
               </Typography>
               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2.5em', justifyContent: 'center' }}>
                  {[get(current, 'frontPage', 'test'), get(current, 'backCover', 'test2')].map((bookImg, index) => (
                     <Card sx={{ width: isDesktopDevice ? '400px' : '350px', height: '500px' }} key={index} id={`card_${index}`}>
                        <CardActionArea sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                           <CardMedia
                              component='img'
                              image={bookImg} // Aquí usamos la imagen del array
                              sx={{ objectFit: 'cover', height: 500, ':hover': { cursor: 'default' } }}
                           />
                           {admin && (
                              <div className='editBook'>
                                 <Button
                                    id={`button${index}`}
                                    key={`key${index}`}
                                    variant='contained'
                                    color='primary'
                                    endIcon={<EditIcon />}
                                    onClick={(e) => {
                                       e.preventDefault();
                                       setShowEditDialog({ show: true, book: current });
                                    }}
                                 >
                                    Editar
                                 </Button>
                              </div>
                           )}
                        </CardActionArea>
                     </Card>
                  ))}
               </Box>
               <div className='detailStateBook'>
                  <div className={current.state.toLowerCase() == 'disponible' ? 'stateMsgDisponible' : 'stateMsgOcupado'}>
                     {current.state.toLowerCase() == 'disponible' ? (
                        <CircleIcon sx={{ color: 'green' }} />
                     ) : (
                        <DoNotDisturbOnIcon sx={{ color: 'red' }} />
                     )}
                     <Typography color={'#000'} variant='h5'>
                        {current.state}
                     </Typography>
                  </div>
               </div>
               <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <div className='iconDetailContainer'>
                     <div className='iconDetail'>
                        <Typography sx={{ fontSize: '1em', fontWeight: '500' }}>Autor</Typography>
                        <PersonIcon />
                        <Typography sx={{ fontSize: '1em' }}>{current.author}</Typography>
                     </div>
                     <div className='iconDetail'>
                        <Typography sx={{ fontSize: '1em', fontWeight: '500' }}>Nº de páginas</Typography>
                        <AutoStoriesIcon />
                        <Typography sx={{ fontSize: '1em' }}>{current.pages}</Typography>
                     </div>
                     <div className='iconDetail'>
                        <Typography sx={{ fontSize: '1em', fontWeight: '500' }}>Editorial</Typography>
                        <ApartmentIcon />
                        <Typography sx={{ fontSize: '1em' }}>{current.editorial}</Typography>
                     </div>
                  </div>
               </div>
               {current?.description && (
                  <div style={{ width: '100vw' }}>
                     <Typography
                        color={'text.primary'}
                        sx={{
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center',
                        }}
                     >
                        <div className='descriptionDetailBook'>{current.description}</div>
                     </Typography>
                  </div>
               )}
            </div>
         )}
         {showEditDialog.show && (
            <EditBookDialog
               refreshRequest={getBookOnBBDD}
               show={showEditDialog.show}
               closeDialog={() => {
                  setShowEditDialog({ show: false, book: null });
               }}
               bookToEdit={showEditDialog.book}
            />
         )}
      </Box>
   );
}
