import { head } from 'lodash';

import {
   mockCsvData,
mockGetResponse,
  mockPostResponse,
} from '/__mocks__/services/keywordsServiceMock';
import {
 getKeywords, postKeywords,
} from '/services/keywordsService';
import * as httpHelper from '/utils/httpHelper';

describe('getKeywords', () => {
  beforeEach(() => {
    httpHelper.getRequest = jest.fn(() => mockGetResponse);
  });

  it('should return all keywords list', async () => {
    const result = await getKeywords();
    const firstKeyword = head(result);

    expect(httpHelper.getRequest).toBeCalled();
    expect(firstKeyword.keyword).toEqual('Google');
    expect(firstKeyword.totalAdwords).toBe(3);
    expect(firstKeyword.totalLinks).toBe(10);
    expect(firstKeyword.totalResults).toBe(12000);
  });
});

describe('postKeyword', () => {
  beforeEach(() => {
    httpHelper.postRequest = jest.fn(() => mockPostResponse);
  });

  it('should status success', async () => {
    const result = await postKeywords(mockCsvData);
    expect(httpHelper.postRequest).toBeCalled();
    expect(result.statusMsg).toEqual('success');
  });
});
