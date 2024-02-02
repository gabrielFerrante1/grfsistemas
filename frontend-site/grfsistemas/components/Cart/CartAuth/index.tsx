import { Avatar, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './CartAuth.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCartAuthentication, setStepCart } from '../../../redux/reducers/cartReducer';
import { api, apiAuth } from '../../../utils/api';
import { ApiPropsUserLoginSaveds, UserLoginSavedInfo } from '../../../types/User';
import { BiUserCircle } from 'react-icons/bi';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { Api } from '../../../types/Api';
import { setNewNotification } from '../../../redux/reducers/notificationReducer';

const { Text } = Typography;

interface ApiPropsLogin extends Api {
    token: string
}

export default () => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const [btnNextStepDisabled, setBtnNextStepDisabled] = useState(true);
    const [accounts, setAccounts] = useState<UserLoginSavedInfo[]>([]);
    const [selectedAccount, setSelectedAccount] = useState(0); 

    const dispatch = useDispatch();

    const router = useRouter();

    const nextStep = () => {
        dispatch(setStepCart(3)); 
    };

    const navTo = (url: string) => {
        router.push(url);
    }

    const changeAccount = async (id_account: number) => {
        setLoading(true);

        let token = '';
        const dataAuth = await apiAuth();
        if(!dataAuth.error) {
            token = dataAuth.user.token;
        }

        const data: ApiPropsLogin = await api(`auth/change-account-${id_account}`, 'put', {}, token);
        
        if(!data.error) {
            const reqAuth = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/authentication?token=${data.token}`);
            const resAuth: { logged: boolean; } = await reqAuth.json();

            if(resAuth) {
                setSelectedAccount(id_account);
                setBtnNextStepDisabled(false);

                dispatch(setCartAuthentication(true));

                dispatch(setNewNotification({
                    type: 'success',
                    content: t('ACCOUNT_SUCCESSFULLY_SELECTED'),
                    cancelable: false,
                    timeout: 5,
                }));
            }
        }
        setLoading(false);
    }

    useEffect(()=> { 
        const getUserLoginSaveds = async () => {
            setLoading(true);
            const data: ApiPropsUserLoginSaveds = await api('auth/user-login-saveds');
            setAccounts(data.users);

            const dataAuth = await apiAuth();
            if(!dataAuth.error) { 
                dispatch(setCartAuthentication(true));

                setSelectedAccount(dataAuth.user.id);
                setBtnNextStepDisabled(false);
            }
            setLoading(false);
        }

        getUserLoginSaveds();
    }, []);

    return (
        <>
            <h4 className={styles.title}>{t('IDENTIFICATION')}</h4>
            <small
                className={styles.titleDescription}
                dangerouslySetInnerHTML={{__html: accounts.length > 0 ? t('SELECT_AN_ACCOUNT_TO_PROCEED_WITH_YOUR_PURCHASE') : t('TO_PROCEED_WITH_YOUR_PURCHASE')}}
            >
            </small>

            <section className={styles.card}>
                {!loading ?
                    <> 
                        {accounts.map((account: UserLoginSavedInfo, key: number) => (
                            <div 
                                style={{pointerEvents: selectedAccount === account.user.id ? 'none' : 'auto'}}
                                onClick={() => {changeAccount(account.user.id)}}
                                key={key}
                                className={`${styles.cardAccountInfo} ${selectedAccount == account.user.id && styles.cardAccountInfoSelected}`}
                            >
                                <Avatar 
                                    size={33}
                                    shape='circle'
                                    src={account.user.avatar}
                                    alt={account.user.name}
                                />

                                <div className={styles.accountInfoUser}>
                                    <Text 
                                        strong
                                        className={styles.accountInfoUserName}
                                    >
                                        {account.user.name}
                                    </Text>
                                
                                    <small
                                        className={styles.accountInfoUserEmail}
                                    >
                                        {account.user.email}
                                    </small>
                                </div>

                            </div>
                        ))}

                        <div onClick={() => navTo('/auth/login?notRedirect=1')} style={{borderBottom: 'none'}} className={styles.cardAccountInfo}>
                                <BiUserCircle 
                                    className={styles.otherAccountIcon}
                                />

                                <div className={styles.accountInfoUser}>
                                    <Text 
                                        strong
                                        className={styles.otherAccountText}
                                    >   
                                        {accounts.length > 0 ? t('USE_OTHER_ACCOUNT') : t('AUTHENTICATION_IS_REQUIRED')} 
                                    </Text>
                                </div>
                        </div> 
                    </>
                : 
                    <div className={styles.accountLoading}>
                        <CircularProgress style={{color:'var(--primary)'}}/>
                    </div>
                }
            </section>

             
            <button
                disabled={btnNextStepDisabled || loading}
                onClick={nextStep}
                className={btnNextStepDisabled || loading  ? styles.btnNextStepDisabled : styles.btnNextStep}
            >
                {loading ?
                    `${t('LOADING')}...`
                : 
                    t('CONTINUE')
                }
            </button>
        </>
    );
};