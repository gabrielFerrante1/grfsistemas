import styles from './Sidebar.module.scss';

import {
    BiArrowFromLeft,
    BiArrowFromRight
} from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarActive } from '../../../redux/reducers/sidebarReducer';
import { RootState } from '../../../redux/store';
import LiItem from './liItem'

export default () => {
    const sidebar = useSelector((state: RootState) => state.sidebar);
    const dispatch = useDispatch();

    const toggleSidebar = () => {
        if (sidebar.active) {
            dispatch(setSidebarActive(false));
        } else {
            dispatch(setSidebarActive(true));
        }
    }

    return (
        <div
            style={{ width: sidebar.active ? '230px' : '70px' }}
            className={styles.sidebar}
        >
            <ul className={styles.listLinks}>
                <LiItem
                    redirect='/'
                    title='HOME'
                />

                <LiItem
                    redirect='/minhas-compras'
                    title='MY_SHOPPING'
                />

                <LiItem
                    redirect='/'
                    title='MY_ACCOUNT'
                />

                <LiItem
                    redirect='/'
                    title='SETTINGS'
                    noBorderBottom
                />

                <li
                    onClick={toggleSidebar}
                    className={styles.liToggleSidebar}
                >
                    {sidebar.active ?
                        <BiArrowFromRight className={styles.icon} />
                        :
                        <BiArrowFromLeft className={styles.icon} />
                    }
                </li>
            </ul>
        </div>
    )
}