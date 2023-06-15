import styles from '../../styles/Styles.module.css'

interface FieldProps extends React.HTMLProps<HTMLInputElement> {
    id: string;
    error?: string;
    label: string;
}

export function Field(props: FieldProps) {
    const { id, label, error, ...inputProps } = props;
    return (
        <div className={styles.field}>
            <label htmlFor={id}>{label}</label>
            <input {...inputProps} id={id} />
            <small>{error}</small>
        </div>
    )
}