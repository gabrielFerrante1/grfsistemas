import styles from './Navbar.module.scss';
import { SwitchTheme } from "../SwitchTheme";
import { 
    IoMdNotificationsOutline 
} from "react-icons/io";  
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { SelectLanguage } from "../SelectLanguage";
import { RootState } from '../../../redux/store';
import Account from '../Account';

export const NavBar = () => {
    const theme = useSelector((state: RootState) => state.theme);

    const router = useRouter();

    const navTo = (url: string) => {
        router.push('/'+url);
    }

    return (
        <nav id={styles.navApp}>
            <div className={styles.logo}>
                <Link href="/">
                    <img 
                        alt="Grf sistemas"
                        src={theme.theme == 'light' ? '/imgs/logo.jpeg' : '/imgs/logo-dark.png'} 
                    />
                </Link>
            </div>

            <div className={styles.divLanguageSelect}>
                <SelectLanguage />
            </div>

            <div className={styles.divThemeSwitch}> 
                <SwitchTheme />
            </div>

            <div className={styles.divIconNotification}>
                <IoMdNotificationsOutline 
                    onClick={
                        () => navTo('auth/login')
                    }
                    className={`${styles.iconMenu}`}
                />
            </div>
 
            <div className={styles.divAccount}>
                <Account />
            </div>
        </nav>
    )
}