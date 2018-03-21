import authHeader from './authHeader';

describe('Shared Helpers: authHeader', () => {
  const token = 'token';
  const expected = { Authorization: `Bearer ${token}` };

  it('should return header with token bearer', () => {
    expect(authHeader(token)).toEqual(expected);
  });
});
