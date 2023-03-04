import React from 'react';

import App from './components/App';

// ReactDOM.render(<App />, document.getElementById('root'));

import { createRoot } from 'react-dom/client';

const el = document.getElementById('root');
const root = createRoot(el);

root.render(<App />);
