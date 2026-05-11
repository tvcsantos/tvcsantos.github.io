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

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});