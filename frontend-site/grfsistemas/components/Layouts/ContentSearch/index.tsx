import {  Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './ContentSearch.module.css';
import { 
    GrClose
 
} from "react-icons/gr";
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Props = {
    search: boolean,
    setSearch: (a: boolean) => void
}


export const ContentSearch = ({search, setSearch}: Props) => {
    const { t } = useTranslation();
    const router = useRouter();

    const [value, setValue] = useState('');

    const closeSearch = () => {
        setSearch(false);
        setValue('');

        router.push('/sistemas');
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);

        router.push('/sistemas', {
            query: {
                q: e.target.value
            }
        });
    } 

    useEffect(()=>{
        const queryString = new URL(window.location.href);

        if(queryString.searchParams.get('q') != null) {
            setValue(queryString.searchParams.get('q') as string)
        }  else {
            setValue('');
        }
    }, [router.pathname]);

    return ( 
        <div id={`${styles.searchApp }`}> 
              <Typography variant='h5' component="h5">
                {t('SEARCH_FOR')}:
              </Typography>

              <input value={value} onChange={handleSearch} />
            
              <GrClose onClick={closeSearch} className={styles.btnClose} /> 
        </div>  
    )
}

