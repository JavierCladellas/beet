import '../styles/Carousel.css';
import { useState, useEffect, useRef } from 'react';

const FullCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef(null);
    const timeoutDuration = 5000; // 5 seconds

    useEffect(() => {
        const next = () => {
            setCurrentIndex((prevIndex) =>
                (prevIndex + 1) % images.length
            );
        };
        timeoutRef.current = setInterval(next, timeoutDuration);
        return () => clearInterval(timeoutRef.current);
    }, [images.length]);

    const visibleImages = 3;
    const totalWidth = (images.length * 100) / visibleImages;

    return (
        <div className="full-carousel">
            {images.map((image, index) => (
                <div
                    className={"image-container" + (index >= currentIndex && index < currentIndex + visibleImages ? " active" : "")}
                    key={index}
                >
                    <img src={image} alt={`Carousel ${index}`} />
                </div>
            ))}
        </div>
    );
};

export default FullCarousel;
