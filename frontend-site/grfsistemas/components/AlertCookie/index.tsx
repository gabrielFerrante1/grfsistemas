import { Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"
import styles from './Cookie.module.css';

export const AlertCookie = () => {
    const { t } = useTranslation();

    const [hiddenCookie, setHiddenCookie] = useState<boolean>(true)

    const aceptCookies = () => {
        setHiddenCookie(true);

        const date = new Date();

        localStorage.setItem('cookieAlert', `{
            "dateAcept": "${date.getFullYear()}",
            "lgpd": "20 de agosto, lei: 13.709",
            "terms": "GRF V2"
        }`);
    }

    useEffect(()=>{
        if(localStorage.getItem('cookieAlert') != undefined) {
            setHiddenCookie(true)
        } else {
            setHiddenCookie(false)
        }
    }, []);

    return (
        <div style={{marginBottom:hiddenCookie ? '-150%' : 0, transition: 'margin-bottom 1.7s'}} id={styles.cookieModal}>
            <p> {t('ALERT_COOKIE')} </p>

            <Link href="/politicas">
                <span>{t('POLITIC_OF_PRIVACITY')}</span>
            </Link>

            <button onClick={aceptCookies}>{t('ACEPT_THE_COOKIES')}</button>
        </div>
    )
}