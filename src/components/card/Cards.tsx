import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import { useAppSelector } from '../../hooks/redux-hooks';
import './Card.css';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import EditBookDialog from '../editBook/editBook';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentBook } from '../../store/slices/books.store';

export default function Cards({ list }) {
   const [showEditDialog, setShowEditDialog] = useState({ show: false, book: null });
   const authStore = useAppSelector((store) => store.auth);
   const { admin } = authStore;
   const navigate = useNavigate();
   const dispatch = useDispatch();

   return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2.5em', justifyContent: 'center' }}>
         {list?.length &&
            list.map((book, index) => (
               <Card sx={{ width: '320px', height: '510px' }} key={index} id={`card_${index}`}>
                  <CardActionArea
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        height: '100%',
                     }}
                  >
                     <CardMedia
                        component='img'
                        image={book.frontPage}
                        sx={{ objectFit: 'cover', height: 400 }} // Ajusta aquí la altura deseada
                        onClick={() => {
                           dispatch(setCurrentBook(book));
                           navigate(`/${book.id}`);
                        }}
                     />
                     <CardContent sx={{ flex: 1 }}>
                        <Typography gutterBottom variant='h5' component='div'>
                           {book.title}
                        </Typography>
                        <Typography
                           variant='body2'
                           color='text.secondary'
                           sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              gap: '3px',
                           }}
                        >
                           {book.state?.toLowerCase() == 'disponible' ? (
                              <CircleIcon sx={{ color: 'green' }} />
                           ) : (
                              <DoNotDisturbOnIcon sx={{ color: 'red' }} />
                           )}
                           {book.state}
                        </Typography>
                     </CardContent>
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
                                 setShowEditDialog({ show: true, book });
                              }}
                           >
                              Editar
                           </Button>
                        </div>
                     )}
                  </CardActionArea>
               </Card>
            ))}
         {showEditDialog.show && (
            <EditBookDialog
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
