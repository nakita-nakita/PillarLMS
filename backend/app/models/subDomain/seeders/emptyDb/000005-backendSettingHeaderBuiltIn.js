const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSettingHeaderBuiltIn', [
    {
      id: uuidv4(),
      webAssetImport: "built-in/headers/lite/Entry",
      menuJsonB: JSON.stringify({test: "test"}),

      description: `The "lite" component is a minimalistic navigation bar that provides essential functionalities, suitable for users who prefer a clean and straightforward interface. It features a prominent brand logo, a day/night mode switch represented by intuitive icons, and a notification bar for important messages. The mobile version includes a hamburger menu that reveals the day/night mode switch on click, enhancing user experience while maintaining simplicity.`,

      author: "built-in",
      authorLink: null,

      name: "Lite",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      webAssetImport: "built-in/headers/smallBusinessFewPages/Entry",
      menuJsonB: JSON.stringify({test: "test"}),

      description: `The "Small Business Few Pages" component is designed for small business websites with a concise structure. Featuring a sleek navigation bar, it includes a prominent brand logo, a day/night mode switch, and a notification bar for essential messages. The mobile version employs a hamburger menu that smoothly unfolds into a comprehensive menu on click. The component maintains simplicity while providing quick access to vital sections like About, Services, Contact, and Sign In. Suitable for small businesses, it offers a clean and user-friendly interface.`,
      
      author: "built-in",
      authorLink: null,

      name: "Small Business Few Pages",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      webAssetImport: "built-in/headers/smallBusinessManyPages/Entry",
      menuJsonB: JSON.stringify({test: "test"}),

      description: `The "Small Business Many Pages" component is tailored for small business websites with a more extensive content structure. The component includes a dynamic navigation bar with a brand logo, a day/night mode switch, and essential sections such as About, Services, Contact, and Sign In. The navigation menu is designed to be collapsible on smaller screens, providing a clean and organized interface. Users can easily navigate through various pages and access detailed information about services, team members, locations, and the company's experience. The day/night mode switch ensures a personalized visual experience. Suitable for small businesses with more content to showcase.`,

      author: "built-in",
      authorLink: null,

      name: "Small Business Many Pages",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {})
}

async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('backendSettingHeaderBuiltIn', {
    [Op.or]: [
      {
        webAssetImport: "built-in/headers/lite/Entry",
      },
      {
        webAssetImport: "built-in/headers/smallBusinessFewPages/Entry",
      },
      {
        webAssetImport: "built-in/headers/smallBusinessManyPages/Entry",
      },
    ]
  });
}

module.exports = { up, down };
