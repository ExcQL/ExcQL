import React from 'react';

import App from './components/App';
import { Provider } from './components/context/store';

import { createRoot } from 'react-dom/client';

const el = document.getElementById('root');
const root = createRoot(el);

root.render(
  <Provider>
    <App />
  </Provider>
);
