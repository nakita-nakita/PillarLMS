import React from 'react';

const CardList = ({ cardsPerRow = 3 }) => {
  const cardData = [
    {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://source.unsplash.com/random/300x200?sig=1',
    },
    {
      description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      imageUrl: 'https://source.unsplash.com/random/300x200?sig=2',
    },
    {
      description: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.',
      imageUrl: 'https://source.unsplash.com/random/300x200?sig=3',
    },
    {
      description: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.',
      imageUrl: 'https://source.unsplash.com/random/300x200?sig=4',
    },
    {
      description: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.',
      imageUrl: 'https://source.unsplash.com/random/300x200?sig=5',
    },
    // Add more cards as needed
  ];

  const getCardWidth = () => {
    switch (cardsPerRow) {
      case 2:
        return 'w-full sm:w-1/2';
      case 3:
        return 'w-full sm:w-1/2 md:w-1/3';
      default:
        return 'w-full sm:w-1/2 lg:w-1/3'; // Adjusted for three columns on desktop
    }
  };

  return (
    <section className="bg-gray-200 py-8">
      <div className="container mx-auto px-2 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <div className={`text-center`}>

          <h3 className="text-3xl font-bold mb-4">Card List</h3>
          <p className="text-gray-600 m-auto mb-4 max-w-75 sm:max-w-full md:max-w-screen-md">
              Discover our featured cards, each showcasing unique aspects of our offerings. Explore the details and find the perfect fit for your needs.
          </p>
        </div>
        <div className={` flex flex-wrap justify-center`}>
          {cardData.map((card, index) => (
            <div key={index} className={`${getCardWidth()} px-2 py-4`}>

              <div className={`max-w-sm bg-white rounded shadow-lg h-full`}>
                <img src={card.imageUrl} alt={`Card ${index + 1}`} className="w-full h-40 object-cover rounded-t" />
                <div className="p-4">
                  <p className="text-gray-600">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardList;
