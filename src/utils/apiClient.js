const axios = require('axios');

const apiClient = axios.create({
  baseURL: 'https://graph.facebook.com/v20.0',
  timeout: 10000,
});

module.exports = apiClient;
