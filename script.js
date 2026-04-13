/* ── INTERACTIVITY ────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const searchBtn = document.getElementById('searchBtn');
    const cartBtn = document.getElementById('cartBtn');
    const cartCountEl = document.getElementById('cartCount');
    const productsSection = document.getElementById('products');
    const newsletterMessage = document.getElementById('newsletterMessage');
    const toast = document.getElementById('statusToast');
    const toastText = document.getElementById('statusToastText');
    let toastTimer;

    const showToast = (message) => {
        if (!toast || !toastText) return;
        toastText.textContent = message;
        toast.classList.remove('opacity-0', 'translate-y-6');
        toast.classList.add('opacity-100', 'translate-y-0');

        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-6');
            toast.classList.remove('opacity-100', 'translate-y-0');
        }, 2400);
    };
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuBtn.setAttribute('aria-expanded', String(!mobileMenu.classList.contains('hidden')));
        });

        // Close mobile menu on nav link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    if (searchBtn && productsSection) {
        searchBtn.addEventListener('click', () => {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            showToast('Jumped to the featured products section.');
        });
    }

    if (cartBtn && cartCountEl) {
        cartBtn.addEventListener('click', () => {
            const count = Number(cartCountEl.textContent || '0');
            if (count === 0) {
                showToast('Your cart is empty. Add a few pantry favourites to get started.');
                return;
            }
            showToast(`You have ${count} item${count === 1 ? '' : 's'} in your cart.`);
        });
    }

    // Add to cart counter
    let cartCount = 0;
    
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            cartCount++;
            if (cartCountEl) cartCountEl.textContent = cartCount;
            
            // Visual feedback
            const originalText = btn.textContent;
            const accentClasses = ['bg-brand-orange', 'hover:bg-brand-orange/90'];
            btn.textContent = 'Added!';
            btn.classList.add('bg-brand-green');
            btn.classList.remove(...accentClasses);
            showToast(`Added to cart. You now have ${cartCount} item${cartCount === 1 ? '' : 's'}.`);
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('bg-brand-green');
                btn.classList.add(...accentClasses);
            }, 1500);
        });
    });

    // Category tab switching
    document.querySelectorAll('.cat-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Reset all tabs
            document.querySelectorAll('.cat-tab').forEach(t => {
                t.classList.remove('bg-brand-green', 'text-white', 'border-brand-green');
                t.classList.add('bg-white', 'text-gray-600', 'border-gray-300');
                t.setAttribute('aria-selected', 'false');
            });
            // Activate clicked tab
            tab.classList.add('bg-brand-green', 'text-white', 'border-brand-green');
            tab.classList.remove('bg-white', 'text-gray-600', 'border-gray-300');
            tab.setAttribute('aria-selected', 'true');
            // Hide all panels, show matching
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
            const target = document.getElementById('tab-' + tab.dataset.tab);
            if (target) target.classList.remove('hidden');
        });
    });

    // Newsletter form
    const newsletterForm = document.getElementById('emailInput')?.closest('form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = e.target.querySelector('input[type="email"]');
            const btn = e.target.querySelector('button[type="submit"]');
            
            if (btn) {
                const originalText = btn.textContent;
                btn.textContent = 'Subscribed!';
                btn.disabled = true;
                if (input) input.value = '';
                if (newsletterMessage) {
                    newsletterMessage.classList.remove('opacity-0');
                    newsletterMessage.classList.add('opacity-100');
                }
                showToast('Thanks for subscribing. More flavour inspiration is on the way.');
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    if (newsletterMessage) {
                        newsletterMessage.classList.add('opacity-0');
                        newsletterMessage.classList.remove('opacity-100');
                    }
                }, 3000);
            }
        });
    }
});
