export const mockGetResponse = {
  keyword: [
    {
      id: 1,
      keywordName: 'Google',
      userId: 1,
      report: {},
    },
    {
      id: 2,
      keywordName: 'Grab',
      userId: 1,
      report: {},
    },
  ],
  report: [
    {
      id: 1,
      totalAdwords: 3,
      totalLinks: 10,
      totalResults: 12000,
    },
    {
      id: 2,
      totalAdwords: 3,
      totalLinks: 10,
      totalResults: 1023323,
    },
  ],
};

export const mockCsvData = ['Keyword', 'Food', 'Taxi', 'Grab', 'Google'];
export const mockPostResponse = { statusMsg: 'success' };
