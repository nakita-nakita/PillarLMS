
import React from 'react';

// import './styles/tailwinds.css'

const MainSiteLayout = ({ children, ...props }) => {
  return (
    <div>
      {children}
    </div>
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <div className="bg-white p-8 rounded shadow-md">
    //     <h1 className="text-2xl font-bold mb-4">Welcome to My Tailwind CSS App</h1>
    //     <p className="text-gray-700">This is a simple layout using Tailwind CSS in a Next.js app.</p>
    //   </div>
    // </div>
  );
};

export default MainSiteLayout;