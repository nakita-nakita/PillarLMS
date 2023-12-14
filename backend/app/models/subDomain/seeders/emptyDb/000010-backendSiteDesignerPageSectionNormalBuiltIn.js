const { PageSectionEnum } = require('../../backend/siteDesigner/page/backendSiteDesignerPageSectionNormalBuiltIn.model');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSiteDesignerPageSectionNormalBuiltIn', [
    
    {
      id: "f3c9ba04-9e0e-49ac-967e-e001eaecc1e6",
      webAssetImport: "built-in/sections/sectionHeader/Entry",
      menuJsonB: '{}',

      description: `Section header description`,
      category: PageSectionEnum.TEXT,
      
      author: "built-in",
      authorLink: null,

      name: "Section Header",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "54b81136-ecb3-414c-8c81-c3fadf7e9814",
      webAssetImport: "built-in/sections/imageWithParagraph/Entry",
      menuJsonB: '{}',

      description: `Half Image Half Paragraph description`,
      category: PageSectionEnum.IMAGE,
      
      author: "built-in",
      authorLink: null,

      name: "Half Image Half Paragraph",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "06ff77c2-9488-402e-aa8a-8b9afb683147",
      webAssetImport: "built-in/sections/cardList/Entry",
      menuJsonB: '{}',

      description: `Card list description`,
      category: PageSectionEnum.LIST,
      
      author: "built-in",
      authorLink: null,

      name: "Card List",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "f781f5f3-3007-4550-98b2-7283c879eb07",
      webAssetImport: "built-in/sections/imageGallery/Entry",
      menuJsonB: '{}',

      description: `Gallery description`,
      category: PageSectionEnum.IMAGE,
      
      author: "built-in",
      authorLink: null,

      name: "Gallery",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "a44c6e90-657b-43b6-b50a-50c74ae01050",
      webAssetImport: "built-in/sections/paragraph/Entry",
      menuJsonB: '{}',

      description: `Journal description`,
      category: PageSectionEnum.TEXT,
      
      author: "built-in",
      authorLink: null,

      name: "Journal",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "85544159-94ec-4cda-a4b4-ee35670d1167",
      webAssetImport: "built-in/sections/qna/Entry",
      menuJsonB: '{}',

      description: `Question and answers description.`,
      category: PageSectionEnum.LIST,
      
      author: "built-in",
      authorLink: null,

      name: "Question And Answers",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "747c3d96-88f7-48b0-aa9b-7ca771313dd0",
      webAssetImport: "built-in/sections/testimonials/Entry",
      menuJsonB: '{}',

      description: `Testimonials description`,
      category: PageSectionEnum.LIST,
      
      author: "built-in",
      authorLink: null,

      name: "Testimonials",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3b2e3390-e70b-4735-8472-ecd15eac0217",
      webAssetImport: "built-in/sections/topThreeHighlights/Entry",
      menuJsonB: '{}',

      description: `Top three highlights description`,
      category: PageSectionEnum.LIST,
      
      author: "built-in",
      authorLink: null,

      name: "Top Three Highlights",

      //standard
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    
  ], {})
}

async function down({ context: queryInterface }) {
  // await queryInterface.bulkDelete('backendSiteDesignerPageSectionNormalBuiltIn', {
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
