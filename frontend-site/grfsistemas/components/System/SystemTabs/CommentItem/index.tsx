import { Checkbox, Rating } from '@mui/material';
import { Avatar, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { OneComment } from '../../../../types/Comment';
import styles from './CommentItem.module.css';
import {
    BiLike,
    BiDislike
} from 'react-icons/bi'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useEffect, useState } from 'react';
import { api } from '../../../../utils/api'; 
import { useDispatch } from 'react-redux';
import { setNewNotification } from '../../../../redux/reducers/notificationReducer';

type Props = {
    item: OneComment,
    tokenAuth: string
}

type CheckState = {
    checked: boolean,
    count: number
}

export const CommentItem = ({item, tokenAuth}: Props) => {
    const { Paragraph } = Typography;

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [checkLike, setCheckLike] = useState<CheckState>({checked: item.likedUser, count: item.countLikes});
    const [checkDislike, setCheckDislike] = useState<CheckState>({checked: item.dislikedUser, count: item.countDisLikes});

    const handleToggleLike = () => {
        if(!tokenAuth) {
            dispatch(setNewNotification({
                type: 'info',
                content: t('AUTHENTICATION_IS_REQUIRED'),
                cancelable: false,
                timeout: 3
            }));

            return;
        }
        if(checkDislike.checked) setCheckDislike({checked: false, count: checkDislike.count - 1});  

        let count = 0;

        if(checkLike.checked) {
            count = checkLike.count - 1;
        } else {
            count = checkLike.count + 1;
        }

        setCheckLike({
            checked: !checkLike.checked,
            count
        });

        api(`sistema/comments/${item.id}`, 'put', {type: 'like'}, tokenAuth);
    }

    const handleToggleDisLike = () => {
        if(!tokenAuth) {
            dispatch(setNewNotification({
                type: 'info',
                content: t('AUTHENTICATION_IS_REQUIRED'),
                cancelable: false,
                timeout: 3
            }));

            return;
        }
        
        if(checkLike.checked) setCheckLike({checked: false, count: checkLike.count - 1}); 
       
        let count = 0;

        if(checkDislike.checked) {
            count = checkDislike.count - 1;
        } else {
            count = checkDislike.count + 1;
        }

        setCheckDislike({
            checked: !checkDislike.checked,
            count
        });

        api(`sistema/comments/${item.id}`, 'put', {type: 'dislike'}, tokenAuth);
    }
 

    return (
        <div className={styles.commentItem}>
            <div className={styles.commentItemInfo} >
                <Avatar
                    shape='circle'
                    size={40}
                    src={item.user.avatar}
                />

                <span>
                  {item.user.name}
                  
                  <small>
                      - {item.date.date} {t(item.date.date_type)} {t('AGO')}
                  </small>
                </span> 
            </div>

            <div className={styles.commentItemInfoRating}>
                <Rating
                    className={styles.commentItemInfoRatingStars}
                    value={item.stars}
                    readOnly
                />
                
                {item.body != null ? 
                    <Paragraph style={{color:'var(--colorText300)',marginRight:'10px'}} ellipsis={{rows: 2, expandable: true, symbol: t('MORE') }}>
                        {item.body}
                    </Paragraph>
             : ''
                }
                <div
                    style={{marginTop:item.body != null ? 15 : 13}}
                    className={styles.commentItemContentLike}
                >
                    <Checkbox 
                        checked={checkLike.checked}
                        icon={<BiLike title='Like' className={styles.commentItemLikeIcon} />}
                        checkedIcon={<ThumbUpAltIcon style={{color:'var(--primary)'}}  className={styles.commentItemLikeIcon} />}
                        onChange={handleToggleLike}
                    /> 
                    <span className={styles.commentItemIconText}>({checkLike.count})</span>

                    <div style={{marginLeft:18}}>
                        <Checkbox
                            checked={checkDislike.checked}
                            icon={<BiDislike title='Like' className={styles.commentItemLikeIcon} />}
                            checkedIcon={<ThumbDownIcon style={{color:'var(--primary)'}}  className={styles.commentItemLikeIcon} />}
                            onChange={handleToggleDisLike}
                        />
                    </div>
                 
                    <span className={styles.commentItemIconText}>({checkDislike.count})</span>
                </div>
            </div> 

         
            
        </div>
    )
}