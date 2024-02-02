import { Grow } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LoadingAfterApiPageRender from "../components/Loading/LoadingPageRender";
import { AlertPlanFree } from "../components/System/AlertPlanFree";
import { NotFound } from "../components/System/NotFound";
import { SystemInfo } from "../components/System/SystemInfo";
import { SystemMedias } from "../components/System/SystemMedias";
import { SystemTabs } from "../components/System/SystemTabs";
import styles from '../styles/System.module.css';
import { ApiPropsSystem } from "../types/System";
import { api, apiAuth } from "../utils/api";

export default () => {
    const [loading, setLoading] = useState(true);
    const [visiblePlanFree, setVisiblePlanFree] = useState(false); 
    const [notFound, setNotFound] = useState(false);
    const [system, setSystem] = useState<ApiPropsSystem>();
 
    useEffect(() => {
        const getSystem = async () => {
            let idSystem = 0;
            
            const queryString = new URL(window.location.href);
            const idSystemPathName = queryString.pathname.split('/')[1];
            if(idSystemPathName) idSystem = +idSystemPathName;
            console.log(idSystemPathName)
            let token = '';

            const dataAuth = await apiAuth();
            if(!dataAuth.error) {
                token = dataAuth.user.token
            }

            const data: ApiPropsSystem = await api(`sistema/${idSystem}`, 'get', '', token);
            
            if(data.error == '404') {
                setNotFound(true)
            } else {
                setSystem(data);
                setVisiblePlanFree(data.system.planFree);
            }

            setLoading(false);
        }

        getSystem();
    }, []);

    return (
        <div className={styles.systemApp}>
            <Head>
                <title>{notFound == false && system != undefined ? system.system.name : 'Sistema não encontrado'} - Grf Sistemas Desenvolvimento Web</title>

                <meta name="robots" content="index" />
                <meta name="author" content="Grf Sistemas" />
                <meta name="keywords" content={`grf sistemas, sistemas grf, grf sistema, sistema grf, grf comprar sistemas, sistemas web, desenvolvimento de sistema web, ${!notFound && system != undefined ? system.system.category_name : ''}, ${!notFound && system != undefined ? system.system.name : ''}`} />
            </Head>
 
            {loading ?
                <LoadingAfterApiPageRender />
            : 
                <Container fluid>
                    <NotFound
                        hidden={notFound}
                    />

                    {!notFound && system != undefined ?
                        <>  
                            <Grow in={visiblePlanFree} unmountOnExit>
                                <Row className={styles.alertPlanFreeRow}> 
                                    <AlertPlanFree
                                        setVisiblePlanFree={setVisiblePlanFree}
                                    />
                                </Row>
                            </Grow>

                            <Row className={styles.systemAppRow1}>
                                <Col lg={6}>
                                    <SystemMedias
                                        medias={system.system.medias}
                                    />
                                </Col>

                                <Col lg={6}>
                                    <SystemInfo
                                        recentPurchase={system.recentPurchase} 
                                        data={system.system}
                                    />
                                </Col>
                
                                <Row className="mt-4 mt-md-3"> 
                                    <SystemTabs
                                        data={system.system}
                                    />
                                </Row> 
                            </Row>
                        </>
                    : ''}
                </Container>
            }
        </div>
    )
}
