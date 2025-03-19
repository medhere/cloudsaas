import { createHashRouter } from 'react-router-dom';
import App from './App';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
        {index: true, element:<>Mobile</>}
    ],
  },
]);
