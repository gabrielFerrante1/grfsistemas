import { CircularProgress } from '@mui/material';
import styles from './LoadingPageRender.module.css';

export default () => {
    return (
        <div className={styles.appLoading}>
            <CircularProgress style={{color: 'var(--primary)'}}/>
        </div>
    )
}

