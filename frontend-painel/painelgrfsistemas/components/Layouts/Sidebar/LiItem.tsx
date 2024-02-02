import styles from './Sidebar.module.scss';
 
import { Tooltip, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import {
    AiOutlineHome,
    AiOutlineSetting
} from 'react-icons/ai';
import {
    BiPurchaseTag
} from 'react-icons/bi';
import {
    RiAccountCircleLine
} from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const { Text } = Typography

type ParamsLiItem = {
    redirect: string,
    title: string,
    noBorderBottom?: boolean 
}

const iconItem = (title: string) => (
    title == 'HOME' ?
        <AiOutlineHome className={styles.icon} />
        : title == 'MY_SHOPPING' ?
            <BiPurchaseTag className={styles.icon} />
            : title == 'MY_ACCOUNT' ?
                <RiAccountCircleLine className={styles.icon} />
                : title == 'SETTINGS' ?
                    <AiOutlineSetting className={styles.icon} />
                    : ''
)

export default ({ redirect, title, noBorderBottom = false }: ParamsLiItem) => {
    const { t } = useTranslation();

    const sidebar = useSelector((state: RootState) => state.sidebar);

    const router = useRouter();
    const navTo = (url: string) => {
        router.push(url);
    }

    return (
        <li
            style={{
                borderBottom: noBorderBottom ? 'none' : '1px solid rgba(175, 175, 175, 0.414)' 
            }}
            onClick={() => navTo(redirect)}
            className={styles.liLink}
            
        >
            {sidebar.active ?
                <div className={styles.itemMenu}>
                    { iconItem(title) }

                    <Text className={styles.itemMenuText}>
                        {t(title)}
                    </Text>
                </div>
                :
                <Tooltip
                    destroyTooltipOnHide
                    title={t(title)}
                    placement='right'
                    color='gray'
                >
                    <div>
                        {iconItem(title)}
                    </div>
                </Tooltip>
            }
        </li>
    )
}