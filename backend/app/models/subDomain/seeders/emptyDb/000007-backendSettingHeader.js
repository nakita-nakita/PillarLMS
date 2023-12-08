const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSettingHeader', [
    {
      id: uuidv4(),
      webAssetImport: "built-in/headers/lite/Entry",
      menuJsonB: '{"menu":[{"header":"Notice","type":"CONTAINER:V1","isShowing":{"prop":"isNoticeShowing"},"data":[{"label":"Title","prop":"noticeTitle","type":"TEXTFIELD:V1","placeholder":"Important notice goes here."},{"label":"Link","prop":"noticeLink","type":"LINK_SELECTION:V1"},{"label":"Background","prop":"noticeColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(228, 228, 231)","suggestedTextColor":"DARK"}},{"label":"Background","prop":"noticeColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(39, 39, 42)","suggestedTextColor":"LIGHT"}}]},{"header":"Navigation Bar","type":"CONTAINER:V1","isShowing":{"prop":"isNavShowing"},"data":[{"label":"Background","prop":"navColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(168, 162, 158)","suggestedTextColor":"DARK"}},{"label":"Background","prop":"navColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(77, 77, 77)","suggestedTextColor":"LIGHT"}}]},{"header":"Branding","type":"CONTAINER:V1","isShowing":{"prop":"isBrandShowing"},"data":[{"label":"Show Logo","prop":"isLogoShowing","type":"SWITCH:V1","defaultValue":true},{"label":"Logo","prop":"logo","type":"MEDIA_SELECTION:V1","fileFilter":["images"]},{"label":"Show Text","prop":"isBrandTextShowing","type":"SWITCH:V1","defaultValue":true},{"label":"Text","prop":"brandText","type":"TEXTFIELD:V1","placeholder":"Your Brand"},{"label":"Link","prop":"brandLink","type":"LINK_SELECTION:V1"}]},{"header":"Day/Night Selector","type":"CONTAINER:V1","isShowing":{"prop":"isDayNightSelectorShowing"},"data":[{"label":"Drop Down","prop":"dayNightSelectorColorDay","type":"COLOR_SELECTION:V1","isShowing":"isDayMode","defaultValue":{"color":"rgb(120, 113, 108)","suggestedTextColor":"DARK"}},{"label":"Drop Down","prop":"dayNightSelectorColorNight","type":"COLOR_SELECTION:V1","isShowing":"isNightMode","defaultValue":{"color":"rgb(87, 83, 78)","suggestedTextColor":"LIGHT"}}]}]}',
      userAnswersJsonB: JSON.stringify({}),

      selectionType: "BUILT_IN",
      selectionId: "5ce91223-9685-4ee7-93c2-6e38bae8804f",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {})
}

async function down({ context: queryInterface }) {
  // Not Implemented
  // User is primary user of this record, loading init data.
}

module.exports = { up, down };
