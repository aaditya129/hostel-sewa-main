// import {React,useState} from 'react'
import Navbar from '../Navbar'
import './About.css'
import student from '../About US/Student_login.jpeg'
import Team_grid from '../NeHa/Team_grid'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Team_card from '../NeHa/Team_card'
import Choosing from '../Choosing'

import image1 from '../Hostel Page/images/image1.png'
import image2 from '../Hostel Page/images/hostelpage_cover.jpeg'
import TeamGrid from '../NeHa/Team_grid'
import Testimonial from '../Testimonial'
import Partners from '../Partners'
import Footer from '../Footer';
import Certificate from '../Certificate'

const images = [image1, image2, image2];

const About = () => {
  const [introData, setIntroData] = useState(null);
  const [arrayData, setArrayData] = useState([]);

  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const introRes = await axios.get('https://hostel-sewa-node.onrender.com/api/intro-array/get-intro/1');
        const arrayRes = await axios.get('https://hostel-sewa-node.onrender.com/api/intro-array/get-array/1');
        setIntroData(introRes.data);
        setArrayData(arrayRes.data);
      } catch (err) {
        console.error('Failed to fetch intro or array:', err.message);
      }
    };
    fetchIntro();
  }, []);
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };



   

  return (
   <>
   <Navbar/>
 

        
   {introData && (
        <div className="introduction-container">
          <div className="introduction-text">
            <h2>Introduction</h2>
            <p>{introData.intro}</p>
          </div>
          <div className="introduction-image">
            <img src={introData.image} alt="Hostel Sewa Introduction" />
          </div>
        </div>
      )}


 <Team_card/>
 {arrayData && arrayData.length > 0 && (
  <Team_grid team={arrayData} />
)}

<div className="gap"></div>
   <Choosing/>


   <Certificate/>
   <Testimonial/>
   <div className="gap"></div>
   <Partners/>
   <Footer/>
  
   </>
  )
}


export default About
