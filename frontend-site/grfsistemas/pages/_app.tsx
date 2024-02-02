import '../styles/globals.css';
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import initConfigLang from '../utils/lang/config'; 
import { useEffect } from 'react';
import i18next from 'i18next';
import { Provider } from 'react-redux';
import {  store } from '../redux/store';
import { LayoutMain } from '../components/Layouts/LayoutMain'; 
import Head from 'next/head';   

//Initialization settings of multi-language
initConfigLang();

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) { 
  useEffect(()=>{
    if(localStorage.getItem('lang')) {
      i18next.changeLanguage(localStorage.getItem('lang')?.toString()); 
    } else {
      localStorage.setItem('lang', 'pt');
      i18next.changeLanguage('pt'); 
    }
  }, []);

  return ( 
      <Provider store={store}>
          <Head>
            <link rel="icon" href="/imgs/faviconIcon.png" />
          </Head>
    
          <LayoutMain>
            <Component {...pageProps} />
          </LayoutMain>
      </Provider> 
  )
}

export default MyApp 
