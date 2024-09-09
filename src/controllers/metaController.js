const { fetchMetaData } = require('../services/metaService');

const getMetaData = async (req, res) => {
  const { since, until } = req.query;

  try {
    const data = await fetchMetaData(since, until);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Meta API:', error);
    res.status(500).json({ error: 'Error fetching data from Meta API' });
  }
};

module.exports = { getMetaData };
