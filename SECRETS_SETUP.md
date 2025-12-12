# 🔒 GitHub Repository Secret Setup

## Quick Setup (3 Steps)

### Step 1: Add Repository Secret

1. Go to: https://github.com/4bdelrahman/Form-submitting-Demo/settings/secrets/actions

2. Click **"New repository secret"**

3. Fill in:
   - **Name:** `WEBHOOK_URL`
   - **Secret:** `https://webhook.site/b06044e5-3873-47b1-8f6e-cb56d4bb5d49`

4. Click **"Add secret"**

---

### Step 2: Enable GitHub Actions for Pages

1. Go to: https://github.com/4bdelrahman/Form-submitting-Demo/settings/pages

2. Under **"Build and deployment":**
   - **Source:** Select `GitHub Actions`

3. Save

---

### Step 3: Push the Workflow

The workflow is ready! Just push it:

```bash
git add .
git commit -m "Add GitHub Actions deployment with repository secret"
git push origin main
```

---

## ✅ That's It!

Your site will be live at:
**https://4bdelrahman.github.io/Form-submitting-Demo/**

The webhook URL will be injected automatically from your repository secret!

---

## 🔐 Security Benefits

✅ Webhook URL never appears in public code  
✅ Only repository admins can see the secret  
✅ Safe to share repository publicly  
✅ Easy to update webhook without code changes  

---

## 📝 To Update Webhook Later

1. Go to repository secrets
2. Click on `WEBHOOK_URL`
3. Update value
4. Next deployment uses new URL automatically!
