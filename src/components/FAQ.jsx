import React, { useState } from 'react';
import faqImage from '../assets/faq.jpeg'; // Update the path as necessary
import './FAQ.css'; // CSS file for styles

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is the purpose of this hostel?",
      answer: "The hostel provides affordable accommodation and support for students and travelers.",
    },
    {
      question: "How do I register for the hostel?",
      answer: "You can register online through our website by filling out the registration form.",
    },
    {
      question: "What amenities are included?",
      answer: "We offer free Wi-Fi, laundry services, and a common kitchen.",
    },
    {
      question: "Are there any rules to follow?",
      answer: "Yes, we have a set of rules to ensure everyone's safety and comfort. Please refer to our guidelines.",
    },
    {
      question: "Is there a cancellation policy?",
      answer: "Yes, you can cancel your booking up to 48 hours before your check-in date for a full refund.",
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <h2 className="faq-title">Frequently Asked Questions</h2>
    <div className="faq-section">
       
         <img className="faq-img" src={faqImage} alt="FAQ Illustration" />
      <div className="faq-questions">
     
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <span>{faq.question}</span>
              <span className="faq-toggle">{activeIndex === index ? '-' : '+'}</span>
            </div>
            {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
  
    </div>
    </>
  );
};

export default FAQ;
