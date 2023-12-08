const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSettingHeaderBuiltIn', [
    {
      id: "2ec57f1a-f355-48d5-8aa3-a8fc2e457ff4",
      webAssetImport: "built-in/headers/lite/Entry",
      menuJsonB: '{"menu":[{"header":"Notice","type":"CONTAINER:V1","isShowing":{"prop":"isNoticeShowing"},"data":[{"label":"Title","prop":"noticeTitle","type":"TEXTFIELD:V1","placeholder":"Important notice goes here."},{"label":"Link","prop":"noticeLink","type":"LINK_SELECTION:V1"},{"label":"Background","prop":"noticeColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(228, 228, 231)","suggestedTextColor":"DARK"}},{"label":"Background","prop":"noticeColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(39, 39, 42)","suggestedTextColor":"LIGHT"}}]},{"header":"Navigation Bar","type":"CONTAINER:V1","isShowing":{"prop":"isNavShowing"},"data":[{"label":"Background","prop":"navColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(168, 162, 158)","suggestedTextColor":"DARK"}},{"label":"Background","prop":"navColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(77, 77, 77)","suggestedTextColor":"LIGHT"}}]},{"header":"Branding","type":"CONTAINER:V1","isShowing":{"prop":"isBrandShowing"},"data":[{"label":"Show Logo","prop":"isLogoShowing","type":"SWITCH:V1","defaultValue":true},{"label":"Logo","prop":"logo","type":"MEDIA_SELECTION:V1","fileFilter":["images"]},{"label":"Show Text","prop":"isBrandTextShowing","type":"SWITCH:V1","defaultValue":true},{"label":"Text","prop":"brandText","type":"TEXTFIELD:V1","placeholder":"Your Brand"},{"label":"Link","prop":"brandLink","type":"LINK_SELECTION:V1"}]},{"header":"Day/Night Selector","type":"CONTAINER:V1","isShowing":{"prop":"isDayNightSelectorShowing"},"data":[{"label":"Drop Down","prop":"dayNightSelectorColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(120, 113, 108)","suggestedTextColor":"DARK"}},{"label":"Drop Down","prop":"dayNightSelectorColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(87, 83, 78)","suggestedTextColor":"LIGHT"}}]}]}',

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
      menuJsonB: '{"menu":[{"header":"Notice","type":"CONTAINER:V1","isShowing":{"prop":"isNoticeShowing"},"data":[{"label":"Title","prop":"noticeTitle","type":"TEXTFIELD:V1","placeholder":"Important notice goes here."},{"label":"Link","prop":"noticeLink","type":"LINK_SELECTION:V1"},{"label":"Background","prop":"noticeColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(228, 228, 231)","suggestedTextColor":"DARK"}},{"label":"Background","prop":"noticeColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(39, 39, 42)","suggestedTextColor":"LIGHT"}}]},{"header":"Navigation Bar","type":"CONTAINER:V1","isShowing":{"prop":"isNavShowing"},"data":[{"label":"Background","prop":"navColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(168, 162, 158)","suggestedTextColor":"DARK"}},{"label":"Background","prop":"navColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(77, 77, 77)","suggestedTextColor":"LIGHT"}}]},{"header":"Branding","type":"CONTAINER:V1","isShowing":{"prop":"isBrandShowing"},"data":[{"label":"Show Logo","prop":"isLogoShowing","type":"SWITCH:V1","defaultValue":true},{"label":"Logo","prop":"logo","type":"MEDIA_SELECTION:V1","fileFilter":["images"]},{"label":"Show Text","prop":"isBrandTextShowing","type":"SWITCH:V1","defaultValue":true},{"label":"Text","prop":"brandText","type":"TEXTFIELD:V1","placeholder":"Your Brand"},{"label":"Link","prop":"brandLink","type":"LINK_SELECTION:V1"}]},{"header":"Social","type":"CONTAINER:V1","isShowing":{"prop":"isSocialShowing"},"data":[{"label":"Show Facebook","prop":"isFacebookShowing","type":"SWITCH:V1","isShowing":"organization.hasFacebook"},{"label":"Show 𝕏","prop":"isXShowing","type":"SWITCH:V1","isShowing":"organization.hasX"},{"label":"Show Instagram","prop":"isInstagramShowing","type":"SWITCH:V1","isShowing":"organization.hasInstagram"},{"label":"Show LinkedIn","prop":"isLinkedInShowing","type":"SWITCH:V1","isShowing":"organization.hasLinkedIn"},{"label":"Show FacebookYoutube","prop":"isYoutubeShowing","type":"SWITCH:V1","isShowing":"organization.hasYoutube"},{"label":"Show Pinterest","prop":"isPinterestShowing","type":"SWITCH:V1","isShowing":"organization.hasPinterest"},{"label":"Show socialWhatsapp","prop":"issocialWhatsappShowing","type":"SWITCH:V1","isShowing":"organization.hassocialWhatsapp"},{"label":"Show Reddit","prop":"isRedditShowing","type":"SWITCH:V1","isShowing":"organization.hasReddit"}]},{"header":"Day/Night Selector","type":"CONTAINER:V1","isShowing":{"prop":"isDayNightSelectorShowing"},"data":[{"label":"Drop Down","prop":"dayNightSelectorColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(120, 113, 108)","suggestedTextColor":"DARK"}},{"label":"Drop Down","prop":"dayNightSelectorColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(87, 83, 78)","suggestedTextColor":"LIGHT"}}]},{"header":"Call To Action","type":"CONTAINER:V1","isShowing":{"prop":"isCallToActionShowing"},"data":[{"label":"Title","prop":"callToActionTitle","type":"TEXTFIELD:V1","placeholder":"Contact"},{"label":"Go To","prop":"callToActionLink","type":"LINK_SELECTION:V1"},{"label":"Button Color","prop":"callToActionColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(228, 228, 231)","suggestedTextColor":"DARK"}},{"label":"Button Color","prop":"callToActionColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(39, 39, 42)","suggestedTextColor":"LIGHT"}}]}]}',

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
      menuJsonB: '{"menu":[{"header":"Notice","type":"CONTAINER:V1","isShowing":{"prop":"isNoticeShowing"},"data":[{"label":"Title","prop":"noticeTitle","type":"TEXTFIELD:V1","placeholder":"Important notice goes here."},{"label":"Link","prop":"noticeLink","type":"LINK_SELECTION:V1"},{"label":"Background","prop":"noticeColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(228, 228, 231)","suggestedTextColor":"DARK"}},{"label":"Background","prop":"noticeColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(39, 39, 42)","suggestedTextColor":"LIGHT"}}]},{"header":"Navigation Bar","type":"CONTAINER:V1","isShowing":{"prop":"isNavShowing"},"data":[{"label":"Background","prop":"navColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(168, 162, 158)","suggestedTextColor":"DARK"}},{"label":"Background","prop":"navColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(77, 77, 77)","suggestedTextColor":"LIGHT"}}]},{"header":"Branding","type":"CONTAINER:V1","isShowing":{"prop":"isBrandShowing"},"data":[{"label":"Show Logo","prop":"isLogoShowing","type":"SWITCH:V1","defaultValue":true},{"label":"Logo","prop":"logo","type":"MEDIA_SELECTION:V1","fileFilter":["images"]},{"label":"Show Text","prop":"isBrandTextShowing","type":"SWITCH:V1","defaultValue":true},{"label":"Text","prop":"brandText","type":"TEXTFIELD:V1","placeholder":"Your Brand"},{"label":"Link","prop":"brandLink","type":"LINK_SELECTION:V1"}]},{"header":"Social","type":"CONTAINER:V1","isShowing":{"prop":"isSocialShowing"},"data":[{"label":"Show Facebook","prop":"isFacebookShowing","type":"SWITCH:V1","isShowing":"organization.hasFacebook"},{"label":"Show 𝕏","prop":"isXShowing","type":"SWITCH:V1","isShowing":"organization.hasX"},{"label":"Show Instagram","prop":"isInstagramShowing","type":"SWITCH:V1","isShowing":"organization.hasInstagram"},{"label":"Show LinkedIn","prop":"isLinkedInShowing","type":"SWITCH:V1","isShowing":"organization.hasLinkedIn"},{"label":"Show FacebookYoutube","prop":"isYoutubeShowing","type":"SWITCH:V1","isShowing":"organization.hasYoutube"},{"label":"Show Pinterest","prop":"isPinterestShowing","type":"SWITCH:V1","isShowing":"organization.hasPinterest"},{"label":"Show socialWhatsapp","prop":"issocialWhatsappShowing","type":"SWITCH:V1","isShowing":"organization.hassocialWhatsapp"},{"label":"Show Reddit","prop":"isRedditShowing","type":"SWITCH:V1","isShowing":"organization.hasReddit"}]},{"header":"Day/Night Selector","type":"CONTAINER:V1","isShowing":{"prop":"isDayNightSelectorShowing"},"data":[{"label":"Drop Down","prop":"dayNightSelectorColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(120, 113, 108)","suggestedTextColor":"DARK"}},{"label":"Drop Down","prop":"dayNightSelectorColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(87, 83, 78)","suggestedTextColor":"LIGHT"}}]},{"header":"Call To Action","type":"CONTAINER:V1","isShowing":{"prop":"isCallToActionShowing"},"data":[{"label":"Title","prop":"callToActionTitle","type":"TEXTFIELD:V1","placeholder":"Contact"},{"label":"Go To","prop":"callToActionLink","type":"LINK_SELECTION:V1"},{"label":"Button Color","prop":"callToActionColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(228, 228, 231)","suggestedTextColor":"DARK"}},{"label":"Button Color","prop":"callToActionColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(39, 39, 42)","suggestedTextColor":"LIGHT"}}]},{"header":"Link Boxes","type":"CONTAINER:V1","isShowing":{"prop":"isLinkBoxShowing"},"data":[{"label":"Background","prop":"linkBoxColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(120, 113, 108)","suggestedTextColor":"LIGHT"}},{"label":"Background","prop":"linkBoxColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(120, 113, 108)","suggestedTextColor":"LIGHT"}}]}]}',

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
