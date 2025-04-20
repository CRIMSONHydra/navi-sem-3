import React, { useState } from 'react'

import { useAuth } from '../context/useAuth'
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';

import './user-profile.css';

function UserProfile() {
  const {user, userData, setUserData} = useAuth();
  const [formData, setFormData] = useState({
    username: userData?.username || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    age: userData?.age || '',
    dob: userData?.dob || '',
    address: userData?.address || '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if(!user) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, formData);
      setIsEditing(false);

      setUserData(prev => ({
        ...prev,
        formData
      }));
    } catch (error) {
      console.log("Error updating profile", error);
    }
  }


  return (
    <div className="user-profile">
      <div className="profile-picture">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="Profile" className="avatar" />
        ) : (
          <div className="avatar-placeholder">No Image</div>
        )}
      </div>

      <h2>User Profile</h2>
      <label>
        Name:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </label>
      <label>
        Date of Birth:
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </label>
      <label>
        Phone:
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </label>
      <label>
        Address:
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </label>

      <button onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  )
}

export default UserProfile