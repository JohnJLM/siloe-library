import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TopBar from '../components/top-bar/TopBar';
import getLPTheme from '../themes/getLPTheme';
import { useEffect, useState } from 'react';
import DetailComponent from '../components/detailComponent/DetailComponent';
import Footer from '../components/footer/Footer';
import { useAppSelector } from '../hooks/redux-hooks';

export default function Detail() {
   const authStore = useAppSelector((store) => store.auth);
   const [mode, setMode] = useState<PaletteMode>(authStore.darkTheme ? 'dark' : 'light');
   const LPtheme = createTheme(getLPTheme(mode));

   const toggleColorMode = () => {
      setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
   };

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   return (
      <ThemeProvider theme={LPtheme}>
         <CssBaseline />
         <TopBar mode={mode} toggleColorMode={toggleColorMode} />
         <Box sx={{ bgcolor: 'background.default', width: '100vw' }}>
            <DetailComponent />
            <Footer detail={true} />
         </Box>
      </ThemeProvider>
   );
}
