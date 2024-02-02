import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ApiPropsSystems } from "../../types/Systems";
import { api } from "../../utils/api";
import styles from './BtnMoreSystems.module.css';

type BtnMoreSystems = { 
    page: number,
    setPage: (a: number) => void,
    setSystemsBackup: (a: ApiPropsSystems) => void,
    setListSystems:  (a: ApiPropsSystems) => void,
    setHiddenBtnMoreSystems: (a: boolean) => void,
    listSystems: ApiPropsSystems,
    hiddenBtnMoreSystems: boolean
}


export const BtnMoreSystems = ({page, setPage, setSystemsBackup, setListSystems, listSystems, setHiddenBtnMoreSystems, hiddenBtnMoreSystems}: BtnMoreSystems) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);

    const moreSystems = async () => {
        setLoading(true);

        setPage(page+1);
 
        const limit = 12;
        let offset =  page * limit; 

        const data: ApiPropsSystems = await api('sistemas', 'get', `offset=${offset}&limit=${limit}`);

        setSystemsBackup({
            error: listSystems.error,
            systems:  listSystems.systems.concat(data.systems)
        });

        setListSystems({
            error: listSystems.error,
            systems:  listSystems.systems.concat(data.systems)
        });

        if(data.systems.length < limit) {
            setHiddenBtnMoreSystems(true);
        }

        setLoading(false); 
    }

    return ( 
            <button
                onClick={moreSystems}
                hidden={hiddenBtnMoreSystems}
                className={styles.btnApp}
                disabled={loading}
                style={{
                    cursor:loading ? 'not-allowed' : 'pointer'
                }}
            >
                {loading ?
                    <>
                    {t('LOADING')}
                    <CircularProgress style={{width:14,height:14,color:'var(--secondary600)',marginLeft:'10px',alignSelf:'center',marginTop:'3px'}}/>

                    </>
                : 
                    t('LOAD_MORE')
                }  
            </button> 
    ) 
}