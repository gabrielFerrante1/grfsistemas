import {IoMdArrowDropdown} from 'react-icons/io';
import { Avatar } from '@mui/material';
import styles from './Account.module.scss';

export default () => {
    return (
        <div>
            <div className={styles.accountLogged}>
                <Avatar
                    className={styles.avatar}
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                    alt='Avatar do usuário'
                />

                <span className={styles.name}>
                    Gabreil Ferrante 
                </span>
                
                <IoMdArrowDropdown
                    className={styles.iconDropdown}
                />

            </div>
        
        </div>
    )
}