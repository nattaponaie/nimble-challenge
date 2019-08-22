import normalize from 'json-api-normalizer';
import { formatResponse } from 'utils/jsonResolver';

// jest.mock('json-api-normalizer');

describe('jsonResolver', () => {
  describe('formatResponse', () => {
    // const mock = jest.spyOn(normalize, 'normalize');
    it('should return valid data', () => {
      const input = {
        data: {},
      };

      formatResponse(input);
      // const result = formatResponse(input);
      expect(normalize).toBeCalledWith(input.data);
    });
  });
});
