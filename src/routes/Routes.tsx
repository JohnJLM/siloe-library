import { useRoutes } from 'react-router-dom';
import Page from '../pages/Page';
import Detail from '../pages/Detail';

export default function Router() {
   return useRoutes([
      {
         path: '/',
         element: <Page />,
      },
      {
         path: '/:id',
         element: <Detail />,
      },
   ]);
}
