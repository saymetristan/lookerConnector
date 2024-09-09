const axios = require('axios');

const fetchMetaData = async (since, until) => {
  const accessToken = process.env.PAGE_ACCESS_TOKEN;
  const pageId = process.env.PAGE_ID;
  const metrics = [
    'page_impressions',
    'page_engaged_users',
    'page_fans',
    'page_views_total',
    'page_posts_impressions',
    'page_posts_engagements'
  ];
  const results = {};

  for (const metric of metrics) {
    try {
      const response = await axios.get(`https://graph.facebook.com/v20.0/${pageId}/insights`, {
        params: {
          metric,
          since,
          until,
          access_token: accessToken
        }
      });
      results[metric] = response.data.data;
    } catch (error) {
      results[metric] = `Error: ${error.response ? error.response.data.error.message : error.message}`;
    }
  }

  // Fetch posts
  try {
    const postsResponse = await axios.get(`https://graph.facebook.com/v20.0/${pageId}/posts`, {
      params: {
        since,
        until,
        access_token: accessToken
      }
    });
    results['posts'] = postsResponse.data.data;
  } catch (error) {
    results['posts'] = `Error: ${error.response ? error.response.data.error.message : error.message}`;
  }

  return results;
};

module.exports = { fetchMetaData };
