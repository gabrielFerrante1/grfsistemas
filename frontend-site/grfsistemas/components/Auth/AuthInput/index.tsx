import { ChangeEvent } from 'react';
import styles from './LoginInput.module.css';

type Props = {
    disabled?: boolean,
    error: string,
    autoFocus?: boolean,
    id: string,
    label: string,
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const AuthInput = ({disabled = false, error, autoFocus, id, label, value, onChange}: Props) => { 
    return (
        <div className={styles.appDiv}>
 
            <label htmlFor={id}>{label}</label>

            <input
                maxLength={id == 'input-name' ? 70 : 255}
                disabled={disabled}
                type={id == 'input-email' ? 'email' : id == 'input-password' ? 'password' : 'text'}
                className={error != '' ? styles.errorInput : ''}
                id={id}
                value={value}
                onChange={onChange}
                autoFocus={autoFocus}
            />
        </div>
    )
}