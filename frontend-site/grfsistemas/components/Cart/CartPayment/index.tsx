import { useTranslation } from 'react-i18next';
import styles from './CartPayment.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCartLoadingRedirectPayment, setStepCart } from '../../../redux/reducers/cartReducer';
import { api, apiAuth } from '../../../utils/api'; 
import { LinearProgress } from '@mui/material';
import { setNewNotification } from '../../../redux/reducers/notificationReducer';
import { ApiPropsNewPurchase } from '../../../types/Purchase';
import { FiUnlock } from 'react-icons/fi';

export default () => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true); 
    const [noPaymentRequired, setNoPaymentRequired] = useState(false);
    const [tokenPurchase, setTokenPurchase] = useState('');

    const dispatch = useDispatch();

    const goToFinalStep = () => {
        dispatch(setStepCart(4));
    }

    const makePayment = (method: string) => {
        dispatch(setCartLoadingRedirectPayment('paypal'));
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/purchase/payment/${tokenPurchase}?method_payment=${method}`as string;
    }

    useEffect(() => {
        async function newPurchase () {
            setLoading(true);

            const dataAuth = await apiAuth();
            if(dataAuth.error) {
                dispatch(setStepCart(2));
    
                dispatch(setNewNotification({
                    type: 'error',
                    content: t('AUTHENTICATION_IS_REQUIRED'),
                    cancelable: false,
                    timeout: 5,
                }));
                return;
            }

            const data: ApiPropsNewPurchase = await api('purchase', 'post', {}, dataAuth.user.token);
            setTokenPurchase(data.token_payment);

            if(data.noPaymentRequired) {
                setNoPaymentRequired(true);
            }

            setLoading(false)
        }
        newPurchase();

    }, []);

    return (
        
                <>
                    <h4 className={styles.title}>{t('PAYMENT')}</h4> 
                    <small className={styles.titleDescription}>
                        {noPaymentRequired ?
                            t('NO_PAYMENT_NEEDED_TO_PURCHASE_A_SYSTEM_WITH_FREE_PLAN')
                        :
                            t('SELECT_A_PAYMENT_METHOD_AND_MAKE_IT')
                        }
                    </small>

                    <div style={{margin:'0 0.5px'}} hidden={!loading}>
                        <LinearProgress className={styles.loadingProgress} variant='indeterminate' />
                    </div>

                    <section className={styles.card}>
                        <button 
                            hidden={loading || noPaymentRequired}
                            className={styles.paymentBtn}
                            onClick={() => makePayment('paypal')}
                        >
                            <img
                                className={styles.paymentBtnIcon} 
                                src='/imgs/paypal.png'
                            />  
                        </button>

                        <button 
                            hidden={loading || !noPaymentRequired}
                            className={styles.noPaymentBtn}
                            onClick={goToFinalStep}
                        >
                            <FiUnlock className={styles.noPaymentBtnIcon} />
                            {t('WITHOUT_PAY')}
                        </button> 
                    </section> 
                </>
        );
};