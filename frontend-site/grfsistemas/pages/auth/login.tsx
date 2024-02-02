import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaRegUserCircle } from 'react-icons/fa';  
import styles from '../../styles/Auth.module.css';
import { useEffect, useState } from 'react';
import { Divider } from 'antd'; 
import { apiAuth } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setNewNotification } from '../../redux/reducers/notificationReducer';
import { useRouter } from 'next/router';
import Head from 'next/head';
import AuthSocialLoading from '../../components/Loading/LoadingOtherServices';
import { AuthEmailVerification } from '../../components/Auth/AuthEmailVerification';
import Link from 'next/link';
import LoginHandle from '../../components/Auth/LoginHandle';

const Login = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const router = useRouter();

    const [loadingSocial, setLoadingSocial] = useState(''); 
    const [emailVerification, setEmailVerification] = useState(false);
 
    useEffect(() => {
        const queryString = new URL(window.location.href); 

        if(queryString.searchParams.has('error') && queryString.searchParams.get('error') == 'not_found_account') {
            dispatch(setNewNotification({
                type: 'error',
                content: t('COULD_NOT_FIND_YOUR_ACCOUNT'),
                cancelable: false,
                timeout: 20, 
            }));

            router.replace('/auth/login');
        }

        if(localStorage.getItem('emailVerification') != null) {
            setEmailVerification(true);
        } 

        const checkAuth = async () => {
            const data = await apiAuth();

            if(!data.error) { 
                if(queryString.searchParams.get('redirect') != null) {
                    router.push(queryString.searchParams.get('redirect') as string)
                } else {
                    //window.location.href = process.env.NEXT_PUBLIC_CLIENT_PAINEL_URL as string;
                    router.push('/meusSistemas');
                }
            }
        }

        if(queryString.searchParams.get('notRedirect') == null) checkAuth(); 
    }, []);

    if(emailVerification) {
        return (
            <AuthEmailVerification />
        )
    }

    return ( 
            loadingSocial ?
                <AuthSocialLoading 
                    provider={loadingSocial}
                />
            :
                <Container className='mt-5 mb-5'> 
                    <Head>
                        <title>Login - Grf Sistemas Desenvolvimento Web</title>

                        <meta name="robots" content="index" />
                        <meta name="author" content="Grf  Sistemas" />
                        <meta name="keywords" content="login, entrar, autenticacao, grf sistemas entrar, sistemas grf entrar ,grf sistemas login, sistemas grf login, grf sistemas autenticação, sistemas grf autenticação, sistema grf entrar, sistema grf login, sistemas grf  página de autenticação, autenticação, sistema grf minha conta" />
                    </Head>

                    <Row className='justify-content-center'>
                        <Col sm={8} md={7} lg={5} xl={4}>
                            <FaRegUserCircle className={styles.iconAuth}/>

                            <h4 className={styles.titleAuth}>
                                {t('DO_LOGIN')}
                            </h4>

                            <LoginHandle
                                setEmailVerification={setEmailVerification}
                                setLoadingSocial={setLoadingSocial}
                            />

                            <span className={styles.textPasswordReset}>
                                {t('FORGOT_YOUR_PASSWORD')}?

                                <Link href='/auth/password/reset'>
                                    {t('RESET')}
                                </Link>
                            </span>

                            <Divider 
                                style={{color:'var(--colorText)',borderColor:'var(--grayLight)',margin:'12px 0'}}  
                            />
                        
                            <span style={{marginTop:0}} className={styles.textPasswordReset}>
                                {t('DO_NOT_HAVE_ACCOUNT_YET')}?

                                <Link href='/auth/register'>
                                    {t('REGISTER')}
                                </Link>
                            </span>
                        </Col>
                    </Row>
                </Container>
    )
}

export default Login;