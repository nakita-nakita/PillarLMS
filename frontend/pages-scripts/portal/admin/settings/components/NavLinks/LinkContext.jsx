import React, { createContext, useContext, useState } from 'react';

export const LinksContext = createContext();
export const initialData = [
  {
    id: "d1_124213",
    label: "dropdown1",
    menus: [
      { id: "d1_1", label: 'Home', href: '/home' },
      { id: "d1_2", label: 'About', href: '/about' },
      { id: "d1_3", label: 'OpenAI', href: 'https://openai.com' },
      { id: "d1_4", label: 'GitHub', href: 'https://github.com' },

    ],
  },
  {
    id: "d2_125123",
    label: "dropdown2",
    menus: [
      { id: "d2_1", label: 'Home', href: '/home' },
      { id: "d2_2", label: 'About', href: '/about' },
      { id: "d2_3", label: 'OpenAI', href: 'https://openai.com' },
      { id: "d2_4", label: 'GitHub', href: 'https://github.com' },

    ],
  },
];
export const useLinksContext = () => {
  return useContext(LinksContext);
};

export const LinksProvider = ({ children }) => {
  const [globalLinks, setGlobalLinks] = useState([...initialData]);

  return (
    <LinksContext.Provider value={{ globalLinks, setGlobalLinks }}>
      {children}
    </LinksContext.Provider>
  );
};
