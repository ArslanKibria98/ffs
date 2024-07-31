import React, { useState, useEffect } from 'react';

const StarRating = ({ totalStars = 5, fieldName, setFieldValue, value }) => {
    const [rating, setRating] = useState(value);

    useEffect(() => {
        setRating(value);
    }, [value]);

    const handleClick = (value) => {
        setRating(value);
        setFieldValue(fieldName, value);
    };

    return (
        <div className="flex">
            {[...Array(totalStars)].map((_, index) => (
                <Star
                    key={index}
                    filled={index < rating}
                    onClick={() => handleClick(index + 1)}
                />
            ))}
        </div>
    );
};

const Star = ({ filled, onClick }) => {
    return (
        <span
            onClick={onClick}
            className={`text-3xl cursor-pointer ${
                filled ? 'text-yellow-400' : 'text-gray-300'
            }`}
        >
            {filled ? '★' : '☆'}
        </span>
    );
};

export default StarRating;
