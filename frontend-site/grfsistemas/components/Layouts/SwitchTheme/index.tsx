import * as React from 'react';
import styles from  './SwitchTheme.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../../redux/reducers/themeReducer';

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
    }, []);
    return (
        <>  
            {themeInitial == 'dark' ?
              <div className={styles.onoff2}> 
                    <input onChange={alterTheme} type="checkbox" className={styles.toggle2} id="1"/>
                    <label htmlFor="1" ></label>  
              </div>
            :
                <div className={styles.onoff}> 
                    <input onChange={alterTheme} type="checkbox" className={styles.toggle} id="2"/>
                    <label htmlFor="2"></label>  
                </div> 
            } 
        </>

    )
}