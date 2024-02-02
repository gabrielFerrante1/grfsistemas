import styles from './CartTabs.module.css';
import {
    MdOutlineShoppingCart,
    MdPayment
} from 'react-icons/md';
import {
    RiUserSearchLine,
    RiTrophyLine
} from 'react-icons/ri';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setStepCart } from '../../../redux/reducers/cartReducer';
import { useEffect, useState } from 'react';

const { Text } = Typography;

export const CartTabs = () => {
    const { t } = useTranslation();

    const [stepCartState, setStepCartState] = useState(1); 

    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
 
    const alterStepToOrigin = (step: number) => {
        let stepAuthorize = 0;

        if(step == 1) { 
            stepAuthorize = 1;
        } else if(step == 2 && cart.step >= 2) { 
            stepAuthorize = 2; 
        } else if(step == 3 && cart.step >= 3) { 
            stepAuthorize = 3; 
        } else if(step == 4 && cart.step >= 4) { 
            stepAuthorize = 4;
        }
    
        if(stepAuthorize > 0) dispatch(setStepCart(stepAuthorize));
    }

    useEffect(() => {
        if(cart.step == 1) {
            setStepCartState(1);
        } else if(cart.step == 2 && cart.infoCart.error != '404') {
            setStepCartState(2);
        } else if(cart.step == 3 && cart.cartAuthentication) {
            setStepCartState(3);
        } else if(cart.step == 4) {
            setStepCartState(4);
        }
    }, [cart.step]);

    return (
        <div className={styles.cartTabsApp}>
            <div
                className={`${styles.cartTabsOneTabSpace} ${styles.cartTabsOneTab} ${stepCartState != 1 &&  stepCartState != 2 &&  stepCartState != 3 &&  stepCartState != 4  && styles.cartTabsOneTabDisabled}`} 
                onClick={() => alterStepToOrigin(1)}
            > 
                <div
                    className={`${stepCartState == 1 ? styles.cartTabsOneTabDivIconActive : styles.cartTabsOneTabDivIcon}`}
                    style={{cursor:stepCartState != 1 &&  stepCartState != 2 &&  stepCartState != 3 &&  stepCartState != 4  ? 'not-allowed' : 'pointer'}}
                >
                    <div className={styles.cartTabsOneTabIcon}>
                        <Text style={{color: 'var(--primary)'}} >
                            <MdOutlineShoppingCart style={{fontSize:22,marginLeft:3}}/>
                        </Text>
                    </div>
                </div>

                <Text strong style={{cursor:stepCartState != 1 &&  stepCartState != 2 &&  stepCartState != 3 &&  stepCartState != 4  ? 'not-allowed' : 'pointer'}}> 
                    {t('CART')}
                </Text>
            </div>

            <div
                className={`${styles.cartTabsOneTabSpace} ${styles.cartTabsOneTab} ${stepCartState != 2 &&  stepCartState != 3 &&  stepCartState != 4 && styles.cartTabsOneTabDisabled}`}  
                onClick={() => alterStepToOrigin(2)}
            >
                <div 
                    className={`${stepCartState == 2 ? styles.cartTabsOneTabDivIconActive : styles.cartTabsOneTabDivIcon}`}
                    style={{cursor:stepCartState != 2 &&  stepCartState != 3 &&  stepCartState != 4  ? 'not-allowed' : 'pointer'}}
                >
                    <div className={styles.cartTabsOneTabIcon}>
                        <Text style={{color: 'var(--primary)'}}> 
                            <RiUserSearchLine style={{fontSize:23,marginBottom:1,marginLeft:-0.5}}/>
                        </Text>
                    </div>
                </div>

                <Text strong  style={{cursor:stepCartState != 2 &&  stepCartState != 3 &&  stepCartState != 4  ? 'not-allowed' : 'pointer'}}> 
                    {t('IDENTIFICATION')}
                </Text>
            </div>

            <div
                className={`${styles.cartTabsOneTabSpace} ${styles.cartTabsOneTab} ${stepCartState != 3 && stepCartState != 4 && styles.cartTabsOneTabDisabled}`}   
                onClick={() => alterStepToOrigin(3)}
            >
                <div 
                    className={`${stepCartState == 3 ? styles.cartTabsOneTabDivIconActive : styles.cartTabsOneTabDivIcon}`}
                    style={{cursor: stepCartState != 3 &&  stepCartState != 4  ? 'not-allowed' : 'pointer'}}
                >
                    <div className={styles.cartTabsOneTabIcon}>
                        <Text style={{color: 'var(--primary)'}}> 
                            <MdPayment style={{fontSize:22,marginBottom:1.5}}/>
                        </Text>
                    </div>
                </div>

                <Text strong style={{cursor: stepCartState != 3 &&  stepCartState != 4  ? 'not-allowed' : 'pointer'}}> 
                    {t('PAYMENT')}
                </Text>
            </div>

            <div 
                className={`${styles.cartTabsOneTab} ${stepCartState != 4 && styles.cartTabsOneTabDisabled}`}
                onClick={() => alterStepToOrigin(4)}
            >
                <div
                    className={`${stepCartState == 4 ? styles.cartTabsOneTabDivIconActive : styles.cartTabsOneTabDivIcon}`}
                    style={{cursor:stepCartState != 4  ? 'not-allowed' : 'pointer'}}
                >
                    <div className={styles.cartTabsOneTabIcon}>
                        <Text style={{color: 'var(--primary)'}}> 
                            <RiTrophyLine style={{fontSize:22,marginBottom:1.5}}/>
                        </Text>
                    </div>
                </div>

                <Text strong style={{cursor:stepCartState != 4  ? 'not-allowed' : 'pointer'}}> 
                    {t('CONFIRMATION')}
                </Text>
            </div>
        </div>
    )
}