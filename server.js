// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const initiateStkPush = require('./stkPush');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/mpesa/stk-push', async (req, res) => {
  const { userId, amount, phoneNumber, description } = req.body;
  try {
    const result = await initiateStkPush(phoneNumber, amount, description);
    return res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    return res.status(500).json({ status: 'failed', error: error.message });
  }
});

app.listen(3001, () => console.log('M-Pesa server running on port 3001'));

