const Label = ({ htmlFor, children, className }) => (
    <label htmlFor={htmlFor} className={className}>
        {children}
    </label>
);

export default Label;