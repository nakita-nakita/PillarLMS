const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSettingFooterBuiltIn', [
    {
      id: uuidv4(),
      webAssetImport: "built-in/footers/simpleFooter",
      menuJsonB: JSON.stringify({test: "test"}),

      description: "This modern footer design blends a clean layout with essential elements—logo, social links, and quick navigation. It ensures a polished and engaging online presence, perfect for streamlined user experience on your website.",

      author: "built-in",
      authorLink: null,

      name: "Simple Footer",
      category: "Plain Footer",
      theme: "Default",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      webAssetImport: "built-in/footers/listFooter",
      menuJsonB: JSON.stringify({test: "test"}),

      description: "This footer combines a sleek design with essential elements for a polished online presence. Featuring your logo, social links, and quick navigation, it ensures a user-friendly experience. The clean layout also includes a resources section, neatly organized with categories and subcategories. Perfect for a modern and organized website.",

      author: "built-in",
      authorLink: null,

      name: "List Footer",
      category: "Plain Footer",
      theme: "Default",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      webAssetImport: "built-in/footers/ctaSimpleFooter",
      menuJsonB: JSON.stringify({test: "test"}),

      description: `This footer design seamlessly integrates a vibrant call-to-action section with a captivating "Contact Us Today" message, encouraging users to reach out for assistance. Complemented by a dynamic blue background and a clear "Get in Touch" button, this section is both visually appealing and functional. The overall footer maintains a clean and organized layout, featuring your logo, social media links, company information, and quick navigation links. It's a balanced combination of engagement and functionality, making it an excellent choice for an impactful website footer.`,

      author: "built-in",
      authorLink: null,

      name: "CTA With Simple Footer",
      category: "Call to action",
      theme: "Default",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      webAssetImport: "built-in/footers/ctaListFooter",
      menuJsonB: JSON.stringify({test: "test"}),

      description: `This footer design seamlessly integrates a vibrant call-to-action section, inviting users to "Contact Us Today" with a clear and concise message. The blue-themed section is visually striking, complemented by a button for easy engagement. The overall footer maintains a clean and organized layout, featuring your logo, social media links, company information, quick navigation links, and a resourceful section with categorized subtopics. It offers a perfect blend of engagement and functionality, making it an ideal choice for a modern and impactful website footer.`,

      author: "built-in",
      authorLink: null,

      name: "CTA With List Footer",
      category: "Call to action",
      theme: "Default",

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
        webAssetImport: "built-in/footers/simpleFooter",
      },
      {
        webAssetImport: "built-in/footers/listFooter",
      },
      {
        webAssetImport: "built-in/footers/ctaSimpleFooter",
      },
      {
        webAssetImport: "built-in/footers/ctaListFooter",
      },
    ]
  });
}

module.exports = { up, down };

