import { Empty } from "antd";
import { GetStaticProps } from "next";
import Head from "next/head"; 
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { BtnMoreSystems } from "../components/BtnMoreSystems";
import { SystemItem } from "../components/SystemItem";
import { ApiPropsSystems } from "../types/Systems";
import { api } from "../utils/api";  

type Props = {
    systems: ApiPropsSystems
}

const Sistemas = ({systems}: Props) => {
    const { t } = useTranslation();

    const router = useRouter();

    const [systemsBackup, setSystemsBackup] = useState<ApiPropsSystems>(systems);
    const [listSystems, setListSystems] = useState<ApiPropsSystems>(systemsBackup);
    const [page, setPage] = useState(1);
    const [hiddenBtnMoreSystems, setHiddenBtnMoreSystems] = useState(false);


    useEffect(()=>{
        const queryString = new URL(window.location.href);
        const q = queryString.searchParams.get('q')?.toLocaleLowerCase();

        if(q != null) {
            const data = systemsBackup.systems.filter((item) => {
                const valueNameLower = item.name.toLowerCase();
                const valueCategoryLower = item.category_name.toLowerCase();

                if((q != '' ? valueNameLower.indexOf(q) != -1 : true ) ||
                   (q != '' ? valueCategoryLower.indexOf(q) != -1 : true )  ) {
                    return item;
                }
            });

            setListSystems({
                error: systemsBackup.error,
                systems: data
            });

            if(q === '') {
                setHiddenBtnMoreSystems(false);
            } else {
                setHiddenBtnMoreSystems(true);
            }
        } else {
            setHiddenBtnMoreSystems(false);
            setListSystems(systemsBackup);
        }

    }, [router.query]);

    return (
        <Container style={{marginTop:'5em', marginBottom:'6em'}}>
            <Head>
                <title>Sistemas - Grf Sistemas Desenvolvimento Web</title>

                <meta name="robots" content="index" />
                <meta name="author" content="Grf  Sistemas" />
                <meta name="keywords" content="grf sistemas, sistemas grf, grf sistema, sistema grf, grf comprar sistemas, sistemas web, desenvolvimento de sistema web" />
            </Head>

            {listSystems.systems.length == 0 && 
                    <Empty
                        description={
                            <span style={{color:'var(--colorText)',opacity:0.7}}>
                                {t('NO_SYSTEM_FOUND')}
                            </span>
                        }
                    />
            }

            <Row>
                {listSystems.systems.map((item, key) => (
                    <Col 
                        key={key}
                        md={6}
                        lg={4} 
                    >
                        <SystemItem
                            data={item}
                        />
                    </Col>
                ))} 
            </Row>

            <Row> 
                <BtnMoreSystems 
                    page={page}
                    setPage={setPage}
                    setSystemsBackup={setSystemsBackup}
                    setListSystems={setListSystems}
                    setHiddenBtnMoreSystems={setHiddenBtnMoreSystems}
                    hiddenBtnMoreSystems={hiddenBtnMoreSystems}
                    listSystems={listSystems}
                />
            </Row>
        </Container>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const data: ApiPropsSystems = await api('sistemas', 'get', 'limit=12');
   
    return {
        props: {
            systems: data
        },
        revalidate: 7200
    }
}

export default Sistemas;
