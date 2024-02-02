import { Avatar, Tooltip} from 'antd';
import { SystemCompanie } from '../../../../types/System';
import styles from './InfoDeveloper.module.css';
import {
    MdVerified
} from 'react-icons/md'; 
import { useTranslation } from 'react-i18next';
import { Rating } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import { Fade } from 'react-awesome-reveal'; 

type Props = {
    infoCompanie: SystemCompanie
}

export const InfoDeveloper = ({infoCompanie}: Props) => {
    const {t} = useTranslation(); 

    return (
        <>
           
            <div className={styles.header}> 
                <Avatar 
                    shape='circle'
                    size={40}
                    src={infoCompanie.avatar}
                    alt={`logo ${infoCompanie.name}`}
                />

                <span className={styles.headerName}>
                    {infoCompanie.name}
                </span>

                <Tooltip title={t('THIS_COMPANY_IS_VERIFIED')}> 
                    {infoCompanie.verified ?
                        <MdVerified className={styles.headerVerifiedIcon} />
                    : ''}
                </Tooltip>
            </div>

            <div className={styles.headerRateDiv}>
                <Rating
                    className={styles.headerRate}
                    value={infoCompanie.rating} 
                    readOnly 
                    precision={0.5}
                />
             
                <span className={styles.headerRateText}>
                    {infoCompanie.countRatings}
                    <span>
                        {t('OPINIONS')}
                    </span>
                </span>
            </div>

            <div style={{marginTop:'15px'}} className={styles.divisorLine}></div>
     
            <Row className='justify-content-center mt-3'> 
                <Col md={4} lg={3} className={`mb-3 mb-md-0 ${styles.numbersCol}`}>
                    <Fade direction='left' triggerOnce>
                        <div className={styles.numbersColBody}>
                                <span className={styles.numbersColBodyNumber}>
                                    {infoCompanie.countLastSales}
                                </span>

                                <span className={styles.numbersColBodyText}>
                                    {t('LAST_60_DAYS_SALES')}
                                </span>
                        </div> 
                    </Fade>
                </Col>
                <Col md={4} lg={3} className={`offset-md-1 ${styles.numbersCol} ${styles.numbersColBorderLeft}`}>
                    <Fade direction='right' triggerOnce>
                        <div className={styles.numbersColBody}>
                                <span className={styles.numbersColBodyNumber}>
                                    {infoCompanie.countSystems}
                                </span>

                                <span className={styles.numbersColBodyText}>
                                    {t('ACTIVE_SYSTEMS')}
                                </span>
                        </div>
                    </Fade>
                </Col> 
            </Row>

             
            <div style={{marginTop:'20px'}} className={styles.divisorLine}></div>

            <div
                hidden={infoCompanie.description != null ? false : true}
                className={styles.headerDescription}
            >
                <span>
                    {t('COMPANY_DESCRIPTION')}:
                </span>
                
                <div className={styles.headerDescriptionDiv}>
                    {infoCompanie.description} 
                </div>
            </div>
        </>
    )   
}