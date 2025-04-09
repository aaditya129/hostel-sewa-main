import React, { useRef, useEffect, useState } from 'react';
import './Vision_box.css';
import axios from 'axios';

const VisionSection = () => {
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [visions, setVisions] = useState([]);

    const apiUrl = 'https://hostel-sewa-node.onrender.com/api/missions';

    useEffect(() => {
        const fetchVisions = async () => {
            try {
                const res = await axios.get(apiUrl);
                setVisions(res.data);
            } catch (err) {
                console.error('Failed to fetch visions:', err);
            }
        };

        fetchVisions();

        if (containerRef.current) {
            containerRef.current.scrollLeft = containerRef.current.scrollWidth;
        }
    }, []);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="vision-container">
            <div
                className="vision-cards"
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {/* Map dynamic cards */}
                {visions && visions.map((item) => (
                    <div className="card" key={item._id}>
                        <img src={item.photo} alt={item.title} />
                        <h3>{item.title}</h3>
                        <p>{item.heading}</p>
                    </div>
                ))}

                {/* Static vision statement */}
                <div className="vision-text">
                    <section>Our Vision</section>
                    <p>
                        "To lead Nepal's student living ecosystem, housing 50,000 students across 20 cities through quality housing, academic support, and community values. We create holistic growth experiences that nurture future leaders."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VisionSection;
