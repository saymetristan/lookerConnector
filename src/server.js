require('dotenv').config();
const express = require('express');
const metaRoutes = require('./routes/metaRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', metaRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
