import { ReactElement, useEffect, useState } from "react"
import styles from './LayoutMain.module.css';  
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from "../../redux/store";
import { setTheme } from "../../redux/reducers/themeReducer"; 
import { ContentSearch } from "./ContentSearch";
import { Slide } from "@mui/material";  
import { NavBar } from "./Navbar";
import { NavbarMobile } from "./NavbarMobile";
import { Footer } from "./Footer";
import NextNProgress from "nextjs-progressbar";  
import { Notifications } from "../Notification";
import { UserAuth } from "../../types/User"; 
import CartDrawerReview from "../Cart/CartDrawerReview";

type Props = {
    children: ReactElement
}

export const LayoutMain = ({children}: Props) => { 
    const theme = useSelector((state: RootState) => state.theme); 

    const dispatch = useDispatch();

    const [searchVisible, setSearchVisible] = useState(false);

    useEffect(() => { 
        const queryString = new URL(window.location.href);
        
        if(queryString.searchParams.get('q') != null) {
            setSearchVisible(true)
        }

        if(localStorage.getItem('theme')) {
            if(localStorage.getItem('theme') == 'dark') {
                dispatch(setTheme('dark')); 
            }
        }  else {
            localStorage.setItem('theme', 'light'); 
        } 
    }, []);

    return (
        <div className={theme.theme}>
            {!searchVisible &&
                <NextNProgress 
                    color="blueviolet"
                    showOnShallow
                    height={4}
                />
            } 

            <Notifications />

            <CartDrawerReview />

            <header id={styles.headerApp}>
                <div style={{transition:searchVisible ? 'all 1s' : 'all 0.5s', height:searchVisible ? '80px' : 0}}>
                    <Slide  
                        in={searchVisible} 
                        style={{ transformOrigin: '0 0 0' }}
                        {...(searchVisible ? { timeout: 1000 } : {})}
                    >
                        <div>
                            <ContentSearch  search={searchVisible} setSearch={setSearchVisible} />
                        </div>
                    </Slide>
                </div> 

                <div className="d-lg-block d-none">
                    <NavBar
                        searchVisible={searchVisible}
                        setSearchVisible={setSearchVisible}
                    />
                </div> 

                <div className={`${'d-lg-none d-flex'} ${styles.navBarMobile}`}>
                    <NavbarMobile />
                </div> 
            </header>

                {/******************** Content  *********************/}
                                      {children}
                {/******************* End Content  ******************/}
 
            <footer id={styles.footerApp}>
                <Footer />
            </footer> 
     </div>
    )
}
