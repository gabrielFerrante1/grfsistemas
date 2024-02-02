import styles from './AlertPlanFree.module.css';
import { useTranslation } from "react-i18next";
import {
    GrClose
} from 'react-icons/gr'; 

type Props = {
    setVisiblePlanFree: (a: boolean) => void
}

export const AlertPlanFree = ({setVisiblePlanFree}: Props) => {
    const { t } = useTranslation(); 

    const close = () => {
        setVisiblePlanFree(false); 
    }


    return (
        <div className={styles.alertPlanFree}>
            <GrClose onClick={close} className={styles.alertPlanFreeCloseIcon} />

            <h5>
                {t('ALERT_FREE_SYSTEM')} <span> {t('FREE')} </span>   {t('FOR')} {t('MONTH')}
            </h5>

            <p>
                {t('DESCRIPTION_FREE_SYSTEM')}
            </p>
        </div>
    )
}