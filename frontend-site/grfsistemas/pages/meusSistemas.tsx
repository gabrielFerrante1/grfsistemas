import { GetServerSideProps } from "next"; 
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '../utils/sessionUser';
import Head from "next/head";
import { useTranslation } from "react-i18next";
import styles from '../styles/mySystems.module.css';
import { Col, Container, Row } from "react-bootstrap";
import { api, apiAuth } from "../utils/api";
import { ApiPropsGetMySystems, ApiPropsMySystem } from "../types/System";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingPageRender from "../components/Loading/LoadingPageRender";

export default () => {
    const { t } = useTranslation(); 

    const [loading, setLoading] = useState(true);
    const [systems, setSystems] = useState<ApiPropsMySystem[]>([]);

    const router = useRouter();

    useEffect(()=> {
        const checkToken = async () => {
            setLoading(true);

            const dataAuth = await apiAuth();
            if(dataAuth.error) {
                router.replace('/auth/login', {query: { redirect: '/meusSistemas' }});
                return;
            }

            const data: ApiPropsGetMySystems = await api('my-systems', 'get', '', dataAuth.user.token);
            setSystems(data.systems);

            setLoading(false);
        }

        checkToken();
    }, []);

    return (
        <Container style={{marginTop:'40px', marginBottom:'80px'}}>
            <Head>
                <title>Meus sistemas - Grf Sistemas Desenvolvimento Web</title>

                <meta name="robots" content="index" />
                <meta name="author" content="Grf Sistemas" />
                <meta name="keywords" content='meus sistemas grf sistemas, sistemas grf meus sistemas , grf sistema meus sistemas , sistema grf meus sistemas , grf meus sistemas, sistemas meus grf' />
            </Head>

            <h4 className={styles.title}>{t('MY_SYSTEMS')}</h4>

            {loading ?
                <LoadingPageRender />
            : 
                <Row style={{margin:'0 4px'}}>
                    {systems.map((system: ApiPropsMySystem, key: number) => (
                        <div key={key} className={`${styles.cardSystem}`}>
                            <h5>{system.system.name}</h5>

                            <a target='_blank' href={system.system.link} className={styles.cardSystemLink}>
                                {t('ACCESS_THE_SYSTEM')}
                            </a>
                        
                            <small>
                                Status: {system.status_id == 1 ? 
                                    <span className="text-success">{t('IN_PROGRESS')}</span>
                                : system.status_id == 2 ?
                                    <span className="text-success">{t('RELEASED')}</span>
                                : system.status_id == 3 ?
                                    <span className="text-warning">{t('DEFEAT')}</span>
                                : ''}
                            </small>
                        </div>
                    ))}
                </Row>
            }
        </Container>
    )
}
