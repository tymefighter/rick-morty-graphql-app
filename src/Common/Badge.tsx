interface BadgeProps {
    badgeText: string;
    className?: string;
};

function Badge({badgeText, className}: BadgeProps) {
    return <div>{badgeText}</div>
};

export default Badge;