import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { RiLockPasswordLine } from 'react-icons/ri';  
import styles from '../../../../styles/Auth.module.css';
import { AuthInput } from '../../../../components/Auth/AuthInput';
import { ChangeEvent, useState } from 'react'; 
import { useDispatch } from 'react-redux'; 
import Head from 'next/head';
import { api } from '../../../../utils/api';
import { Api } from '../../../../types/Api';
import { setNewNotification } from '../../../../redux/reducers/notificationReducer';

const ResetPassword = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [inputEmail, setInputEmail] = useState(''); 
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState('');

    const handleChangeInputEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setError('');

        setInputEmail(event.target.value)
    }

    const setPasswordReset = async () => { 
        setLoading(true);
    
        const data: Api= await api('auth/password-reset', 'post', {
            email: inputEmail
        });

        if(data.error == 'user_not_found') {
            setError('true');
    
            dispatch(setNewNotification({
                type: 'error',
                content: t('COULD_NOT_FIND_YOUR_ACCOUNT'),
                cancelable: false,
                timeout: 10, 
            }));
        } else {
            dispatch(setNewNotification({
                type: 'success',
                content: t('A_LINK_HAS_BEEN_SENT_TO_YOUR_EMAIL_ADDRESS', {email: inputEmail}),
                cancelable: true,
                timeout: 10, 
            }));
        }

        setLoading(false);
    }

    return (  
            <Container className='mt-5' style={{marginBottom:155}}> 
                <Head>
                    <title>Esqueci minha senha - Grf Sistemas Desenvolvimento Web</title>

                    <meta name="robots" content="index" />
                    <meta name="author" content="Grf  Sistemas" />
                    <meta name="keywords" content="redefinir, resetar, alterar, grf sistemas redefinir a senha, grf sistema redefinir, sistema grf redefinir, grf sistemas redefinir senha, sistemas grf redefinir senha, sistema grf redefinir senha, grf sistemas alterar senha, grf sistemas equeci minha senha, sistemas grf esqueci minha senha, sistema grf esqueci minha senha, grf sistema esqueci minha senha" />
                </Head> 

                <Row className='justify-content-center'>
                    <Col sm={8} md={6} lg={4} xl={3}>
                        <RiLockPasswordLine className={styles.iconAuth}/>

                        <h4 className={styles.titleAuth}>
                            {t('FORGOT_YOUR_PASSWORD')}
                        </h4>

                        <AuthInput
                            disabled={loading}
                            error={error}
                            id='input-email'
                            label={t('YOUR_MAIL')}
                            value={inputEmail}
                            onChange={handleChangeInputEmail}
                            autoFocus
                        />

                        <button
                            onClick={setPasswordReset}
                            className={!inputEmail ? styles.btnAuthDisabled : styles.btnAuth}
                            disabled={loading || !inputEmail ? true : false}
                        >   
                            {loading ?
                                <>
                                    {t('SENDING')}...
                                 
                                </>
                            : 
                                t('SEND_LINK')
                            } 
                        </button>
                    </Col>
                </Row>
            </Container>
    ) 
}

export default ResetPassword;