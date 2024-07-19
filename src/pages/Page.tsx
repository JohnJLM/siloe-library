import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Hero from '../components/hero/Hero';
import TopBar from '../components/top-bar/TopBar';
import Testimonials from '../components/testimonial/Testimonial';
import Footer from '../components/footer/Footer';
import getLPTheme from '../themes/getLPTheme';
import LogoCollection from '../components/logoCollection/LogoCollection';
import Cards from '../components/card/Cards';
import { useEffect, useState } from 'react';
import { getCollection } from '../firebase/fb';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/redux-hooks';
import { getBooks, getBooksSuccess } from '../store/slices/books.store';

export default function Page() {
   const authStore = useAppSelector((store) => store.auth);
   const [mode, setMode] = useState<PaletteMode>(authStore.darkTheme ? 'dark' : 'light');
   const LPtheme = createTheme(getLPTheme(mode));
   const booksStore = useAppSelector((store) => store.books);
   const { list } = booksStore;
   const dispatch = useDispatch();
   //   const defaultTheme = createTheme({ palette: { mode } });

   const toggleColorMode = () => {
      setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
   };

   async function getBooksRequest(collection) {
      dispatch(getBooks());
      const list = await getCollection(collection);
      dispatch(getBooksSuccess(list));
   }

   useEffect(() => {
      getBooksRequest('books');
   }, []);

   return (
      <ThemeProvider theme={LPtheme}>
         <CssBaseline />
         <TopBar mode={mode} toggleColorMode={toggleColorMode} getBooksRequest={getBooksRequest} />
         <Hero />
         <Box sx={{ bgcolor: 'background.default', width: '100vw' }}>
            <Cards list={list} />
            <LogoCollection />
            <Divider />
            <Testimonials />
            <Divider />
            <Divider />
            <Footer detail={false} />
         </Box>
      </ThemeProvider>
   );
}
