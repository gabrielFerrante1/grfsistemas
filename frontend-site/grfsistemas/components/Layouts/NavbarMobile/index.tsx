import styles from './NavbarMobile.module.css';
import { Drawer } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GrMenu } from "react-icons/gr";
import { SelectLanguage } from "../SelectLanguage";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

export const NavbarMobile = () => {
    const { t } = useTranslation();

    const theme = useSelector((state: RootState) => state.theme);  

    const router = useRouter();

    const [menuVisible, setMenuVisible] = useState(false);  

    const handleMenuVisibleToggle = () => setMenuVisible(!menuVisible);

    return (
        <>
            <div style={{flex:100,alignSelf:'center'}}>
                <GrMenu onClick={handleMenuVisibleToggle} className={styles.btnMobileMenu} />
        
                <Drawer 
                    onClose={handleMenuVisibleToggle}
                    open={menuVisible}
                    anchor={'left'}
                    sx={ {'& .MuiDrawer-paper': { width: 250, padding: 1 } } }
                >
                
                    <ul className={styles.menuMobileList}>
                        <li>
                            <Link href="/"> 
                                <span className={`${router.pathname == '/' ? styles.linkMenuMobileActive : styles.linkMenuMobile}`}>{t('HOME')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/sistemas"> 
                                <span className={`${router.pathname == '/sistemas' ? styles.linkMenuMobileActive : styles.linkMenu}`}>{t('SYSTEMS')}</span>
                            </Link>
                        </li>
                        <li>
                            <SelectLanguage />
                        </li> 
                    </ul> 
                </Drawer>
            </div>

            <div className={styles.logo}>
                <Link href="/">
                    <img alt="Grf sistemas" src={theme.theme == 'light' ? '/imgs/logo.jpeg' : '/imgs/logo-dark.png'} />
                </Link>
            </div>
        </>
    )
}