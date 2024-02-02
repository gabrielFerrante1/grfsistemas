import * as React from 'react';
import styles from  './SwitchTheme.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../../redux/reducers/themeReducer';
import {
    MdOutlineLightMode,
    MdOutlineDarkMode
} from 'react-icons/md';

export const SwitchTheme = () => {
    const dispatch = useDispatch();
    const themeReducer = useSelector((state: RootState) => state.theme); 
    
    const [themeInitial, setThemeInitial] = React.useState('light');  

    const alterTheme = () => { 
        if(themeReducer.theme == 'light') {
           dispatch(setTheme('dark'));
           localStorage.setItem('theme', 'dark')
        } else {
            dispatch(setTheme('light'));
            localStorage.setItem('theme', 'light')
        }
    } 

    React.useEffect(()=>{
        if(localStorage.getItem('theme')) {
            setThemeInitial(localStorage.getItem('theme') as string);
        } 
    }, [themeReducer.theme]);

    return (
        <>
            {themeInitial == 'dark' ?
                    <MdOutlineLightMode
                        onClick={alterTheme}
                        className={styles.iconTheme}
                    />
            :       <MdOutlineDarkMode
                        onClick={alterTheme}
                        className={styles.iconTheme}
                        />
            }
        </>
    )
}