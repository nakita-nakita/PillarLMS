import React from 'react';

const MainVideoHeader = () => {
  return (
    <section className="relative bg-gray-800 h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background (Replace 'video.mp4' with your video source) */}
      <video
        src="https://www.youtube.com/embed/PBQZe3Y-pi4"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="text-center text-white z-10">
        <h1 className="text-4xl font-bold mb-4">Empower Your Small Business</h1>
        <p className="text-lg mb-6">Unlock success with tailored solutions and expert guidance.</p>
        <a
          href="#cta" // Replace with your desired link
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full text-lg transition duration-300"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default MainVideoHeader;
