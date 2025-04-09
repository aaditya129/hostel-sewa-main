import React from 'react'
import Navbar from '../Navbar'
import student from '../Terms/image.jpeg'
import Partners from '../Partners'
import Footer from '../Footer';
import './Terms.css'
const Terms = () => {
  return (
   <>
   <Navbar/>
   <div className="cover-container">
        <img className="cover-image" src={student} alt="Student Login" />
    
      </div>
      <div className="heading-title">Terms and Condition</div>
      <p className='terms'>
      Hostel Booking System <br/> <br/>
      In our hostelsewa.com website online hostel booking system, we create a separate profile of the hostel with detail information such as Name, Number, Photos, E-mail, Facebook Page, Google map, Food Schedule, Service Facilities, Monthly Fees, etc. From which students who want to stay in hostel can book the hostel easily and free of cost as per their requirement. It is also more easier for both Students & Hostellers as the booking information is sent directly to the Director's mobile via SMS with the student's name and number. Thank you!<br/> <br/> <br/>
      Registration & Renewal Hostel Sewa Pvt Ltd has been providing proper advice and support to hostel business in various government agencies such as Internal Revenue Office, Ward Office, Company or Household during registration. Hostel sewa also provides assistance for registration in Nepal Hostel Association or Hostel Bebasai Sangh. Hostel sewa will provides entire registration process staying. The businessman does not have to suffer anymore. <br/>
      Hostel Booking System <br/> <br/>
      In our hostelsewa.com website online hostel booking system, we create a separate profile of the hostel with detail information such as Name, Number, Photos, E-mail, Facebook Page, Google map, Food Schedule, Service Facilities, Monthly Fees, etc. From which students who want to stay in hostel can book the hostel easily and free of cost as per their requirement. It is also more easier for both Students & Hostellers as the booking information is sent directly to the Director's mobile via SMS with the student's name and number. Thank you!<br/> <br/> <br/>
      Registration & Renewal Hostel Sewa Pvt Ltd has been providing proper advice and support to hostel business in various government agencies such as Internal Revenue Office, Ward Office, Company or Household during registration. Hostel sewa also provides assistance for registration in Nepal Hostel Association or Hostel Bebasai Sangh. Hostel sewa will provides entire registration process staying. The businessman does not have to suffer anymore. <br/>
      </p>
      <div className="gap"></div>
      <Partners/>
      <Footer/>
   </>
  )
}

export default Terms
