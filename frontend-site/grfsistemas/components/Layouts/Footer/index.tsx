import styles from './Footer.module.css';
import { Col, Container, Row } from "react-bootstrap";
import { Typography } from 'antd';
import { useTranslation } from "react-i18next";
import Link from 'next/link';

const { Title } = Typography;

export const Footer = () => {
    const {t} = useTranslation();

    
    return (
        <Container>
            <Row>
                <Col lg={4} className="mt-3">
                    <Title level={3} className={styles.titleFooter}>
                        {t('BE_A_PARTNER')}
                    </Title>

                    <svg className="d-none d-lg-block" style={{marginBottom: -150}}>
                        <line x1="0" y1="0" x2="78" y2="0" style={{stroke: 'var(--colorLineVerticalNavBar)',strokeWidth:2}} />
                    </svg>
                    
                    <div style={{marginTop:10}}>
                        <Link href="/sistemas">
                            <span className={styles.linkFooter}>
                                {t('MEET_THE_SYSTEMS')}
                            </span>
                        </Link>
                    </div>
                </Col>

                <Col  lg={4} className="mt-3 offset-lg-4">
                    <Title level={3} className={styles.titleFooter}>
                        {t('CONTACT')}
                    </Title>

                    <svg className="d-none d-lg-block" style={{marginBottom: -150}}>
                        <line x1="0" y1="0" x2="78" y2="0" style={{stroke: 'var(--colorLineVerticalNavBar)',strokeWidth:2}} />
                    </svg>

                    <p className={styles.textFooter}>
                        Email: <span style={{color:'var(--primary)'}}>suporte@grfsistemas.com</span>
                    </p>
                </Col>   
            </Row>

            <hr className="mt-4" style={{color:'var(--colorLineFooter)'}}/>

            <Row>
                <Col lg={4} md={6}>
                    <span className={styles.allRightFooter}>
                     &copy; {t('ALL_RIGHTS_RESERVED')} - Grf Sistemas
                    </span> 
                </Col>

                <Col lg={2} md={4} className="offset-lg-6 offset-md-2">
                    <span className={styles.allRightFooter}>
                    <Link href="/politicas">
                            <span className={styles.linkPolitice}>
                                {t('POLITIC_OF_PRIVACITY')}
                            </span>
                        </Link>
                    </span> 
                </Col>
            </Row>
        </Container>
    )
}