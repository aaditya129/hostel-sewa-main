import React from 'react'
import { BrowserRouter , Route,Router,Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Student_login from './components/Student_login.jsx'
import Footer from './components/Footer.jsx'
import Register_form from './components/Register_form.jsx'
import Owner_login from './components/Owner_login.jsx'
import Owner_register from './components/Owner_register.jsx'
import Photos from './components/Photos.jsx'
import Hostel_card from './components/Hostel_card.jsx'
import Services_box from './components/Services_box.jsx'
import Gallery from './components/Gallery.jsx'
import Homepage from './components/Homepage.jsx'
import Boxes from './components/Boxes.jsx'
import Achievements from './Achievement.jsx'
import Mission_box from './components/Mission_box.jsx'
import Review from './components/Review.jsx'
import FAQ from './components/FAQ.jsx'
import Post from './components/Post.jsx'
import Partners from './components/Partners.jsx'
import Choosing from './components/Choosing.jsx'
import Cover_photo from './components/Cover_photo.jsx'
import Hostel_homepage from './components/Hostel Page/Hostel_homepage.jsx'
import Hostel_individual from './components/Hostel Page/Hostel_Indivudual.jsx'
import Hostel_Overview from './components/Hostel Page/Hostel_Overview.jsx'
import Hostel_slider from './components/Hostel Page/Hostel_slider.jsx'
import About_neha from './components/NeHa/About_neha.jsx'
import Blogs_home from './components/Blogs/Blogs_home.jsx'
// import Blog_inside from './components/Blogs/Blog_inside.jsx'
import BlogList from './BlogList.jsx'
import BlogDetail from './BlogDetail.jsx'
import Gallery_Home from './components/Gallery Page/Gallery_Home.jsx'
import Gallery_images from './components/Gallery Page/Gallery_images.jsx'
import About from './components/About US/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import Store from './components/Store/Store.jsx'
import Terms from './components/Terms/Terms.jsx'
import ProductDetail from './components/Store/ProductDetail.jsx'
import Location_hostel from './components/Hostel Page/Location_hostel.jsx'
import Book_now from './components/Booking/Book_now.jsx'
import Staff_form from './components/Forms/staff_form.jsx'
import Job_form from './components/Forms/Job_form.jsx'
import Recommend from './components/Forms/Recommend.jsx'
// import Owner_register from './components/Owner_register.jsx'
import ScrollToTop from './components/Navigate/Sroll_top.jsx'
import AdminDashboard from './AdminDashboard.jsx'
import UserBookings from './pages/UserBookings.jsx'
import Form from './pages/Form.jsx'
import ChatWidget from './components/ChatWidget.jsx';

const App = (props) => {
  return (
  <>

    <BrowserRouter>
    <ScrollToTop />
    <Routes>
   
    <Route path="/" element={<Homepage />} />
    <Route path="/hostel" element={<Hostel_homepage />} />
    {/* <Route path="/hostel_details" element={<Hostel_individual />} /> */}
    <Route path="/about" element={<About />} />
    <Route path="/neha" element={<About_neha />} />
    <Route path="/blog" element={<Blogs_home/>} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/blogs" element={<BlogList />} />
    <Route path="/blogs/:blogId" element={<BlogDetail />} />
    <Route path="/store" element={<Store />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/gallery" element={<Gallery_Home />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/book" element={<Book_now />} />
    <Route path="/login/student" element={<Student_login />} />
    <Route path="/login/owner" element={<Owner_login />} />
    <Route path="/register/owner" element={<Owner_register />} />
    <Route path="/register/student" element={<Register_form />} />
    <Route path="/form/staff" element={<Staff_form />} />
    <Route path="/form/job" element={<Job_form />} />
    <Route path="/form/recommend" element={<Recommend />} />
    <Route path="/location" element={<Location_hostel />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/chat" element={<ChatWidget />} />

    <Route path="/hostels" element={<Hostel_card />} />
    
    <Route path="/cover" element={<Cover_photo />} />

    <Route path="/hostel_details/:id" element={<Hostel_individual />} />
    <Route path="/bookings/:userId" element={<UserBookings/>} />
    <Route path="/register-hostel" element={<Form/>} />

    </Routes>
    </BrowserRouter>
 
    <ChatWidget />

   </> 
    
)
}
export default App