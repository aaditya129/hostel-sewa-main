import React from 'react'
import Navbar from '../Navbar';


const Recommend = () => {
    const inputStyle = {
        width: '100%',
        padding: '10px',
        fontSize: '1rem',
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginTop: '5px',
      };
      
  return (
<>
<Navbar/>
<div className="gap"></div>
   <div style={{ width: '80%', margin: '0 auto', fontFamily: 'Inter, sans-serif', lineHeight: '1.6', color: '#333' }}>
      {/* Greeting Section */}
      <div style={{ textAlign: 'left' }}>
        <p>Mr. Director</p>
        <p>Hostel Service Pvt.Ltd</p>
      </div>

      {/* Today's Date */}
      <div style={{ textAlign: 'right', marginTop: '-50px' }}>
        <label style={{ fontSize: '0.9rem', color: '#555' }}>Today's Date</label>
        <input 
          type="date" 
          style={{ padding: '8px', fontSize: '1rem', border: '1px solid #ddd', borderRadius: '5px', marginLeft: '10px' }}
        />
      </div>

      {/* Subject Section */}
      
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        
        <p style={{ fontWeight: 'bold' }}>Subject: Get employment in the post</p>
        <div className="gap"></div>
        <p style={{ marginBottom:'10px' }}>As the recommendation of this organization is required for the hostel registration under the Ward Office / Household and Small Business Office in the above connection, I am submitting this statement with a request to examine and recommend the necessary infrastructures prepared for the operation of the hoste</p>
      </div>
      </div>
      <div className="gap"></div>
<div style={{ display: 'flex', justifyContent: 'center', padding: '20px', fontFamily: 'Inter, sans-serif' }}>
      {/* Upload Photo Section */}
      <div style={{ width: '30%', height: '300px' ,textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '50px', marginRight: '20px' }}>
        <div style={{ fontSize: '2rem', color: '#555' }}>+</div>
        <p style={{ fontSize: '1rem', color: '#333' }}>Upload Photo</p>
      </div>

      {/* Form Section */}
      <div style={{ width: '60%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label>Applicant*</label>
            <input type="text" placeholder="ABC" style={inputStyle} />
          </div>
          <div>
            <label>Director's Name</label>
            <input type="text" placeholder="ABC" style={inputStyle} />
          </div>
          <div>
            <label>Name of Hostel</label>
            <input type="text" placeholder="ABC" style={inputStyle} />
          </div>
          <div>
            <label>Hostel Address</label>
            <input type="text" placeholder="ABC" style={inputStyle} />
          </div>
          <div>
            <label>Mobile Number</label>
            <input type="text" placeholder="ABC" style={inputStyle} />
          </div>
        </div>

        {/* Digital Signature Section */}
        <div style={{ marginTop: '30px', textAlign: 'right', fontSize: '1rem', color: '#333' }}>
          Digital Signature..................
        </div>

        {/* Note Section */}
        <div style={{ marginTop: '50px', fontSize: '0.9rem', color: '#555' }}>
          Note: The map of the location where the hostel operates is on the back.
        </div>
      </div>
    </div>
</>
  )
}

export default Recommend
