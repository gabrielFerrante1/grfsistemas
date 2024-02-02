import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaRegUserCircle } from 'react-icons/fa';  
import styles from '../../styles/Auth.module.css';
import { useEffect, useState } from 'react';
import { apiAuth } from '../../utils/api'; 
import { useRouter } from 'next/router';
import Head from 'next/head';
import AuthSocialLoading from '../../components/Loading/LoadingOtherServices';
import { AuthEmailVerification } from '../../components/Auth/AuthEmailVerification';
import Link from 'next/link';
import { RegisterHandle } from '../../components/Auth/RegisterHandle';

const Register = () => {
    const { t } = useTranslation(); 

    const router = useRouter();

    const [loadingSocial, setLoadingSocial] = useState(''); 
    const [emailVerification, setEmailVerification] = useState(false); 
  
    useEffect(() => { 
        const queryString = new URL(window.location.href);  
        
        const checkAuth = async () => {
            const data = await apiAuth();

            if(!data.error) { 
                if(queryString.searchParams.get('redirect') != null) {
                    router.push(queryString.searchParams.get('redirect') as string)
                } else {
                   // window.location.href = process.env.NEXT_PUBLIC_CLIENT_PAINEL_URL as string;
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
                        <title>Registrar-se - Grf Sistemas Desenvolvimento Web</title>

                        <meta name="robots" content="index" />
                        <meta name="author" content="Grf Sistemas" />
                        <meta name="keywords" content="registrar, autenticacao, grf sistemas criar uma conta, sistemas grf criar uma conta ,grf sistemas registrar se, sistemas grf  registrar se, grf sistemas autenticação, sistemas grf autenticação, sistema grf  registrar se, sistema grf  registrar se, sistemas grf  página de criar uma conta, criar uma conta, sistema grf minha conta" />
                    </Head> 

                    <Row className='justify-content-center'>
                        <Col sm={8} md={7} lg={5} xl={4}>
                            <FaRegUserCircle className={styles.iconAuth}/>

                            <h4 className={styles.titleAuth}>
                                {t('CREATE_AN_ACCOUNT')}
                            </h4> 

                            <RegisterHandle
                                setLoadingSocial={setLoadingSocial}
                                setEmailVerification={setEmailVerification}
                            />
 
                            <span className={styles.textPasswordReset}>
                                {t('ALREADY_HAVE_AN_ACCOUNT')}?

                                <Link href='/auth/login'>
                                    login
                                </Link>
                            </span>
                        </Col>
                    </Row>
                </Container>
    ) 
}

export default Register;