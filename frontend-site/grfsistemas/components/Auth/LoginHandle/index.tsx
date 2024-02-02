import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setNewNotification } from "../../../redux/reducers/notificationReducer";
import styles from '../../../styles/Auth.module.css';
import { ApiPropsLogin } from '../../../types/User';
import { api  } from '../../../utils/api';
import { AuthInput } from '../AuthInput';
import LoginHandleSocial from '../LoginHandleSocial';

type Props = {
    setEmailVerification: (a: boolean) => void,
    setLoadingSocial: (a: string) => void
}

export default ({ setEmailVerification, setLoadingSocial }: Props) => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation();

    const router = useRouter();

    const dispatch = useDispatch();

    const handleChangeInputEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setError('');

        setInputEmail(event.target.value);
    };

    const handleChangeInputPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setError('');

        setInputPassword(event.target.value);
    };

    const handleLogin = async () => {
        setLoading(true);

        const login: ApiPropsLogin = await api('auth/login', 'post', {
            email: inputEmail,
            password: inputPassword
        });

        if (login.error == '') {
            if (!login.verified_email) {
                localStorage.setItem('emailVerification', login.token);
                setEmailVerification(true);
            } else {
                const reqAuth = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/authentication?token=${login.token}`);
                const resAuth: { logged: boolean; } = await reqAuth.json();

                if (resAuth.logged) {
                    dispatch(setNewNotification({
                        type: 'success',
                        content: t('SUCCESSFULLY_LOGGED_IN'),
                        cancelable: false,
                        timeout: 5,
                    }));

                    const queryString = new URL(window.location.href);
                    if (queryString.searchParams.get('redirect') != null) {
                        router.push(queryString.searchParams.get('redirect') as string);
                    } else {
                        //window.location.href = process.env.NEXT_PUBLIC_CLIENT_PAINEL_URL as string;
                        router.push('/meusSistemas');
                    }
                }
            }
        } else {
            setError(t('INCORRECT_EMAIL_AND/OR_PASSWORD'));

            dispatch(setNewNotification({
                type: 'error',
                content: t('INCORRECT_EMAIL_AND/OR_PASSWORD'),
                cancelable: false,
                timeout: 9,
            }));
        }

        setLoading(false);
    };

    return (
        <>
            <AuthInput
                error={error}
                id='input-email'
                label={t('YOUR_MAIL')}
                value={inputEmail}
                onChange={handleChangeInputEmail}
                autoFocus />

            <AuthInput
                error={error}
                id='input-password'
                label={t('YOUR_PASSWORD')}
                value={inputPassword}
                onChange={handleChangeInputPassword} />

            <button
                onClick={handleLogin}
                className={!inputEmail || !inputPassword ? styles.btnAuthDisabled : styles.btnAuth}
                disabled={loading || !inputEmail || !inputPassword ? true : false}
            >
                {t('SIGN_IN')}
            </button>

            <LoginHandleSocial
                setLoadingSocial={setLoadingSocial} />
        </>
    );
};