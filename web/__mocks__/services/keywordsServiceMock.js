const mockGetResponse = {
  data: [
    { 
      id: 1,
      attributes: {
        "keyword": "Google",
        "html-code": null,
        "is-searched": true,
        "total-adwords": 3,
        "total-links": 10,
        "total-results": 12000
      }
    },
    { 
      id: 2,
      attributes: {
        "keyword": "Grab",
        "html-code": null,
        "is-searched": true,
        "total-adwords": 2,
        "total-links": 8,
        "total-results": 120000
      }
    }
  ]
};

const mockCsvData = ["Keyword", "Food", "Taxi", "Grab", "Google"];
const mockPostResponse = { "statusMsg": "success"};

export {
  mockGetResponse,
  mockCsvData,
  mockPostResponse,
};
