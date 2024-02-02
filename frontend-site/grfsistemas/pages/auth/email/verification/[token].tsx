import Head from "next/head"; 
import { Container } from "react-bootstrap";
import { Api } from "../../../../types/Api";
import { api } from "../../../../utils/api";
import { useTranslation } from 'react-i18next';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingPageRender from "../../../../components/Loading/LoadingPageRender";

interface ResponseApi extends Api {
    check_token: boolean
} 
 
const EmailVerification = () => {
    const { t } = useTranslation();

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [checkToken, setCheckToken] = useState(false);

    const goToPanel = () => {
        //window.location.href = process.env.NEXT_PUBLIC_CLIENT_PAINEL_URL as string;
        router.push('/meusSistemas');
    }

    const goToIntialPage = () => {
        router.replace('/');
    }

    
    useEffect(() => {
        const checkToken = async () => {
            let token = '';

            const queryString = new URL(window.location.href);
            const tokenCheckUndefined = queryString.pathname.split('/auth/email/verification/')[1];
            if(tokenCheckUndefined) token = tokenCheckUndefined;

            const data: ResponseApi = await api(`auth/email-verification/${token}`);
            setCheckToken(data.check_token);

            setLoading(false);
        }

        checkToken();
    }, []); 

    return (
        <Container className='p-3 mt-4' style={{marginBottom:'271px'}}>
            <Head>
                <title>Verificação de email - Grf Sistemas Desenvolvimento Web</title>

                <meta name="robots" content="noindex" />
            </Head>

            {loading ? 
                <LoadingPageRender />
            : 
            
                checkToken ?
                    <div>
                        <h3 className="titleToken">
                            {t('THE_EMAIL_HAS_BEEN_VERIFIED_WITH')}
                            <span>{t('SUCCESS')}</span>
                        </h3>

                        <button onClick={goToPanel} className="btnToken">{t('GO_TO_PAINEL')}</button>
                    </div>
                :
                <div>
                    <h3 className="titleToken text-center">
                        {t('THIS_TOKEN_IS_NOT_VALID')} 
                    </h3>

                    <button onClick={goToIntialPage} className="btnTokenError">{t('GO_TO_INITIAL_PAGE')}</button>
                </div>
            }

            <style jsx>
                {`
                    .titleToken {
                        color: var(--primary);
                        font-weight:600
                    }
                    .titleToken > span {
                        color: var(--secondary300);
                        font-weight: 700
                    }
                    .btnToken {
                        margin-top:20px;
                        border-radius: 6px;
                        background-color: var(--primary);
                        color: var(--secondary);
                        border: 1px solid var(--primary);
                        padding: 4px 10px;
                        transition: all 0.5s;
                    }
                    .btnToken:hover, .btnTokenError:hover {
                        background-color: var(--secondary);
                        color: var(--primary); 
                        border-color: var(--secondary);
                    }
                    .btnTokenError {
                        margin-top:20px;
                        border-radius: 6px;
                        background-color: var(--primary);
                        color: var(--secondary);
                        border: 1px solid var(--primary);
                        padding: 4px 10px;
                        transition: all 0.5s;
                        display: block;
                        margin-left:auto;
                        margin-right:auto;
                    }
                `}
            </style>
        </Container>
    )
}

export default EmailVerification;
 