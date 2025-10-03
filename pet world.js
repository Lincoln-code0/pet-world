// Product Slider - Horizontal Scroll
const productTrack = document.querySelector('.product-track-container');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');

if (productTrack && prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    productTrack.scrollBy({ left: -260, behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    productTrack.scrollBy({ left: 260, behavior: 'smooth' });
  });
}

// Scroll Highlight Navigation (if you use anchors)
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');
  let currentSection = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      currentSection = section.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('text-yellow-600');
    if (link.getAttribute('href').slice(1) === currentSection) {
      link.classList.add('text-yellow-600');
    }
  });
});
