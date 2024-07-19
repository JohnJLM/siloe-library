import { Button, DialogActions, DialogContent, IconButton, ImageListItem, ImageListItemBar, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import './addBook.css';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import { NEW_BOOK } from '../../constants/BOOK.contants';
import { addBookRequest, uploadFile } from '../../firebase/fb';
import { v4 as uuidv4 } from 'uuid';
import { dotSpinner } from 'ldrs';
import { isDesktop } from '../../utils/isDesktop.util';

const VisuallyHiddenInput = styled('input')({
   clip: 'rect(0 0 0 0)',
   clipPath: 'inset(50%)',
   height: 1,
   overflow: 'hidden',
   position: 'absolute',
   bottom: 0,
   left: 0,
   whiteSpace: 'nowrap',
   width: 1,
});

export interface AddBookProps {
   show: boolean;
   closeDialog: () => void;
   refreshList?: () => void;
}

export default function AddBook({ show, closeDialog, refreshList }: AddBookProps) {
   const [newBook, setNewBook] = useState(NEW_BOOK);
   const [frontPage, setFrontPage] = useState(null);
   const [backCover, setBackCover] = useState(null);
   const [stepTwo, setStepTwo] = useState(false);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const isDesktopDevice = isDesktop();
   dotSpinner.register();

   // Default values shown

   const getFile = (event, isFrontPage) => {
      if (isFrontPage) setFrontPage({ preview: URL.createObjectURL(event.target.files[0]), img: event.target.files[0] });
      else setBackCover({ preview: URL.createObjectURL(event.target.files[0]), img: event.target.files[0] });
   };

   async function addBook() {
      setLoading(true);
      const uniqueId = uuidv4();
      try {
         const cloneBook = structuredClone(newBook);
         const frontPageUrl = frontPage?.img ? await uploadFile(frontPage.img, uniqueId, true) : null;
         const backCoverUrl = backCover?.img ? await uploadFile(backCover.img, uniqueId, false) : null;

         if (frontPageUrl) cloneBook.frontPage = frontPageUrl;
         if (backCoverUrl) cloneBook.backCover = backCoverUrl;

         const newBookId = await addBookRequest(cloneBook);
         console.log('Libro creado con el ID:', newBookId);
         setLoading(false);
         setStepTwo(true);
      } catch (error) {
         setError(true);
         console.error('Error al agregar el libro:', error);
      }
   }

   const editBook = (property, value) => {
      setNewBook((prev) => ({ ...prev, [property]: value }));
   };

   const resetStates = () => {
      setNewBook(NEW_BOOK);
      setFrontPage(null);
      setBackCover(null);
      setStepTwo(false);
      setLoading(false);
      setError(false);
   };

   return (
      <div>
         <Dialog
            open={show}
            onClose={(_event, reason) => {
               if (!reason) closeDialog();
            }}
            maxWidth={false}
            sx={{ overflowX: { xs: 'hidden' } }}
            fullWidth={!isDesktopDevice}
         >
            <div className='contentAddBook'>
               <DialogTitle className='titleAddBook' id='titleAddBook'>
                  {'Añadir un libro'}
               </DialogTitle>
               <DialogContent sx={{ padding: { xs: '0px' }, width: { xs: '100%' } }}>
                  {!error && !stepTwo && (
                     <div className={'componentAddBook'}>
                        {loading && (
                           <div className='loaderAddBook'>
                              <l-dot-spinner size='70' speed='0.9' color='black'></l-dot-spinner>
                              <div className='loaderAddBookText'>
                                 <div>{'Añadiendo libro a la base de datos'}</div>
                                 <div>{'Por favor espere'}</div>
                              </div>
                           </div>
                        )}
                        <div className='inputsAddBook'>
                           <TextField
                              sx={{ flex: 1 }}
                              id='titleInput'
                              fullWidth
                              label='Titulo'
                              variant='standard'
                              onChange={(event) => editBook('title', event.target.value)}
                           />
                           <TextField
                              sx={{ flex: 1 }}
                              id='authorInput'
                              label='Autor'
                              fullWidth
                              variant='standard'
                              onChange={(event) => editBook('author', event.target.value)}
                           />
                           <TextField
                              sx={{ flex: 1 }}
                              id='editorialInput'
                              fullWidth
                              label='Editorial'
                              variant='standard'
                              onChange={(event) => editBook('editorial', event.target.value)}
                           />
                           <TextField
                              sx={{ flex: 1 }}
                              id='pagesInput'
                              fullWidth
                              label='Nº de páginas'
                              variant='standard'
                              onChange={(event) => editBook('pages', event.target.value)}
                           />
                           <TextField
                              sx={{ flex: 1 }}
                              id='stateInput'
                              fullWidth
                              label='Estado (Disponible, Ocupado por -- desde --)'
                              variant='standard'
                              onChange={(event) => editBook('state', event.target.value)}
                           />
                        </div>
                        <div className='inputDescription'>
                           <TextField
                              id='descriptionInput'
                              label='Descripción'
                              fullWidth
                              multiline
                              rows={12}
                              variant='standard'
                              onChange={(event) => editBook('description', event.target.value)}
                           />
                        </div>
                        {!frontPage ? (
                           <div className='buttonImg'>
                              <Button
                                 component='label'
                                 role={undefined}
                                 variant='outlined'
                                 tabIndex={-1}
                                 startIcon={<CloudUploadIcon />}
                                 size='large'
                              >
                                 Portada
                                 <VisuallyHiddenInput type='file' onChange={(event) => getFile(event, true)} />
                              </Button>
                           </div>
                        ) : (
                           <div className='imgPreviewAddBook'>
                              <ImageListItem key={'PortadaContainer'} sx={{ width: { sx: '100%' } }}>
                                 <img src={`${frontPage.preview}`} alt={'Portada'} loading='lazy' />
                                 <ImageListItemBar
                                    sx={{ backgroundColor: 'rgba(55, 55, 55, 0.6)', borderRadius: '15px' }}
                                    title={'Portada'}
                                    // subtitle={item.author}
                                    actionIcon={
                                       <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} onClick={() => setFrontPage(null)}>
                                          <CancelIcon />
                                       </IconButton>
                                    }
                                 />
                              </ImageListItem>
                           </div>
                        )}
                        {!backCover ? (
                           <div className='buttonImg'>
                              <Button
                                 component='label'
                                 role={undefined}
                                 variant='outlined'
                                 tabIndex={-1}
                                 startIcon={<CloudUploadIcon />}
                                 size='large'
                              >
                                 Contraportada
                                 <VisuallyHiddenInput type='file' onChange={(event) => getFile(event, false)} />
                              </Button>
                           </div>
                        ) : (
                           <div className='imgPreviewAddBook'>
                              <ImageListItem key={'BackCoverContainer'}>
                                 <img src={`${backCover.preview}`} alt={'backCover'} loading='lazy' />
                                 <ImageListItemBar
                                    sx={{ backgroundColor: 'rgba(55, 55, 55, 0.6)', borderRadius: '15px' }}
                                    title={'Contraportada'}
                                    // subtitle={item.author}
                                    actionIcon={
                                       <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} onClick={() => setBackCover(null)}>
                                          <CancelIcon />
                                       </IconButton>
                                    }
                                 />
                              </ImageListItem>
                           </div>
                        )}
                     </div>
                  )}
                  {stepTwo && !error && (
                     <div className='stepTwoContainer'>
                        <div className='textStepTwo'>El libro se ha creado con exito!!! 😎😁👍</div>
                     </div>
                  )}
                  {error && (
                     <div className='stepTwoContainer'>
                        <div className='textStepTwo'>Ha ocurrido un error disculpe. 😔</div>
                     </div>
                  )}
               </DialogContent>
            </div>
            <DialogActions sx={{ mb: '0.5em', mr: '1em' }}>
               <Button
                  autoFocus
                  onClick={() => {
                     if (stepTwo && refreshList) refreshList();
                     resetStates();
                     closeDialog();
                  }}
                  size='large'
                  disabled={loading}
                  color='error'
                  variant='contained'
               >
                  Cancelar
               </Button>
               {!stepTwo && (
                  <Button
                     onClick={() => addBook()}
                     autoFocus
                     size='large'
                     disabled={
                        !newBook?.title ||
                        !newBook?.author ||
                        !newBook?.description ||
                        !newBook?.state ||
                        !newBook?.editorial ||
                        !frontPage ||
                        loading
                     }
                     variant='contained'
                  >
                     Añadir
                  </Button>
               )}
               {stepTwo && (
                  <Button onClick={() => resetStates()} autoFocus size='large' disabled={loading} variant='contained'>
                     Añadir otro libro
                  </Button>
               )}
            </DialogActions>
         </Dialog>
      </div>
   );
}
