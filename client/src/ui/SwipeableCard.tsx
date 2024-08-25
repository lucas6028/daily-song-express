import React from 'react';
import { useSwipeable } from 'react-swipeable';

interface SwipeableCardProps {
    item: {
        albumName: string,
        albumUri: string,
        img: string,
        artist: string,
        artistUri: string,
        title: string,
        id: string,
        trackUri: string,
    };
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onClick?: (newUri: string) => void;
    isActive: boolean;
    isSwiping: boolean;
    swipeDirection: 'left' | 'right';
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
    item,
    onSwipeLeft,
    onSwipeRight,
    onClick,
    isActive,
    isSwiping,
    swipeDirection
}) => {
    const handlers = useSwipeable({
        onSwipedLeft: onSwipeLeft,
        onSwipedRight: onSwipeRight,
        trackMouse: true,
    });

    const handleClick = () => {
        if (onClick) {
            console.log(`change the uri: ${item.trackUri}`);
            onClick(item.trackUri);
        }
    };

    return (
        <div
            {...handlers}
            onClick={handleClick}
            style={{
                ...cardStyle,
                ...getCardTransitionStyle(isActive, isSwiping, swipeDirection)
            }}
        >
            <img src={item.img} alt={item.title} style={imageStyle} />
            <h3 style={nonSelectableTextStyle}>{item.title}</h3>
            <p style={nonSelectableTextStyle}>{item.artist}</p>
        </div>
    );
};

const getCardTransitionStyle = (
    isActive: boolean,
    isSwiping: boolean,
    direction: 'left' | 'right'
): React.CSSProperties => {
    if (isSwiping && isActive) {
        return {
            transform: direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)',
            transition: 'transform 0.6s ease',
            zIndex: 1, // Ensure this card is on top
        };
    }

    return {
        transform: 'translateX(0)',
        transition: isActive ? 'none' : 'transform 0.6s ease',
        zIndex: isActive ? 1 : 0,
    };
};

const cardStyle: React.CSSProperties = {
    width: '330px',
    height: '440px',
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
    width: 'auto',
    height: 'auto',
    borderRadius: '10px',
    userSelect: 'none',
};

const nonSelectableTextStyle: React.CSSProperties = {
    userSelect: 'none',
    margin: 0,
};

export default SwipeableCard;