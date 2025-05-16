import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "react-input-range/lib/css/index.css";
import { Provider } from 'react-redux';
import store from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store} >

  <StrictMode>
    <App />
  </StrictMode>
  </Provider>
)
