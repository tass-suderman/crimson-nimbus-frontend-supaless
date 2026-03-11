import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import {CookiesProvider} from 'react-cookie'
import App from './App'
import './fonts/ChicagoFLF.ttf'
import './styles/index.css';
import 'animate.css';


createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
		<CookiesProvider>
			<App />
		</CookiesProvider>
  </ChakraProvider>
);

