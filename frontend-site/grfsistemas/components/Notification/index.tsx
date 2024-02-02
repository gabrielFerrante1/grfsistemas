import styles from './Notification.module.css'; 
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { NotificationItem } from "../Notification/notificationItem";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNewNotification, setNotifications } from '../../redux/reducers/notificationReducer';

export const Notifications = () => {
    const notifications = useSelector((state: RootState) => state.notification);
  
    const dispatch = useDispatch();

    useEffect(()=>{
        if(notifications.newNotification != null) {
            dispatch(setNotifications(notifications.notifications.concat(notifications.newNotification)));
            dispatch(setNewNotification(null))
        }
    }, [notifications.newNotification]);

    return (
        <div className={styles.notificationApp}>
            {notifications.notifications.map((item, key) => (
                <NotificationItem
                    key={key}
                    item={item}
                />
            ))}
        </div>
    )
}