const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle webhook submission
app.post('/send-webhook', (req, res) => {
    const data = req.body;
    const webhookUrl = 'YOUR_WEBHOOK_URL'; // Replace with your actual webhook URL

    axios.post(webhookUrl, data)
        .then(response => {
            res.status(200).json({ message: 'Webhook sent successfully' });
        })
        .catch(error => {
            res.status(500).json({ message: 'Failed to send webhook' });
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});