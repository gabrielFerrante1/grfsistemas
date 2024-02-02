import { Divider } from "antd";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import styles from '../../styles/Auth.module.css';

type Props = {
    setLoadingSocial: (a: string) => void
}

export default ({ setLoadingSocial }: Props) => {
    const { t } = useTranslation();

    const goToLogin = (social: string) => {
        setLoadingSocial(social);
        window.location.href = process.env.NEXT_PUBLIC_BASE_URL + '/auth/' + social + '/redirect/login';
    };

    return (
        <>
            <Divider
                style={{ color: 'var(--colorText)', borderColor: 'var(--grayLight)' }}
                plain
            >
                {t('DO_LOGIN_WITH')}
            </Divider>

            <button
                className={styles.btnAuthSocial}
                onClick={() => goToLogin('google')}
            >
                <img
                    className={styles.btnAuthSocialIcon}
                    src='/imgs/auth_google.png' 
                /> 
                Google
            </button>

            <button
                className={styles.btnAuthSocial}
                onClick={() => goToLogin('facebook')}
                style={{ marginTop: '30px' }}
            >   
                <img
                    className={styles.btnAuthSocialIcon}
                    src='/imgs/auth_facebook.png' 
                />
                Facebook
            </button>
        </>
    );
};