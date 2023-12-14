import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: 'John Doe',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className="bg-gray-200 py-8 text-center">
      <div className="container mx-auto px-2 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <h3 className="text-3xl font-bold mb-8">What People Are Saying</h3>

        <Slider {...settings} className="relative">
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md px-6 sm:px-8">
              <p className="text-gray-700 mb-4 mt-6">{testimonial.text}</p>
              <p className="font-bold mb-6">{testimonial.name}</p>
            </div>
          ))}
        </Slider>
        <br/>
      </div>
    </section>
  );
};

export default Testimonials;
