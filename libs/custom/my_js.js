document.addEventListener('DOMContentLoaded', function () {
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.site-nav a[href^="#"]')
  );
  var newsList = document.querySelector('.news-list');
  var newsButton = document.querySelector('.news-toggle');
  var year = document.getElementById('current-year');

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  if (newsButton && newsList) {
    newsButton.addEventListener('click', function () {
      var expanded = newsButton.getAttribute('aria-expanded') === 'true';
      newsButton.setAttribute('aria-expanded', String(!expanded));
      newsList.classList.toggle('expanded', !expanded);
      newsButton.textContent = expanded ? 'Show older updates ↓' : 'Hide older updates ↑';
    });
  }

  if ('IntersectionObserver' in window) {
    var sections = document.querySelectorAll('main section[id]');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle(
            'current',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      });
    }, { rootMargin: '-22% 0px -68% 0px' });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
});
