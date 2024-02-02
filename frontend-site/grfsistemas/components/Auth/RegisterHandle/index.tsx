import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; 
import { useDispatch } from "react-redux";
import { setNewNotification } from "../../../redux/reducers/notificationReducer";
import styles from '../../../styles/Auth.module.css';
import { ApiPropsRegister } from "../../../types/User";
import { api } from "../../../utils/api";
import { AuthInput } from "../AuthInput";
import RegisterHandleSocial from "../RegisterHandleSocial";

type Props = {
    setLoadingSocial: (a: string) => void,
    setEmailVerification: (a: boolean) => void
} 

export const RegisterHandle = ({setLoadingSocial, setEmailVerification}: Props) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const router = useRouter();

    const [tokenProviderSocial, setTokenProviderSocial] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); 
    const [inputName, setInputName] = useState('');
    const [inputNameDisabled, setInputNameDisabled] = useState(false);
    const [inputEmail, setInputEmail] = useState('');
    const [inputEmailDisabled, setInputEmailDisabled] = useState(false);
    const [inputPassword, setInputPassword] = useState('');

    const handleChangeInputName = (event: ChangeEvent<HTMLInputElement>) => {
        setError('');
        setInputName(event.target.value)
    }

    const handleChangeInputEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setError('');
        setInputEmail(event.target.value)
    }

    const handleChangeInputPassword  = (event: ChangeEvent<HTMLInputElement>) => {
        setError('');
        setInputPassword(event.target.value)
    }

    const newNotificationErrorAlereadyEmailExists = () => {
        dispatch(setNewNotification({
            type: 'error',
            content: t('THIS_EMAIL_IS_ALREADY_REGISTERED_ON_OUR_PLATFORM'),
            cancelable: true,
            timeout: 9, 
        }))
    }

    const handleRegister =  async () => {
        setLoading(true);
        const data: ApiPropsRegister = await api('auth/register', 'post', {
            email: inputEmail,
            name: inputName,
            password: inputPassword,
            token: tokenProviderSocial
        });
         
        if(data.error == 'email_already_exists') {
            newNotificationErrorAlereadyEmailExists();
            setLoading(false);
            return;
        }

        if(data.verified_email) {
            const reqAuth = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/authentication?token=${data.token}`);
            const resAuth: {logged: boolean} = await reqAuth.json();

            if(resAuth.logged) {
                const queryString = new URL(window.location.href);
                if(queryString.searchParams.get('redirect') != null) {
                    router.push(queryString.searchParams.get('redirect') as string)
                } else {
                    //window.location.href = process.env.NEXT_PUBLIC_CLIENT_PAINEL_URL as string;
                    router.push('/meusSistemas');
                }

                dispatch(setNewNotification({
                    type: 'success',
                    content: t('SUCCESSFULLY_LOGGED_IN'),
                    cancelable: true,
                    timeout: 6, 
                }))
            } 
        } else {
            setEmailVerification(true);
        }

        setLoading(false);
    }

    useEffect(()=> {
        const queryString = new URL(window.location.href); 

        if(queryString.searchParams.has('error') && queryString.searchParams.get('error') == 'email_already_exists') {
            newNotificationErrorAlereadyEmailExists()
        }

        if(queryString.searchParams.has('stateToken')) {
            setTokenProviderSocial(queryString.searchParams.get('stateToken') as string);

            dispatch(setNewNotification({
                type: 'info',
                content: t('MAKE_A_PASSWORD_FOR_YOUR_NEW_ACCOUNT'),
                cancelable: true,
                timeout: 9, 
            }))
        }

        if(queryString.searchParams.has('name')) {
            setInputName(queryString.searchParams.get('name') as string);
            setInputNameDisabled(true);
        }
        if(queryString.searchParams.has('email')) {
            setInputEmail(queryString.searchParams.get('email') as string);
            setInputEmailDisabled(true);
        }
    }, []);

    return (
        <>
            <AuthInput
                disabled={inputNameDisabled}
                error={error}
                id='input-name'
                label={t('YOUR_NAME')}
                value={inputName}
                onChange={handleChangeInputName}
                autoFocus
            />

            <AuthInput
                disabled={inputEmailDisabled}
                error={error}
                id='input-email'
                label={t('YOUR_MAIL')}
                value={inputEmail}
                onChange={handleChangeInputEmail} 
            />

            <AuthInput
                error={error}
                id='input-pass'
                label={t('YOUR_PASSWORD')}
                value={inputPassword}
                onChange={handleChangeInputPassword}
            />
        
            <button
                onClick={handleRegister}
                style={{textTransform:'capitalize'}}
                className={!inputEmail || !inputPassword || !inputName ? styles.btnAuthDisabled : styles.btnAuth}
                disabled={loading || !inputEmail || !inputPassword || !inputName  ? true : false}
            >
                {t('REGISTER')}
            </button>

            <RegisterHandleSocial
                setLoadingSocial={setLoadingSocial}
            />
        </>
    )
}