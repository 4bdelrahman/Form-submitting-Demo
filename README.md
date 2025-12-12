# 🏠 Premium Real Estate Lead Form

A professional, modern real estate lead submission form with webhook integration. Perfect for real estate agents showcasing their MVP on GitHub.

![Real Estate Form](https://img.shields.io/badge/Status-Ready-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- **🎨 Premium Design**: Modern dark theme with glassmorphism effects and smooth animations
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **✅ Smart Validation**: Real-time form validation with helpful error messages
- **🔗 Webhook Integration**: Sends form data to any webhook endpoint
- **♿ Accessible**: WCAG compliant with keyboard navigation support
- **🚀 Fast & Lightweight**: Vanilla JavaScript, no frameworks required
- **📊 Analytics Ready**: Easy integration with Google Analytics

## 🚀 Quick Start

### 1. Clone or Download

```bash
git clone https://github.com/yourusername/real-estate-leads.git
cd real-estate-leads
```

### 2. Configure Webhook

Open `script.js` and update the webhook URL on line 10:

```javascript
const CONFIG = {
    webhookUrl: 'YOUR_WEBHOOK_URL_HERE',
    // ... rest of config
};
```

### 3. Deploy to GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select your branch (usually `main`)
4. Select `/root` as the folder
5. Click "Save"

Your form will be live at: `https://yourusername.github.io/repository-name/`

## 🔗 Webhook Setup

The form can send data to any webhook service. Here are popular options:

### Option 1: Webhook.site (Testing)
1. Visit [webhook.site](https://webhook.site)
2. Copy your unique URL
3. Paste it in `script.js` as `webhookUrl`
4. Test submissions will appear on the webhook.site dashboard

### Option 2: Discord Webhook
1. Create a Discord channel
2. Go to Channel Settings → Integrations → Webhooks
3. Create a webhook and copy the URL
4. Use this URL in `script.js`

### Option 3: Zapier
1. Create a Zapier account
2. Create a new Zap with "Webhooks" as trigger
3. Get your webhook URL
4. Connect to your preferred app (Google Sheets, Email, CRM, etc.)

### Option 4: Make.com (Integromat)
1. Create a Make.com account
2. Create a new scenario
3. Use "Webhooks" module as trigger
4. Copy the webhook URL

### Option 5: n8n (Self-hosted)
1. Deploy n8n on your server
2. Create a workflow with Webhook trigger
3. Use your n8n webhook URL

## 📋 Form Fields

The form collects the following information:

- **Full Name** *(required)*
- **Email Address** *(required)*
- **Phone Number** *(required)*
- **Property Type** *(required)*: Apartment, House, Villa, Commercial, Land
- **Budget Range** *(required)*: Various price ranges
- **Preferred Location** *(required)*
- **Additional Information** *(optional)*: Free text message
- **Newsletter Subscription** *(optional)*: Checkbox

## 🎨 Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-purple: #667eea;
    --primary-violet: #764ba2;
    --accent-pink: #f857a6;
    /* ... more colors */
}
```

### Fonts

The form uses Google Fonts (Inter & Playfair Display). Change them in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet">
```

### Validation Rules

Edit validation in `script.js`:

```javascript
validation: {
    minNameLength: 2,
    phoneRegex: /your-regex/,
    emailRegex: /your-regex/
}
```

## 📊 Data Structure

Form submissions are sent as JSON:

```json
{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "propertyType": "villa",
    "budget": "500k-1m",
    "location": "Miami, FL",
    "message": "Looking for waterfront property",
    "newsletter": true,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "source": "Real Estate Lead Form"
}
```

## 🔒 Security

- Client-side validation only (server-side validation recommended)
- No sensitive data stored locally
- HTTPS recommended for production
- Sanitize data on your webhook/backend
- Consider adding reCAPTCHA for spam protection

## 🐛 Troubleshooting

### Form not submitting?
- Check browser console for errors
- Verify webhook URL is configured
- Test webhook URL with curl or Postman
- Check CORS settings on your webhook endpoint

### Styling issues?
- Clear browser cache
- Check for CSS conflicts
- Verify Google Fonts are loading

### Mobile layout problems?
- Test with Chrome DevTools responsive mode
- Check viewport meta tag is present
- Verify responsive breakpoints in CSS

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE11 (not supported)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this for your projects!

## 🙏 Credits

- Design inspiration from modern web trends
- Icons from custom SVG implementations
- Fonts from Google Fonts

## 📞 Support

If you have questions or need help:
- Open an issue on GitHub
- Check the [FAQ section](#faq)
- Review the code comments

## 🎯 Roadmap

- [ ] Add reCAPTCHA integration
- [ ] Multi-step form option
- [ ] File upload for documents
- [ ] Email confirmation system
- [ ] Admin dashboard integration
- [ ] Multi-language support

## 💡 Tips for Real Estate Agents

1. **Test thoroughly** before sharing with clients
2. **Monitor submissions** regularly via your webhook
3. **Respond quickly** to leads (within 24 hours)
4. **Customize** the form to match your brand
5. **Add analytics** to track conversion rates
6. **Use professional** email for follow-ups
7. **Consider** integrating with your CRM

---

Made with ❤️ for Real Estate Professionals

**⭐ Star this repo if you found it helpful!**
