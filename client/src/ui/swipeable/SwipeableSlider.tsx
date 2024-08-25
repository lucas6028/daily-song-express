import React, { useState } from 'react';
import SwipeableCard from './SwipeableCard';
import styels from './SwipeableSlider.module.css';

interface SwipeableSliderProps {
    items: {
        albumName: string,
        albumUri: string,
        img: string,
        artist: string,
        artistUri: string,
        title: string,
        id: string,
        trackUri: string,
    }[];
    onCardClick?: (newUri: string) => void;
}

const SwipeableSlider: React.FC<SwipeableSliderProps> = ({ items, onCardClick }) => {
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
        <div className={styels.slider}>
            {currentItem && (
                <SwipeableCard
                    key={currentItem.id}
                    item={currentItem}
                    onSwipeLeft={() => handleSwipe('left')}
                    onSwipeRight={() => handleSwipe('right')}
                    onClick={onCardClick}
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
            {!currentItem && <div className={styels.emptyMessage}>No more cards</div>}
        </div>
    );
};

export default SwipeableSlider;
