const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSettingFooterBuiltIn', [
    {
      id: "5ce91223-9685-4ee7-93c2-6e38bae8804f",
      webAssetImport: "built-in/footers/lite/Entry",
      menuJsonB: '{"menu":[{"header":"Copyright","type":"CONTAINER:V1","isShowing":{"prop":"isCopyrightShowing"},"data":[{"label":"Organization","prop":"copyrightName","type":"TEXTFIELD:V1","placeholder":"Your Brand"},{"label":"Day Color","prop":"copyrightColorDay","isShowing":"isDayMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"rgb(168, 162, 158)","suggestedTextColor":"DARK"}},{"label":"Night Color","prop":"copyrightColorNight","isShowing":"isNightMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"rgb(77, 77, 77)","suggestedTextColor":"LIGHT"}}]}]}',

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
      menuJsonB: `{"menu":[{"header":"Call To Action","type":"CONTAINER:V1","isShowing":{"prop":"isCtaPanelShowing"},"data":[{"label":"Background","prop":"colorCtaPanelDay","isShowing":"isDayMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"#cbd5e","suggestedTextColor":"DARK"}},{"label":"Background","prop":"colorCtaPanelNight","isShowing":"isNightMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"#475569","suggestedTextColor":"LIGHT"}},{"label":"Header","defaultValue":"Contact Us Today","prop":"ctaPanelHeader","type":"TEXTFIELD:V1"},{"label":"Description","defaultValue":"Have questions or need assistance? We're here to help. Contact us for more information.","prop":"ctaPanelDescription","type":"TEXTFIELD:V1"},{"label":"Button","defaultValue":"Get in Touch","prop":"ctaPanelText","type":"LINK_SELECTION:V1"},{"label":"Go To","prop":"ctaPanelLink","type":"LINK_SELECTION:V1"},{"label":"Button","prop":"colorCtaButtonDay","isShowing":"isDayMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"#cbd5e","suggestedTextColor":"DARK"}},{"label":"Button","prop":"colorCtaButtonNight","isShowing":"isNightMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"#475569","suggestedTextColor":"LIGHT"}}]},{"header":"Footer","type":"CONTAINER:V1","isShowing":{"prop":"isFooterShowing"},"data":[{"label":"Day Color","prop":"colorFooterDay","isShowing":"isDayMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"#57534e","suggestedTextColor":"DARK"}},{"label":"Night Color","prop":"colorFooterNight","isShowing":"isNightMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"#57534e","suggestedTextColor":"DARK"}}]},{"header":"Branding","type":"CONTAINER:V1","isShowing":{"prop":"isBrandShowing"},"data":[{"label":"Show Logo","prop":"isLogoShowing","type":"SWITCH:V1","defaultValue":true},{"label":"Logo","prop":"logo","type":"MEDIA_SELECTION:V1","fileFilter":["images"]},{"label":"Show Text","prop":"isBrandTextShowing","type":"SWITCH:V1","defaultValue":true},{"label":"Text","prop":"brandText","type":"TEXTFIELD:V1","placeholder":"Your Brand"},{"label":"Link","prop":"brandLink","type":"LINK_SELECTION:V1"}]},{"header":"Social","type":"CONTAINER:V1","isShowing":{"prop":"isSocialShowing"},"data":[{"label":"Show Facebook","prop":"isFacebookShowing","type":"SWITCH:V1","isShowing":"organization.hasFacebook"},{"label":"Show 𝕏","prop":"isXShowing","type":"SWITCH:V1","isShowing":"organization.hasX"},{"label":"Show Instagram","prop":"isInstagramShowing","type":"SWITCH:V1","isShowing":"organization.hasInstagram"},{"label":"Show LinkedIn","prop":"isLinkedInShowing","type":"SWITCH:V1","isShowing":"organization.hasLinkedIn"},{"label":"Show FacebookYoutube","prop":"isYoutubeShowing","type":"SWITCH:V1","isShowing":"organization.hasYoutube"},{"label":"Show Pinterest","prop":"isPinterestShowing","type":"SWITCH:V1","isShowing":"organization.hasPinterest"},{"label":"Show socialWhatsapp","prop":"issocialWhatsappShowing","type":"SWITCH:V1","isShowing":"organization.hassocialWhatsapp"},{"label":"Show Reddit","prop":"isRedditShowing","type":"SWITCH:V1","isShowing":"organization.hasReddit"}]},{"header":"Copyright","type":"CONTAINER:V1","isShowing":{"prop":"isCopyrightShowing"},"data":[{"label":"Organization","prop":"copyrightName","type":"TEXTFIELD:V1","placeholder":"Your Brand"},{"label":"Day Color","prop":"copyrightColorDay","isShowing":"isDayMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"rgb(168, 162, 158)","suggestedTextColor":"DARK"}},{"label":"Night Color","prop":"copyrightColorNight","isShowing":"isNightMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"rgb(77, 77, 77)","suggestedTextColor":"LIGHT"}}]}]}`,

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
      menuJsonB: '{"menu":[{"header":"Footer","type":"CONTAINER:V1","isShowing":{"prop":"isFooterShowing"},"data":[{"label":"Day Color","prop":"colorFooterDay","isShowing":"isDayMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"#57534e","suggestedTextColor":"DARK"}},{"label":"Night Color","prop":"colorFooterNight","isShowing":"isNightMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"#57534e","suggestedTextColor":"DARK"}}]},{"header":"Copyright","type":"CONTAINER:V1","isShowing":{"prop":"isCopyrightShowing"},"data":[{"label":"Organization","prop":"copyrightName","type":"TEXTFIELD:V1","placeholder":"Your Brand"},{"label":"Day Color","prop":"copyrightColorDay","isShowing":"isDayMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"rgb(168, 162, 158)","suggestedTextColor":"DARK"}},{"label":"Night Color","prop":"copyrightColorNight","isShowing":"isNightMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"rgb(77, 77, 77)","suggestedTextColor":"LIGHT"}}]}]}',

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

