const TextLink = ({ href, label, children, className }) => (
    <a href={href} className={className} aria-label={label}>{children}</a>
);

export default TextLink;
