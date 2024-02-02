import styles from './SystemItem.module.css';
import { OneSystem } from "../../types/Systems"; 
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

type Props = {
    data: OneSystem
}

export const SystemItem = ({data}: Props) => {
    const { t } = useTranslation();
    const router = useRouter();

    const redirectToLink = () => {
        router.push(`/${data.id}`)
    }

    return ( 
        <div className={styles.cardSystem}>
            <div className={styles.cardSeals}>
                {data.new &&
                    <div className={styles.cardSealNew}>
                        {t('NEW')}
                    </div>
                } 
            </div>

            <div className={styles.cardImage}>
                <img
                    alt={data.name}
                    src={data.img}
                    onClick={redirectToLink}
                />
            </div>

            <div className={styles.cardInfo}>
                <p>
                    {data.category_name}
                </p>
    
                <h2 onClick={redirectToLink}>{data.name}</h2>

                <h5>
                    R$ {data.plan.price} 

                    <span className={styles.cardInfoSpanDivisor}> / </span>

                    <span className={styles.cardInfoSpanPrice}>  
                        {data.plan.id_plan == 1 ?
                            t('MONTHLY')
                        : data.plan.id_plan == 2 ?
                            t('YEARLY')
                        : data.plan.id_plan == 3 ?
                            t('LIFETIME')
                        : ''}
                    </span>
                </h5>
            </div>
            
            <button className={styles.cardButton} onClick={redirectToLink}>
                {t('VIEW')}
            </button> 
        </div> 
    )
}
