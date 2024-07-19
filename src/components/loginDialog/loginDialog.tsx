import './loginDialog.css';
import { Button, DialogActions, DialogContent, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { dotSpinner } from 'ldrs';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import { authenticateUser } from '../../firebase/fb';
import { useDispatch } from 'react-redux';
import { AuthReset, AuthValidationFail, AuthValidationSuccess } from '../../store/slices/auth.store';
import { useAppSelector } from '../../hooks/redux-hooks';
import Alert from '@mui/material/Alert';
import { isDesktop } from '../../utils/isDesktop.util';

export interface LoginDialogProps {
   show: boolean;
   closeDialog: () => void;
}

export default function LoginDialog({ show, closeDialog }: LoginDialogProps) {
   const [user, setUser] = useState({ user: null, password: null });
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();
   const authStore = useAppSelector((store) => store.auth);
   const { error, admin } = authStore;
   const isDesktopDevice = isDesktop();
   dotSpinner.register();

   const editUser = (property, value) => {
      setUser((prev) => ({ ...prev, [property]: value }));
   };

   const resetStates = () => {
      setUser(null);
      setLoading(null);
   };

   const authLoginAdmin = async () => {
      setLoading(true);
      try {
         // Verificar el usuario en BBDD
         const auth = await authenticateUser(user.user, user.password);
         if (auth) {
            closeDialog();
            dispatch(AuthValidationSuccess(auth));
         } else dispatch(AuthValidationFail());
      } catch (error) {
         console.error('Error al autenticar usuario:', error);
         dispatch(AuthValidationFail());
      }
      setLoading(false);
   };

   useEffect(() => {
      if (admin) closeDialog();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [admin]);

   return (
      <div>
         <Dialog
            open={show}
            onClose={(_event, reason) => {
               if (!reason) closeDialog();
            }}
            maxWidth={false}
            sx={{ padding: { xs: '0px 0px 0px 0px' } }}
         >
            <div className='contentLoginDialog'>
               <DialogTitle className='titleAddBook' id='titleAddBook'>
                  {'Iniciar sesión admin  '} <LunchDiningIcon />
               </DialogTitle>
               <DialogContent sx={{ padding: { xs: '0px 0px 0px 0px' } }}>
                  <div className={isDesktopDevice ? 'componentLoginDialog' : 'componentLoginDialogMobile'}>
                     {loading && (
                        <div className='loaderAddBook'>
                           <l-dot-spinner size='70' speed='0.9' color='black'></l-dot-spinner>
                           <div className='loaderAddBookText'>
                              <div>{'Iniciando Sesión'}</div>
                           </div>
                        </div>
                     )}
                     <div className='inputsLoginAdmin'>
                        <TextField
                           sx={{ flex: 1 }}
                           id='titleInput'
                           fullWidth
                           label='Usuario'
                           variant='standard'
                           onChange={(event) => editUser('user', event.target.value)}
                        />
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                           <TextField
                              id='authorInput'
                              label='Contraseña'
                              fullWidth
                              variant='standard'
                              type='password'
                              onChange={(event) => editUser('password', event.target.value)}
                           />
                           {
                              <div style={error ? { visibility: 'initial' } : { visibility: 'hidden' }}>
                                 <Alert severity='error' variant='filled'>
                                    Credenciales invalidas
                                 </Alert>
                              </div>
                           }
                        </div>
                        <Button
                           sx={{ mt: '10px' }}
                           onClick={() => authLoginAdmin()}
                           autoFocus
                           size='large'
                           disabled={!user?.user || !user?.password || loading}
                           variant='contained'
                        >
                           Login
                        </Button>
                     </div>
                  </div>
               </DialogContent>
            </div>
            <DialogActions sx={{ mb: '0.5em', mr: '1em' }}>
               <Button
                  autoFocus
                  onClick={() => {
                     resetStates();
                     closeDialog();
                     dispatch(AuthReset());
                  }}
                  size='large'
                  disabled={loading}
                  color='error'
                  variant='contained'
               >
                  Cancelar
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
