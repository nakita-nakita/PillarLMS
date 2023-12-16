import React, { useState } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    'https://source.unsplash.com/random/800x600?sig=1',
    'https://source.unsplash.com/random/800x600?sig=2',
    'https://source.unsplash.com/random/800x600?sig=3',
    // Add more image URLs as needed
  ];

  const openLightbox = (index) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <section className="bg-gray-200 py-8">
      <div className="container mx-auto px-2 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <h3 className="text-3xl font-bold mb-4">Gallery</h3>
        <p className="text-gray-600 mb-6">
          Explore a collection of beautiful images. Click on an image to view it in full size.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="cursor-pointer" onClick={() => openLightbox(index)}>
              <img
                src={imageUrl}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-48 object-cover rounded"
              />
            </div>
          ))}
        </div>
        <div className="container mx-auto px-4">
          {selectedImage !== null && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="relative max-w-full max-h-full">
                <img
                  src={images[selectedImage]}
                  alt={`Gallery Image ${selectedImage + 1}`}
                  className="max-w-full max-h-full"
                />
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 text-white text-2xl"
                >
                  &times;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
