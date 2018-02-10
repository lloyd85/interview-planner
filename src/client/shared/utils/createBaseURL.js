const createBaseURL = (apiName, isMock = { isMock: true }) => {
  const port = 3001;
  const location = 'localhost';
  const baseURL = `http://${location}:${port}`;
  const apiType = isMock.isMock ? 'mock-api' : 'api';
  const apiVersion = `v${1}`;

  return [baseURL, apiType, apiVersion, apiName].join('/');
};

export default createBaseURL;
