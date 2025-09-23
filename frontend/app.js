const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000'; 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.post('/submit-form', async (req, res) => {
  const { name, email } = req.body;
  try {    
    const response = await axios.post(`${BACKEND_URL}/submit`, { name, email });    
    res.send(`
      <h2>Flask Backend Response</h2>
      <p><strong>Message:</strong> ${response.data.message}</p>
      <p><strong>Name:</strong> ${response.data.name}</p>
      <p><strong>Email:</strong> ${response.data.email}</p>
      <br/><a href="/">Go back</a>
    `);
  } catch (err) {
    console.error("Error sending data to Flask:", err.message);
    res.status(500).send("Error connecting to Flask backend: " + err.message);
  }
});
app.listen(port, () => {
  console.log(`Frontend running at http://localhost:${port}`);
  console.log(`Forwarding POSTs to BACKEND_URL=${BACKEND_URL}`);
});
