import { createBaseURL } from './';

describe('Shared Helpers', () => {
  const api = 'interviews';

  const expectedURL ='http://localhost:3001/api/v1/interviews';
  const expectedMockURL ='http://localhost:3001/mock-api/v1/interviews';

  describe('createBaseURL()', () => {
    it('should return an api for interviews', () => {
      expect(createBaseURL(api, { isMock: false })).toEqual(expectedURL);
    });

    it('should return a mock api for interviews when isMock parameter is to true', () => {
      expect(createBaseURL(api, { isMock: true })).toEqual(expectedMockURL);
    });
  });
});
