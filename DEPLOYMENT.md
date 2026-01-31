# UniPortal Website Deployment Guide

## Contact Form Setup (Formspree for Static Hosting)

Your contact form now uses Formspree, which works perfectly with GitHub Pages and other static hosting services!

### 🚀 Formspree Setup (Required)

1. **Create a Formspree Account:**
   - Go to [formspree.io](https://formspree.io)
   - Sign up for a free account
   - Create a new form

2. **Get Your Form ID:**
   - After creating the form, you'll get a unique endpoint like: `https://formspree.io/f/abc123def`
   - Copy the form ID (the part after `/f/`)

3. **Update the Code:**
   - Replace `YOUR_FORM_ID` in `index.html` and `js/main.js` with your actual form ID
   - Example: `https://formspree.io/f/abc123def`

4. **Configure Email Delivery:**
   - In your Formspree dashboard, set the destination email to `uniportal.hq@gmail.com`
   - You can also customize the email subject and format

### 📧 How It Works:
1. User fills out the contact form
2. JavaScript sends the data to Formspree via AJAX
3. Formspree processes the submission and sends you an email
4. User sees a success message without page refresh

### 🎯 GitHub Pages Deployment:

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Save

3. **Your site will be live at:** `https://YOUR_USERNAME.github.io/YOUR_REPO/`

### ✅ Features:
- ✅ Works with GitHub Pages
- ✅ No server-side code needed
- ✅ Free tier available (50 submissions/month)
- ✅ Spam protection included
- ✅ Email notifications
- ✅ Form validation
- ✅ AJAX submission (no page refresh)

### 🔧 Customization:
- Upgrade to Formspree Pro for more submissions and features
- Add custom redirect URLs
- Integrate with Zapier for additional automation
- Add file uploads if needed

### 🧪 Testing:
1. Deploy to GitHub Pages
2. Visit your live site
3. Submit the contact form
4. Check your email for the message

The form is now fully compatible with static hosting!