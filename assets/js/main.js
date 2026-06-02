document.addEventListener('DOMContentLoaded', function () {

  // Set initial width to 0 for skill bar animation
  document.querySelectorAll('.level-bar-inner').forEach(function (bar) {
    bar.style.width = '0';
  });

  // Animate skill bars on page load
  window.addEventListener('load', function () {
    document.querySelectorAll('.level-bar-inner').forEach(function (bar) {
      var level = bar.getAttribute('data-level');
      bar.style.transition = 'width 0.8s ease';
      bar.style.width = level;
    });
  });

  // Smooth scroll for anchor links with focus management
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (!target.hasAttribute('tabindex')) {
          target.setAttribute('tabindex', '-1');
        }
        target.focus();
      }
    });
  });

  // ======= Theme Switcher =======
  var THEME_KEY = 'theme-preference';
  var toggleBtn = document.getElementById('theme-toggle-btn');
  var dropdown = document.getElementById('theme-dropdown');
  var themeIcon = document.getElementById('theme-icon');
  var options = document.querySelectorAll('.theme-option');

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getStoredPreference() {
    try {
      return localStorage.getItem(THEME_KEY) || 'system';
    } catch (e) {
      return 'system';
    }
  }

  function applyTheme(preference) {
    var resolved = preference === 'system' ? getSystemTheme() : preference;
    document.documentElement.setAttribute('data-theme', resolved);
    updateIcon(preference);
    updateActiveOption(preference);
  }

  function updateIcon(preference) {
    if (!themeIcon) return;
    themeIcon.className = 'fas';
    if (preference === 'light') {
      themeIcon.classList.add('fa-sun');
    } else if (preference === 'dark') {
      themeIcon.classList.add('fa-moon');
    } else {
      themeIcon.classList.add('fa-desktop');
    }
  }

  function updateActiveOption(preference) {
    options.forEach(function (opt) {
      opt.classList.toggle('active', opt.getAttribute('data-theme') === preference);
    });
  }

  function setPreference(preference) {
    try {
      localStorage.setItem(THEME_KEY, preference);
    } catch (e) {
      // localStorage unavailable
    }
    applyTheme(preference);
  }

  // Toggle dropdown open/close
  if (toggleBtn && dropdown) {
    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = dropdown.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Handle option selection
  options.forEach(function (opt) {
    opt.addEventListener('click', function (e) {
      e.stopPropagation();
      var theme = this.getAttribute('data-theme');
      setPreference(theme);
      dropdown.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function () {
    if (dropdown) {
      dropdown.classList.remove('open');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close dropdown on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && dropdown && dropdown.classList.contains('open')) {
      dropdown.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.focus();
    }
  });

  // Listen for system theme changes (when preference is "system")
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    if (getStoredPreference() === 'system') {
      applyTheme('system');
    }
  });

  // Initialize theme on DOMContentLoaded (complements the inline script in <head>)
  applyTheme(getStoredPreference());

});
