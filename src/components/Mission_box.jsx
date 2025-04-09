import React, { useRef, useState, useEffect } from 'react';
import './Mission_box.css';
import axios from 'axios';

const MissionSection = () => {
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [commitments, setCommitments] = useState([]);

    const apiUrl = 'https://hostel-sewa-node.onrender.com/api/commitments';

    useEffect(() => {
        const fetchCommitments = async () => {
            try {
                const res = await axios.get(apiUrl);
                setCommitments(res.data);
            } catch (err) {
                console.error('Failed to fetch commitments:', err);
            }
        };
        fetchCommitments();
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
        <div className="mission-section">
            <div
                className="mission-cards"
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <div className="mission-text">
                    <section>Our Commitment</section>
                    <p>To revolutionize student living through safe spaces, modern amenities, and community-building initiatives that empower academic success and personal growth.</p>
                </div>

                { commitments && commitments.map((item) => (
                    <div className="card" key={item._id}>
                        <img src={item.image} alt={item.heading} />
                        <h3>{item.heading}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MissionSection;
