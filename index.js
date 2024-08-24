const express = require('express');
const axios = require('axios'); // We'll use axios to send the data to the webhook
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

    // Construct the data to send to the webhook
    const webhookData = {
        clientFullName,
        contactEmail,
        campaignStartDate,
        linkedInProfile,
        paymentDate
    };

    try {
        // Send the data to the webhook URL
        const response = await axios.post('https://your-webhook-url.com', webhookData);

        // Send a response back to the client
        res.json({ message: 'Data sent successfully!' });
    } catch (error) {
        console.error('Error sending data to webhook:', error);
        res.status(500).json({ message: 'Error sending data to webhook' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});