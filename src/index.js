import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { ChakraProvider } from '@chakra-ui/react'
import {CookiesProvider} from 'react-cookie'
import { BrowserRouter } from "react-router-dom";
import './fonts/ChicagoFLF.ttf'
import App from './App'
import 'animate.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
  <CookiesProvider>
     <BrowserRouter>
      <App />
     </BrowserRouter>
  </CookiesProvider>
  </ChakraProvider>
);

