import { LinearProgress } from "@mui/material";
import { Affix } from "antd";
import Head from "next/head";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CartAuth from "../components/Cart/CartAuth";
import CartPayment from "../components/Cart/CartPayment";
import { CartReview } from "../components/Cart/CartReview";
import { CartSystems } from "../components/Cart/CartSystems";
import { CartTabs } from "../components/Cart/CartTabs";
import { setCartAuthentication, setStepCart } from "../redux/reducers/cartReducer";
import { setNewNotification } from "../redux/reducers/notificationReducer";
import { RootState } from "../redux/store";
import styles from '../styles/Cart.module.css';
import { ApiPropsCheckTokenPurchase } from "../types/Purchase";
import { api } from "../utils/api";
import LoadingPayment from "../components/Loading/LoadingOtherServices";
import CartSuccess from "../components/Cart/CartSuccess";

function Carrinho(): JSX.Element {
    const { t } = useTranslation();

    const cart = useSelector((state: RootState) => state.cart); 

    const dispatch = useDispatch();

    useEffect(() => {
        const queryString = new URL(window.location.href);

        if(queryString.searchParams.has('tokenPayment')) {
            const checkTokenPayment = async () => {
                const data: ApiPropsCheckTokenPurchase = await api(`check-purchase-token/${queryString.searchParams.get('tokenPayment')}`);

                if(data.token_payment) {
                    dispatch(setCartAuthentication(true));

                    if(queryString.searchParams.has('success')) {
                        dispatch(setStepCart(4));
                    } else if(queryString.searchParams.has('error') && queryString.searchParams.get('error') == 'paypal_unavailable') {
                        dispatch(setStepCart(3));

                        dispatch(setNewNotification({
                            type: 'error',
                            content: t('WE_GET_NO_RESPONSE_FROM_PAYPAL_SERVERS_TRY_AGAIN_LATER'),
                            cancelable: false,
                            timeout: 10, 
                        }));
                    } else if(queryString.searchParams.has('error') && queryString.searchParams.get('error') == 'payapal_transaction_canceled') {
                        dispatch(setStepCart(3));

                        dispatch(setNewNotification({
                            type: 'error',
                            content: t('THE_TRANSACTION_HAS_BEEN_CANCELED'),
                            cancelable: false,
                            timeout: 10, 
                        }));
                    }
                }
            }

            checkTokenPayment();
        }
    }, []);

    return (
        <div>
            <Head>
                <title>Carrinho - Grf Sistemas Desenvolvimento Web</title>

                <meta name="robots" content="index" />
                <meta name="author" content="Grf  Sistemas" />
                <meta name="keywords" content="cart grf sistemas, cart grf sistema, carrinho grf sistemas, grf sistema carrinho, sistema grf carrinho, grf sistemas meu carrinho, grf sistema meu carrinho " />
            </Head>

            {cart.cartLoadingRedirectPayment ?
                <LoadingPayment 
                    provider={cart.cartLoadingRedirectPayment}
                />
            : ''} 
            
            <CartTabs />

            <div hidden={!cart.loadingCart}>
                <LinearProgress className={styles.loadingCart} color='primary' />
            </div>

            <Container fluid className={styles.cartApp}>
                <Row>
                    <Col className={`offset-xl-1 ${styles.cartAppViewPage}`} md={cart.infoCart.error == '404' ? 11 : 6}>
                        {cart.step == 1 ?
                            <CartSystems />
                        : cart.step == 2 ?
                            <CartAuth />
                        : cart.step == 3 ?
                            <CartPayment />
                        : cart.step == 4 ?
                            <CartSuccess />
                        : ''}
                    </Col>

                    <Col
                        hidden={cart.infoCart.error == '404'}
                        className={`offset-md-1 ${styles.cartAppReviewCart}`} md={5} lg={5} xl={4}
                    >
                        <Affix 
                            className="d-none d-md-block"
                        >  
                                <CartReview />
                           
                        </Affix>
    
                        <div className="d-md-none">
                            <CartReview />
                        </div>
                    </Col>

                </Row>
            </Container>
        </div>
    );
}

export default Carrinho;