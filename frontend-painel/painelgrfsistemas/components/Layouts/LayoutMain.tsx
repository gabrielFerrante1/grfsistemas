import { ReactElement, useEffect, useState } from "react"
import styles from './LayoutMain.module.scss';  
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from "../../redux/store";
import { setTheme } from "../../redux/reducers/themeReducer";
import { NavBar } from "./Navbar";
import { NavbarMobile } from "./NavbarMobile";
import NextNProgress from "nextjs-progressbar";     
import { Col, Row } from "react-bootstrap";
import Sidebar from "./Sidebar/sidebar";

type Props = {
    children: ReactElement
}

export default ({ children }: Props) => {
    const theme = useSelector((state: RootState) => state.theme);

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('theme')) {
            if (localStorage.getItem('theme') == 'dark') {
                dispatch(setTheme('dark'));
            }
        } else {
            localStorage.setItem('theme', 'light');
        }
    }, []);

    return (
        <div className={`${theme.theme} `}>
            <NextNProgress
                color="blueviolet"
                showOnShallow
                height={4}
            />

            <div className={`${styles.layoutBody}`}> 
                <header id={styles.headerApp}>
                    <div className="d-md-block d-none">
                        <NavBar/>
                    </div>

                    <div className={`${'d-md-none d-flex'} ${styles.navBarMobile}`}>
                        <NavbarMobile />
                    </div>
                </header>
             
                <div id={styles.app}>
                    <Sidebar />

                    <div className={styles.appPage}>
                            {children}
                        </div>
                    </div>
            </div>
          
        </div>
    );
};
