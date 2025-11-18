# Google Tag Manager Setup Guide
## Creative Clicks Website - GTM Container: GTM-MSZZKB45

---

## ✅ Implementation Status

### Completed
- [x] GTM container created (GTM-MSZZKB45)
- [x] GTM head script added to Webflow head custom code
- [x] GTM noscript fallback added to Webflow footer custom code
- [x] Consent Pro integration configured (loads only after analytics consent)
- [x] Old GA4 direct implementation (G-36MY35B2RD) commented out

---

## 📋 Next Steps: Configure GTM

### 1. Create a New GA4 Property

**Why:** Your new Webflow site is different from the old site, so you should have separate analytics.

**How:**
1. Go to [Google Analytics](https://analytics.google.com)
2. Click Admin (bottom left)
3. Click "Create Property"
4. Fill in details:
   - Property name: "Creative Clicks - New Website" (or your company name)
   - Reporting time zone: Your timezone
   - Currency: Your currency
5. Click "Next" → Select your business details → Click "Create"
6. **Save your new Measurement ID** (format: G-XXXXXXXXXX)

---

### 2. Add GA4 Tag in GTM

1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Select your container (GTM-MSZZKB45)
3. Click **Tags** → **New**
4. Name: "GA4 - Configuration"
5. Click **Tag Configuration**:
   - Choose: **Google Analytics: GA4 Configuration**
   - Measurement ID: Paste your new GA4 Measurement ID (G-XXXXXXXXXX)
6. Click **Triggering**:
   - Choose: **Consent Initialization - All Pages** (if available) OR **All Pages**
7. Click **Save**

---

### 3. Set Up Consent Mode for GDPR Compliance

Since you're using Consent Pro, you need to configure GTM Consent Mode:

1. In GTM, click **Tags** → **New**
2. Name: "Consent Mode - Default Settings"
3. Click **Tag Configuration**:
   - Choose: **Custom HTML**
   - Paste this code:

```html
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Default consent to denied
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied'
});
</script>
```

4. Click **Triggering**: **Consent Initialization - All Pages**
5. Click **Save**

**Then, configure Consent Pro to update consent:**

Consent Pro should fire this when users accept analytics:

```javascript
gtag('consent', 'update', {
  'analytics_storage': 'granted'
});
```

---

### 4. Set Up Custom Event Tracking

Here are recommended events to track for your website:

#### A. Button Click Tracking

**Trigger:**
1. Click **Triggers** → **New**
2. Name: "Click - All CTA Buttons"
3. Trigger Type: **Click - All Elements**
4. This trigger fires on: **Some Clicks**
5. Add condition: `Click Element` matches CSS selector `.btn, .button, [data-btn-hover]`
6. Click **Save**

**Tag:**
1. Click **Tags** → **New**
2. Name: "GA4 - Event - Button Click"
3. Tag Configuration: **Google Analytics: GA4 Event**
4. Configuration Tag: Select your "GA4 - Configuration" tag
5. Event Name: `button_click`
6. Event Parameters:
   - `button_text`: `{{Click Text}}`
   - `button_url`: `{{Click URL}}`
   - `page_path`: `{{Page Path}}`
7. Triggering: Select "Click - All CTA Buttons"
8. Click **Save**

#### B. Form Submission Tracking

**Trigger:**
1. Click **Triggers** → **New**
2. Name: "Form Submission"
3. Trigger Type: **Form Submission**
4. This trigger fires on: **All Forms**
5. Check: "Wait for Tags" (2000ms recommended)
6. Click **Save**

**Tag:**
1. Click **Tags** → **New**
2. Name: "GA4 - Event - Form Submit"
3. Tag Configuration: **Google Analytics: GA4 Event**
4. Configuration Tag: Select your "GA4 - Configuration" tag
5. Event Name: `form_submit`
6. Event Parameters:
   - `form_id`: `{{Form ID}}`
   - `form_classes`: `{{Form Classes}}`
   - `page_path`: `{{Page Path}}`
7. Triggering: Select "Form Submission"
8. Click **Save**

#### C. Scroll Depth Tracking

**Trigger:**
1. Click **Triggers** → **New**
2. Name: "Scroll Depth - 25%, 50%, 75%, 90%"
3. Trigger Type: **Scroll Depth**
4. Vertical Scroll Depths: `25,50,75,90`
5. This trigger fires on: **All Pages**
6. Click **Save**

**Tag:**
1. Click **Tags** → **New**
2. Name: "GA4 - Event - Scroll Depth"
3. Tag Configuration: **Google Analytics: GA4 Event**
4. Configuration Tag: Select your "GA4 - Configuration" tag
5. Event Name: `scroll`
6. Event Parameters:
   - `percent_scrolled`: `{{Scroll Depth Threshold}}`
   - `page_path`: `{{Page Path}}`
7. Triggering: Select "Scroll Depth - 25%, 50%, 75%, 90%"
8. Click **Save**

#### D. Outbound Link Clicks

**Trigger:**
1. Click **Triggers** → **New**
2. Name: "Click - Outbound Links"
3. Trigger Type: **Click - All Elements**
4. This trigger fires on: **Some Clicks**
5. Add condition: `Click URL` does not contain `yourdomain.com` (replace with your actual domain)
6. Add condition: `Click URL` matches RegEx `^https?://.*`
7. Check: "Wait for Tags" (2000ms)
8. Click **Save**

**Tag:**
1. Click **Tags** → **New**
2. Name: "GA4 - Event - Outbound Click"
3. Tag Configuration: **Google Analytics: GA4 Event**
4. Configuration Tag: Select your "GA4 - Configuration" tag
5. Event Name: `click`
6. Event Parameters:
   - `link_url`: `{{Click URL}}`
   - `link_text`: `{{Click Text}}`
   - `outbound`: `true`
7. Triggering: Select "Click - Outbound Links"
8. Click **Save**

---

### 5. Enable Built-in Variables

1. In GTM, click **Variables** in the left sidebar
2. In the "Built-In Variables" section, click **Configure**
3. Enable these variables:
   - ✅ Page URL
   - ✅ Page Path
   - ✅ Click Element
   - ✅ Click Classes
   - ✅ Click ID
   - ✅ Click URL
   - ✅ Click Text
   - ✅ Form Element
   - ✅ Form Classes
   - ✅ Form ID

---

### 6. Preview and Test

1. In GTM, click **Preview** (top right)
2. Enter your website URL
3. Click **Connect**
4. A new window opens with GTM debug panel
5. Test:
   - Page views are tracked
   - Button clicks fire events
   - Form submissions work
   - Scroll tracking fires
   - Consent Pro blocks/allows GTM correctly

---

### 7. Publish Your GTM Container

1. Once testing is complete, click **Submit** (top right)
2. Add a version name: "Initial GA4 Setup with Event Tracking"
3. Add description (optional)
4. Click **Publish**

---

## 🎯 Recommended Additional Events

Consider tracking these business-specific events:

### Services Tab Interactions
Track which services users are interested in:

**Custom HTML Tag:**
```javascript
<script>
(function() {
  document.querySelectorAll('.tab-title').forEach(function(tab) {
    tab.addEventListener('click', function() {
      var tabName = this.textContent.trim();
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'service_tab_click',
        'tab_name': tabName,
        'page_path': window.location.pathname
      });
    });
  });
})();
</script>
```

**Trigger:** All Pages  
**Event Tag:** Create a GA4 Event tag that listens for `service_tab_click` custom event

### Mobile Menu Interactions

**Custom HTML Tag:**
```javascript
<script>
(function() {
  var mobileBtn = document.querySelector('.mobile-menu-btn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', function() {
      var isOpen = this.classList.contains('active');
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'mobile_menu_interaction',
        'action': isOpen ? 'open' : 'close'
      });
    });
  }
})();
</script>
```

### Accordion Interactions

**Custom HTML Tag:**
```javascript
<script>
(function() {
  document.querySelectorAll('.accordeon-row').forEach(function(accordion) {
    accordion.addEventListener('click', function() {
      var isOpen = this.classList.contains('is-open');
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'accordion_click',
        'action': isOpen ? 'close' : 'open',
        'accordion_text': this.textContent.trim().substring(0, 50)
      });
    });
  });
})();
</script>
```

---

## 🔍 Debugging Tips

### Check if GTM is Loading
Open browser console and type:
```javascript
window.google_tag_manager
```
Should return an object if GTM loaded successfully.

### Check dataLayer
```javascript
window.dataLayer
```
Should show an array of events being pushed.

### Check Consent Pro Integration
```javascript
// Before consent
console.log(document.querySelector('script[src*="googletagmanager.com/gtm.js"]'));
// Should be null until consent is granted
```

---

## 📊 Verify Data in GA4

After publishing:

1. Go to GA4 → **Reports** → **Realtime**
2. Visit your website
3. You should see:
   - Active users
   - Events (page_view, button_click, form_submit, etc.)
   - Pages being viewed

---

## 📝 Important Notes

### About the Old GA4 Property (G-36MY35B2RD)
- The old direct implementation has been commented out in `head.html`
- Data from the old site remains accessible in that property
- You should NOT delete the old property (keep for historical data)
- Create a new GA4 property for the new website

### About Consent Pro
- GTM will only load after users accept "analytics" cookies
- The `fs-consent-categories="analytics"` attribute handles this
- Make sure Consent Pro is properly configured in Webflow
- Test both consent acceptance and denial scenarios

### About the noscript Tag
- Placed in footer custom code (not ideal, but best option in Webflow)
- Only affects ~0.2% of users with JavaScript disabled
- Consider this acceptable for Webflow limitations

---

## 🆘 Troubleshooting

### GTM not loading
- Check browser console for errors
- Verify GTM-MSZZKB45 is the correct container ID
- Check if Consent Pro is blocking it (consent not granted)

### Events not firing
- Use GTM Preview mode to debug
- Check if triggers are configured correctly
- Verify CSS selectors match your actual HTML

### Consent issues
- Verify Consent Pro is installed and working
- Test by accepting/rejecting cookies
- Check that GTM script has `fs-consent-categories="analytics"`

---

## 📞 Need Help?

- [GTM Community](https://www.en.advertisercommunity.com/t5/Google-Tag-Manager/ct-p/Google-Tag-Manager)
- [GA4 Help Center](https://support.google.com/analytics)
- [Consent Pro Documentation](https://finsweet.com/attributes/consent-pro)

---

**Last Updated:** November 18, 2025  
**GTM Container:** GTM-MSZZKB45  
**Website:** Creative Clicks (Webflow)

