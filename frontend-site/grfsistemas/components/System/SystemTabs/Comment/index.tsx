import { CircularProgress, Pagination, PaginationItem } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux'; 
import { ApiPropsComments, CommentEdit, OneComment} from '../../../../types/Comment'; 
import { api, apiAuth } from '../../../../utils/api';
import styles from './Comment.module.css';
import { CommentItem } from '../CommentItem';
import { CommentNew } from '../CommentNew';

export const Comment = () => {
    const {t} = useTranslation();

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [listComments, setListComments] = useState<OneComment[] >([]);
    const [countPages, setCountPages] = useState(0);
    const [tokenAuth, setTokenAuth] = useState('');
    const [editCommentData, setEditCommentData] = useState<CommentEdit>({stars: 0, body: ''});

    const getComments = async () => { 
        setLoading(true);  
 
        const limit = 25;
        let offset =  (page - 1)  * limit; 
 
        const dataAuth = await apiAuth();

        let token = '';
        if(dataAuth.error == false) {
            setTokenAuth(dataAuth.user.token);

            token = dataAuth.user.token;
        } else {
            token = '';
        }

        const req: ApiPropsComments = await api(`sistema/${router.query.id}/comments`, 'get', `limit=${limit}&offset=${offset}`, token);
        setListComments(req.comments);
        setCountPages(Math.ceil(req.countComments / limit));
        setEditCommentData(req.editComment);

        setLoading(false);
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(()=> {
        getComments(); 
    }, [page]);

    return (
        <> 
                <div hidden={!loading} className={styles.loadingComments}>
                    <CircularProgress style={{color: 'var(--primary)'}} />
                    
                    <span className={styles.loadingCommentsSpan}>
                        {t('LOADING')}...
                    </span>
                </div> 
        
                {!loading ? 
                    <div >
                        <div hidden={tokenAuth != '' ? false : true} className={styles.newRate}>
                            <CommentNew
                                getComments={getComments}
                                tokenAuth={tokenAuth}
                                idSystem={router.query.id != undefined ? +router.query.id : 0}
                                data={editCommentData}
                            />
                        </div>

                        <div className={styles.rates}>
                            {listComments.map((item, key) => ( 
                                    <CommentItem 
                                        item={item}
                                        key={key}
                                        tokenAuth={tokenAuth}
                                    /> 
                            ))}
                        </div>

                        <div hidden={countPages == 0} style={{padding:'10px 0px'}}> 
                            <Pagination color='secondary' page={page} count={countPages} onChange={handleChangePage} />
                        </div>
                    </div>
                : ''}
               
        </>
    )
}
