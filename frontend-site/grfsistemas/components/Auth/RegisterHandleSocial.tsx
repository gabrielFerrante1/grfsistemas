import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import styles from '../../styles/Auth.module.css';

type Props = {
    setLoadingSocial: (a: string) => void
}

export default ({ setLoadingSocial }: Props) => {
    const { t } = useTranslation();

    const goToRegister = (social: string) => {
        setLoadingSocial(social);
        window.location.href = process.env.NEXT_PUBLIC_BASE_URL + '/auth/' + social + '/redirect/register';
    };

    return (
        <>
            <Divider
                style={{ color: 'var(--colorText)', borderColor: 'var(--grayLight)' }}
                plain
            >
                {t('CREATE_AN_ACCOUNT_WITH')}
            </Divider>

            <button
                className={styles.btnAuthSocial}
                onClick={() => goToRegister('google')}
            >
                <img className={styles.btnAuthSocialIcon} src='/imgs/auth_google.png' />
                Google
            </button>

            <button
                className={styles.btnAuthSocial}
                onClick={() => goToRegister('facebook')}
                style={{ marginTop: '30px' }}
            >
                <img className={styles.btnAuthSocialIcon} src='/imgs/auth_facebook.png' />
                Facebook
            </button>
        </>
    );
};