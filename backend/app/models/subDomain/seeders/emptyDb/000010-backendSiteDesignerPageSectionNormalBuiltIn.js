const { PageSectionEnum } = require('../../backend/siteDesigner/page/backendSiteDesignerPageSectionNormalBuiltIn.model');

async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert('backendSiteDesignerPageSectionNormalBuiltIn', [
    
    {
      id: "f3c9ba04-9e0e-49ac-967e-e001eaecc1e6",
      webAssetImport: "built-in/sections/sectionHeader/Entry",
      menuJsonB: '{"menu":[{"header":"Section Header","type":"CONTAINER:V1","isShowing":{"prop":"isShowing"},"data":[{"label":"Header","prop":"header","type":"TEXTFIELD:V1","placeholder":"Empower Your Business Growth"},{"label":"Day Color","prop":"backgroundColorDay","isShowing":"isDayMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"rgb(238, 238, 238)","suggestedTextColor":"DARK"}},{"label":"Night Color","prop":"backgroundColorNight","isShowing":"isNightMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"rgb(31, 41, 55)","suggestedTextColor":"LIGHT"}}]}]}',

      description: `This component is a standout choice for your website's section headers, offering an excellent blend of clean and modern design. With its centered and responsive layout, it guarantees a visually pleasing display on a variety of devices. This ensures a seamless and engaging user experience, making it an ideal option for creating visually appealing and well-structured sections on your website.`,
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
      webAssetImport: "built-in/sections/halfImageHalfParagraph/Entry",
      menuJsonB: '{"menu":[{"header":"Half Image Half Paragraph","type":"CONTAINER:V1","isShowing":{"prop":"isShowing"},"data":[{"label":"isRightSide","defaultValue":{"value":false},"prop":"Is image on the right side?","type":"SWITCH:V1"},{"label":"Image","prop":"image","type":"MEDIA_SELECTION:V1","fileFilter":["images"]},{"label":"Header","prop":"header","type":"TEXTFIELD:V1","placeholder":"Empower Your Business Growth"},{"label":"Description","prop":"description","type":"WYSIWYG:V1","placeholder":"Take your small business to new heights by exploring innovative ideas and strategies. Our media collection provides insights to inspire and guide your journey forward."},{"label":"Day Color","prop":"backgroundColorDay","isShowing":"isDayMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"rgb(238, 238, 238)","suggestedTextColor":"DARK"}},{"label":"Night Color","prop":"backgroundColorNight","isShowing":"isNightMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"rgb(31, 41, 55)","suggestedTextColor":"LIGHT"}}]}]}',

      description: `This component presents a captivating combination of a bold headline, informative text, and a gorgeous image that grabs attention and adds visual interest. You can choose whether the image appears on the left or right, creating flexibility for your website layout.`,
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
      menuJsonB: '{"menu":[{"header":"Header","type":"CONTAINER:V1","isShowing":{"prop":"isHeaderShowing"},"data":[{"label":"Header","prop":"header","type":"TEXTFIELD:V1","placeholder":"Card List"},{"label":"Description","prop":"description","type":"WYSIWYG:V1","placeholder":"Discover our featured cards, each showcasing unique aspects of our offerings. Explore the details and find the perfect fit for your needs."},{"label":"Day Color","prop":"backgroundColorDay","isShowing":"isDayMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"rgb(238, 238, 238)","suggestedTextColor":"DARK"}},{"label":"Night Color","prop":"backgroundColorNight","isShowing":"isNightMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"rgb(31, 41, 55)","suggestedTextColor":"LIGHT"}}]}]}',

      description: `These cards aren't just information, they're vibrant invitations to experience the magic of your small business. Each card is a miniature window, whispering promises of the unique offerings within, beckoning customers to step inside and explore. With just a glance, they're captivated, drawn deeper by the stories etched in every detail. And before they know it, they're inspired to share the experience, spreading the joy of your small business like ripples in a pond, reaching friends, family, and beyond.`,
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
      webAssetImport: "built-in/sections/gallery/Entry",
      menuJsonB: '{"menu":[{"header":"Gallery","type":"CONTAINER:V1","isShowing":{"prop":"isShowing"},"data":[{"label":"Header","prop":"header","type":"TEXTFIELD:V1","placeholder":"Questions and Answers"},{"label":"Description","prop":"description","type":"WYSIWYG:V1","placeholder":"Take your small business to new heights by exploring innovative ideas and strategies. Our media collection provides insights to inspire and guide your journey forward."},{"label":"Day Color","prop":"backgroundColorDay","isShowing":"isDayMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"rgb(238, 238, 238)","suggestedTextColor":"DARK"}},{"label":"Night Color","prop":"backgroundColorNight","isShowing":"isNightMode","type":"COLOR_SELECTION:V1","defaultValue":{"color":"rgb(31, 41, 55)","suggestedTextColor":"LIGHT"}}]}]}',

      description: `This component invites users to explore a curated collection of captivating images. Each thumbnail represents a larger, high-resolution version waiting to be unveiled. Clicking on any image triggers a dynamic lightbox effect, immersing you in the full beauty of the chosen picture. Get lost in the visual journey, one click at a time!`,
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
      webAssetImport: "built-in/sections/journal/Entry",
      menuJsonB: '{}',

      description: `This section beckons you to embark on a voyage of discovery, not through exotic lands or hidden coves, but through the ever-shifting currents of the trendosphere. Imagine a sleek, modern map, meticulously crafted by experts, revealing the hottest topics and insights, just waiting to be unearthed.`,
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

      description: `This isn't just an FAQ section, it's a treasure trove of wisdom, waiting to be unlocked. Each question is a key to hidden knowledge, and with a click, you'll unleash a cascade of insights. Dive deep into the ocean of answers, curated to empower your small business journey.`,
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

      description: `This component is easily customizable, enabling you to showcase user feedback in a compelling and interactive manner. Tailor it to align with your website's aesthetics, ensuring that testimonials seamlessly integrate into your overall design scheme. The adaptability of this feature allows for a unique and engaging showcase of user experiences, building trust and credibility. Whether you prefer a sleek modern look or a vibrant dynamic display, customization options empower you to create a testimonials section that resonates with your brand identity.`,
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

      description: `Discover the essence of excellence through our Top Three Highlights. Crafted to go beyond meeting your needs, these highlights epitomize our commitment to delivering exceptional quality and service. Uncover the reasons that set us apart and make us the optimal choice for your requirements.`,
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
