import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CrimsonOSMockStartup from './Components/Shared/CrimsonOSMockStartup';
import './fonts/ChicagoFLF.ttf'
import App from './App'
import 'animate.css';
import axios from 'axios';

// axios.defaults.headers.common['Authorization'] = `${process.env.}`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
     <BrowserRouter>
      <App />
     </BrowserRouter>
  </ChakraProvider>
);

