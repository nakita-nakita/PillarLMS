const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSettingFooterBuiltIn', [
    {
      id: "5ce91223-9685-4ee7-93c2-6e38bae8804f",
      webAssetImport: "built-in/footers/lite/Entry",
      menuJsonB: '{"menu":[{"header":"Copyright","type":"CONTAINER:V1","isShowing":{"prop":"isCopyrightShowing"},"data":[{"label":"Organization","prop":"organizationName","type":"TEXTFIELD:V1"},{"label":"Day Color","prop":"colorCopyrightDay","type":"COLOR_SELECTION:V1"},{"label":"Night Color","prop":"colorCopyrightNight","type":"COLOR_SELECTION:V1"}]}]}',

      description: `Lite offers a minimalist approach, providing a clean and simple footer for your web application. Streamline your interface with a sleek design that focuses on essential elements. Perfect for a modern and uncluttered user experience, Lite adds a touch of elegance to your website's bottom section, ensuring a seamless and stylish presentation.`,

      author: "built-in",
      authorLink: null,

      name: "Lite",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3584529c-ee3d-4528-a74e-e9ed79fa671e",
      webAssetImport: "built-in/footers/smallBusiness/Entry",
      menuJsonB: `{"menu":[{"header":"Call To Action","type":"CONTAINER:V1","isShowing":{"prop":"isCtaShowing"},"data":[{"label":"Header","defaultValue":"Contact Us Today","prop":"ctaHeader","type":"TEXTFIELD:V1"},{"label":"Description","defaultValue":"Have questions or need assistance? We're here to help. Contact us for more information.","prop":"ctaDescription","type":"TEXTFIELD:V1"},{"label":"Button","defaultValue":"Get in Touch","prop":"ctaText","type":"LINK_SELECTION:V1"},{"label":"Go To","prop":"ctaLink","type":"LINK_SELECTION:V1"},{"label":"Day Color","prop":"colorCtaDay","type":"COLOR_SELECTION:V1"},{"label":"Night Color","prop":"colorCtaNight","type":"COLOR_SELECTION:V1"}]},{"header":"Footer","type":"CONTAINER:V1","isShowing":{"prop":"isFooterShowing"},"data":[{"label":"Day Color","prop":"colorFooterDay","type":"COLOR_SELECTION:V1"},{"label":"Night Color","prop":"colorFooterNight","type":"COLOR_SELECTION:V1"}]},{"header":"Branding","type":"CONTAINER:V1","isShowing":{"prop":"isBrandShowing"},"data":[{"label":"Show Logo","prop":"isLogoShowing","type":"SWITCH:V1"},{"label":"Logo","prop":"logo","type":"IMAGE_SELECTION:V1"},{"label":"Show Text","prop":"isBrandTextShowing","type":"SWITCH:V1"},{"label":"Text","prop":"brandText","type":"TEXTFIELD:V1"},{"label":"Go To","prop":"link","type":"LINK_SELECTION:V1"}]},{"header":"Social Links","type":"CONTAINER:V1","isShowing":{"prop":"isSocialShowing"},"data":[{"label":"Show Facebook","prop":"isFacebookShowing","type":"SWITCH:V1"},{"label":"Show X","prop":"isXShowing","type":"SWITCH:V1"},{"label":"Show Instagram","prop":"isInstagramShowing","type":"SWITCH:V1"},{"label":"Show LinkedIn","prop":"isLinkedInShowing","type":"SWITCH:V1"},{"label":"Show YouTube","prop":"isYouTubeShowing","type":"SWITCH:V1"},{"label":"Show Pinterest","prop":"isPinterestShowing","type":"SWITCH:V1"},{"label":"Show WhatsApp","prop":"isWhatsAppShowing","type":"SWITCH:V1"},{"label":"Show Reddit","prop":"isRedditShowing","type":"SWITCH:V1"}]},{"header":"Call To Action","type":"CONTAINER:V1","isShowing":{"prop":"isCtaShowing"},"data":[{"label":"Call To Action","defaultValue":"Chat","prop":"ctaText","type":"LINK_SELECTION:V1"},{"label":"Go To","prop":"ctaLink","type":"LINK_SELECTION:V1"},{"label":"Day Color","prop":"colorDay","type":"COLOR_SELECTION:V1"},{"label":"Day Hover Color","prop":"colorHoverDay","type":"COLOR_SELECTION:V1"},{"label":"Night Color","prop":"colorNight","type":"COLOR_SELECTION:V1"},{"label":"Night Hover Color","prop":"colorHoverNight","type":"COLOR_SELECTION:V1"}]},{"header":"Copyright","type":"CONTAINER:V1","isShowing":{"prop":"isCopyrightShowing"},"data":[{"label":"Organization","prop":"organizationName","type":"TEXTFIELD:V1"},{"label":"Day Color","prop":"colorCopyrightDay","type":"COLOR_SELECTION:V1"},{"label":"Night Color","prop":"colorCopyrightNight","type":"COLOR_SELECTION:V1"}]}]}`,

      description: `Small Business is a comprehensive footer designed for businesses aiming for a polished online presence. It features a compelling call-to-action that invites users to connect, seamlessly incorporating vital contact details, social media links, and example links. The resource section presents a well-organized collection of links, making it an excellent solution for small businesses seeking to enhance their footer with both functionality and visual appeal.`,

      author: "built-in",
      authorLink: null,

      name: "Small Business",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "bfc44b25-318b-4a49-b489-cdf23eca721c",
      webAssetImport: "built-in/footers/linkCollection/Entry",
      menuJsonB: '{"menu":[{"header":"Footer","type":"CONTAINER:V1","isShowing":{"prop":"isFooterShowing"},"data":[{"label":"Day Color","prop":"colorFooterDay","type":"COLOR_SELECTION:V1"},{"label":"Night Color","prop":"colorFooterNight","type":"COLOR_SELECTION:V1"}]},{"header":"Copyright","type":"CONTAINER:V1","isShowing":{"prop":"isCopyrightShowing"},"data":[{"label":"Organization","prop":"organizationName","type":"TEXTFIELD:V1"},{"label":"Day Color","prop":"colorCopyrightDay","type":"COLOR_SELECTION:V1"},{"label":"Night Color","prop":"colorCopyrightNight","type":"COLOR_SELECTION:V1"}]}]}',

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

