import "./HomeButton.css";

interface HomeButtonProps {
    onClick: () => void;
}


export default function HomeButton({ onClick }: HomeButtonProps) {
    return (
        /* From Uiverse.io by StealthWorm */
        <button type="button" className="homeBtn" onClick={onClick}>
            <strong>DASHBOARD</strong>
            <div id="container-stars">
                <div id="stars"></div>
            </div>

            <div id="glow">
                <div className="homeCircle"></div>
                <div className="homeCircle"></div>
            </div>
        </button>


    )
}
