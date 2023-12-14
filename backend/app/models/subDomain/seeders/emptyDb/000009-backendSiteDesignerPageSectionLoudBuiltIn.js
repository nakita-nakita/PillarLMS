const { v4: uuidv4 } = require('uuid');
const { LoudSectionEnum } = require('../../backend/siteDesigner/page/backendSiteDesignerPageSectionLoudBuiltIn.model');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSiteDesignerPageSectionLoudBuiltIn', [
    {
      id: "a3cf9afa-262a-4c82-b290-f35e6eafca9d",
      webAssetImport: "built-in/loud/homepage/gifIntro/Entry",
      // menuJsonB: '{"menu":[{"header":"Notice","type":"CONTAINER:V1","isShowing":{"prop":"isNoticeShowing"},"data":[{"label":"Title","prop":"noticeTitle","type":"TEXTFIELD:V1","placeholder":"Important notice goes here."},{"label":"Link","prop":"noticeLink","type":"LINK_SELECTION:V1"},{"label":"Background","prop":"noticeColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(228, 228, 231)","suggestedTextColor":"DARK"}},{"label":"Background","prop":"noticeColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(39, 39, 42)","suggestedTextColor":"LIGHT"}}]},{"header":"Navigation Bar","type":"CONTAINER:V1","isShowing":{"prop":"isNavShowing"},"data":[{"label":"Background","prop":"navColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(168, 162, 158)","suggestedTextColor":"DARK"}},{"label":"Background","prop":"navColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(77, 77, 77)","suggestedTextColor":"LIGHT"}}]},{"header":"Branding","type":"CONTAINER:V1","isShowing":{"prop":"isBrandShowing"},"data":[{"label":"Show Logo","prop":"isLogoShowing","type":"SWITCH:V1","defaultValue":true},{"label":"Logo","prop":"logo","type":"MEDIA_SELECTION:V1","fileFilter":["images"]},{"label":"Show Text","prop":"isBrandTextShowing","type":"SWITCH:V1","defaultValue":true},{"label":"Text","prop":"brandText","type":"TEXTFIELD:V1","placeholder":"Your Brand"},{"label":"Link","prop":"brandLink","type":"LINK_SELECTION:V1"}]},{"header":"Day/Night Selector","type":"CONTAINER:V1","isShowing":{"prop":"isDayNightSelectorShowing"},"data":[{"label":"Drop Down","prop":"dayNightSelectorColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(120, 113, 108)","suggestedTextColor":"DARK"}},{"label":"Drop Down","prop":"dayNightSelectorColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(87, 83, 78)","suggestedTextColor":"LIGHT"}}]}]}',
      menuJsonB: '{}',

      description: `Gif intro description`,
      category: LoudSectionEnum.HOMEPAGE,

      author: "built-in",
      authorLink: null,

      name: "Gif/Image Intro",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "53cbae07-d8ec-4376-a178-665f912a43c0",
      webAssetImport: "built-in/loud/homepage/youtubeVideoIntro/Entry",
      menuJsonB: '{}',

      description: `Youtube Video intro description`,
      category: LoudSectionEnum.HOMEPAGE,
      
      author: "built-in",
      authorLink: null,

      name: "Youtube Video Intro",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "a2c6cbfc-8ce9-420c-ace0-e2a2cc2da526",
      webAssetImport: "built-in/loud/homepage/vimeoVideoIntro/Entry",
      menuJsonB: '{}',

      description: `Vimeo Video intro description`,
      category: LoudSectionEnum.HOMEPAGE,
      
      author: "built-in",
      authorLink: null,

      name: "Vimeo Video Intro",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "1029c4c4-9591-4c4e-8681-ceda9be19c3b",
      webAssetImport: "built-in/loud/homepage/basicCta/Entry",
      menuJsonB: '{}',

      description: `Call to action description`,
      category: LoudSectionEnum.HOMEPAGE,
      
      author: "built-in",
      authorLink: null,

      name: "Basic Call-to-Action",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2401e702-a728-416e-9a6e-40e591d23ae3",
      webAssetImport: "built-in/loud/normalpage/pageHeader/Entry",
      menuJsonB: '{}',

      description: `Page header description`,
      category: LoudSectionEnum.NORMALPAGE,
      
      author: "built-in",
      authorLink: null,

      name: "Page Header",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "85f5c249-8690-4d7e-8148-0b1682962e0f",
      webAssetImport: "built-in/loud/normalpage/socialMediaCover/Entry",
      menuJsonB: '{}',

      description: `Social media cover description.`,
      category: LoudSectionEnum.NORMALPAGE,
      
      author: "built-in",
      authorLink: null,

      name: "Social Media Cover",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {})
}

async function down({ context: queryInterface }) {
  // await queryInterface.bulkDelete('backendSettingHeaderBuiltIn', {
  //   [Op.or]: [
  //     {
  //       webAssetImport: "built-in/headers/lite/Entry",
  //     },
  //     {
  //       webAssetImport: "built-in/headers/smallBusinessFewPages/Entry",
  //     },
  //     {
  //       webAssetImport: "built-in/headers/smallBusinessManyPages/Entry",
  //     },
  //   ]
  // });
}

module.exports = { up, down };
