/* =============================================================
   PET WORLD — Main JavaScript
   Covers: Theme, Cart, Toast, Scroll Nav, Hamburger
   ============================================================= */

// ── Theme Toggle ──────────────────────────────────────────────
(function initTheme() {
  const body     = document.body;
  const toggle   = document.getElementById('theme-toggle');
  const moonIcon = document.getElementById('moon-icon');
  const sunIcon  = document.getElementById('sun-icon');

  function applyTheme(isDark) {
    if (isDark) {
      body.classList.remove('light-mode');
      if (moonIcon) moonIcon.classList.add('hidden');
      if (sunIcon)  sunIcon.classList.remove('hidden');
    } else {
      body.classList.add('light-mode');
      if (sunIcon)  sunIcon.classList.add('hidden');
      if (moonIcon) moonIcon.classList.remove('hidden');
    }
  }

  // Load saved preference
  applyTheme(localStorage.getItem('pw-theme') !== 'light');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isLight = body.classList.contains('light-mode');
      applyTheme(isLight);
      localStorage.setItem('pw-theme', isLight ? 'dark' : 'light');
    });
  }
})();


// ── Cart State ────────────────────────────────────────────────
const cart = {
  items: JSON.parse(localStorage.getItem('pw-cart') || '[]'),

  save() {
    localStorage.setItem('pw-cart', JSON.stringify(this.items));
    this.updateCounter();
  },

  add(id, name, price) {
    const existing = this.items.find(i => i.id === id);
    if (existing) {
      existing.qty++;
    } else {
      this.items.push({ id, name, price: parseFloat(price), qty: 1 });
    }
    this.save();
    showToast(`🛒 Added: ${name}`);
  },

  total() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2);
  },

  count() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },

  updateCounter() {
    const el = document.getElementById('cart-counter');
    if (!el) return;
    const n = this.count();
    el.textContent = n;
    el.style.opacity = n > 0 ? '1' : '0';
  }
};

cart.updateCounter(); // init on load

function addToCart(btn) {
  cart.add(btn.dataset.productId, btn.dataset.name, btn.dataset.price);
}


// ── Toast Notifications ───────────────────────────────────────
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 2800);
}


// ── Checkout Modal Placeholder ────────────────────────────────
function openCheckoutModal() {
  showToast(`Cart total: $${cart.total()} (${cart.count()} items)`);
}


// ── Smooth Scroll ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// ── Active Nav Highlight on Scroll ───────────────────────────
window.addEventListener('scroll', () => {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link[href]');
  let current = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${current}` || href.endsWith(`#${current}`)) {
      link.classList.add('active');
    }
  });
}, { passive: true });


// ── Page Loader ───────────────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) setTimeout(() => loader.classList.add('hidden'), 400);
});