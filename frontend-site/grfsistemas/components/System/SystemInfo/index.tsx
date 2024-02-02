import styles from './SystemInfo.module.css';
import { System, SystemPlan, SystemRecentPurchase } from "../../../types/System"
import { useTranslation } from 'react-i18next';
import { Select } from 'antd'; 
import {  useState } from 'react';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import { Container, Row } from 'react-bootstrap'; 
import { CircularProgress, Rating } from '@mui/material';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined'; 
import {
    BsInfoCircleFill
} from 'react-icons/bs';
import { Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { setCartDrawerActive, setInfoCart, setRenderSystemsCart } from '../../../redux/reducers/cartReducer';
import { api, apiAuth } from '../../../utils/api';
import { Api } from '../../../types/Api';
import { ApiProsCartSystem } from '../../../types/Cart';
import { setNewNotification } from '../../../redux/reducers/notificationReducer';

type Props = {
    data: System, 
    recentPurchase: SystemRecentPurchase
}

const { Option } = Select;
const { Text } = Typography;

const TransformPlan = ({id_plan}: {id_plan: number}) => {
    const {t} = useTranslation();

    let text = '';

    switch (id_plan) {
        case 1:
            text = t('MONTHLY')
            break;
        case 2:
            text = t('YEARLY')
            break;
        case 3:
            text = t('LIFETIME')
            break;
        case 4:
            text = t('FREE') 
    }

    return (
        <span className={styles.infoPlanPricePlan}>
            {text}
        </span>
    )
}

export const SystemInfo = ({data, recentPurchase}: Props) => {
    const {t} = useTranslation(); 

    const [planSelected, setPlanSelected] = useState<SystemPlan>(data.plans[0]); 
    const [loadingAddOnCart, setLoadingAddOnCart] = useState(false);

    const dispatch = useDispatch();

    const changePlan = (id_plan: number) => {
        const plan = data.plans.filter(item => item.id_plan == id_plan);

        setPlanSelected(plan[0]);
    }

    const handleNewSystemOnCart = async () => {
        setLoadingAddOnCart(true);
        const dataAuth = await apiAuth();

        let token = '';
        dataAuth.error == false ? token = dataAuth.user.token : '';

        const addSystemToCart: Api = await api(`add-system-in-cart/${data.id}`, 'post', {
            id_plan: planSelected.id_plan
        }, token);

        
        if(addSystemToCart.error == 'this_system_already_exists_in_cart' || addSystemToCart.error == 'plan_free_unauthorized') {
            dispatch(setNewNotification({
                type: 'info',
                content: t('THIS_SYSTEM_IS_ALREADY_IN_YOUR_CART'),
                cancelable: false,
                timeout: 5,
            }))
        }  else {
            const data: ApiProsCartSystem = await api('cart', 'get', '', token);

            dispatch(setInfoCart(data));
 
            dispatch(setCartDrawerActive(true));
            dispatch(setRenderSystemsCart(true));
        }
        setLoadingAddOnCart(false);
    }

    return (
        <Container style={{margin:0,padding:0}}> 
            <Row>
                <div className={styles.infoHeader}>
                    <h3>
                        {data.name}
                    </h3>

                    <div style={{marginTop:'-6px'}}> 
                        <p className={styles.infoHeaderCategory}>
                            {data.category_name}
                        </p> 
                    </div>
                    
                    <div style={{float:'right',marginTop:'-11.5px'}}>
                        <div hidden={!data.new} className={styles.infoHeaderSealNew}>
                            {t('NEW')}
                        </div>
                    </div>
                    
                    <div style={{display:'flex',marginTop:'-7px'}}>
                        <Rating
                            className={styles.infoHeaderRate}
                            name="simple-controlled"
                            readOnly
                            value={data.rating.average}
                            precision={0.5}
                            emptyIcon={<StarOutlineOutlinedIcon style={{fontSize:'16px',color:'rgba(184, 184, 184, 0.922)'}}/>} 
                        />

                        <span className={styles.infoHeaderRateText}>
                            {data.rating.count}

                            <span>
                                {t('OPINIONS')}
                            </span>
                        </span>
                    </div>
                </div>

                <div className={styles.infoPlan}>
                    <h4>
                        R$ {planSelected.price}
    
                        <span className={styles.infoPlanDivisorPrice}> / </span>

                        <TransformPlan id_plan={planSelected.id_plan}/>
                    </h4> 

                    <Select
                        bordered={false}
                        className={styles.infoPlanSelectPlan}
                        defaultValue={planSelected.id_plan}
                        onChange={changePlan} 
                    >    
                        {data.plans.map((item, key) => (
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

                    {recentPurchase.buyBack ?
                        <div className={styles.infoRecentPurchase}>
                            <BsInfoCircleFill className={styles.infoRecentPurchaseIcon}/>

                            <Text strong>
                               {t('DID_YOU_BUY_THIS_SYSTEM_IN')}
                            </Text>

                            <Text strong style={{color:'var(--colorText)',marginLeft:5}}>
                                {recentPurchase.date}
                            </Text>
                        </div>
                    : ''}

                    {loadingAddOnCart ?
                        <button
                            disabled
                            className={styles.infoPlanButtonCart}
                        >
                            <CircularProgress style={{marginBottom:-1,marginRight:9,color:'var(--secondary)'}} size={19}/>

                            {t('ADDING')}...
                        </button>
                    :
                        <button 
                            onClick={handleNewSystemOnCart}
                            className={styles.infoPlanButtonCart}
                        >
                            <SellOutlinedIcon style={{fontSize:'18px',margin:'3px 5px 0 0'}}/>

                            {t('ADD_TO_CART')}
                        </button>
                    }
                    
                </div>
            </Row>
             
        </Container>
    )
}