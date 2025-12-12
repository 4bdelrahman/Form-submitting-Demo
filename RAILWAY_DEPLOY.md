# 🚂 Deploying to Railway

This project is now configured as a **Node.js Application**, which makes it much more robust and solves all CORS issues with webhooks!

## 🚀 How to Deploy

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Convert to Node.js app for Railway deployment"
   git push origin main
   ```

2. **Go to Railway** (railway.app)
   - Click **"New Project"**
   - Select **"Deploy from GitHub repo"**
   - Select your repository: `Form-submitting-Demo`
   - Click **"Deploy Now"**

3. **That's it!** 
   - Railway will automatically detect `package.json`
   - It will install dependencies and start `server.js`
   - Your site will be live at a URL like: `https://web-production-1234.up.railway.app`

## 🔗 Configuring the Webhook

By default, the server is configured to send data to your Railway n8n webhook:
`https://primary-production-7ebad.up.railway.app/webhook-test/a52ea4b2-252b-422e-8382-16584169b3a5`

**To change this:**
1. Open `server.js`
2. Update the `WEBHOOK_URL` constant at the top
3. Commit and push the changes

## 🛠️ Why this is better than GitHub Pages?

1. **No CORS Issues**: The server handles the webhook request, so browsers won't block it.
2. **Hidden Webhook URL**: Your actual webhook URL is hidden in the server code (users can't see it in "Inspect Element").
3. **Better Security**: You can add API keys or validation on the server side if needed.
