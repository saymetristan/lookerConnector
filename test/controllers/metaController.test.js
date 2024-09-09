const { getMetaData } = require('../../src/controllers/metaController');
const axios = require('axios');
const httpMocks = require('node-mocks-http');

jest.mock('axios');

describe('getMetaData', () => {
  it('should return data from Meta API', async () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/meta-data',
      query: {
        since: '2023-01-01',
        until: '2023-01-31'
      }
    });
    const res = httpMocks.createResponse();
    const data = { data: [{ metric: 'page_impressions', value: 100 }] };
    axios.get.mockResolvedValue({ data });

    await getMetaData(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(data.data);
  });

  it('should handle errors', async () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/meta-data',
      query: {
        since: '2023-01-01',
        until: '2023-01-31'
      }
    });
    const res = httpMocks.createResponse();
    axios.get.mockRejectedValue(new Error('Error fetching data from Meta API'));

    await getMetaData(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({ error: 'Error fetching data from Meta API' });
  });
});
