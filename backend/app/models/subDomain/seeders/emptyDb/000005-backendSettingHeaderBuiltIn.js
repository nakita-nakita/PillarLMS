const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSettingHeaderBuiltIn', [
    {
      id: "2ec57f1a-f355-48d5-8aa3-a8fc2e457ff4",
      webAssetImport: "built-in/headers/lite/Entry",
      menuJsonB: '{"menu":[{"header":"Notice","type":"CONTAINER:V1","isShowing":{"prop":"isNoticeShowing"},"data":[{"label":"Title","prop":"title","type":"TEXTFIELD:V1"},{"label":"Go To","prop":"link","type":"LINK_SELECTION:V1"},{"label":"Day Color","prop":"colorDay","type":"COLOR_SELECTION:V1"},{"label":"Night Color","prop":"colorNight","type":"COLOR_SELECTION:V1"}]},{"header":"Navigation Bar","type":"CONTAINER:V1","isShowing":{"prop":"isNavShowing"},"data":[{"label":"Day Color","prop":"colorDay","type":"COLOR_SELECTION:V1"},{"label":"Night Color","prop":"colorNight","type":"COLOR_SELECTION:V1"}]},{"header":"Branding","type":"CONTAINER:V1","isShowing":{"prop":"isBrandShowing"},"data":[{"label":"Show Logo","prop":"isLogoShowing","type":"SWITCH:V1"},{"label":"Logo","prop":"logo","type":"IMAGE_SELECTION:V1"},{"label":"Show Text","prop":"isBrandTextShowing","type":"SWITCH:V1"},{"label":"Text","prop":"brandText","type":"TEXTFIELD:V1"},{"label":"Go To","prop":"link","type":"LINK_SELECTION:V1"}]}]}',

      description: `The "lite" component is a minimalistic navigation bar that provides essential functionalities, suitable for users who prefer a clean and straightforward interface. It features a prominent brand logo, a day/night mode switch represented by intuitive icons, and a notification bar for important messages. The mobile version includes a hamburger menu that reveals the day/night mode switch on click, enhancing user experience while maintaining simplicity.`,

      author: "built-in",
      authorLink: null,

      name: "Lite",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "93fe3d5e-b471-4f22-8349-ef1bdb1eb57c",
      webAssetImport: "built-in/headers/smallBusinessFewPages/Entry",
      menuJsonB: '{"menu":[{"header":"Notice","type":"CONTAINER:V1","isShowing":{"prop":"isNoticeShowing"},"data":[{"label":"Title","prop":"title","type":"TEXTFIELD:V1"},{"label":"Go To","prop":"link","type":"LINK_SELECTION:V1"},{"label":"Day Color","prop":"colorDay","type":"COLOR_SELECTION:V1"},{"label":"Night Color","prop":"colorNight","type":"COLOR_SELECTION:V1"}]},{"header":"Navigation Bar","type":"CONTAINER:V1","isShowing":{"prop":"isNavShowing"},"data":[{"label":"Day Color","prop":"colorDay","type":"COLOR_SELECTION:V1"},{"label":"Night Color","prop":"colorNight","type":"COLOR_SELECTION:V1"}]},{"header":"Branding","type":"CONTAINER:V1","isShowing":{"prop":"isBrandShowing"},"data":[{"label":"Show Logo","prop":"isLogoShowing","type":"SWITCH:V1"},{"label":"Logo","prop":"logo","type":"IMAGE_SELECTION:V1"},{"label":"Show Text","prop":"isBrandTextShowing","type":"SWITCH:V1"},{"label":"Text","prop":"brandText","type":"TEXTFIELD:V1"},{"label":"Go To","prop":"link","type":"LINK_SELECTION:V1"}]},{"header":"Social Links","type":"CONTAINER:V1","isShowing":{"prop":"isSocialShowing"},"data":[{"label":"Show Facebook","prop":"isFacebookShowing","type":"SWITCH:V1"},{"label":"Show X","prop":"isXShowing","type":"SWITCH:V1"},{"label":"Show Instagram","prop":"isInstagramShowing","type":"SWITCH:V1"},{"label":"Show LinkedIn","prop":"isLinkedInShowing","type":"SWITCH:V1"},{"label":"Show YouTube","prop":"isYouTubeShowing","type":"SWITCH:V1"},{"label":"Show Pinterest","prop":"isPinterestShowing","type":"SWITCH:V1"},{"label":"Show WhatsApp","prop":"isWhatsAppShowing","type":"SWITCH:V1"},{"label":"Show Reddit","prop":"isRedditShowing","type":"SWITCH:V1"}]},{"header":"Call To Action","type":"CONTAINER:V1","isShowing":{"prop":"isCtaShowing"},"data":[{"label":"Call To Action","defaultValue":"Chat","prop":"ctaText","type":"LINK_SELECTION:V1"},{"label":"Go To","prop":"ctaLink","type":"LINK_SELECTION:V1"},{"label":"Day Color","prop":"colorDay","type":"COLOR_SELECTION:V1"},{"label":"Day Hover Color","prop":"colorHoverDay","type":"COLOR_SELECTION:V1"},{"label":"Night Color","prop":"colorNight","type":"COLOR_SELECTION:V1"},{"label":"Night Hover Color","prop":"colorHoverNight","type":"COLOR_SELECTION:V1"}]}]}' ,

      description: `The "Small Business Few Pages" component is designed for small business websites with a concise structure. Featuring a sleek navigation bar, it includes a prominent brand logo, a day/night mode switch, and a notification bar for essential messages. The mobile version employs a hamburger menu that smoothly unfolds into a comprehensive menu on click. The component maintains simplicity while providing quick access to vital sections like About, Services, Contact, and Sign In. Suitable for small businesses, it offers a clean and user-friendly interface.`,
      
      author: "built-in",
      authorLink: null,

      name: "Small Business Few Pages",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "bce5b5ac-e616-4bbc-a9d9-8df963b33209",
      webAssetImport: "built-in/headers/smallBusinessManyPages/Entry",
      menuJsonB: '{"menu":[{"header":"Notice","type":"CONTAINER:V1","isShowing":{"prop":"isNoticeShowing"},"data":[{"label":"Title","prop":"title","type":"TEXTFIELD:V1"},{"label":"Go To","prop":"link","type":"LINK_SELECTION:V1"},{"label":"Day Color","prop":"colorDay","type":"COLOR_SELECTION:V1"},{"label":"Night Color","prop":"colorNight","type":"COLOR_SELECTION:V1"}]},{"header":"Navigation Bar","type":"CONTAINER:V1","isShowing":{"prop":"isNavShowing"},"data":[{"label":"Day Color","prop":"colorDay","type":"COLOR_SELECTION:V1"},{"label":"Day Menu Color","prop":"colorMenuDay","type":"COLOR_SELECTION:V1"},{"label":"Night Color","prop":"colorNight","type":"COLOR_SELECTION:V1"},{"label":"Night Menu Color","prop":"colorMenuNight","type":"COLOR_SELECTION:V1"}]},{"header":"Branding","type":"CONTAINER:V1","isShowing":{"prop":"isBrandShowing"},"data":[{"label":"Show Logo","prop":"isLogoShowing","type":"SWITCH:V1"},{"label":"Logo","prop":"logo","type":"IMAGE_SELECTION:V1"},{"label":"Show Text","prop":"isBrandTextShowing","type":"SWITCH:V1"},{"label":"Text","prop":"brandText","type":"TEXTFIELD:V1"},{"label":"Go To","prop":"link","type":"LINK_SELECTION:V1"}]},{"header":"Social Links","type":"CONTAINER:V1","isShowing":{"prop":"isSocialShowing"},"data":[{"label":"Show Facebook","prop":"isFacebookShowing","type":"SWITCH:V1"},{"label":"Show X","prop":"isXShowing","type":"SWITCH:V1"},{"label":"Show Instagram","prop":"isInstagramShowing","type":"SWITCH:V1"},{"label":"Show LinkedIn","prop":"isLinkedInShowing","type":"SWITCH:V1"},{"label":"Show YouTube","prop":"isYouTubeShowing","type":"SWITCH:V1"},{"label":"Show Pinterest","prop":"isPinterestShowing","type":"SWITCH:V1"},{"label":"Show WhatsApp","prop":"isWhatsAppShowing","type":"SWITCH:V1"},{"label":"Show Reddit","prop":"isRedditShowing","type":"SWITCH:V1"}]},{"header":"Call To Action","type":"CONTAINER:V1","isShowing":{"prop":"isCtaShowing"},"data":[{"label":"Call To Action","defaultValue":"Chat","prop":"ctaText","type":"LINK_SELECTION:V1"},{"label":"Go To","prop":"ctaLink","type":"LINK_SELECTION:V1"},{"label":"Day Color","prop":"colorDay","type":"COLOR_SELECTION:V1"},{"label":"Day Hover Color","prop":"colorHoverDay","type":"COLOR_SELECTION:V1"},{"label":"Night Color","prop":"colorNight","type":"COLOR_SELECTION:V1"},{"label":"Night Hover Color","prop":"colorHoverNight","type":"COLOR_SELECTION:V1"}]}]}',

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
