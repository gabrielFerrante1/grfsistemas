import styles from './Navbar.module.css';
import { SwitchTheme } from "../SwitchTheme";
import { 
    AiOutlineSearch,
    AiOutlineUser 
} from "react-icons/ai"; 
import {RiShoppingCartLine} from 'react-icons/ri';
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { SelectLanguage } from "../SelectLanguage";
import { RootState } from '../../../redux/store';
import { useTranslation } from 'react-i18next'; 


type Props = {
    searchVisible: boolean,
    setSearchVisible: (a: boolean) => void
}

export const NavBar = ({searchVisible, setSearchVisible}: Props) => {
    const {t} = useTranslation();

    const theme = useSelector((state: RootState) => state.theme);

    const router = useRouter();

    const openContentSearch = () => setSearchVisible(!searchVisible);

    const navTo = (url: string) => {
        router.push('/'+url);
    }

    return (
        <nav id={styles.navApp}>
            <div className={styles.logo}>
                <Link href="/">
                    <img alt="Grf sistemas" src={theme.theme == 'light' ? '/imgs/logo.jpeg' : '/imgs/logo-dark.png'} />
                </Link>
            </div> 

            <div className={styles.itemMenu}>
                <Link href="/"> 
                    <span className={`${router.pathname == '/' ? styles.linkMenuActive : styles.linkMenu}`}>{t('HOME')}</span>
                </Link>
            </div>

            <div className={styles.itemMenu}>
                <Link href="/sistemas"> 
                    <span className={`${router.pathname == '/sistemas' ? styles.linkMenuActive : styles.linkMenu}`}>{t('SYSTEMS')}</span>
                </Link>
            </div>

            <div className={styles.itemMenu3}>
                <Link href="/sistemas"> 
                    <span className={`${router.pathname == '/apap' ? styles.linkMenuActive : styles.linkMenu}`}>{t('MY_SYSTEMS')}</span>
                </Link>
            </div>


            <div className={styles.divIconMenu}> 
                <AiOutlineSearch 
                    className={`${styles.iconMenu1} ${searchVisible && styles.iconMenuActive}`}
                    onClick={openContentSearch}
                />
            </div>

            <div className={styles.linhaVertical}></div>

            <div className={styles.divIconMenu}>
                <AiOutlineUser 
                    onClick={() => navTo('auth/login')}
                    className={`${styles.iconMenu2} ${router.pathname == '/auth/login' || router.pathname == '/meusSistemas'  && styles.iconMenuActive}`}
                />
            </div>

            <div className={styles.linhaVertical}></div>

            <div className={styles.divIconMenu}> 
                <RiShoppingCartLine 
                    className={`${styles.iconMenu2} ${router.pathname == '/carrinho' && styles.iconMenuActive}`}
                    onClick={() => navTo('carrinho')}
                /> 
            </div>
    
            <div className={styles.linhaVertical}></div>
            
            <div className={styles.divLanguageSelect}>
                <SelectLanguage />
            </div>

            <div className={styles.linhaVertical}></div>

            <div className={styles.divThemeSwitch}> 
                <SwitchTheme />
            </div>
        </nav>
    )
}