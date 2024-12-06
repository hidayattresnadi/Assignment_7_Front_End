import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Pages/homePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import './pagination.css'
import App from './app';
import { Provider } from "react-redux";
import {store}  from './store.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
       <App />
    </Provider>
  </StrictMode>,
)
