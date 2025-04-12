import Navbar from '../Navbar';
import Partners from '../Partners';
import Footer from '../Footer';
import React from 'react';
import './About_neha.css';
import fullBg from '../../assets/Bhaktapur.jpg'; // Your full-size background image

const SosPage = () => {
  const emergencyNumbers = [
    { id: '01', title: 'Police (Emergency)', number: '100' },
    { id: '02', title: 'Tourist Police (Bhrikuti Mandap)', number: '01 4226359 / 4226403' },
    { id: '03', title: 'Nepal Tourism Board', number: '01 4256909 / 4256229' },
    { id: '04', title: 'Department of Immigration', number: '01 4223509 / 4222453' },
    { id: '05', title: 'Ambulance, Bishal Bazaar', number: '01 4244121' },
    { id: '06', title: 'Ambulance Nepal Chamber', number: '01 4230213 / 4222890' }
  ];

  return (
    <>
    <Navbar />
 
    <div className="sos-wrapper">
      <div className="sos-background">
        <img src={fullBg} alt="Emergency background" />
      </div>

      <div className="sos-content">
        <h1>Emergency Numbers in Nepal</h1>
        <p className="intro-text">
          Dear visitor, Sherpa Expedition and Trekking (P) Ltd company provides you an important and easy way to access emergency numbers in Kathmandu, Nepal (+977).
        </p>

        <table className="sos-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Organization / Association</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {emergencyNumbers.map(({ id, title, number }) => (
              <tr key={id}>
                <td><strong>{id}</strong></td>
                <td>{title}</td>
                <td>{number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Partners />
    <Footer />
 </>
  );
};

export default SosPage;






