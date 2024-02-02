import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import styles from './LoadingOtherServices.module.css';

type Props = {
    provider: string
}

export default ({provider}: Props) => {
    const { t } = useTranslation();

    return (
        <div id={styles.loadApp}>
            <Head>
                <title>Redirecionando para o {provider} - Grf Sistemas Desenvolvimento Web</title>
            </Head>
    
            <img height="160" width="160" src='/imgs/load-icon.png' />

            <main className={styles.mainx}>
                    <div className={styles.loadingBarContainer}>
                        <div className={styles.loadingBar} />
                    </div>
            </main>

            <h6 className={styles.loadingText}>{t('REDIRECTING_TO', {provider})}...</h6>  
        </div>
    )
}