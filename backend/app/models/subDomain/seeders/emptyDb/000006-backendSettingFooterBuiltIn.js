const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSettingFooterBuiltIn', [
    {
      id: uuidv4(),
      webAssetImport: "built-in/footers/lite/Entry",
      menuJsonB: JSON.stringify({test: "test"}),

      description: `Lite offers a minimalist approach, providing a clean and simple footer for your web application. Streamline your interface with a sleek design that focuses on essential elements. Perfect for a modern and uncluttered user experience, Lite adds a touch of elegance to your website's bottom section, ensuring a seamless and stylish presentation.`,

      author: "built-in",
      authorLink: null,

      name: "Lite",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      webAssetImport: "built-in/footers/smallBusiness/Entry",
      menuJsonB: JSON.stringify({test: "test"}),

      description: `Small Business is a feature-rich footer tailored for businesses seeking a professional online presence. With a striking blue header inviting users to get in touch, it seamlessly integrates essential contact information, social media links, and example links. The resource section offers a categorized collection of links, making it an ideal choice for small businesses looking to provide a comprehensive and visually appealing footer.`,

      author: "built-in",
      authorLink: null,

      name: "Small Business",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      webAssetImport: "built-in/footers/linkCollection/Entry",
      menuJsonB: JSON.stringify({test: "test"}),

      description: `"Link Collection is your curated set of organized resources. Explore various categories and discover valuable subtopics with ease. Whether you're navigating through different subjects or finding specific information, Link Collection simplifies the process. It's your go-to hub for accessing a range of helpful links presented in a user-friendly format."`,

      author: "built-in",
      authorLink: null,

      name: "Link Collection",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {})
}

async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('backendSettingFooterBuiltIn', {
    [Op.or]: [
      {
        webAssetImport: "built-in/footers/smallBusiness/Entry",
      },
      {
        webAssetImport: "built-in/footers/links/Entry",
      },
      {
        webAssetImport: "built-in/footers/lite/Entry",
      },
    ]
  });
}

module.exports = { up, down };

