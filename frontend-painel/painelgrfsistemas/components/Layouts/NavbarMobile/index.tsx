import styles from './NavbarMobile.module.scss';
import Account from '../Account';
import { SwitchTheme } from '../SwitchTheme';
import { IoMdNotificationsOutline } from 'react-icons/io';

export const NavbarMobile = () =>
    (
        <>
            <div className={styles.divThemeSwitch}> 
                <SwitchTheme />
            </div>

            <div className={styles.divIconNotification}>
                <IoMdNotificationsOutline  
                    className={`${styles.iconMenu}`}
                />
            </div>

            <div className={styles.account}>
                <Account />
            </div>
        </>
    ) 