import styles from './CartDrawerReview.module.css'
import {IoCloseOutline} from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Avatar, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { LinearProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCartDrawerActive } from '../../../redux/reducers/cartReducer';

const { Text } = Typography;

export default () => {
    const { t } = useTranslation();

    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const handleCloseDrawer = () => {
        dispatch(setCartDrawerActive(false));
    }

    const router = useRouter(); 
    const navTo = (url: string) => {
        if(url == '/carrinho') {
            handleCloseDrawer()
        }
        router.push(url);
    }

    return (
        <div style={{right: cart.cartDrawerActive ? 0 : '-90%'}} id={styles.cartDrawer}>
            <div className={styles.header}>
                <IoCloseOutline onClick={handleCloseDrawer}/>
            </div>

            <div hidden={!cart.loadingCart}>
                <LinearProgress className={styles.loadingCart} variant='indeterminate' color='primary'/>
            </div>

            <div className={styles.body}>
                {cart.infoCart.cart.systems.map((item, key) => (
                    <div style={{borderBottom: cart.infoCart.cart.systems.length == key+1 ? 'none' : '1px solid var(--grayLight)', marginBottom: cart.infoCart.cart.systems.length == key+1 ? '0' : '10px'}} key={key} className={styles.system}> 
                        <Avatar
                            alt={item.name}
                            src={item.media}
                            size={39}
                            shape="square"
                        />

                        <div style={{flex:1,width:'70%'}}>
                            <div className={styles.systemNameContent}>
                            <Text
                                strong
                                className={styles.systemName}
                                onClick={() => navTo(`/${item.id}`)}
                            > 
                                {item.name}
                            </Text> 
                            </div>

                            <small className={styles.systemPlan}>
                                {item.id_plan == 1 ?
                                    `${t('PLAN')} ${t('MONTHLY')}`
                                : item.id_plan == 2 ?
                                    `${t('PLAN')} ${t('YEARLY')}`
                                : item.id_plan == 3 ?
                                    `${t('PLAN')} ${t('LIFETIME')}`
                                :  item.id_plan == 4 ?
                                    `${t('PLAN')} ${t('FREE')}`
                                : ''}
                            </small>
                        </div>

                        <Text
                            strong
                            className={styles.systemPrice} 
                        >
                            R$ {item.price}
                        </Text>
                    </div>
                ))}
            </div>

            <div className={styles.footer}>
                    <Text
                        strong 
                        className={styles.total} 
                    > 
                        Total
                    </Text>

                <Text
                    strong
                    className={styles.totalPrice} 
                > 
                    R$ {cart.infoCart.cart.summary.total_amount} 
                </Text>
            </div>

            <button
                onClick={() => navTo('/carrinho')}
                className={styles.btnGoToCart} 
            >
                {t('VIEW_CART')}
            </button>
        </div>
    )
}