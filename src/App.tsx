import { Provider } from 'react-redux';
import './App.css';
import Router from './routes/Routes';
import { store } from './store';

function App() {
   return (
      <>
         <Provider store={store}>
            <Router />
         </Provider>
      </>
   );
}

export default App;
