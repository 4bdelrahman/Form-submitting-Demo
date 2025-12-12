const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Enable JSON parsing
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

// Your n8n Webhook URL (from Railway)
const WEBHOOK_URL = 'https://primary-production-7ebad.up.railway.app/webhook-test/a52ea4b2-252b-422e-8382-16584169b3a5';

// Serve the form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Proxy endpoint: Browser sends to HERE, this server sends to n8n
app.post('/api/submit', async (req, res) => {
    try {
        console.log('Received form data:', req.body);

        // Forward data to n8n (Server-to-Server)
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        if (response.ok) {
            res.json({ success: true, message: 'Forwarded to n8n successfully' });
        } else {
            console.error('n8n error:', response.status);
            res.status(500).json({ success: false, message: 'Webhook error' });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
