import React from 'react';

const SocialMediaCover = ({ backgroundImage, userPhoto, userName, userTag, additionalInfo }) => {
  return (
    <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto relative flex items-center justify-center h-full">
        <div className="flex flex-col items-center text-white">
          <div className="w-20 h-20 overflow-hidden rounded-full border-4 border-white">
            <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold mt-4">{userName}</h2>
          <p className="text-lg">@{userTag}</p>
          <p className="mt-2">{additionalInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaCover;
