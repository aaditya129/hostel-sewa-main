import React, { useState } from 'react';
import './staff_form.css';
import { FaCalendarAlt } from 'react-icons/fa';
import Navigate from '../Navigate/Navigate';
import Navbar from '../Navbar';
import Job_form from './Job_form';

const StaffWantedForm = () => {
    const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Array(10).fill(false));

  const terms = [
    "When hiring a worker, it is compulsory to keep the worker’s full certificate ID card at least 1 month in the Hostel Service Pvt Ltd.",
    "On the same day after providing workers, Rs.3000 will be charged for the service fee.",
    "If the above-mentioned amount is left within 10 days, the remaining amount will be deducted and the remaining amount will be returned.",
    "Worker’s salary should be paid only within 10 days after the end of month.",
    "If the worker wants to withdraw without understanding, the worker can be withdrawn by informing the hostel service 10 days in advance without deducting any amount from the worker.",
    "The hostel service will not take responsibility for any accident after the worker is employed.",
    "Any type of abuse is not permitted.",
    "Attend the training, seminar, and orientation training organized by the hostel service.",
    "Photocopy or photo of any registration certificate of the hostel must be submitted.",
    "The fees and conditions mentioned above are for reducing and managing the shortage of workers."
  ];

  const handleAgreeAll = () => {
    setAllChecked(!allChecked);
    setCheckedItems(checkedItems.map(() => !allChecked));
  };

  const handleIndividualCheck = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
    setAllChecked(updatedCheckedItems.every(Boolean));
  };
  return (
    <>
    <Navbar/>
    <div className="staff-form-container">
      <h2>Staff Wanted Form</h2>
      <form className="staff-form">
        <div className="form-row">
          <div className="form-group">
            <label>Today's Date</label>
            <div className="input-with-icon">
              <input type="date" placeholder="mm/dd/yyyy" />
              <FaCalendarAlt className="calendar-icon" />
            </div>
          </div>
          <div className="form-group">
            <label>Hostel Name*</label>
            <input type="text" placeholder="Enter hostel name" required />
          </div>
          <div className="form-group">
            <label>Hostel Type</label>
            <select>
              <option>Boys Hostel</option>
              <option>Girls Hostel</option>
              <option>Co-ed Hostel</option>
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Hostel's Capacity</label>
            <input type="number" placeholder="30" />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" placeholder="Kathmandu" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Mobile No.*</label>
            <input type="text" placeholder="9845055444" required />
          </div>
          <div className="form-group">
            <label>Staff Number in Hostel</label>
            <input type="number" placeholder="4" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Job's Nature</label>
            <input type="text" placeholder="XYZ" />
          </div>
          <div className="form-group">
            <label>Monthly Income</label>
            <input type="text" placeholder="20,000" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Age Range</label>
            <div className="age-range">
              <select>
                <option>From</option>
              </select>
              <select>
                <option>To</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Select Gender</label>
            <select>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <p className="form-fees">Form Fees: Only Nrs 200</p>

        <h3>Select Payment Methods</h3>
        <div className="payment-methods">
          <label className="payment-option">
            <input type="radio" name="payment" />
            <span>Global IME Bank</span>
          </label>
          <label className="payment-option">
            <input type="radio" name="payment" />
            <span>Esewa</span>
          </label>
        </div>

        <p className="add-payment-method">+ Add other payment method</p>

        <button type="submit" className="submit-btn">Submit</button>

      </form>
      </div>
      <div className="terms-container">
      <h3>Terms and Conditions</h3>
      <ul className="terms-list">
        {terms.map((term, index) => (
          <li key={index} className="term-item">
            <input
              type="checkbox"
              checked={checkedItems[index]}
              onChange={() => handleIndividualCheck(index)}
            />
            <label>{term}</label>
          </li>
        ))}
      </ul>
      <div className="agree-all">
        <input
          type="checkbox"
          checked={allChecked}
          onChange={handleAgreeAll}
        />
        <label>Agree all</label>
      </div>
      <button type="submit" className="submit-button">Submit</button>
    </div>

   
   </>
  );
};

export default StaffWantedForm;
