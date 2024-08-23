import React, { useState } from 'react';
import SwipeableCard from './SwipeableCard';

interface SwipeableSliderProps {
    items: {
        id: number;
        title: string;
        description: string;
        imageUrl: string;
    }[];
}

const SwipeableSlider: React.FC<SwipeableSliderProps> = ({ items }) => {
    const [index, setIndex] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right'>('right');

    const handleSwipe = (direction: 'left' | 'right') => {
        if (isSwiping) return;

        setSwipeDirection(direction);
        setIsSwiping(true);

        setTimeout(() => {
            setIndex((prevIndex) => prevIndex + 1);
            setIsSwiping(false);
        }, 600); // Match this delay with the transition time
    };

    const currentItem = items[index];
    const nextItem = items[index + 1];

    return (
        <div style={sliderStyle}>
            {currentItem && (
                <SwipeableCard
                    key={currentItem.id}
                    item={currentItem}
                    onSwipeLeft={() => handleSwipe('left')}
                    onSwipeRight={() => handleSwipe('right')}
                    isActive={true}
                    isSwiping={isSwiping}
                    swipeDirection={swipeDirection}
                />
            )}
            {nextItem && (
                <SwipeableCard
                    key={nextItem.id}
                    item={nextItem}
                    isActive={false}
                    isSwiping={false}
                    swipeDirection={swipeDirection}
                />
            )}
            {!currentItem && <div style={emptyMessageStyle}>No more cards</div>}
        </div>
    );
};

const sliderStyle: React.CSSProperties = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
};

const emptyMessageStyle: React.CSSProperties = {
    color: '#888',
    fontSize: '24px',
    fontWeight: 'bold',
};

export default SwipeableSlider;
