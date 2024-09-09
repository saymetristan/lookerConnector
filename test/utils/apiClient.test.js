const apiClient = require('../../src/utils/apiClient');

describe('apiClient', () => {
  it('should be configured with the correct baseURL', () => {
    expect(apiClient.defaults.baseURL).toBe('https://graph.facebook.com/v20.0');
  });

  it('should have a timeout of 10000ms', () => {
    expect(apiClient.defaults.timeout).toBe(10000);
  });
});
