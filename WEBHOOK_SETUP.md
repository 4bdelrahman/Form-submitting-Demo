# 🔗 Webhook Setup Guide

## Quick Setup (5 minutes)

### Step 1: Choose a Webhook Service

I recommend starting with **Webhook.site** for testing, then moving to a production service.

---

## 🧪 Option 1: Webhook.site (FREE - Best for Testing)

**Perfect for**: Testing, debugging, seeing what data is sent

1. Go to https://webhook.site
2. You'll see a unique URL like: `https://webhook.site/12345678-abcd-efgh-ijkl-mnopqrstuvwx`
3. Copy this URL
4. Open `script.js` in your code editor
5. Replace line 10:
   ```javascript
   webhookUrl: 'https://webhook.site/YOUR-UNIQUE-URL',
   ```
6. Save the file
7. Test the form - you'll see submissions appear on webhook.site!

**Pros**: 
- ✅ Free
- ✅ Instant setup
- ✅ See data in real-time
- ✅ Great for testing

**Cons**:
- ❌ Data not stored permanently
- ❌ Not suitable for production

---

## 📊 Option 2: Google Sheets via Zapier (Recommended for Production)

**Perfect for**: Storing leads in a spreadsheet, easy to manage

### Setup:

1. **Create Zapier Account** (Free tier available)
   - Go to https://zapier.com
   - Sign up for free account

2. **Create a New Zap**
   - Click "Create Zap"
   - Search for "Webhooks by Zapier"
   - Choose "Catch Hook" as trigger
   - Click "Continue"

3. **Get Your Webhook URL**
   - Zapier will show you a webhook URL
   - Copy it (looks like: `https://hooks.zapier.com/hooks/catch/12345/abcdef/`)

4. **Configure Your Form**
   - Open `script.js`
   - Update line 10 with your Zapier webhook URL

5. **Test the Webhook**
   - Submit a test form
   - Go back to Zapier
   - Click "Test trigger" - you should see your submission

6. **Connect to Google Sheets**
   - Click "Continue"
   - Search for "Google Sheets"
   - Choose "Create Spreadsheet Row"
   - Connect your Google account
   - Map the fields:
     - Full Name → Column A
     - Email → Column B
     - Phone → Column C
     - Property Type → Column D
     - Budget → Column E
     - Location → Column F
     - Message → Column G
     - Newsletter → Column H
     - Timestamp → Column I

7. **Turn On Your Zap**
   - Click "Publish"
   - Your form is now live!

**Pros**:
- ✅ Free tier (100 tasks/month)
- ✅ Auto-saves to Google Sheets
- ✅ Can add email notifications
- ✅ Reliable and scalable

---

## 🎨 Option 3: Discord Webhook (FREE)

**Perfect for**: Real-time notifications, team collaboration

### Setup:

1. **Create Discord Server** (if you don't have one)
   - Open Discord
   - Click "+" to add a server
   - Name it "Real Estate Leads"

2. **Create Webhook**
   - Right-click your channel
   - Edit Channel
   - Integrations → Webhooks
   - Click "New Webhook"
   - Name it "Lead Form"
   - Copy webhook URL

3. **Format for Discord**
   - Open `script.js`
   - Find the `sendToWebhook` function (around line 169)
   - Replace with this code:

```javascript
async sendToWebhook(data) {
    if (CONFIG.webhookUrl === 'YOUR_WEBHOOK_URL_HERE') {
        console.warn('Webhook URL not configured');
        console.log('Form data:', data);
        return { success: true, message: 'Demo mode' };
    }

    // Format for Discord
    const discordPayload = {
        embeds: [{
            title: "🏠 New Real Estate Lead",
            color: 6724862, // Purple color
            fields: [
                { name: "👤 Name", value: data.fullName, inline: true },
                { name: "📧 Email", value: data.email, inline: true },
                { name: "📞 Phone", value: data.phone, inline: true },
                { name: "🏘️ Property Type", value: data.propertyType, inline: true },
                { name: "💰 Budget", value: data.budget, inline: true },
                { name: "📍 Location", value: data.location, inline: true },
                { name: "💬 Message", value: data.message || "No message", inline: false },
                { name: "📰 Newsletter", value: data.newsletter ? "Yes" : "No", inline: true },
            ],
            timestamp: data.timestamp,
            footer: { text: "Real Estate Lead Form" }
        }]
    };

    try {
        const response = await fetch(CONFIG.webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        return {
            success: true,
            message: 'Your inquiry has been submitted successfully!'
        };
    } catch (error) {
        console.error('Webhook error:', error);
        throw new Error('Failed to submit form. Please try again.');
    }
}
```

4. **Update webhook URL** in line 10 with your Discord URL

**Pros**:
- ✅ Completely free
- ✅ Real-time notifications
- ✅ Mobile app alerts
- ✅ Good for teams

---

## 📧 Option 4: Email via Make.com (Integromat)

**Perfect for**: Getting emails for each lead

### Setup:

1. **Create Make.com Account**
   - Go to https://make.com
   - Sign up (free tier: 1,000 operations/month)

2. **Create New Scenario**
   - Click "Create a new scenario"
   - Click "+" to add a module
   - Search for "Webhooks"
   - Choose "Custom webhook"

3. **Create Webhook**
   - Click "Add"
   - Name it "Real Estate Leads"
   - Copy the webhook URL

4. **Add Email Module**
   - Click "+" after webhook
   - Search for "Email"
   - Choose "Send an email"
   - Configure:
     - To: your@email.com
     - Subject: "New Lead: {{fullName}}"
     - Body: Use the webhook data fields

5. **Update Your Form**
   - Paste webhook URL in `script.js` line 10
   - Save and test

**Pros**:
- ✅ Free tier available
- ✅ Email notifications
- ✅ Can connect to 1000+ apps
- ✅ Visual workflow builder

---

## 🚀 Option 5: Your Own Server (Advanced)

**Perfect for**: Full control, custom processing

### Quick Node.js Example:

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/webhook', (req, res) => {
    const leadData = req.body;
    console.log('New lead:', leadData);
    
    // Save to database, send email, etc.
    
    res.json({ success: true });
});

app.listen(3000, () => {
    console.log('Webhook listening on port 3000');
});
```

Then use: `http://your-server.com:3000/webhook`

---

## 🎯 Recommended Workflow for GitHub Hosting

1. **Testing Phase**:
   - Use Webhook.site to verify form works
   - Test all fields and validations

2. **Production Setup**:
   - Set up Zapier → Google Sheets
   - Add email notifications
   - Configure auto-responses

3. **Deploy to GitHub Pages**:
   - Push code to GitHub
   - Enable GitHub Pages
   - Share your form URL

---

## 🔒 Security Tips

1. **Never commit secrets** - Don't push webhook URLs with tokens to public repos
2. **Use environment variables** for sensitive data
3. **Add rate limiting** on your webhook endpoint
4. **Validate data** on the server side
5. **Consider adding reCAPTCHA** to prevent spam

---

## 🆘 Troubleshooting

### "Failed to submit form"
- Check webhook URL is correct
- Verify no typos in URL
- Test webhook with curl:
  ```bash
  curl -X POST your-webhook-url -H "Content-Type: application/json" -d '{"test": "data"}'
  ```

### "CORS Error"
- Your webhook must allow CORS from your domain
- Zapier/Make.com handle this automatically
- For custom servers, add CORS headers

### "Webhook not receiving data"
- Open browser console (F12)
- Submit form
- Check Network tab for errors
- Verify webhook URL configuration

---

## 📞 Need Help?

- Check the main README.md
- Review console errors (F12 in browser)
- Test with Webhook.site first
- Check that JavaScript is enabled

---

**Ready to go live? Choose a webhook service above and you'll be collecting leads in minutes!** 🎉
