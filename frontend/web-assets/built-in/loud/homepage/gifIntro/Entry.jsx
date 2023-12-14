import React from 'react';

const MediaParagraphSection = ({ isImageOnRight = true }) => {
  return (
    <section className="bg-gray-200 py-8">
      <div className={`container mx-auto px-2 md:flex md:max-w-2xl lg:max-w-4xl xl:max-w-6xl ${isImageOnRight ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        <div className={`mx-4 md:w-1/2 ${isImageOnRight ? 'md:pt-8' : 'md:pt-0'} md:order-first`}>
          {/* Replace 'your_animation.gif' with your actual GIF file */}
          <img
            src="https://dsimple.com/wp-content/uploads/2017/03/redes-sociales-estrategia.gif"
            alt="Animated Business Growth"
            className="w-full h-64 object-cover rounded"
          />
        </div>
        <div className={`md:w-1/2 ${isImageOnRight ? 'md:pl-8' : 'md:pr-8'} flex flex-col justify-center`}>
          <h3 className="text-4xl font-bold mb-4">Empower Your Business Growth</h3>
          <p className="text-lg mb-4">
            Take your small business to new heights by exploring innovative ideas and strategies. Our media collection provides insights to inspire and guide your journey forward.
          </p>
          {/* Add your CTA button here */}
          <button className="mb-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default MediaParagraphSection;
