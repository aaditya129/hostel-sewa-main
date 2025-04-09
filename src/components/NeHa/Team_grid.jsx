// TeamGrid.js
import React from 'react';
import team from '../NeHa/team.png'
import './Team_grid.css';


const teamMembers = [
  { name: "Sunita Lacoul", title: "Chairman", phone: "9855045778", role: "Nepal Hostel Association" },
  { name: "Arjun Chhetri", title: "Vice President", phone: "9855045790", role: "Nepal Hostel Association" },
  { name: "Anita Chhetri", title: "Female Vice President", phone: "9855045778", role: "Nepal Hostel Association" },
  { name: "Hari Chhetri", title: "General Secretary", phone: "9855045790", role: "Nepal Hostel Association" },
  { name: "Anita Chhetri", title: "Female Vice President", phone: "9855045778", role: "Nepal Hostel Association" },
  { name: "Ram Chhetri", title: "General Secretary", phone: "9855045778", role: "Nepal Hostel Association" },
  { name: "Anita Chhetri", title: "Female Vice President", phone: "9855045778", role: "Nepal Hostel Association" },
  { name: "Ram Chhetri", title: "General Secretary", phone: "9855045778", role: "Nepal Hostel Association" },
  { name: "Anita Chhetri", title: "Female Vice President", phone: "9855045778", role: "Nepal Hostel Association" },
  { name: "Ram Chhetri", title: "General Secretary", phone: "9855045778", role: "Nepal Hostel Association" },
  { name: "Anita Chhetri", title: "Female Vice President", phone: "9855045778", role: "Nepal Hostel Association" },
  { name: "Ram Chhetri", title: "General Secretary", phone: "9855045778", role: "Nepal Hostel Association" },
];

const TeamGrid = ({ team }) => {
  return (
    <div className="team-grid">
      {team.map((member, index) => (
        <div className="team-card" key={index}>
          {/* <img src={team} alt={member.name} className="team-image" /> */}
          <div className="team-info">
            <h3 className="team-name">{member.name}</h3>
            <p className="team-title">{member.positionName}</p>
            <p className="team-phone">{member.number}</p>
            <p className="team-role">Nepal Hostel Association </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamGrid;
