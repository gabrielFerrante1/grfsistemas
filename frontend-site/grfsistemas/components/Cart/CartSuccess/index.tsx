import { Button} from "antd"
import { useTranslation } from "react-i18next";
import styles from './CartSuccess.module.css';
import { AiFillCheckCircle }from 'react-icons/ai';
import {Typography} from '@mui/material';

export default () => {
    const { t } = useTranslation();

    return (
        <div id={styles.purchaseSuccess}>
            <AiFillCheckCircle className={styles.iconTrophy} />
             
            <Typography  variant="h6" className={styles.titleSuccess}>
                {t('PURCHASE_FINISHED_SUCCESSFULLY')}!
            </Typography>

            <small 
                className={styles.titleDescriptionSuccess}
                dangerouslySetInnerHTML={{__html: t('CONGRATULATIONS_PURCHASE_FINISHED_SUCCESS')}}
            />

            <Button href={process.env.NEXT_PUBLIC_CLIENT_PAINEL_URL} className={styles.btnGoToPainel} type="primary">{t('GO_TO_PAINEL')}</Button>
        </div>
    )
}