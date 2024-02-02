import styles from './SelectLanguage.module.css'; 
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

export const SelectLanguage = () => { 
    const { i18n } = useTranslation();

    const setLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang);
    }
    
    return (
        <DropdownButton
            size="sm"
            className={styles.languageSelectBtn}
            title={i18n.language == 'pt' ?
                <div style={{display:'inline'}}>
                    <img style={{width:27,height:26}} className={styles.iconPaises} src="/imgs/brasil.png" />
                    <span style={{margin:'0 5px',fontSize:13}}>Português</span>
                </div>
            :   
                <div style={{display:'inline'}}>
                    <img style={{width:25,height:20}}  className={styles.iconPaises} src="/imgs/estados-unidos-da-america.png" />
                    <span style={{margin:'0 5px',fontSize:13}}>Inglês</span>
                </div>
            }
        >
            <Dropdown.Item>{i18n.language != 'pt' ?
                    <div onClick={()=>setLanguage('pt')}>
                        <img style={{width:30,height:30}} src="/imgs/brasil.png" />
                        <span style={{fontSize:13}}>Portugûes</span>
                    </div>
                :
                    <div onClick={()=>setLanguage('en')}>
                        <img style={{width:20,height:20,marginRight:5}}  src="/imgs/estados-unidos-da-america.png" />
                        <span style={{fontSize:13}}>Inglês</span>
                    </div>
                }
            </Dropdown.Item> 
    </DropdownButton> 
    )
}