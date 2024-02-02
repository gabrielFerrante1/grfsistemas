import { Rating, TextareaAutosize } from '@mui/material'; 
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CommentEdit } from '../../../../types/Comment';
import { api } from '../../../../utils/api';
import styles from './CommentNew.module.css'; 

type Props = {
    data: CommentEdit,
    idSystem: number,
    tokenAuth: string,
    getComments: () => void
}

export const CommentNew = ({data, idSystem, tokenAuth, getComments}: Props) => {
    const { t } = useTranslation();

    const [valueStars, setValueStars] = useState(data.stars);

    const handleChangeStars = (event: SyntheticEvent<Element, Event>, value: number | null) => {
        if(value != null) setValueStars(value) 
    }

    const [valueBody, setValueBody] = useState(data.body);

    const handleChangeBody = (event: ChangeEvent<HTMLTextAreaElement>) => { 
        setValueBody(event.target.value)
    }

    const save = async () => { 
        await api(`sistema/${idSystem}/comments`, 'post', {
            stars: valueStars,
            body: valueBody
        }, tokenAuth);

        getComments()
    }
    return (
        <div className={styles.appNewComment}> 
            <Rating 
                style={{fontSize:22}} 
                value={valueStars}
                onChange={handleChangeStars}  
            />  

            <TextareaAutosize
                className={styles.appNewCommentBody}
                minRows={2}
                maxRows={10}
                placeholder={t('MAKE_AN_OPTIONAL_COMMENT')}
                maxLength={480} 
                value={valueBody }
                onChange={handleChangeBody}
            />

            <button
                onClick={save}
                disabled={valueStars == 0 ? true : false}
                style={{cursor:valueStars == 0 ? 'not-allowed' : 'pointer'}} 
                className={valueStars == 0 ? styles.appNewCommentBtnDisbaled : styles.appNewCommentBtn}
            >
               {data.stars != 0 ?
                    t('EDIT_EVALUATION')
               :
                    t('PUBLISH_EVALUATION')
               }
            </button>
        </div>
    )
}