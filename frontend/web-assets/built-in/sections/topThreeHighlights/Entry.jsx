import React from 'react';

const TopThreeHighlights = () => {
  const highlights = [
    {
      title: 'Quality Service',
      description: 'Exceptional service that exceeds your expectations.',
      icon: '🌟',
    },
    {
      title: 'Fast Delivery',
      description: 'Swift and efficient delivery for your convenience.',
      icon: '🚚',
    },
    {
      title: 'Customer Satisfaction',
      description: 'Dedicated to ensuring your satisfaction with our products.',
      icon: '😊',
    },
  ];

  return (
    <section className="bg-gray-200 py-8">
      <div className="container mx-auto px-2 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">

        <h3 className="text-3xl font-bold mb-4 text-center">Why Choose Us?</h3>
        <p className="text-gray-600 m-auto mb-4 max-w-75  text-center sm:max-w-full md:max-w-screen-md">
          Explore the key reasons to choose us. From exceptional service to swift delivery and dedicated customer satisfaction, we're committed to exceeding your expectations.
        </p>


        <div className="flex flex-wrap justify-center">
          {highlights.map((highlight, index) => (
            <div key={index} className={`sm:w-full md:w-1/3 p-4`}>
              <div className="max-w-sm p-6 bg-white rounded-md shadow-md text-center h-full">
                <span className="text-4xl mb-4">{highlight.icon}</span>
                <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                <p>{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopThreeHighlights;
