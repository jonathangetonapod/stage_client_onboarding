const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve the static HTML file
app.use(express.static('public'));

// Route to handle the form submission
app.post('/send-webhook', async (req, res) => {
    const { clientFullName, contactEmail, campaignStartDate, linkedInProfile, paymentDate } = req.body;

    const webhookData = {
        clientFullName,
        contactEmail,
        linkedInProfile,
        paymentDate
    };

    try {
        // Sending data to the provided webhook URL
        const response = await axios.post('https://getonapod.app.n8n.cloud/webhook-test/cb29ccf4-ee82-4f3b-a3d7-7c1ca6373dfc', webhookData);

        res.json({ message: 'Data sent successfully!' });
    } catch (error) {
        console.error('Error sending data to webhook:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error sending data to webhook' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});