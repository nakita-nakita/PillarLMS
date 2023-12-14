import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LoudSection = () => {
  const questions = [
    {
      question: "How can a small business owner build a strong online presence?",
      answer:
        "Crafting an engaging website, leveraging social media platforms, and optimizing for local search are powerful ways for small business owners to establish a robust online presence. Connecting with the digital audience opens doors to new customers and opportunities.",
    },
    {
      question: "What marketing tactics can a local business use to stand out?",
      answer:
        "Local businesses thrive by embracing creative marketing tactics. Engaging with the community through events, offering exclusive promotions, and collaborating with other local businesses create a memorable and standout presence.",
    },
    {
      question: "How does excellent customer service impact small businesses?",
      answer:
        "Exceptional customer service is the secret sauce for small business success. Building strong relationships, addressing customer needs with care, and going the extra mile not only foster customer loyalty but also generate positive word-of-mouth referrals.",
    },
    {
      question: "What financial strategies contribute to the growth of a small business?",
      answer:
        "Small business growth is fueled by sound financial strategies. Implementing budgeting, tracking key financial metrics, and exploring funding options set the stage for sustainable growth and financial prosperity.",
    },
    {
      question: "How can small business owners adapt to changing market trends?",
      answer:
        "Navigating market changes requires small business owners to stay agile. Keeping a pulse on industry trends, gathering customer feedback, and embracing innovation allow them to adapt, evolve, and seize new opportunities in a dynamic market.",
    }
  ];



  const [expandedIndices, setExpandedIndices] = useState([]);

  const handleToggle = (index) => {
    setExpandedIndices((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((i) => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  return (
    <section className="bg-gray-200 text-gray-700 py-8">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">Questions and Answers</h3>
        {questions.map((item, index) => (
          <Accordion
            key={index}
            expanded={expandedIndices.includes(index)}
            onChange={() => handleToggle(index)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <h3 className="text-xl font-bold mb-2 cursor-pointer text-gray-800 hover:text-gray-900">
                {item.question}
              </h3>
            </AccordionSummary>
            <animated.p
              className={`text-gray-800 py-3 px-4`}
              style={useSpring({
                height: expandedIndices.includes(index) ? 'auto' : 0,
                opacity: expandedIndices.includes(index) ? 1 : 0,
                overflow: 'hidden',
              })}
            >
              {item.answer}
            </animated.p>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default LoudSection;
