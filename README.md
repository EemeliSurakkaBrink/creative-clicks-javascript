# Creative Clicks - GTM & GA4 Implementation

This repository contains the custom code for implementing Google Tag Manager and Google Analytics 4 on the Creative Clicks Webflow website.

## 📁 Files

- **`head.html`** - Custom code for Webflow head section (contains GTM container script)
- **`footer.html`** - Custom code for Webflow footer section (contains GTM noscript fallback)
- **`GTM_SETUP_GUIDE.md`** - Comprehensive guide for configuring GTM and GA4
- **`CUSTOM_EVENT_TRACKING.js`** - Ready-to-use tracking scripts for custom events
- **`README.md`** - This file

---

## ✅ Implementation Status

### Completed ✓
- [x] GTM container created (GTM-MSZZKB45)
- [x] GTM script added to `head.html` with Consent Pro integration
- [x] GTM noscript fallback added to `footer.html`
- [x] Old GA4 direct implementation (G-36MY35B2RD) removed/commented out
- [x] Proper GDPR/CCPA consent management configured
- [x] Documentation created

### Next Steps (See GTM_SETUP_GUIDE.md)
- [ ] Create new GA4 property for the new website
- [ ] Configure GA4 tag in GTM
- [ ] Set up Consent Mode in GTM
- [ ] Implement custom event tracking
- [ ] Test in GTM Preview mode
- [ ] Publish GTM container

---

## 🚀 Quick Start

### 1. Add Code to Webflow

**Head Custom Code:**
1. In Webflow, go to Project Settings → Custom Code
2. Copy the contents of `head.html`
3. Paste into "Head Code" section
4. Save changes

**Footer Custom Code:**
1. In the same Custom Code settings
2. Copy the first 14 lines of `footer.html` (just the GTM noscript section)
3. Paste into "Footer Code" section
4. Save changes

### 2. Configure GTM

Follow the detailed instructions in **`GTM_SETUP_GUIDE.md`**

Key steps:
1. Create a new GA4 property (don't reuse old one)
2. Add GA4 Configuration tag in GTM
3. Configure Consent Mode for GDPR
4. Set up custom event tracking
5. Test and publish

### 3. Implement Custom Tracking

Use the scripts in **`CUSTOM_EVENT_TRACKING.js`** to track:
- Service tab interactions
- Mobile menu usage
- Accordion interactions
- Form submissions
- Button clicks
- Scroll depth
- Video plays
- CTA engagement

---

## 🔧 Technical Details

### GTM Container
- **Container ID:** GTM-MSZZKB45
- **Type:** Web
- **Loading:** Consent-based (requires analytics consent)

### Consent Management
- **Platform:** Consent Pro by Finsweet
- **Category:** Analytics
- **Behavior:** GTM loads only after user grants analytics consent
- **Compliance:** GDPR, CCPA ready

### Old Implementation
- **Old Property ID:** G-36MY35B2RD
- **Status:** Commented out in head.html (preserved for reference)
- **Reason:** Direct GA4 implementation replaced with GTM for better flexibility

---

## 📊 What Gets Tracked

### Automatic (with GA4 Configuration tag)
- Page views
- Session starts
- First visit
- User engagement

### Custom Events (when implemented)
- Service tab clicks/hovers
- Mobile menu open/close
- Accordion expand/collapse
- Dropdown menu interactions
- Form submissions
- Button/CTA clicks
- Scroll depth milestones
- Video interactions
- Outbound link clicks

---

## 🎯 About the GTM vs Direct GA4 Decision

**Why GTM instead of direct GA4 implementation?**

✅ **Benefits of GTM:**
- No code changes needed to add/modify tracking
- Easy A/B testing and experimentation
- Can add other marketing tags (Facebook Pixel, LinkedIn Insight, etc.)
- Better event tracking capabilities
- Version control and rollback features
- Team collaboration features

**Original Setup:**
- Used direct gtag.js implementation
- Limited to basic GA4 tracking
- Code changes required for new events

**New Setup:**
- GTM container manages all tracking
- GA4 configured as a tag within GTM
- Custom events easily added via GTM interface

---

## 🔒 Privacy & Consent

### How It Works:

1. **User visits website** → Consent Pro banner appears
2. **User accepts analytics** → Consent Pro fires consent event
3. **GTM loads** → Due to `fs-consent-categories="analytics"` attribute
4. **GA4 starts tracking** → Configured as a tag within GTM

### Compliance Features:
- No tracking before consent
- Granular cookie categories
- Consent preferences stored
- Easy opt-out functionality
- Banner customization via Consent Pro

---

## 🧪 Testing Checklist

Before going live, test:

- [ ] GTM container loads correctly
- [ ] GA4 tracking appears in Realtime reports
- [ ] Consent Pro blocks GTM before consent
- [ ] GTM loads after consent granted
- [ ] Page views are tracked
- [ ] Custom events fire correctly
- [ ] Forms submission tracking works
- [ ] Button clicks are captured
- [ ] Mobile menu tracking works
- [ ] No console errors
- [ ] Works on mobile devices
- [ ] Works on different browsers

**Use GTM Preview Mode for testing!**

---

## 📖 Documentation

### Main Guide
**`GTM_SETUP_GUIDE.md`** contains:
- Step-by-step GTM configuration
- GA4 property creation
- Consent Mode setup
- Custom event implementation
- Trigger and variable configuration
- Testing procedures
- Troubleshooting tips

### Event Tracking Code
**`CUSTOM_EVENT_TRACKING.js`** contains:
- Ready-to-use tracking scripts
- Implementation instructions
- Event parameter details
- Best practices

---

## 🆘 Troubleshooting

### GTM Not Loading
**Problem:** GTM script doesn't execute  
**Solution:** Check if user has consented to analytics cookies

### Events Not Firing
**Problem:** Custom events don't appear in GA4  
**Solution:** 
1. Check GTM Preview mode
2. Verify triggers are configured correctly
3. Ensure CSS selectors match your HTML

### Consent Issues
**Problem:** GTM loads before consent  
**Solution:** Verify `fs-consent-categories="analytics"` attribute is present

### Data Not in GA4
**Problem:** No data in GA4 Realtime  
**Solution:**
1. Check GA4 Measurement ID is correct
2. Verify GTM container is published
3. Check GTM Preview shows tags firing
4. Wait 24-48 hours for data processing

---

## 📞 Support Resources

- [Google Tag Manager Help](https://support.google.com/tagmanager)
- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [Consent Pro by Finsweet](https://finsweet.com/attributes/consent-pro)
- [Webflow Custom Code](https://university.webflow.com/lesson/custom-code-in-the-head-and-body-tags)

---

## 🔄 Version History

### v1.0 - November 18, 2025
- Initial GTM implementation (GTM-MSZZKB45)
- Replaced direct GA4 implementation
- Added Consent Pro integration
- Created documentation

---

## 👥 Contributors

**Project:** Creative Clicks Website  
**Platform:** Webflow  
**Analytics:** Google Tag Manager + GA4  
**Consent:** Consent Pro (Finsweet)

---

## 📝 Notes

- Always test changes in GTM Preview mode before publishing
- Keep the old GA4 property (G-36MY35B2RD) for historical data access
- Create new GA4 property for new website data
- Document any custom events added in the future
- Review GTM workspace regularly for tag health

---

**For detailed setup instructions, see `GTM_SETUP_GUIDE.md`**

