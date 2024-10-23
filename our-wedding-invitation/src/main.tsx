// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './styles/main.scss'

// const root = document.getElementById('root');

// if (root) {
//   ReactDOM.createRoot(root).render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>,
//   )
// } else {
//   console.error("Root element not found");
// }

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/main.scss'
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </HelmetProvider>,
)