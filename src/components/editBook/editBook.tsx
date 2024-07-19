/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DialogActions, DialogContent, IconButton, ImageListItem, ImageListItemBar, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import './editBook.css';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import { NEW_BOOK } from '../../constants/BOOK.contants';
import { getCollection, updateBookRequest, uploadFile } from '../../firebase/fb';
import { dotSpinner } from 'ldrs';
import { getBooks, getBooksSuccess } from '../../store/slices/books.store';
import { useDispatch } from 'react-redux';
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
   bookToEdit?: any;
   id?: string;
   refreshRequest?: () => void;
}

export default function EditBookDialog({ show, closeDialog, bookToEdit, id, refreshRequest }: AddBookProps) {
   const [newBook, setNewBook] = useState(bookToEdit);
   const [frontPage, setFrontPage] = useState(null);
   const [backCover, setBackCover] = useState(null);
   const [stepTwo, setStepTwo] = useState(false);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const dispatch = useDispatch();
   const isDesktopDevice = isDesktop();
   dotSpinner.register();

   //GetImgLink
   const getFile = (event, isFrontPage) => {
      if (isFrontPage) setFrontPage({ preview: URL.createObjectURL(event.target.files[0]), img: event.target.files[0] });
      else setBackCover({ preview: URL.createObjectURL(event.target.files[0]), img: event.target.files[0] });
   };

   const editCurrentBook = (property, value) => {
      setNewBook((prev) => ({ ...prev, [property]: value }));
      if (property === 'frontPage') setFrontPage(null);
      if (property === 'backCover') setBackCover(null);
   };

   async function editBookOnBBDD() {
      setLoading(true);

      if (bookToEdit) {
         try {
            const cloneBook = structuredClone(newBook);
            const frontPageUrl = frontPage?.img ? await uploadFile(frontPage.img, newBook.id, true) : null;
            const backCoverUrl = backCover?.img ? await uploadFile(backCover.img, newBook.id, false) : null;

            if (frontPageUrl) cloneBook.frontPage = frontPageUrl;
            if (backCoverUrl) cloneBook.backCover = backCoverUrl;

            updateBookRequest(cloneBook.id, cloneBook);
            setLoading(false);
            setStepTwo(true);
         } catch (error) {
            setError(true);
            console.error('Error al agregar el libro:', error);
         }
      }
   }

   async function getBooksRequest() {
      dispatch(getBooks());
      const list = await getCollection('books');
      dispatch(getBooksSuccess(list));
   }

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
            id={id}
            open={show}
            onClose={(_event, reason) => {
               if (!reason) closeDialog();
            }}
            maxWidth={false}
            sx={{ overflowX: { xs: 'hidden' } }}
            fullWidth={!isDesktopDevice}
         >
            <div className='contentAddBook'>
               <DialogTitle className='titleAddBook' id='titleEditBook'>
                  {'Editar libro'}
               </DialogTitle>
               <DialogContent sx={{ padding: { xs: '0px' } }}>
                  {!error && !stepTwo && (
                     <div className='componentAddBook'>
                        {loading && (
                           <div className='loaderAddBook'>
                              <l-dot-spinner size='70' speed='0.9' color='black'></l-dot-spinner>
                              <div className='loaderAddBookText'>
                                 <div>{'Editando libro en base de datos'}</div>
                                 <div>{'Por favor espere'}</div>
                              </div>
                           </div>
                        )}
                        <div className='inputsAddBook'>
                           <TextField
                              sx={{ flex: 1 }}
                              fullWidth
                              label='Titulo'
                              variant='standard'
                              onChange={(event) => editCurrentBook('title', event.target.value)}
                              value={newBook?.title}
                           />
                           <TextField
                              sx={{ flex: 1 }}
                              label='Autor'
                              fullWidth
                              variant='standard'
                              onChange={(event) => editCurrentBook('author', event.target.value)}
                              value={newBook?.author}
                           />
                           <TextField
                              sx={{ flex: 1 }}
                              fullWidth
                              label='Editorial'
                              variant='standard'
                              onChange={(event) => editCurrentBook('editorial', event.target.value)}
                              value={newBook?.editorial}
                           />
                           <TextField
                              sx={{ flex: 1 }}
                              fullWidth
                              label='Nº de páginas'
                              variant='standard'
                              onChange={(event) => editCurrentBook('pages', event.target.value)}
                              value={newBook?.pages}
                           />
                           <TextField
                              sx={{ flex: 1 }}
                              fullWidth
                              label='Estado (Disponible, Ocupado por -- desde --)'
                              variant='standard'
                              onChange={(event) => editCurrentBook('state', event.target.value)}
                              value={newBook?.state}
                           />
                        </div>
                        <div className='inputDescription'>
                           <TextField
                              label='Descripción'
                              fullWidth
                              multiline
                              rows={12}
                              variant='standard'
                              onChange={(event) => editCurrentBook('description', event.target.value)}
                              value={newBook?.description}
                           />
                        </div>
                        {!newBook.frontPage && !frontPage ? (
                           <div className='buttonImg'>
                              <Button
                                 component='label'
                                 role={undefined}
                                 variant='outlined'
                                 tabIndex={-1}
                                 startIcon={<CloudUploadIcon />}
                                 size={'large'}
                              >
                                 Portada
                                 <VisuallyHiddenInput type='file' onChange={(event) => getFile(event, true)} />
                              </Button>
                           </div>
                        ) : (
                           <div className='imgPreviewAddBook'>
                              <ImageListItem key={'PortadaContainer'}>
                                 <img
                                    src={`${newBook?.frontPage ? newBook.frontPage : frontPage.preview}`}
                                    alt={'Portada'}
                                    loading='lazy'
                                 />
                                 <ImageListItemBar
                                    sx={{ backgroundColor: 'rgba(55, 55, 55, 0.6)', borderRadius: '15px' }}
                                    title={'Portada'}
                                    // subtitle={item.author}
                                    actionIcon={
                                       <IconButton
                                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                          onClick={() => editCurrentBook('frontPage', null)}
                                       >
                                          <CancelIcon />
                                       </IconButton>
                                    }
                                 />
                              </ImageListItem>
                           </div>
                        )}
                        {!newBook.backCover && !backCover ? (
                           <div className='buttonImg'>
                              <Button
                                 component='label'
                                 role={undefined}
                                 variant='outlined'
                                 tabIndex={-1}
                                 startIcon={<CloudUploadIcon />}
                                 size={'large'}
                              >
                                 Contraportada
                                 <VisuallyHiddenInput type='file' onChange={(event) => getFile(event, false)} />
                              </Button>
                           </div>
                        ) : (
                           <div className='imgPreviewAddBook'>
                              <ImageListItem key={'BackCoverContainer'}>
                                 <img
                                    src={`${newBook?.backCover ? newBook.backCover : backCover.preview}`}
                                    alt={'backCover'}
                                    loading='lazy'
                                 />
                                 <ImageListItemBar
                                    sx={{ backgroundColor: 'rgba(55, 55, 55, 0.6)', borderRadius: '15px' }}
                                    title={'Contraportada'}
                                    // subtitle={item.author}
                                    actionIcon={
                                       <IconButton
                                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                          onClick={() => editCurrentBook('backCover', null)}
                                       >
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
                        <div className='textStepTwo'>El libro editado con exito!!! 😎😁👍</div>
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
                     if (stepTwo && !refreshRequest) getBooksRequest();
                     else if (refreshRequest) refreshRequest();
                     resetStates();
                     closeDialog();
                  }}
                  size='large'
                  disabled={loading}
                  color='error'
                  variant='contained'
               >
                  {stepTwo ? 'Salir' : 'Cancelar'}
               </Button>
               {!stepTwo && (
                  <Button
                     onClick={() => {
                        if (bookToEdit) editBookOnBBDD();
                     }}
                     autoFocus
                     size='large'
                     disabled={
                        !newBook?.title ||
                        !newBook?.author ||
                        !newBook?.description ||
                        !newBook?.state ||
                        !newBook?.editorial ||
                        loading
                     }
                     variant='contained'
                  >
                     {bookToEdit ? 'Editar' : 'Añadir'}
                  </Button>
               )}
            </DialogActions>
         </Dialog>
      </div>
   );
}
