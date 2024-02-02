import Head from "next/head";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { AlertCookie } from "../components/AlertCookie";

const Politicas = () => {
    const { t } = useTranslation();

    return (
        <Container className="mt-4 mb-5">
            <Head>
                <title>Política de Privacidade - Grf Sistemas Desenvolvimento Web</title>

                <meta name="robots" content="index" />
                <meta name="author" content="Grf  Sistemas" />
                <meta name="keywords" content="lgpd, lgpd grf sistemas, grf sistemas lgpd, termos de uso grf sistemas, grf sistema lgpd, grf lgpd, grf termos de uso, grf sistema termos, grf sistemas  termos de uso, politicas grf sistemas, grf sistema politicas" />
            </Head>

            <AlertCookie />

            <h1 style={{color:'var(--primary)',fontWeight:'bold'}}>{t('POLITIC_OF_PRIVACITY')}</h1>

            <h3 style={{color:'var(--primary)',fontWeight:'bold',margin:'7px 0 3px 0'}}>
                {t('POLITIC_OF_PRIVACITY_FOR')} 
                <span style={{color:'var(--secondary300)'}}> Grf Sistemas</span>
            </h3> 
            <span style={{color:'var(--colorText)'}}>
                {t('TEXT_1_COOKIE')}
            </span>


            <h3 style={{color:'var(--primary)',fontWeight:'bold',margin:'30px 0 3px 0'}} >{t('ADVERSMENT')}</h3>
            <span style={{color:'var(--colorText)'}}>
                {t('TEXT_2_COOKIE')}
            </span>

            <h3 style={{color:'var(--primary)',fontWeight:'bold',margin:'30px 0 3px 0'}} >Cookies</h3>
            <span style={{color:'var(--colorText)'}}>
                {t('TEXT_3_COOKIE')}
            </span>

        </Container>
    );
}

export default Politicas; 
