const { fetchMetaData } = require('../../src/services/metaService');
const axios = require('axios');

jest.mock('axios');

describe('fetchMetaData', () => {
  it('should return data for each metric from Meta API', async () => {
    const data = { data: [{ metric: 'page_impressions', value: 100 }] };
    axios.get.mockResolvedValue({ data });

    const result = await fetchMetaData('2023-01-01', '2023-01-31');

    expect(result).toHaveProperty('page_impressions');
    expect(result).toHaveProperty('page_engaged_users');
    expect(result).toHaveProperty('page_fans');
    expect(result).toHaveProperty('page_views_total');
    expect(result).toHaveProperty('page_posts_impressions');
    expect(result).toHaveProperty('page_posts_engagements');
    expect(result).toHaveProperty('posts');
  });

  it('should return error message for invalid metric', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching data from Meta API'));

    const result = await fetchMetaData('2023-01-01', '2023-01-31');

    expect(result.page_impressions).toMatch(/Error/);
  });
});
