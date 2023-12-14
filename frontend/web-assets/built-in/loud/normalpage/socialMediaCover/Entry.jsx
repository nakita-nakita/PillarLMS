import React from 'react';
import SocialMediaCover from './SocialMediaCover'; // Assuming the component is in the same folder

const UserProfile = () => {
  const backgroundImage = 'https://source.unsplash.com/random/800x400';
  const userPhoto = 'https://source.unsplash.com/random/100x100';
  const userName = 'John Doe';
  const userTag = 'johndoe123';
  const additionalInfo = 'Web Developer | Travel Enthusiast';

  return (
    <div>
      <SocialMediaCover
        backgroundImage={backgroundImage}
        userPhoto={userPhoto}
        userName={userName}
        userTag={userTag}
        additionalInfo={additionalInfo}
      />
      {/* Add other content related to the user profile */}
    </div>
  );
};

export default UserProfile;
