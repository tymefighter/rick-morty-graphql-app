import "../styles/Badge.scss";

interface BadgeProps {
    badgeText: string;
    className?: string;
};

function Badge({badgeText, className}: BadgeProps) {
    const badgeClass = "badge" + (className ? ` ${className}` : "");

    return (
        <span className={badgeClass}>
            {badgeText}
        </span>
    );
};

export default Badge;