import * as auth from 'utils/auth';
import {
  createUrlPath, generateAuthToken, getRequest, instance, postRequest,
} from 'utils/httpHelper';

import {
  instanceGetMock,
  instancePostMock,
  mockAccessToken,
  urlPathMock,
} from '/__mocks__/utils/httpHelperMock';

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
    const result = createUrlPath(urlPathMock);
    expect(result).toEqual('v1/upload-file');
  });
});

describe('getRequest', () => {
  beforeEach(() => {
    instance.get = jest.fn(instanceGetMock);
  });

  it('should return all keywords', async () => {
    const result = await getRequest('upload-file');
    expect(result).toHaveProperty('data');
  });
});

describe('postRequest', () => {
  beforeEach(() => {
    instance.post = jest.fn(instancePostMock);
  });

  it('should return status success', async () => {
    const result = await postRequest('upload-file');
    expect(result).toHaveProperty('statusMsg');
    expect(result.statusMsg).toEqual('success');
  });
});
