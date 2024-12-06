const Button = ({ type, onClick, className, children, ariaLabel, style }) => (
    <button type={type} style={style} onClick={onClick} className={className} aria-label={ariaLabel}>
        {children}
    </button>
);

export default Button;