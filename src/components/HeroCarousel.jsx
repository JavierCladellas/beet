import '../styles/Hero.css';
import ArrowCircle from '../assets/svg/arrow-circle.jsx';
import { useState, useEffect, useRef } from 'react';

const HeroCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef(null);
    const timeoutDuration = 5000;

    useEffect(() => {
        const next = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        };

        timeoutRef.current = setInterval(next, timeoutDuration);
        return () => clearInterval(timeoutRef.current);
    }, [images.length]);

    const handleArrowClick = () => {
        clearInterval(timeoutRef.current);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        timeoutRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, timeoutDuration);
    };

    return (
        <div>
            <div
                className="hero-slider"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <div className="hero-image-container" key={index}>
                        <img src={image} alt={`Hero ${index}`} />
                    </div>
                ))}
            </div>
            <div className="hero-arrow" onClick={handleArrowClick}>
                <ArrowCircle />
            </div>
        </div>
    );
};

export default HeroCarousel;
