import React from 'react'
import "../../global.css";

const ProfileCard = ({name, qual}) => {
  return (
    <div className='profile-card'>
      <text className='profile-name'>{name}</text>
      <text className='profile-qual'>{qual}</text>
    </div>
  )
}

export default ProfileCard
