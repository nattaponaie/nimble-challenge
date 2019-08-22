import * as auth from 'utils/auth';
import {
  createUrlPath, generateAuthToken, getRequest, instance, postRequest,
} from 'utils/httpHelper';

import {
  mockAccessToken,
  mockInstanceGet,
  mockInstancePost,
  mockUrlPath,
} from '/__mocks__/utils/httpHelperMock';

jest.mock('utils/jsonResolver', () => ({
  formatJson: jest.fn(() => { return { data: { data: [] } };}),
  formatResponse: jest.fn(),
}));

describe('generateAuthToken', () => {
  beforeEach(() => {
    auth.getAccessToken = jest.fn(() => mockAccessToken);
  });

  it('should return Authorization property', async () => {
    const result = await generateAuthToken();
    expect(result).toHaveProperty('Authorization');

  });
});

describe('createUrlPath', () => {
  it('should return api url path properly', () => {
    const result = createUrlPath(mockUrlPath);
    expect(result).toEqual('v1/keywords');
  });
});

describe('getRequest', () => {
  beforeEach(() => {
    instance.get = jest.fn(mockInstanceGet);
  });

  it('should return all keywords', async () => {
    const result = await getRequest('keywords');
    expect(result).toHaveProperty('data');
  });
});

describe('postRequest', () => {
  beforeEach(() => {
    instance.post = jest.fn(mockInstancePost);
  });

  it('should return status success', async () => {
    const result = await postRequest('keywords');
    expect(result).toHaveProperty('data');
  });
});
