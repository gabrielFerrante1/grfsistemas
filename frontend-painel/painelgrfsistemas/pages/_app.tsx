import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import initConfigLang from '../utils/lang/config';
import { useEffect } from 'react';
import i18next from 'i18next';
import LayoutMain from '../components/Layouts/LayoutMain';
import 'antd/dist/antd.css';

//Initialization settings of multi-language
initConfigLang();

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (localStorage.getItem('lang')) {
      i18next.changeLanguage(localStorage.getItem('lang')?.toString());
    } else {
      localStorage.setItem('lang', 'pt');
      i18next.changeLanguage('pt');
    }
  }, []);

  return (
    <Provider store={store}>
      <LayoutMain>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </LayoutMain>
    </Provider>
  )
}

export default MyApp
