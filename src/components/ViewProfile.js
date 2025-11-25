import React from 'react';
import '../styles.css'; // Ensure your custom styles are modern and responsive

// Mock Profile Data
const profile = {
  id: 'C001',
  name: 'Tharika Dahanayake',
  email: 'tharika.d@example.com',
  phone: '+94-123-456-789',
  address: '18/25, Welyaya Road, Navinna, Maharagama',
  avatar: 'https://via.placeholder.com/150', // Replace with actual image URL
};

const ViewProfile = () => {
  return (
    <div className="modern-profile-container">
      <div className="modern-profile-header">
        <img src={profile.avatar} alt={`${profile.name}'s Avatar`} className="profile-avatar" />
        <h2>{profile.name}</h2>
      </div>
      <div className="modern-profile-body">
        <div className="profile-row">
          <p><strong>ID:</strong> {profile.id}</p>
        </div>
        <div className="profile-row">
          <p><strong>Email:</strong> <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
        </div>
        <div className="profile-row">
          <p><strong>Phone:</strong> <a href={`tel:${profile.phone}`}>{profile.phone}</a></p>
        </div>
        <div className="profile-row">
          <p><strong>Address:</strong> {profile.address}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;