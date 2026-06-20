// Mobile nav toggle
document.getElementById('navToggle').addEventListener('click', function() {
  document.getElementById('navLinks').classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(function(link) {
  link.addEventListener('click', function() {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// Scroll animations
var fadeEls = document.querySelectorAll('.explore-card, .highlight-big, .about-layout, .fun-facts, .featured-sport, .sport-tile, .leadership-card, .service-block, .activity-card, .contact-layout');
fadeEls.forEach(function(el) { el.classList.add('fade-up'); });

var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

fadeEls.forEach(function(el) { observer.observe(el); });

// Contact form
var form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = form.querySelector('button');
    btn.innerHTML = '<i class="fas fa-check"></i> sent!';
    btn.style.background = '#B5C9A1';
    setTimeout(function() {
      btn.innerHTML = 'send message <i class="fas fa-arrow-right"></i>';
      btn.style.background = '';
      form.reset();
    }, 2500);
  });
}
