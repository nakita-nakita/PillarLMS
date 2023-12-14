import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const MainVimeoHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="relative bg-gray-800 h-screen overflow-hidden">
      {/* Vimeo Video Background (Replace 'VIDEO_ID' with the actual Vimeo video ID) */}
      <iframe
        title="Vimeo Video"
        width="100%"
        height="100%"
        src="https://player.vimeo.com/video/722605344?autoplay=1&loop=1&background=1"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
        className="absolute inset-0"
      ></iframe>

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 p-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">Empower Your Small Business</h1>
        <p className="text-md md:text-lg mb-6">Unlock success with tailored solutions and expert guidance.</p>
        <div className="flex gap-4">
          <a
            href="#cta" // Replace with your desired link
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 md:py-2 md:px-6 rounded-full text-md md:text-lg transition duration-300"
          >
            Get Started
          </a>
          <Button
            onClick={handleOpenModal}
            className="text-gray-300 underline cursor-pointer"
            style={{ fontWeight: 'lighter', color: 'lightgray' }}
          >
            Watch Video
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div className="modal-container">
          <iframe
            title="Vimeo Video"
            width="100%"
            height="100%"
            src="https://player.vimeo.com/video/722605344?autoplay=1&loop=1"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </section>
  );
};

export default MainVimeoHeader;
