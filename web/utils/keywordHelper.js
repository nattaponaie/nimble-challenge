export const generateKeyword = (keywordData) => {
  return keywordData.map(keyword => {
    const t = {
      key: keyword,
      keyword,
      totalAdwords: 0,
      totalLinks: 0,
      totalResults: 0,
    };
    return t;
  });
};
