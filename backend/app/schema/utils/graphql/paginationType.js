const paginationType = (paginationTypeName, mainType) => {
  return `
    type ${paginationTypeName} {
      count: Int
      page: Int
      pageSize: Int
      pageCount: Int
      rows: [${mainType}]
    }
  `;
};

module.exports = {
  paginationType
}
