const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSettingHeaderBuiltIn', [
    {
      id: uuidv4(),
      webAssetImport: "built-in/headers/simpleHeader",
      menuJsonB: JSON.stringify({test: "test"}),

      description: "This standout header effortlessly pairs a distinctive logo with customizable links, presenting a user-friendly design. The versatile dark background adds a touch of elegance, creating a memorable visual impression. Stylish social media icons provide a contemporary touch. For mobile users, the header adapts seamlessly, revealing a clean menu button for effortless navigation. Essentially, this header offers a visually appealing and easily adaptable introduction to your website, allowing users to tailor their experience.",

      author: "built-in",
      authorLink: null,

      name: "Simple Header",
      category: "Plain Headers",
      theme: "Default",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      webAssetImport: "built-in/headers/dropDownMenu",
      menuJsonB: JSON.stringify({test: "test"}),

      description: "This dynamic navigation bar seamlessly integrates a prominent logo with customizable links, offering a user-friendly and visually engaging design. The stylish dark background exudes a touch of sophistication, leaving a lasting visual impression. Social media icons, contributing a modern flair, are elegantly incorporated. The header seamlessly adapts for mobile users, revealing a clean menu button for effortless navigation. In essence, this navigation bar provides an interactive and adaptable introduction to your website, empowering users to customize their browsing experience.",

      author: "built-in",
      authorLink: null,

      name: "Drop Down Menu",
      category: "Plain Headers",
      theme: "Default",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      webAssetImport: "built-in/headers/eventWithSimpleHeader",
      menuJsonB: JSON.stringify({test: "test"}),

      description: `This versatile web interface seamlessly combines an essential notification bar and a stylish navigation component, ensuring a user-friendly and engaging experience. The attention-grabbing notification bar, highlighted in a vibrant yellow hue, delivers important messages with clarity. The cohesive design integrates modern social media icons, providing a contemporary touch. The navigation bar is thoughtfully responsive, adjusting effortlessly for mobile users. In essence, this interface presents a harmonious blend of functionality and aesthetics, making it an ideal choice for a dynamic and visually appealing website.`,

      author: "built-in",
      authorLink: null,

      name: "Notification With Simple Header",
      category: "Top Notification",
      theme: "Default",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      webAssetImport: "built-in/headers/eventWithDropDownMenu",
      menuJsonB: JSON.stringify({test: "test"}),

      description: `This versatile web interface seamlessly combines an essential notification bar and a stylish navigation component, ensuring a user-friendly and engaging experience. The attention-grabbing notification bar, delivers important messages with clarity. The cohesive design integrates modern social media icons, providing a contemporary touch. The navigation bar is thoughtfully responsive, adjusting effortlessly for mobile users. With dropdown menus for streamlined navigation, this interface presents a harmonious blend of functionality and aesthetics, making it an ideal choice for a dynamic and visually appealing website.`,

      author: "built-in",
      authorLink: null,

      name: "Notification With Drop Down Menu",
      category: "Top Notification",
      theme: "Default",

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
        webAssetImport: "built-in/headers/simpleHeader",
      },
      {
        webAssetImport: "built-in/headers/dropDownMenu",
      },
      {
        webAssetImport: "built-in/headers/eventWithSimpleHeader",
      },
      {
        webAssetImport: "built-in/headers/eventWithDropDownMenu",
      },
    ]
  });
}

module.exports = { up, down };
