import { useNavigate } from "react-router-dom";

interface NavigationButtonProps {
    to: string;
    children: React.ReactNode;
    className?: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
    to,
    children,
    className,
}) => {
    const navigate = useNavigate();

    return (
        <button type="button" onClick={() => navigate(to)} className={className}>
            {children}
        </button>
    );
};

export default NavigationButton;