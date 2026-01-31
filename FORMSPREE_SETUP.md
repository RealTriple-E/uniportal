# Formspree Setup Instructions

## ⚠️ IMPORTANT: Replace YOUR_FORM_ID

Before deploying, you MUST replace `YOUR_FORM_ID` with your actual Formspree form ID:

### In `index.html` (line ~470):
```html
action="https://formspree.io/f/YOUR_FORM_ID"
```

### In `js/main.js` (line ~75):
```javascript
fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

## Steps:
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form
3. Copy your form ID (looks like: `abc123def`)
4. Replace `YOUR_FORM_ID` in both files above
5. Set your email address in Formspree dashboard
6. Deploy to GitHub Pages

## Example:
If your Formspree endpoint is: `https://formspree.io/f/xyz789abc`
Then replace `YOUR_FORM_ID` with `xyz789abc`