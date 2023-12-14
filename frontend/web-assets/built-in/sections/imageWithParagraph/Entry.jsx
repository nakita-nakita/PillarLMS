import React from 'react';

const MediaParagraphSection = ({ isImageOnRight = false }) => {
  return (
    <section className="bg-gray-200 py-8">
      <div className={`container mx-auto px-2 md:flex md:max-w-2xl lg:max-w-4xl xl:max-w-6xl ${isImageOnRight ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        <div className={`md:w-1/2 ${isImageOnRight ? 'md:pl-8' : 'md:pr-8'}`}>
          <h3 className="text-4xl font-bold mb-4">Empower Your Business Growth</h3>
          <p className="text-lg">
            Take your small business to new heights by exploring innovative ideas and strategies. Our media collection provides insights to inspire and guide your journey forward.
          </p>
        </div>
        <div className={`mx-2 md:w-1/2 ${isImageOnRight ? 'md:pt-8' : 'md:pt-0'} md:order-first`} style={{ backgroundImage: 'url("https://source.unsplash.com/random/200x200?sig=3")', backgroundPosition: 'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '200px' }}></div>
      </div>
    </section>
  );
};

export default MediaParagraphSection;
