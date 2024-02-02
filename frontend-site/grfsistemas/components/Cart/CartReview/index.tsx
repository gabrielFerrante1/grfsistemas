import { Avatar, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import styles from './CartReview.module.css';

const { Text } = Typography;

export const CartReview = () => {
    const { t } = useTranslation();

    const cart = useSelector((state: RootState) => state.cart);

    const router = useRouter(); 
    const navTo = (url: string) => {
        router.push(url);
    }

    return (
        <>
            <div className={styles.header}>
                <h5 className={styles.headerTitle}>{t('ORDER_SUMMARY')} </h5>
            </div>

            <div className={styles.body}>
                {cart.infoCart.cart.systems.map((item, key) => (
                    <div style={{marginBottom: cart.infoCart.cart.systems.length == key+1 ? '0' : '17px'}} key={key} className={styles.system}>
                        <div>
                        <Avatar
                            alt={item.name}
                            src={item.media}
                            size={38}
                            shape="square"
                        />
                        </div>

                        <div style={{flex:1,width:'70%'}}>
                            <Text   
                                strong 
                                className={styles.systemName}
                                onClick={() => navTo(`/${item.id}`)}
                            > 
                                {item.name} 
                            </Text>

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
                <div className={styles.footerSubTotal}>
                    <Text 
                        className={styles.footerSubTotalText} 
                    > 
                        Subtotal
                    </Text>

                    <Text
                        className={styles.footerSubTotalPrice} 
                    > 
                        R$ {cart.infoCart.cart.summary.total_amount} 
                    </Text>
                </div>

                <div className={styles.footerTotalAmount}>
                    <Text
                        strong 
                        className={styles.footerTotalAmountText} 
                    > 
                        Total
                    </Text>

                    <Text   
                        strong 
                        className={styles.footerTotalAmountPrice} 
                    > 
                        R$ {cart.infoCart.cart.summary.total_amount} 
                    </Text>
                </div>
            </div>
        </>
    )
}