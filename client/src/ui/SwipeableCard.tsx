import React from 'react';
import { useSwipeable } from 'react-swipeable';

interface SwipeableCardProps {
    item: {
        id: number;
        title: string;
        description: string;
        imageUrl: string;
    };
    onSwipeLeft: (item: { id: number; title: string; description: string; imageUrl: string }) => void;
    onSwipeRight: (item: { id: number; title: string; description: string; imageUrl: string }) => void;
    isActive: boolean;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({ item, onSwipeLeft, onSwipeRight, isActive }) => {
    const handlers = useSwipeable({
        onSwipedLeft: () => onSwipeLeft(item),
        onSwipedRight: () => onSwipeRight(item),
        trackMouse: true,
    });

    return (
        <div {...handlers} style={{ ...cardStyle, ...getCardTransitionStyle(isActive) }}>
            <img src={item.imageUrl} alt={item.title} style={imageStyle} />
            <h2 style={nonSelectableTextStyle}>{item.title}</h2>
            <p style={nonSelectableTextStyle}>{item.description}</p>
        </div>
    );
};

const getCardTransitionStyle = (isActive: boolean): React.CSSProperties => ({
    opacity: isActive ? 1 : 0,
    transform: isActive ? 'translateX(0)' : 'translateX(100%)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
});

const cardStyle: React.CSSProperties = {
    width: '300px',
    height: '400px',
    borderRadius: '10px',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
};

const imageStyle: React.CSSProperties = {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    userSelect: 'none', // Make the image non-selectable
};

const nonSelectableTextStyle: React.CSSProperties = {
    userSelect: 'none', // Make the text non-selectable
    margin: 0, // Remove default margin
};

export default SwipeableCard;
