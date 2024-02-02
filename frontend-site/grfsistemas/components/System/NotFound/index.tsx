import { Typography } from 'antd';
import { Fade } from 'react-awesome-reveal';
import { useTranslation } from 'react-i18next';
import styles from './NotFound.module.css';
import { useRouter } from 'next/router';

type Props = {
    hidden: boolean
}

const { Text } = Typography;

export const NotFound = ({hidden}: Props) => {
    const  { t } = useTranslation();
    
    const router = useRouter();

    const redirectSystemPage = () => router.push('/sistemas');

    return (
        <div hidden={!hidden} className={styles.notFoundApp}>
            {hidden &&
                <div className={styles.notFoundInfo}>
                    <Fade style={{alignSelf:'center'}} delay={50} direction='down' triggerOnce>
                        <img className={styles.notFoundInfoImage} src="imgs/not_found_system.png" alt='Erro 404 sistema'/>
                    </Fade>
                     
                    <Fade delay={100} direction='left' triggerOnce>
                        <Text className={styles.notFoundInfoText} strong> 
                                { t('ERROR_404_SYSTEM') } 
                        </Text>
                    </Fade>

                    <Fade direction='up' delay={100} triggerOnce>
                        <button onClick={redirectSystemPage} className={styles.notFoundInfoButton}>
                            { t('BACK_TO_SYSTEMS_PAGE') }
                        </button>
                    </Fade>
                </div>
            }
        </div>
    )
}