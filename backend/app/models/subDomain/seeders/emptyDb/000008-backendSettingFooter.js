const { v4: uuidv4 } = require('uuid');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSettingFooter', [
    {
      id: uuidv4(),
      webAssetImport: "built-in/footers/lite/Entry",
      menuJsonB: '{"menu":[{"header":"Copyright","type":"CONTAINER:V1","isShowing":{"prop":"isCopyrightShowing"},"data":[{"label":"Organization","prop":"copyrightName","type":"TEXTFIELD:V1","placeholder":"Your Brand"},{"label":"Day Color","prop":"copyrightColorDay","isShowing":"isDayMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"rgb(168, 162, 158)","suggestedTextColor":"DARK"}},{"label":"Night Color","prop":"copyrightColorNight","isShowing":"isNightMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"rgb(77, 77, 77)","suggestedTextColor":"LIGHT"}}]}]}',
      userAnswersJsonB: JSON.stringify({}),

      selectionType: "BUILT_IN",
      selectionId: "5ce91223-9685-4ee7-93c2-6e38bae8804f",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {})
}

async function down({ context: queryInterface }) {
  // Not Implemented
  // User is primary user of this record, loading init data.
}

module.exports = { up, down };

