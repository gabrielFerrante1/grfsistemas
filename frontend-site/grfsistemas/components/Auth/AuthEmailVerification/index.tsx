import { CircularProgress } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Api } from '../../../types/Api';
import { api } from '../../../utils/api';
import styles from './EmailVerification.module.css';

interface ResponseApi extends Api {
    verified_email: boolean
}

export const AuthEmailVerification = () => {
    const { t } = useTranslation();

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const setEmailVerification = async () => {
        setLoading(true);
        await api('auth/email-verification', 'post', {}, localStorage.getItem('emailVerification'));
        setLoading(false);
    }

    const checkEmailVerification = async () => {
        const data: ResponseApi = await api('auth/check-email-verification', 'get', {}, localStorage.getItem('emailVerification'));
        
        if(data.verified_email) {
            const data = await fetch(`${process.env.NEXT_PUBLIC_APP_URL as string}/api/auth/authentication?token=${localStorage.getItem('emailVerification')}`);

            localStorage.removeItem('emailVerification');

            const queryString = new URL(window.location.href); 

            if(queryString.searchParams.get('redirect') != null) {
                router.replace(queryString.searchParams.get('redirect') as string)
            } else {
                window.location.href = process.env.NEXT_PUBLIC_CLIENT_PAINEL_URL as string;
            }
        }
    }

    useEffect(() => {
        if(localStorage.getItem('emailVerification') != null) {
            checkEmailVerification();

            setEmailVerification();
        }
    }, []);

    return (
        <Container style={{marginBottom:'235px'}}>
            <Head>
                <title>Verificação de email - Grf Sistemas Desenvolvimento Web</title>

                <meta name="robots" content="noindex" />
            </Head>

            <Row className='p-3 mt-4'>
                <h3 className={styles.title}>
                    {t('CHECK_YOUR_EMAIL')}
                </h3>
            
                <div className={styles.body}>
                {t('TO_COMPLETE_THE_CREATION_OF_YOUR_ACCOUNT')}
                </div>
            </Row>

            <button
                disabled={loading}
                className={styles.btnConfirm}
                onClick={checkEmailVerification}
            >
                {t('I_HAVE_RECEIVED_THE_EMAIL_AND_CHECKED_IT_OUT')}
            </button>

            {loading ?
                <span className={styles.loadingEmail}>
                    {t('SENDING_THE_EMAIL')}...

                    <CircularProgress style={{marginBottom:-4,marginLeft:9}} size={19}/>
                </span>
            : 
                <span onClick={setEmailVerification} className={styles.resendEmail}>
                    {t('RESEND_EMAIL')}
                </span>
            }
        </Container>
    )
}