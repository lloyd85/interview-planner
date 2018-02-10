import API from './API';

describe('Shared Helpers', () => {
  describe('API', () => {
    it('should return an api for interviews', () => {
      const service = new API().get({ url: 'url', params: { name: 'Joe Bloggs' } }, { testMode: true });

      expect(service).toEqual({
        method: 'get',
        url: 'url',
        params: { name: 'Joe Bloggs' },
      });
    });

    it('should return an api for interviews', () => {
      const service = new API().post({ url: 'url', data: { id: 123 }, token: 'token' }, { testMode: true });

      expect(service).toEqual({
        method: 'post',
        url: 'url',
        data: { id: 123 },
        token: 'token',
        headers: { Authorization: 'Bearer token' },
      });
    });
  });
});
