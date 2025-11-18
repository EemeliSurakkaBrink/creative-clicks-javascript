/**
 * Custom Event Tracking for Creative Clicks Website
 * 
 * This file contains custom JavaScript code for tracking specific user interactions
 * on the Creative Clicks website. These scripts should be added to GTM as Custom HTML tags.
 * 
 * Each section can be implemented as a separate Custom HTML tag in GTM with trigger: "All Pages"
 */

// =============================================================================
// 1. SERVICE TAB TRACKING
// =============================================================================
// Tracks which service tabs users click on (first, second, third, etc.)
// Event: service_tab_click
// Parameters: tab_name, page_path

(function() {
  'use strict';
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServiceTabTracking);
  } else {
    initServiceTabTracking();
  }
  
  function initServiceTabTracking() {
    var tabTitles = document.querySelectorAll('.tab-title');
    
    tabTitles.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var tabName = this.textContent.trim();
        var tabClass = Array.from(this.classList).find(function(cls) {
          return ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh'].includes(cls);
        });
        
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'service_tab_click',
          'tab_name': tabName,
          'tab_position': tabClass || 'unknown',
          'page_path': window.location.pathname
        });
      });
    });
    
    // Also track hover interactions for tabs with .hover class
    var hoverTabs = document.querySelectorAll('.tab-title.hover');
    hoverTabs.forEach(function(tab) {
      tab.addEventListener('mouseenter', function() {
        var tabName = this.textContent.trim();
        var tabClass = Array.from(this.classList).find(function(cls) {
          return ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh'].includes(cls);
        });
        
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'service_tab_hover',
          'tab_name': tabName,
          'tab_position': tabClass || 'unknown',
          'page_path': window.location.pathname
        });
      });
    });
  }
})();


// =============================================================================
// 2. MOBILE MENU TRACKING
// =============================================================================
// Tracks when users open/close the mobile menu
// Event: mobile_menu_interaction
// Parameters: action (open/close)

(function() {
  'use strict';
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenuTracking);
  } else {
    initMobileMenuTracking();
  }
  
  function initMobileMenuTracking() {
    var mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileBtn) {
      mobileBtn.addEventListener('click', function() {
        // Check if menu is opening or closing
        var isOpening = !this.classList.contains('active');
        
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'mobile_menu_interaction',
          'action': isOpening ? 'open' : 'close',
          'page_path': window.location.pathname
        });
      });
    }
  }
})();


// =============================================================================
// 3. ACCORDION TRACKING
// =============================================================================
// Tracks when users open/close accordion items (FAQ, services, etc.)
// Event: accordion_interaction
// Parameters: action (open/close), accordion_text

(function() {
  'use strict';
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordionTracking);
  } else {
    initAccordionTracking();
  }
  
  function initAccordionTracking() {
    // Track both desktop and mobile accordions
    var accordionSelectors = [
      '.accordeon-row',
      '.mobile-accordeon-row'
    ];
    
    accordionSelectors.forEach(function(selector) {
      var accordions = document.querySelectorAll(selector);
      
      accordions.forEach(function(accordion) {
        accordion.addEventListener('click', function() {
          // Small delay to check state after click
          setTimeout(function() {
            var isOpen = accordion.classList.contains('active') || 
                        accordion.classList.contains('is-open');
            var accordionText = accordion.textContent.trim().substring(0, 100);
            
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'event': 'accordion_interaction',
              'action': isOpen ? 'open' : 'close',
              'accordion_text': accordionText,
              'accordion_type': selector.includes('mobile') ? 'mobile' : 'desktop',
              'page_path': window.location.pathname
            });
          }, 50);
        });
      });
    });
  }
})();


// =============================================================================
// 4. DROPDOWN MENU TRACKING (DESKTOP HEADER)
// =============================================================================
// Tracks when users interact with desktop navigation dropdowns
// Event: dropdown_menu_interaction
// Parameters: menu_name, action (open/close)

(function() {
  'use strict';
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdownTracking);
  } else {
    initDropdownTracking();
  }
  
  function initDropdownTracking() {
    var menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(function(menuItem) {
      menuItem.addEventListener('click', function(e) {
        // Small delay to check state after click
        setTimeout(function() {
          var isOpen = menuItem.classList.contains('open');
          var menuText = menuItem.textContent.trim();
          var menuClasses = Array.from(menuItem.classList);
          var menuType = menuClasses.find(function(cls) {
            return ['solutions', 'about'].includes(cls);
          }) || 'other';
          
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'event': 'dropdown_menu_interaction',
            'menu_name': menuText,
            'menu_type': menuType,
            'action': isOpen ? 'open' : 'close',
            'page_path': window.location.pathname
          });
        }, 50);
      });
    });
  }
})();


// =============================================================================
// 5. VIDEO PLAY/PAUSE TRACKING (if applicable)
// =============================================================================
// Tracks video interactions if you have videos on the site
// Event: video_interaction
// Parameters: action (play/pause/complete), video_title

(function() {
  'use strict';
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoTracking);
  } else {
    initVideoTracking();
  }
  
  function initVideoTracking() {
    var videos = document.querySelectorAll('video');
    
    videos.forEach(function(video) {
      var videoTitle = video.getAttribute('title') || 
                      video.getAttribute('data-video-name') || 
                      video.closest('[data-name]')?.getAttribute('data-name') ||
                      'Unnamed Video';
      
      // Track play
      video.addEventListener('play', function() {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'video_interaction',
          'action': 'play',
          'video_title': videoTitle,
          'video_duration': video.duration || 0,
          'page_path': window.location.pathname
        });
      });
      
      // Track pause
      video.addEventListener('pause', function() {
        if (video.currentTime !== video.duration) { // Don't fire on complete
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'event': 'video_interaction',
            'action': 'pause',
            'video_title': videoTitle,
            'video_current_time': video.currentTime,
            'video_percent_watched': (video.currentTime / video.duration * 100).toFixed(0),
            'page_path': window.location.pathname
          });
        }
      });
      
      // Track complete
      video.addEventListener('ended', function() {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'video_interaction',
          'action': 'complete',
          'video_title': videoTitle,
          'video_duration': video.duration,
          'page_path': window.location.pathname
        });
      });
    });
  }
})();


// =============================================================================
// 6. DIRECTIONAL HOVER INTERACTIONS
// =============================================================================
// Tracks interactions with special hover effects (cards, tiles, etc.)
// Event: hover_interaction
// Parameters: element_type, hover_direction

(function() {
  'use strict';
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHoverTracking);
  } else {
    initHoverTracking();
  }
  
  function initHoverTracking() {
    var hoverItems = document.querySelectorAll('[data-directional-hover-item]');
    
    hoverItems.forEach(function(item) {
      var hoverCount = 0;
      
      item.addEventListener('mouseenter', function() {
        hoverCount++;
        
        // Only track first hover per page load (avoid spam)
        if (hoverCount === 1) {
          var itemText = this.textContent.trim().substring(0, 50);
          var direction = this.getAttribute('data-status') || 'unknown';
          
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'event': 'hover_interaction',
            'element_text': itemText,
            'hover_direction': direction,
            'page_path': window.location.pathname
          });
        }
      });
    });
  }
})();


// =============================================================================
// 7. SCROLL DEPTH TRACKING (Enhanced)
// =============================================================================
// More detailed scroll tracking with time spent at each depth
// Event: scroll_milestone
// Parameters: depth_percent, time_to_depth

(function() {
  'use strict';
  
  var milestones = [25, 50, 75, 90, 100];
  var reached = {};
  var startTime = Date.now();
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollTracking);
  } else {
    initScrollTracking();
  }
  
  function initScrollTracking() {
    var ticking = false;
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          checkScrollDepth();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
  
  function checkScrollDepth() {
    var windowHeight = window.innerHeight;
    var documentHeight = document.documentElement.scrollHeight;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    milestones.forEach(function(milestone) {
      if (scrollPercent >= milestone && !reached[milestone]) {
        reached[milestone] = true;
        var timeToReach = ((Date.now() - startTime) / 1000).toFixed(0);
        
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'scroll_milestone',
          'depth_percent': milestone,
          'time_to_depth_seconds': parseInt(timeToReach),
          'page_path': window.location.pathname
        });
      }
    });
  }
})();


// =============================================================================
// 8. CALL-TO-ACTION (CTA) TRACKING
// =============================================================================
// Tracks specific CTA button clicks with detailed context
// Event: cta_click
// Parameters: cta_text, cta_location, cta_type

(function() {
  'use strict';
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCTATracking);
  } else {
    initCTATracking();
  }
  
  function initCTATracking() {
    // Track buttons with specific CTA classes
    var ctaSelectors = [
      '.btn[data-btn-hover]',
      'a[href*="contact"]',
      'a[href*="get-started"]',
      'a[href*="book"]',
      'a[href*="schedule"]',
      '.button',
      '[data-theme]'
    ];
    
    ctaSelectors.forEach(function(selector) {
      var buttons = document.querySelectorAll(selector);
      
      buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
          var ctaText = this.textContent.trim();
          var ctaHref = this.getAttribute('href') || '';
          var ctaTheme = this.getAttribute('data-theme') || 'default';
          
          // Determine location context
          var location = 'unknown';
          if (this.closest('header')) location = 'header';
          else if (this.closest('footer')) location = 'footer';
          else if (this.closest('[class*="hero"]')) location = 'hero';
          else if (this.closest('form')) location = 'form';
          else location = 'content';
          
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'event': 'cta_click',
            'cta_text': ctaText,
            'cta_url': ctaHref,
            'cta_theme': ctaTheme,
            'cta_location': location,
            'page_path': window.location.pathname
          });
        });
      });
    });
  }
})();


// =============================================================================
// HOW TO IMPLEMENT IN GTM
// =============================================================================
/*

For each tracking script above:

1. Go to GTM → Tags → New
2. Tag Configuration → Custom HTML
3. Copy/paste the desired script from above
4. Triggering → All Pages (or Page View if available)
5. Advanced Settings → Tag firing options → "Once per page"
6. Save and name it (e.g., "Custom Tracking - Service Tabs")

Then create corresponding GA4 Event Tags:

1. Tags → New
2. Tag Configuration → Google Analytics: GA4 Event
3. Configuration Tag → Select your GA4 Configuration tag
4. Event Name → Use the event name from the script (e.g., "service_tab_click")
5. Triggering → Custom Event
   - Event name matches the custom event (e.g., "service_tab_click")
6. Save

Test in Preview Mode before publishing!

*/

