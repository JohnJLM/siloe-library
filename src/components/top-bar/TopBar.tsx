import { PaletteMode, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleTopBarColor from './ToggleTopBarColor';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import AddBook from '../addBook/addBook';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LoginDialog from '../loginDialog/loginDialog';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch } from 'react-redux';
import { AuthReset, setDarkTheme } from '../../store/slices/auth.store';

//
interface AppAppBarProps {
   mode: PaletteMode;
   toggleColorMode: () => void;
   getBooksRequest?: (collection) => void;
}
//

export default function TopBar({ mode, toggleColorMode, getBooksRequest }: AppAppBarProps) {
   const theme = useTheme();
   const logo =
      theme.palette.mode === 'dark'
         ? 'https://firebasestorage.googleapis.com/v0/b/siloe-library.appspot.com/o/cruzB.png?alt=media&token=17ecf55c-8abc-4a9d-833b-07063fb0c686'
         : 'https://firebasestorage.googleapis.com/v0/b/siloe-library.appspot.com/o/CruzN.png?alt=media&token=90d327c2-f7cd-4cb8-8ba3-869c3ef90732';
   const [open, setOpen] = useState(false);
   const [showAddBook, setShowAddBook] = useState(false);
   const [showLoginDialog, setShowLoginDialog] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const authStore = useAppSelector((store) => store.auth);
   const { admin, name } = authStore;

   const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
   };

   const scrollToSection = (sectionId: string) => {
      const sectionElement = document.getElementById(sectionId);
      const offset = 128;
      if (sectionElement) {
         const targetScroll = sectionElement.offsetTop - offset;
         sectionElement.scrollIntoView({ behavior: 'smooth' });
         window.scrollTo({
            top: targetScroll,
            behavior: 'smooth',
         });
         setOpen(false);
      }
   };

   return (
      <div>
         <AppBar
            position='fixed'
            sx={{
               boxShadow: 0,
               bgcolor: 'transparent',
               backgroundImage: 'none',
               mt: 2,
            }}
         >
            <Container maxWidth='lg'>
               <Toolbar
                  variant='regular'
                  sx={(theme) => ({
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'space-between',
                     flexShrink: 0,
                     borderRadius: '999px',
                     bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
                     backdropFilter: 'blur(24px)',
                     maxHeight: 40,
                     border: '1px solid',
                     borderColor: 'divider',
                     boxShadow:
                        theme.palette.mode === 'light'
                           ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                           : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                  })}
               >
                  <Box
                     sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        ml: '-18px',
                        px: 0,
                     }}
                  >
                     <img
                        src={logo}
                        style={{
                           width: '75px',
                           height: '65px',
                           cursor: 'pointer',
                           borderRadius: '15px',
                           marginRight: '10px',
                        }}
                        onClick={() => navigate('/')}
                     />
                     <Typography
                        variant='h5'
                        color='text.primary'
                        onClick={() => navigate('/')}
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                     >
                        Biblioteca Siloé
                     </Typography>
                     <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <MenuItem onClick={() => scrollToSection('testimonials')} sx={{ py: '6px', px: '12px' }}>
                           <Typography variant='body2' color='text.primary'>
                              Testimonios
                           </Typography>
                        </MenuItem>
                     </Box>
                  </Box>
                  <Box
                     sx={{
                        display: { xs: 'none', md: 'flex' },
                        gap: 0.5,
                        alignItems: 'center',
                     }}
                  >
                     <ToggleTopBarColor
                        mode={mode}
                        toggleColorMode={() => {
                           dispatch(setDarkTheme());
                           toggleColorMode();
                        }}
                     />
                     {admin && (
                        <div
                           style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              gap: '8px',
                              marginRight: '10px',
                           }}
                        >
                           <Typography variant='body2' color='text.primary'>
                              Bienvenido {name}!
                           </Typography>
                        </div>
                     )}
                     {admin ? (
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '13px' }}>
                           <Button color='primary' variant='contained' size='small' onClick={() => setShowAddBook(true)}>
                              Añadir libro <AddIcon />
                           </Button>
                           <Button
                              sx={{ padding: '16px', border: '1px solid #000' }}
                              color='error'
                              variant='contained'
                              size='small'
                              onClick={() => dispatch(AuthReset())}
                           >
                              Cerrar Sesión <LockIcon />
                           </Button>
                        </div>
                     ) : (
                        <Button
                           endIcon={<LunchDiningIcon />}
                           color='primary'
                           variant='contained'
                           size='small'
                           onClick={() => setShowLoginDialog(true)}
                        >
                           ¿Admin?
                        </Button>
                     )}
                  </Box>
                  <Box sx={{ display: { sm: '', md: 'none' } }}>
                     <Button
                        variant='text'
                        color='primary'
                        aria-label='menu'
                        onClick={toggleDrawer(true)}
                        sx={{ minWidth: '30px', p: '4px' }}
                     >
                        <MenuIcon />
                     </Button>
                     <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
                        <Box
                           sx={{
                              minWidth: '60vw',
                              p: 2,
                              backgroundColor: 'background.paper',
                              flexGrow: 1,
                           }}
                        >
                           <Box
                              sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 alignItems: 'end',
                                 flexGrow: 1,
                              }}
                           >
                              <ToggleTopBarColor
                                 mode={mode}
                                 toggleColorMode={() => {
                                    dispatch(setDarkTheme());
                                    toggleColorMode();
                                 }}
                              />
                           </Box>
                           <MenuItem onClick={() => scrollToSection('testimonials')}>Testimonios</MenuItem>
                           <Divider />
                           {admin && (
                              <div
                                 style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '10px',
                                    marginTop: '25px',
                                 }}
                              >
                                 <Typography variant='body2' color='text.primary'>
                                    Bienvenido {name}!
                                 </Typography>
                              </div>
                           )}
                           {admin ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
                                 <MenuItem>
                                    <Button
                                       color='primary'
                                       variant='contained'
                                       size='medium'
                                       onClick={() => setShowAddBook(true)}
                                    >
                                       Añadir libro <AddIcon />
                                    </Button>
                                 </MenuItem>

                                 <MenuItem>
                                    <Button
                                       sx={{ padding: '16px', border: '1px solid #000' }}
                                       color='error'
                                       variant='contained'
                                       size='medium'
                                       onClick={() => dispatch(AuthReset())}
                                    >
                                       Cerrar Sesión <LockIcon />
                                    </Button>
                                 </MenuItem>
                              </div>
                           ) : (
                              <div
                                 style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '25px',
                                 }}
                              >
                                 <Button
                                    endIcon={<LunchDiningIcon />}
                                    color='primary'
                                    variant='contained'
                                    size='medium'
                                    onClick={() => setShowLoginDialog(true)}
                                 >
                                    ¿Admin?
                                 </Button>
                              </div>
                           )}
                        </Box>
                     </Drawer>
                  </Box>
               </Toolbar>
               <AddBook
                  show={showAddBook}
                  closeDialog={() => setShowAddBook(false)}
                  refreshList={() => getBooksRequest('books')}
               />
               <LoginDialog closeDialog={() => setShowLoginDialog(false)} show={showLoginDialog} />
            </Container>
         </AppBar>
      </div>
   );
}
