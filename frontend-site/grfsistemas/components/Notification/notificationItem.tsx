import { Slide } from "@mui/material";
import { useEffect, useState } from "react" 
import { Notification } from "../../types/Notification"
import styles from './Notification.module.css';  
import {
    VscChromeClose,
    VscWarning,
    VscError,
    VscInfo
} from 'react-icons/vsc'; 
import {BiCheckCircle} from 'react-icons/bi';

import { Typography } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


type Props = {
    item: Notification
}

const { Text } = Typography

export const NotificationItem = ({item}: Props) => {
    const theme = useSelector((state: RootState) => state.theme);
    const [visible, setVisible] = useState(true);
 
    const borderTheme = {
        boxShadow: theme.theme == 'light' ? '3px 5.5px 14px -4px rgb(185, 178, 178)' : '3px 5.5px 14px -5px var(--primary)'
    }

    useEffect(()=>{
        setTimeout(()=>{
            setVisible(false);
        }, item.timeout * 1000)
    });

    return (
        <>
            <Slide
                direction="left"
                in={visible}
                unmountOnExit
            >
                <div style={borderTheme} className={styles.notificationItem}>
                    <div hidden={!item.cancelable} className={styles.notificationItemHeaderIcon}> 
                        <VscChromeClose onClick={() => setVisible(false)} className={styles.notificationItemHeaderIconClose}  />
                    </div>

                <div className={styles.notificationItemBody}> 
                        <div className={styles.notificationItemIcon}>
                            {item.type == 'error' ?
                                <VscError style={{color:'red'}}/> 
                            : item.type == 'info' ?
                                <VscInfo style={{color: 'rgba(10, 88, 255, 1)'}} />
                            : item.type == 'warning' ?
                                <VscWarning style={{color: 'rgba(255, 202, 10, 1)'}} />
                            : item.type == 'success' ?
                                <BiCheckCircle style={{color: 'rgba(14, 232, 18, 1)'}} />
                            : ''} 
                        </div>

                        <div className={styles.notificationItemContent}>
                            <Text style={{color:'var(--colorText)'}}>
                                <div dangerouslySetInnerHTML={{__html: item.content}} /> 
                            </Text>
                        </div> 
                    </div>
                </div>
            </Slide>
        </>
    )
}