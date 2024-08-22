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
    const [index, setIndex] = useState<number>(0);

    const handleSwipeLeft = () => {
        setIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : 0));
    };

    const handleSwipeRight = () => {
        setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : items.length - 1));
    };

    return (
        <div style={sliderStyle}>
            {items.map((item, i) => (
                <SwipeableCard
                    key={item.id}
                    item={item}
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    isActive={i === index} // Pass down if the card is active
                />
            ))}
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

export default SwipeableSlider;
