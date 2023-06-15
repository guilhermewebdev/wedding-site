import styles from '../../styles/Styles.module.css';

export default function Spinner(params: React.ParamHTMLAttributes<HTMLDivElement>) {
    const { className, ...otherParams } = params;
    return (
        <div className={`${styles.spinner} ${className}`} {...otherParams}></div>
    )
}