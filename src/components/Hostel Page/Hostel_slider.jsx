import React, { useState, useEffect } from "react";
import "./Hostel_slider.css";

const HostelSlider = ({ images = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        setFade(true); // Start with fade effect
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFade(true);
            }, 500); // Time for fade-out before changing image
        }, 3000); // Auto-slide every 3 seconds

        return () => clearInterval(interval);
    }, [images]);

    const goToPrevious = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
            setFade(true);
        }, 500);
    };

    const goToNext = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setFade(true);
        }, 500);
    };

    if (!images || images.length === 0) {
        return <p style={{ textAlign: "center" }}>No photos available.</p>;
    }

    return (
        <div className="slider-container">
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex}`}
                className={`slider-image ${fade ? "" : "fade-out"}`}
            />
            <button className="left-arrow" onClick={goToPrevious}>&#10094;</button>
            <button className="right-arrow" onClick={goToNext}>&#10095;</button>
           
        </div>
    );
};

export default HostelSlider;
