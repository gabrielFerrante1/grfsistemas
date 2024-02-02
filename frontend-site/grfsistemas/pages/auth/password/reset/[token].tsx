import { GetServerSideProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { Col, Container, Row } from "react-bootstrap";
import { Api } from "../../../../types/Api";
import { api } from "../../../../utils/api";
import { useTranslation } from 'react-i18next';
import { useRouter } from "next/router";
import styles from '../../../../styles/Auth.module.css';
import { AuthInput } from "../../../../components/Auth/AuthInput";
import { ChangeEvent, useEffect, useState } from "react";
import {RiLockPasswordLine} from 'react-icons/ri';
import { useDispatch } from "react-redux";
import { setNewNotification } from "../../../../redux/reducers/notificationReducer";
import { setLoadingCart } from "../../../../redux/reducers/cartReducer";
import LoadingPageRender from "../../../../components/Loading/LoadingPageRender";

interface ResponseApi extends Api {
    check_token: boolean
}

const PasswordResetVerification = () => {
    const { t } = useTranslation();

    const router = useRouter();

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [checkToken, setCheckToken] = useState(false);
    const [inputPassword, setInputPassword] = useState('');
   

    const changePassword = async () => {
        await api(`auth/password-reset-new/${router.query.token}`, 'put', {
            password: inputPassword
        });

        router.replace('/auth/login');

        dispatch(setNewNotification({
            type: 'success',
            content: t('YOUR_PASSWORD_HAS_BEEN_CHANGED_SUCCESSFULLY'),
            cancelable: true,
            timeout: 5, 
        }));
    }

    const handleChangeInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setInputPassword(e.target.value);
    }

    const goToIntialPage = () => {
        router.replace('/');
    }

    useEffect(() => {
        const checkToken = async () => {
            let token = '';
            
            const queryString = new URL(window.location.href);
            const tokenCheckUndefined = queryString.pathname.split('/auth/password/reset/')[1];
            if(tokenCheckUndefined) token = tokenCheckUndefined;

            const data: ResponseApi = await api(`auth/password-reset/${token}`);
            setCheckToken(data.check_token);

            setLoading(false);
        }

        checkToken();
    }, []); 


    return (
        <Container className='p-3 mt-4' style={{marginBottom:146}}>
            <Head>
                <title>Redefinir minha senha - Grf Sistemas Desenvolvimento Web</title>

                <meta name="robots" content="noindex" />
            </Head>

            {loading ?
                <LoadingPageRender />
            : 
                checkToken ?
                    <Row className='justify-content-center'>
                        <Col sm={7} md={6} lg={4} xl={3}>
                            <RiLockPasswordLine className={styles.iconAuth}/>

                            <h4 className={styles.titleAuth}>
                                {t('RESET_MY_PASSWORD')}
                            </h4>

                            <AuthInput 
                                error=''
                                id='input-new-password'
                                label={t('NEW_PASSWORD')}
                                value={inputPassword}
                                onChange={handleChangeInputPassword} 
                            />

                            <button
                                onClick={changePassword}
                                style={{textTransform:'capitalize'}}
                                className={!inputPassword ? styles.btnAuthDisabled : styles.btnAuth}
                                disabled={!inputPassword ? true : false}
                            >
                                {t('RESET')}
                            </button> 
                        </Col>
                    </Row>
                :
                    <>
                        <h3 className="titleToken">
                            {t('THIS_TOKEN_IS_NOT_VALID')} 
                        </h3>

                        <button onClick={goToIntialPage} className="btnToken">{t('GO_TO_INITIAL_PAGE')}</button>
                    </>
            }

            <style jsx>
            {`
                .titleToken {
                    color: var(--primary);
                    font-weight:600;
                    text-align:center
                } 
                .btnToken {
                    margin-top:20px;
                    border-radius: 6px;
                    background-color: var(--primary);
                    color: var(--secondary);
                    border: 1px solid var(--primary);
                    padding: 4px 10px;
                    transition: all 0.5s;
                    margin-left:auto;
                    margin-right:auto;
                    display:block
                }
                .btnToken:hover {
                    background-color: var(--secondary);
                    color: var(--primary); 
                    border-color: var(--secondary);
                } 
            `}
            </style>
        </Container>
    )
}

export default PasswordResetVerification;
 