import { LinearProgress } from '@mui/material';
import { get } from 'lodash';
import './loading.css';
import { useAppSelector } from '../../hooks/redux-hooks';

const storesNames = ['auth', 'books'];

export default function Loading() {
   const isLoading = useAppSelector((state) => {
      let loading = false;
      let blockScreen = false;
      storesNames.map((section) => {
         blockScreen = blockScreen || get(state, `${section}.blockScreen`, false);
         loading = loading || get(state, `${section}.loading`, false);
      });
      return { loading, blockScreen };
   });
   return (
      <div>
         {isLoading.loading && (
            <div className={'loadingGlobal'}>
               <LinearProgress color='primary' />
            </div>
         )}
         {isLoading.blockScreen && <div className={'darkLayerGlobal'}></div>}
      </div>
   );
}
