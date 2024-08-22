import React from 'react';
import SwipeableSlider from '../../ui/SwipeableSlider';

const HellWorld: React.FC = () => {
    const items = [
        { id: 1, title: 'Item 1', description: 'This is the first item', imageUrl: 'https://placehold.co/400' },
        { id: 2, title: 'Item 2', description: 'This is the second item', imageUrl: 'https://placehold.co/400' },
        { id: 3, title: 'Item 3', description: 'This is the third item', imageUrl: 'https://placehold.co/400' },
        // Add more items as needed
    ];

    return (
        <div>
            <SwipeableSlider items={items} />
        </div>
    );
};

export default HellWorld;
