import styles from './CartSystems.module.css';
import { Avatar, Select, Skeleton, Typography } from 'antd';
import {
    VscTrash
} from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setInfoCart, setLoadingCart, setRenderSystemsCart, setStepCart } from '../../../redux/reducers/cartReducer';
import { useEffect, useState } from 'react';
import { ApiProsCartSystem } from '../../../types/Cart';
import { api, apiAuth } from '../../../utils/api';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const { Text } = Typography;
const { Option } = Select;

export const CartSystems = () => {
    const { t } = useTranslation();

    const [dataCart, setDataCart] = useState<ApiProsCartSystem>();
    const [tokenAuth, setTokenAuth] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const cart =  useSelector((state: RootState) => state.cart);

    const router = useRouter();

    const nextStep = () => {
        dispatch(setStepCart(2));
    }

    const navTo = (url: string) => {
        router.push(url);
    }

    const getCart = async () => {
        dispatch(setLoadingCart(true)); 

        const dataAuth = await apiAuth();
        
        if(dataAuth.error == false) {
            setTokenAuth(dataAuth.user.token)
        }

        const data: ApiProsCartSystem = await api('cart', 'get', '', dataAuth.error == false ? dataAuth.user.token : '');
        setError(data.error);

        if(data.error != '404') {
            setDataCart(data);
            
            dispatch(setInfoCart(data));
        } else {
            dispatch(setInfoCart({
                error: '404',
                cart: {
                    summary: {
                        total_amount: 0
                    },
                    systems: []
                }
            }));
        }
        
        dispatch(setRenderSystemsCart(true));
        dispatch(setLoadingCart(false));
    }

    const handleChangePlan = async (value: number, id_system: number) => {
        dispatch(setLoadingCart(true));

        await api(`edit-system-cart/${id_system}`, 'put', {
            id_plan: value
        }, tokenAuth);

        await getCart();

        dispatch(setLoadingCart(false));
    }

    const handleRemoveSystem = async (id_system: number) => { 
        dispatch(setLoadingCart(true));

        await api(`del-system-cart/${id_system}`, 'delete', { }, tokenAuth);

        await getCart();

        dispatch(setLoadingCart(false));
    }

    useEffect(() => {
        if(!cart.renderSystemsCart) {
            getCart()
        } else {
            const getTokenAuth = async () => {
                const dataAuth = await apiAuth();

                if(dataAuth.error == false) {
                    setTokenAuth(dataAuth.user.token)
                }
            }

            getTokenAuth();

            setError(cart.infoCart.error)

            setDataCart({
                error: cart.infoCart.error,
                cart: {
                    systems: cart.infoCart.cart.systems,
                    summary: cart.infoCart.cart.summary
                }
            })
        }
    }, []);

    return (
        <div>
            <h4 className={styles.title}>{t('PRODUCTS_IN_CART')} </h4>

            {error == '404' ?
                <section className={styles.systems404}>
                    <small >
                        {t('404_SYSTEMS_ON_CART')}
                    </small>

                    <button onClick={() => navTo('/sistemas')}>
                        {t('GO_TO_SYSTEMS')}
                    </button>
                </section>
            : ''}

            <section hidden={error != '404' ? false  : true} className={styles.card}>
                {dataCart?.cart.systems.map((item, key) => ( 
                    <div style={{borderBottom: dataCart.cart.systems.length == key+1 ? 'none' : ''}} key={key} className={styles.planContent}>
                        <div hidden={!cart.loadingCart}>
                            <Skeleton avatar></Skeleton>
                        </div>

                        <div hidden={cart.loadingCart} >
                            <div className={styles.plan}> 
                                    <Avatar 
                                        size={50}
                                        shape='square'
                                        src={item.media}
                                        alt={item.name}
                                        className={styles.planImage} 
                                    />

                                    <div className={styles.planInfo}>
                                        <div className={styles.planInfoContentName}> 
                                                <Text 
                                                    strong 
                                                    className={styles.planInfoName}
                                                    onClick={() => navTo(`/${item.id}`)}
                                                > 
                                                    {item.name} 
                                                </Text> 

                                            <VscTrash
                                                onClick={() => handleRemoveSystem(item.id)}
                                                className={styles.planInfoTrashIcon} 
                                            />
                                        </div>
                                    
                                        <small className={styles.planInfoNamePlan}>
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
                                    
                                    <div className={styles.planPrice}>
                                        <Text strong style={{color:'var(--colorText300)'}}>
                                            R$ {item.price}
                                        </Text> 
                                    </div>  
                            </div>

                            <div className={styles.alterPlan}>  
                                <Select
                                    bordered={false}
                                    className={styles.alterPlanSelectPlan}
                                    defaultValue={item.id_plan}
                                    size='small'
                                    onChange={ (value) => handleChangePlan(value, item.id)}
                                >
                                    {item.plans.map((item, key) => (
                                        <Option key={key} value={item.id_plan}>
                                            {item.id_plan == 1 ?
                                                `${t('PLAN')} ${t('MONTHLY')}`
                                            : item.id_plan == 2 ?
                                                `${t('PLAN')} ${t('YEARLY')}`
                                            : item.id_plan == 3 ?
                                                `${t('PLAN')} ${t('LIFETIME')}`
                                            :  item.id_plan == 4 ?
                                                `${t('PLAN')} ${t('FREE')}`
                                            : ''}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            <button
                onClick={nextStep} 
                className={styles.btnNextStep}
                hidden={error != '404' ? false  : true}
            >
                {t('CLOSE_ORDER')}
            </button>
        </div>

    )
}