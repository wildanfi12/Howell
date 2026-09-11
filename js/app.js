/**
 * HOWELL Official Showcase Catalog Controller
 * Brand: HOWELL (PT Howell Niaga Indonesia) - Est. 2009
 * Features: High-Contrast Light & Dark Mode, Apple Aesthetics, Pure Showcase Catalog
 */

// Global Application State
const state = {
  wishlist: [],
  cart: JSON.parse(localStorage.getItem('howell_cart') || '[]'),
  activeCategory: 'all',
  sortBy: 'featured',
  searchQuery: '',
  activeProductDetail: null,
  activeDetailTab: 'desc',
  activeLength: null,
  activeColor: null,
  theme: 'light'
};

// Theme Controller (Locked Permanent Light Mode)
function initTheme() {
  state.theme = 'light';
  document.body.classList.add('light-mode');
  document.documentElement.classList.remove('dark');
  document.body.classList.remove('dark');
  updateThemeIcon();
}

function toggleTheme() {
  initTheme();
}

function updateThemeIcon() {
  const headerLogo = document.getElementById('header-logo-img');
  const drawerLogo = document.getElementById('drawer-logo-img');
  const footerLogo = document.getElementById('footer-logo-img');
  
  if (headerLogo) headerLogo.src = 'assets/howell-logo.png';
  if (drawerLogo) drawerLogo.src = 'assets/howell-logo.png';
  if (footerLogo) footerLogo.src = 'assets/howell-logo-white.png';

  if (window.lucide) lucide.createIcons();
}

// Toast Notification System
const showToast = (message, title = "HOWELL Catalog", icon = "check-circle") => {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'glass-panel p-4 rounded-2xl border border-yellow-500/40 shadow-2xl flex items-center gap-3 transform translate-y-4 opacity-0 transition-all duration-300 pointer-events-auto min-w-[280px] max-w-md';
  toast.innerHTML = `
    <div class="w-9 h-9 rounded-full bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center text-yellow-600 dark:text-yellow-400 font-bold shrink-0">
      <i data-lucide="${icon}" class="w-4 h-4"></i>
    </div>
    <div class="flex-1">
      <h4 class="text-xs font-bold text-yellow-700 dark:text-yellow-400 uppercase tracking-wider">${title}</h4>
      <p class="text-xs text-slate-800 dark:text-slate-200 mt-0.5">${message}</p>
    </div>
    <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1">
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>
  `;
  
  toastContainer.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

// Wishlist System
const wishlistSystem = {
  toggle(productId) {
    const idx = state.wishlist.indexOf(productId);
    const product = HOWELL_PRODUCTS.find(p => p.id === productId);
    if (idx > -1) {
      state.wishlist.splice(idx, 1);
      showToast(`Removed from saved products`, "Favorites", "heart-off");
    } else {
      state.wishlist.push(productId);
      showToast(`"${product?.name}" saved to favorites`, "Saved Product", "heart");
    }
    renderCatalog();
    renderFeaturedProducts();
  }
};

/* ==========================================================================
   SHOPPING CART ENGINE & LOCALSTORAGE PERSISTENCE
   ========================================================================== */
function saveCart() {
  localStorage.setItem('howell_cart', JSON.stringify(state.cart));
  updateCartBadge();
  renderCartDrawer();
}

function getCartSubtotal() {
  return state.cart.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0);
}

function updateCartBadge() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalRp = getCartSubtotal();

  document.querySelectorAll('.cart-badge-count').forEach(el => {
    el.textContent = totalCount;
    if (totalCount > 0) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });

  const floatBtn = document.getElementById('floating-cart-btn');
  const floatCountEl = document.getElementById('floating-cart-count');
  const floatTotalEl = document.getElementById('floating-cart-total');

  if (floatBtn) {
    if (totalCount > 0) {
      floatBtn.classList.remove('hidden');
    } else {
      floatBtn.classList.add('hidden');
    }
  }

  if (floatCountEl) floatCountEl.textContent = `${totalCount} Items`;
  if (floatTotalEl) floatTotalEl.textContent = formatRupiah(totalRp);
}

function addToCart(productId, length = null, color = null, qty = 1) {
  const product = HOWELL_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const selLength = length || state.activeLength || (product.variants?.lengths?.[0]) || 'Standard';
  const selColor = color || state.activeColor || (product.variants?.colors?.[0]) || 'Standard';

  let itemPrice = product.price || 0;
  if (product.variantPrices && product.variantPrices[selLength]) {
    itemPrice = product.variantPrices[selLength];
  }

  const existingIdx = state.cart.findIndex(i => i.id === productId && i.length === selLength && i.color === selColor);

  if (existingIdx > -1) {
    state.cart[existingIdx].quantity += qty;
  } else {
    state.cart.push({
      id: productId,
      name: product.name,
      categoryName: product.categoryName,
      sku: product.sku,
      image: product.image,
      price: itemPrice,
      length: selLength,
      color: selColor,
      quantity: qty
    });
  }

  saveCart();
  showToast(`"${product.name}" (${selLength}) ditambahkan ke keranjang`, "Keranjang Belanja", "shopping-cart");
}

function updateCartQty(index, delta) {
  if (state.cart[index]) {
    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
      state.cart.splice(index, 1);
    }
    saveCart();
  }
}

function removeFromCart(index) {
  if (state.cart[index]) {
    state.cart.splice(index, 1);
    saveCart();
    showToast("Item berhasil dihapus dari keranjang", "Keranjang Belanja", "trash-2");
  }
}

function clearCart() {
  state.cart = [];
  saveCart();
}

function toggleCartDrawer(open) {
  const backdrop = document.getElementById('cart-drawer-backdrop');
  const drawer = document.getElementById('cart-drawer');

  if (!backdrop || !drawer) return;

  if (open) {
    renderCartDrawer();
    backdrop.classList.remove('pointer-events-none', 'opacity-0');
    backdrop.classList.add('opacity-100');
    drawer.classList.remove('translate-x-full');
  } else {
    backdrop.classList.add('pointer-events-none', 'opacity-0');
    backdrop.classList.remove('opacity-100');
    drawer.classList.add('translate-x-full');
  }
}

function renderCartDrawer() {
  const container = document.getElementById('cart-drawer-items');
  const subtotalEl = document.getElementById('cart-drawer-subtotal');
  const checkoutBtn = document.getElementById('cart-checkout-btn');

  if (!container) return;

  const subtotal = getCartSubtotal();
  if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center text-slate-400">
        <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
          <i data-lucide="shopping-cart" class="w-8 h-8"></i>
        </div>
        <h4 class="text-sm font-bold text-slate-800">Keranjang Belanja Kosong</h4>
        <p class="text-xs text-slate-500 mt-1">Pilih produk berkualitas HOWELL dan tambahkan ke keranjang.</p>
      </div>
    `;
    if (checkoutBtn) checkoutBtn.classList.add('opacity-50', 'pointer-events-none');
    if (window.lucide) lucide.createIcons();
    return;
  }

  if (checkoutBtn) checkoutBtn.classList.remove('opacity-50', 'pointer-events-none');

  container.innerHTML = state.cart.map((item, idx) => `
    <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 group relative">
      <div class="w-16 h-16 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0">
        <img src="${encodeURI(item.image)}" alt="${item.name}" class="w-full h-full object-contain">
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-bold text-amber-700 uppercase tracking-wider">${item.categoryName}</span>
          <button onclick="removeFromCart(${idx})" class="text-slate-400 hover:text-red-500 text-xs transition-colors p-1" title="Hapus Item">✕</button>
        </div>
        <h4 class="text-xs font-bold text-slate-900 truncate leading-snug">${item.name}</h4>
        <div class="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
          <span class="bg-slate-200 px-1.5 py-0.2 rounded font-semibold text-slate-700">${item.length}</span>
          <span class="font-extrabold text-emerald-600">${formatRupiah(item.price)}</span>
        </div>
        <div class="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-200/60">
          <div class="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-2 py-0.5">
            <button onclick="updateCartQty(${idx}, -1)" class="text-xs font-bold text-slate-600 hover:text-slate-900">-</button>
            <span class="text-xs font-extrabold text-slate-900 px-1.5">${item.quantity}</span>
            <button onclick="updateCartQty(${idx}, 1)" class="text-xs font-bold text-slate-600 hover:text-slate-900">+</button>
          </div>
          <span class="text-xs font-extrabold text-slate-900">${formatRupiah(item.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

/* ==========================================================================
   QRIS PAYMENT GATEWAY & CHECKOUT CONTROLLER
   ========================================================================== */
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast("Keranjang Anda masih kosong", "Checkout Error", "alert-circle");
    return;
  }

  toggleCartDrawer(false);

  const modal = document.getElementById('qris-checkout-modal');
  const stepForm = document.getElementById('qris-step-form');
  const stepDisplay = document.getElementById('qris-step-display');
  const itemCountEl = document.getElementById('qris-order-item-count');
  const itemsListEl = document.getElementById('qris-order-items-list');
  const totalPriceEl = document.getElementById('qris-order-total-price');

  if (!modal) return;

  const totalCount = state.cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalRp = getCartSubtotal();

  if (itemCountEl) itemCountEl.textContent = `${totalCount} Items`;
  if (totalPriceEl) totalPriceEl.textContent = formatRupiah(totalRp);

  if (itemsListEl) {
    itemsListEl.innerHTML = state.cart.map(i => `
      <div class="flex justify-between items-center py-1 border-b border-slate-100 text-xs">
        <span class="truncate max-w-[240px] text-slate-800 font-medium">${i.name} (${i.length}) x${i.quantity}</span>
        <span class="font-bold text-slate-900 shrink-0">${formatRupiah(i.price * i.quantity)}</span>
      </div>
    `).join('');
  }

  if (stepForm) stepForm.classList.remove('hidden');
  if (stepDisplay) stepDisplay.classList.add('hidden');

  modal.classList.remove('pointer-events-none', 'opacity-0');
  modal.classList.add('opacity-100');
  if (window.lucide) lucide.createIcons();
}

function submitQrisCheckout(event) {
  event.preventDefault();

  const name = document.getElementById('qris-cust-name')?.value || 'Pelanggan Howell';
  const phone = document.getElementById('qris-cust-phone')?.value || '-';
  const address = document.getElementById('qris-cust-address')?.value || '-';

  const stepForm = document.getElementById('qris-step-form');
  const stepDisplay = document.getElementById('qris-step-display');
  const totalRp = getCartSubtotal();

  if (!stepForm || !stepDisplay) return;

  stepForm.classList.add('hidden');
  stepDisplay.classList.remove('hidden');

  stepDisplay.innerHTML = `
    <div class="text-center space-y-4">
      <div class="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full text-emerald-700 text-xs font-bold">
        <span>✓</span> Standard QRIS Pembayaran Nasional
      </div>

      <h3 class="text-xl font-bold text-slate-900">Scan Barcode QRIS Resmi</h3>
      <p class="text-xs text-slate-500 max-w-sm mx-auto">Gunakan aplikasi e-Wallet atau m-Banking Anda untuk melakukan pembacaan Kode QRIS di bawah ini.</p>

      <div class="max-w-xs mx-auto p-5 rounded-3xl bg-white border-2 border-slate-900 shadow-2xl space-y-3 relative text-left">
        <div class="flex items-center justify-between border-b border-slate-200 pb-2">
          <div class="flex items-center gap-1">
            <span class="font-extrabold text-red-600 text-lg tracking-tighter">QRIS</span>
            <span class="text-[9px] font-mono text-slate-500 uppercase tracking-widest block leading-tight">GPN</span>
          </div>
          <span class="text-[10px] font-bold text-slate-400 uppercase">PT HOWELL NIAGA</span>
        </div>

        <div class="text-center py-1">
          <span class="block text-[11px] font-bold text-slate-500 uppercase">NAMA MERCHANT:</span>
          <h4 class="text-sm font-extrabold text-slate-900">PT HOWELL NIAGA INDONESIA</h4>
          <span class="block text-[10px] text-slate-400 font-mono">NMID: ID1024883019274</span>
        </div>

        <div class="w-56 h-56 mx-auto bg-white p-2 border-2 border-black rounded-2xl flex items-center justify-center shadow-inner relative">
          <svg class="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" fill="white"/>
            <rect x="10" y="10" width="50" height="50" rx="6" fill="black"/>
            <rect x="20" y="20" width="30" height="30" rx="3" fill="white"/>
            <rect x="27" y="27" width="16" height="16" rx="2" fill="black"/>
            <rect x="140" y="10" width="50" height="50" rx="6" fill="black"/>
            <rect x="150" y="20" width="30" height="30" rx="3" fill="white"/>
            <rect x="157" y="27" width="16" height="16" rx="2" fill="black"/>
            <rect x="10" y="140" width="50" height="50" rx="6" fill="black"/>
            <rect x="20" y="150" width="30" height="30" rx="3" fill="white"/>
            <rect x="27" y="157" width="16" height="16" rx="2" fill="black"/>
            <path d="M70 10h10v10H70zM90 10h20v10H90zM120 10h10v10h-10zM70 30h30v10H70zM110 30h20v10h-20zM70 50h10v10H70zM90 50h10v10H90zM110 50h20v10h-20zM10 70h60v10H10zM80 70h10v10H80zM100 70h20v10h-20zM130 70h60v10h-60zM10 90h20v10H10zM40 90h20v10H40zM70 90h30v10H70zM110 90h10v10h-10zM130 90h30v10h-30zM170 90h20v10h-20zM20 110h30v10H20zM60 110h20v10H60zM90 110h20v10H90zM120 110h20v10h-20zM150 110h30v10h-30zM70 130h20v10H70zM100 130h20v10h-20zM130 130h30v10h-30zM70 150h30v10H70zM110 150h20v10h-20zM140 150h20v10h-20zM170 150h20v10h-20zM70 170h10v10H70zM90 170h20v10H90zM120 170h30v10h-30zM160 170h20v10h-20z" fill="black"/>
            <rect x="75" y="75" width="50" height="50" rx="10" fill="white" stroke="black" stroke-width="3"/>
            <text x="100" y="105" font-size="14" font-weight="bold" fill="black" text-anchor="middle" font-family="sans-serif">HW</text>
          </svg>
        </div>

        <div class="text-center pt-2 border-t border-slate-200">
          <span class="text-[10px] font-bold text-slate-400 uppercase">TOTAL DIBAYARKAN:</span>
          <div class="text-xl font-extrabold text-emerald-600 font-mono">${formatRupiah(totalRp)}</div>
        </div>
      </div>

      <div class="p-3 rounded-2xl bg-slate-100 text-xs text-slate-600 space-y-1 max-w-sm mx-auto">
        <span class="block font-bold text-slate-800 text-[11px]">Dukungan Pembayaran QRIS:</span>
        <p class="text-[10px] leading-relaxed">BCA Mobile, Mandiri Livin, BRImo, BNI Mobile, GoPay, OVO, DANA, ShopeePay, LinkAja & Seluruh m-Banking GPN.</p>
      </div>

      <div class="pt-2 flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
        <button onclick="confirmQrisPayment('${name.replace(/'/g, "\\'")}', '${phone}', '${address.replace(/'/g, "\\'")}')" class="flex-1 btn-pill">
          <span class="btn-pill-inner bg-emerald-600 text-white w-full justify-center has-arrow py-3.5">
            <span>Saya Sudah Bayar (Konfirmasi WA)</span>
            <span class="btn-pill-badge bg-white text-emerald-700">💬</span>
          </span>
        </button>
      </div>
    </div>
  `;
}

function confirmQrisPayment(name, phone, address) {
  const totalRp = getCartSubtotal();
  const itemsText = state.cart.map(i => `• ${i.name} (${i.length}) x${i.quantity} = ${formatRupiah(i.price * i.quantity)}`).join('\n');

  let waMsg = `Halo *HOWELL Indonesia*, saya telah melakukan pembayaran via *QRIS Standar Nasional* dengan detail pesanan berikut:\n\n` +
    `*STRUK PESANAN KERANJANG HOWELL*\n` +
    `---------------------------------------\n` +
    `• *Nama Pembeli:* ${name}\n` +
    `• *No. WhatsApp:* ${phone}\n` +
    `• *Alamat Pengiriman:* ${address}\n\n` +
    `*ITEM PRODUK DIBELI:*\n${itemsText}\n\n` +
    `---------------------------------------\n` +
    `*TOTAL PEMBAYARAN QRIS:* ${formatRupiah(totalRp)}\n` +
    `*Status Pembayaran:* QRIS Success / Menunggu Pengiriman\n\n` +
    `Mohon segera memproses pengiriman pesanan saya. Terima kasih!`;

  const waUrl = `https://wa.me/6281188031976?text=${encodeURIComponent(waMsg)}`;
  window.open(waUrl, '_blank');

  clearCart();
  closeModal('qris-checkout-modal');
  showToast("Pesanan berhasil dikonfirmasi! Bukti pesanan dikirim via WhatsApp CS Howell.", "Pembayaran QRIS", "check-circle-2");
}



// Product Visual Renderer Helper (Handles PNG photos and SVG graphics with click-to-zoom lightbox)
function renderProductVisual(product, isLarge = false) {
  const pClass = isLarge ? 'p-4' : 'p-2';
  if (product.image) {
    const encodedSrc = encodeURI(product.image);
    const safeTitle = (product.name || '').replace(/'/g, "\\'");
    return `<img src="${encodedSrc}" alt="${product.name}" onclick="event.stopPropagation(); openImageZoom('${encodedSrc}', '${safeTitle}')" class="w-full h-full object-contain ${pClass} transition-transform duration-500 group-hover:scale-105 cursor-zoom-in" title="Click to zoom photo">`;
  }
  return product.svgRender || `<div class="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs uppercase">HOWELL Product</div>`;
}

// Catalog & Product Filtering Renderer
function renderCatalog() {
  const catalogGrid = document.getElementById('product-catalog-grid');
  const countEl = document.getElementById('catalog-count');
  if (!catalogGrid) return;

  let filtered = [...HOWELL_PRODUCTS];

  if (state.activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === state.activeCategory);
  }

  if (state.searchQuery.trim() !== '') {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || p.summary.toLowerCase().includes(query) || p.categoryName.toLowerCase().includes(query) || (p.sku && p.sku.toLowerCase().includes(query)));
  }

  if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (state.sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (countEl) {
    countEl.textContent = `${filtered.length} Products Available`;
  }

  if (filtered.length === 0) {
    catalogGrid.innerHTML = `
      <div class="col-span-full py-20 text-center glass-panel rounded-3xl p-8 border border-slate-300 dark:border-white/5">
        <div class="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto flex items-center justify-center text-slate-500 mb-4">
          <i data-lucide="search-x" class="w-8 h-8"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">No Matching Products Found</h3>
        <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">Try adjusting category filters or search keywords.</p>
        <button onclick="resetFilters()" class="mt-4 btn-howell-glass text-xs">Reset Filters</button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  catalogGrid.innerHTML = filtered.map(product => {
    const isWishlisted = state.wishlist.includes(product.id);

    return `
      <div class="glass-card p-4 flex flex-col justify-between group relative">
        <div>
          <!-- High-Contrast Clean Photo Container -->
          <div onclick="openProductDetail('${product.id}')" class="w-full h-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center cursor-pointer relative overflow-hidden shadow-inner">
            <span class="absolute top-2.5 left-2.5 badge-howell z-10">${product.badge}</span>
            <button onclick="event.stopPropagation(); wishlistSystem.toggle('${product.id}')" class="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/20 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-red-500 transition-colors z-10">
              <i data-lucide="heart" class="w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}"></i>
            </button>
            ${renderProductVisual(product)}
          </div>

          <!-- Simple Meta Information -->
          <div class="mt-3.5 space-y-1">
            <div class="flex items-center justify-between text-[11px]">
              <span class="font-extrabold text-amber-700 dark:text-yellow-400 uppercase tracking-wider">${product.categoryName}</span>
              ${product.sku ? `<span class="font-mono font-extrabold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-[10px] border border-slate-200 dark:border-white/10">SKU: ${product.sku}</span>` : ''}
            </div>
            <h3 onclick="openProductDetail('${product.id}')" class="text-sm font-extrabold text-slate-900 dark:text-white cursor-pointer hover:text-yellow-500 transition-colors line-clamp-1 leading-snug">${product.name}</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">${product.tagline}</p>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
          <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i> Ready Stock
          </span>
          <button onclick="openProductDetail('${product.id}')" class="btn-howell-primary text-xs py-2 px-3.5 flex items-center gap-1.5 font-bold">
            <i data-lucide="file-text" class="w-3.5 h-3.5"></i> View Specs
          </button>
        </div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

function renderFeaturedProducts() {
  const featuredGrid = document.getElementById('featured-products-grid');
  if (!featuredGrid) return;

  const featuredList = HOWELL_PRODUCTS.slice(0, 8);
  featuredGrid.innerHTML = featuredList.map(product => {
    const isWishlisted = state.wishlist.includes(product.id);

    return `
      <div class="glass-card p-4 flex flex-col justify-between group relative">
        <div>
          <div onclick="openProductDetail('${product.id}')" class="w-full h-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center cursor-pointer relative overflow-hidden shadow-inner">
            <span class="absolute top-2.5 left-2.5 badge-howell z-10">${product.badge}</span>
            <button onclick="event.stopPropagation(); wishlistSystem.toggle('${product.id}')" class="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/20 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-red-500 transition-colors z-10">
              <i data-lucide="heart" class="w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}"></i>
            </button>
            ${renderProductVisual(product)}
          </div>

          <div class="mt-3.5 space-y-1">
            <div class="flex items-center justify-between text-[11px]">
              <span class="font-extrabold text-amber-700 dark:text-yellow-400 uppercase tracking-wider">${product.categoryName}</span>
              ${product.sku ? `<span class="font-mono font-extrabold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-[10px] border border-slate-200 dark:border-white/10">SKU: ${product.sku}</span>` : ''}
            </div>
            <h3 onclick="openProductDetail('${product.id}')" class="text-sm font-extrabold text-slate-900 dark:text-white cursor-pointer hover:text-yellow-500 transition-colors line-clamp-1 leading-snug">${product.name}</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">${product.tagline}</p>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
          <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i> Ready Stock
          </span>
          <button onclick="openProductDetail('${product.id}')" class="btn-howell-primary text-xs py-2 px-3.5 flex items-center gap-1.5 font-bold">
            <i data-lucide="file-text" class="w-3.5 h-3.5"></i> View Specs
          </button>
        </div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

function renderCategoryCards() {
  const categoryContainer = document.getElementById('category-cards-grid');
  if (!categoryContainer) return;

  categoryContainer.innerHTML = HOWELL_CATEGORIES.map(cat => `
    <div onclick="filterByCategory('${cat.id}')" class="glass-card p-6 cursor-pointer flex flex-col justify-between group hover:border-yellow-500/60">
      <div>
        <div class="w-11 h-11 rounded-2xl bg-yellow-400/20 text-yellow-700 dark:text-yellow-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <i data-lucide="${cat.icon}" class="w-5 h-5"></i>
        </div>
        <h3 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-yellow-400 transition-colors tracking-tight">${cat.name}</h3>
        <p class="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">${cat.desc}</p>
      </div>
      <div class="mt-6 flex items-center justify-between text-xs font-bold text-amber-700 dark:text-yellow-400">
        <span>${cat.count} SKUs Available</span>
        <i data-lucide="arrow-right" class="w-4 h-4 transform group-hover:translate-x-1 transition-transform"></i>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

// Product Detail Modal
function openProductDetail(productId) {
  const product = HOWELL_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  state.activeProductDetail = product;
  state.activeLength = product.variants?.lengths?.[0] || 'Standard';
  state.activeColor = product.variants?.colors?.[0] || 'Standard';
  state.activeDetailTab = 'desc';

  const modalEl = document.getElementById('product-detail-modal');
  const containerEl = document.getElementById('product-detail-content');
  if (!modalEl || !containerEl) return;

  containerEl.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8">
      <!-- Left Column: Product Photo & Key Highlights -->
      <div class="lg:col-span-6 flex flex-col gap-4">
        <div class="w-full h-80 md:h-96 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-6 flex items-center justify-center relative overflow-hidden group shadow-inner">
          <div class="absolute top-4 left-4 z-10 flex gap-2">
            <span class="badge-howell">${product.badge}</span>
            <span class="badge-new">HOWELL Certified</span>
          </div>
          <div class="w-full h-full flex items-center justify-center overflow-hidden">
            ${renderProductVisual(product, true)}
          </div>
        </div>
        <div class="grid grid-cols-3 gap-3 text-center">
          <div class="glass-panel p-3 rounded-xl border border-slate-200 dark:border-white/5">
            <div class="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Warranty</div>
            <div class="text-xs font-bold text-amber-700 dark:text-yellow-400 mt-0.5">12 Months</div>
          </div>
          <div class="glass-panel p-3 rounded-xl border border-slate-200 dark:border-white/5">
            <div class="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Availability</div>
            <div class="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">Ready Stock</div>
          </div>
          <div class="glass-panel p-3 rounded-xl border border-slate-200 dark:border-white/5">
            <div class="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Quality</div>
            <div class="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Industrial Grade</div>
          </div>
        </div>
      </div>

      <!-- Right Column: Product Technical Overview & Actions -->
      <div class="lg:col-span-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-extrabold text-amber-700 dark:text-yellow-400 uppercase tracking-wider">${product.categoryName}</span>
            ${product.sku ? `<span class="text-xs font-mono font-extrabold px-2.5 py-0.5 rounded bg-yellow-400/20 text-yellow-700 dark:text-yellow-400 border border-yellow-400/40">SKU: ${product.sku}</span>` : ''}
          </div>
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mt-1.5 leading-snug tracking-tight">${product.name}</h2>
          
          <div class="flex items-center gap-3 mt-2 text-xs">
            <div class="flex items-center gap-1 text-amber-600 dark:text-yellow-400 font-bold">
              <i data-lucide="star" class="w-4 h-4 fill-current"></i>
              <span>${product.rating}</span>
            </div>
            <span class="text-slate-400">•</span>
            <span class="text-slate-600 dark:text-slate-400 font-medium">${product.reviewsCount} User Reviews</span>
            <span class="text-slate-400">•</span>
            <span class="text-green-600 dark:text-green-400 font-bold">In Stock</span>
          </div>

          <div class="mt-4 p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <p class="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">${product.summary}</p>
          </div>

          ${product.variants?.lengths ? `
            <div class="mt-5">
              <label class="block text-xs font-bold text-slate-900 dark:text-slate-300 uppercase tracking-wider mb-2">Available Sizes / Lengths:</label>
              <div class="flex flex-wrap gap-2">
                ${product.variants.lengths.map(len => `
                  <button onclick="selectVariantLength('${len}')" class="px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${state.activeLength === len ? 'bg-yellow-400 text-black border-yellow-400 shadow-md' : 'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-300'}">
                    ${len}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

        <div class="mt-6 pt-4 border-t border-slate-200">
          <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Beli di Marketplace Resmi:</div>
          <div class="flex items-center gap-2 mb-4">
            <a href="https://shopee.co.id/howellcable?categoryId=100013&entryPoint=ShopByPDP&itemId=49006388534" target="_blank" rel="noopener noreferrer" class="flex-1 py-2 px-2 rounded-xl bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 text-orange-600 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all">
              <img src="assets/shopee-logo.webp" alt="Shopee" class="w-4 h-4 object-contain">
              <span>Shopee</span>
            </a>
            <a href="https://tk.tokopedia.com/ZSqShWPvf/" target="_blank" rel="noopener noreferrer" class="flex-1 py-2 px-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-600 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all">
              <img src="assets/tokopedia-logo.png" alt="Tokopedia" class="w-4 h-4 object-contain">
              <span>Tokopedia</span>
            </a>
            <a href="https://www.tiktok.com/@howell_official?_r=1&_t=ZS-99aNN6XJUF2" target="_blank" rel="noopener noreferrer" class="flex-1 py-2 px-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all">
              <img src="assets/tiktok-logo.avif" alt="TikTok" class="w-4 h-4 object-contain rounded-sm">
              <span>TikTok</span>
            </a>
          </div>
        </div>

        <div class="mt-4 flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
          <button onclick="closeModal('product-detail-modal'); openB2BModal('${(product.name || '').replace(/'/g, "\\'")}');" class="flex-1 btn-howell-primary text-xs py-3.5 flex items-center justify-center gap-2 font-bold">
            <i data-lucide="file-text" class="w-4 h-4"></i> Request B2B Quote
          </button>
          <button onclick="window.open('https://wa.me/6281188031976', '_blank'); closeModal('product-detail-modal');" class="btn-howell-glass text-xs py-3.5 px-6 flex items-center justify-center gap-1.5 font-bold">
            <i data-lucide="message-circle" class="w-4 h-4 text-green-500"></i> Contact Specialist
          </button>
        </div>
      </div>
    </div>

    <!-- Accordion / Specification Tabs -->
    <div class="border-t border-slate-200 dark:border-white/10 p-6 md:p-8 bg-slate-50 dark:bg-slate-950/50 rounded-b-3xl">
      <div class="flex border-b border-slate-200 dark:border-white/10 gap-6 text-sm font-semibold mb-4">
        <button onclick="switchDetailTab('desc')" id="tab-btn-desc" class="pb-3 border-b-2 border-yellow-500 text-amber-700 dark:text-yellow-400 font-bold transition-colors">Product Overview</button>
        <button onclick="switchDetailTab('specs')" id="tab-btn-specs" class="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Technical Specifications</button>
        <button onclick="switchDetailTab('warranty')" id="tab-btn-warranty" class="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Warranty & Compliance</button>
      </div>

      <div id="tab-content-desc" class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>${product.description}</p>
      </div>

      <div id="tab-content-specs" class="hidden text-xs sm:text-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${Object.entries(product.specs).map(([key, val]) => `
            <div class="flex justify-between p-3 rounded-xl bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/5 text-xs">
              <span class="text-slate-600 dark:text-slate-400 font-semibold">${key}:</span>
              <span class="font-bold text-slate-900 dark:text-slate-100">${val}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div id="tab-content-warranty" class="hidden text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-3">
        <div class="p-4 rounded-2xl bg-amber-100 dark:bg-yellow-400/10 border border-amber-300 dark:border-yellow-400/30 text-xs">
          <h4 class="font-bold text-amber-900 dark:text-yellow-400 mb-1">Official 12-Month Replacement Warranty (PT Howell Niaga Indonesia)</h4>
          <p>Instant replacement guarantee against manufacturing flaws. Claims can be processed nationwide across all authorized Howell service locations.</p>
        </div>
      </div>
    </div>
  `;

  modalEl.classList.remove('hidden');
  lucide.createIcons();
}

function selectVariantLength(length) {
  state.activeLength = length;
}

function switchDetailTab(tabKey) {
  state.activeDetailTab = tabKey;
  ['desc', 'specs', 'warranty'].forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    const content = document.getElementById(`tab-content-${t}`);
    if (btn && content) {
      if (t === tabKey) {
        btn.className = 'pb-3 border-b-2 border-yellow-500 text-amber-700 dark:text-yellow-400 font-bold transition-colors';
        content.classList.remove('hidden');
      } else {
        btn.className = 'pb-3 border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors';
        content.classList.add('hidden');
      }
    }
  });
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('hidden');
}

function toggleInlineB2BForm(show = true, partnerType = '') {
  const formCard = document.getElementById('kerjasama-form-card');
  if (!formCard) return;

  if (!show) {
    formCard.classList.add('hidden');
    return;
  }

  formCard.classList.remove('hidden');

  if (partnerType) {
    showToast(`Formulir Kerjasama (${partnerType}) ditampilkan`, "HOWELL B2B", "handshake");
  }

  setTimeout(() => {
    formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);

  if (window.lucide) lucide.createIcons();
}

function openB2BModal(productName = '') {
  const modal = document.getElementById('b2b-kerjasama-modal');
  const catatanInput = document.getElementById('b2b-modal-catatan') || document.getElementById('b2b-modal-product-note');

  if (productName && catatanInput) {
    catatanInput.value = `Permintaan Quote untuk Produk: ${productName}`;
  }

  if (modal) {
    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }
}

function closeB2BModal() {
  closeModal('b2b-kerjasama-modal');
}

function handleB2BSubmit(event, source = 'modal') {
  event.preventDefault();

  const prefix = source === 'inline' ? 'b2b-inline-' : 'b2b-modal-';

  const company = document.getElementById(`${prefix}perusahaan`)?.value || document.getElementById(`${prefix}company`)?.value || '';
  const city = document.getElementById(`${prefix}kota`)?.value || document.getElementById(`${prefix}city`)?.value || '';
  const province = document.getElementById(`${prefix}provinsi`)?.value || document.getElementById(`${prefix}province`)?.value || '';
  const postal = document.getElementById(`${prefix}kodepos`)?.value || document.getElementById(`${prefix}postal`)?.value || '';
  const pic = document.getElementById(`${prefix}pic`)?.value || '';
  const phone = document.getElementById(`${prefix}telp`)?.value || document.getElementById(`${prefix}phone`)?.value || '-';
  const email = document.getElementById(`${prefix}email`)?.value || '';
  const productNote = document.getElementById(`${prefix}catatan`)?.value || document.getElementById(`${prefix}product-note`)?.value || '';

  let message = `Halo HOWELL Indonesia, saya ingin mengajukan *Kerjasama B2B / Procurement* dengan rincian berikut:\n\n` +
    `*FORM KERJASAMA B2B HOWELL*\n` +
    `---------------------------------------\n` +
    `• *Nama Perusahaan:* ${company}\n` +
    `• *Kota:* ${city}\n` +
    `• *Provinsi:* ${province}\n` +
    `• *Kode Pos:* ${postal}\n` +
    `• *PIC:* ${pic}\n` +
    `• *Nomor Telp:* ${phone}\n` +
    `• *Email:* ${email}\n`;

  if (productNote) {
    message += `• *Catatan / Detail Produk:* ${productNote}\n`;
  }

  message += `---------------------------------------\n` +
    `Mohon informasi lebih lanjut mengenai katalog B2B dan penawaran harga terbaik. Terima kasih!`;

  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/6281188031976?text=${encodedMessage}`;

  window.open(waUrl, '_blank');

  if (source === 'modal') {
    closeB2BModal();
  }

  showToast('Form Kerjasama B2B dikirim ke WhatsApp Official Howell!', 'B2B Kerjasama', 'message-square');
}

function openSupportModal() {
  const modal = document.getElementById('support-howell-modal');
  if (modal) {
    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }
}

function openImageZoom(imgSrc, title) {
  const modal = document.getElementById('image-zoom-modal');
  const img = document.getElementById('zoom-modal-img');
  const titleEl = document.getElementById('zoom-modal-title');
  if (!modal || !img) return;

  img.src = imgSrc;
  if (titleEl) titleEl.textContent = title || 'HOWELL Product Photo';
  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleSearchOverlay(open) {
  const overlay = document.getElementById('search-overlay');
  if (overlay) {
    overlay.classList.toggle('hidden', !open);
    if (open) {
      const input = document.getElementById('search-input-field');
      if (input) input.focus();
    }
  }
}

function filterByCategory(catId) {
  state.activeCategory = catId;
  const categorySelect = document.getElementById('category-filter-select');
  if (categorySelect) categorySelect.value = catId;
  renderCatalog();
  scrollToSection('catalog-section');
}

function handleSearchInput(query) {
  state.searchQuery = query;
  renderCatalog();
  
  const liveResults = document.getElementById('search-live-results');
  if (!liveResults) return;

  if (query.trim() === '') {
    liveResults.innerHTML = '<p class="text-xs text-slate-500 text-center py-4">Type keywords to search HOWELL catalog...</p>';
    return;
  }

  const matches = HOWELL_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.categoryName.toLowerCase().includes(query.toLowerCase())).slice(0, 4);

  if (matches.length === 0) {
    liveResults.innerHTML = '<p class="text-xs text-slate-400 text-center py-4">No matching products found.</p>';
  } else {
    liveResults.innerHTML = matches.map(p => `
      <div onclick="openProductDetail('${p.id}'); toggleSearchOverlay(false);" class="glass-panel p-3 rounded-xl flex items-center gap-3 cursor-pointer hover:border-yellow-400/50">
        <div class="w-12 h-12 rounded-lg bg-slate-900 border border-white/10 p-1 flex items-center justify-center shrink-0">
          ${p.svgRender}
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-bold text-slate-900 dark:text-white truncate">${p.name}</h4>
          <span class="text-[10px] text-amber-700 dark:text-yellow-400 font-bold">${p.categoryName}</span>
        </div>
        <button class="btn-howell-glass text-[10px] py-1 px-2.5">Specs</button>
      </div>
    `).join('');
  }
}

function resetFilters() {
  state.activeCategory = 'all';
  state.searchQuery = '';
  state.sortBy = 'featured';

  const categorySelect = document.getElementById('category-filter-select');
  if (categorySelect) categorySelect.value = 'all';

  renderCatalog();
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// Initializer
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderCategoryCards();
  renderFeaturedProducts();
  renderCatalog();
  initThinFuelOilEffect();
  initStackingCardEffect();

  // Intersection Observer for Smooth Reveal-on-Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section:not(#hero-section), .glass-card').forEach(el => {
    el.classList.add('reveal-on-scroll');
    revealObserver.observe(el);
  });

  window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    const scrollTopBtn = document.getElementById('scroll-to-top-btn');
    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      } else {
        scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
      }
    }
  });

  const catSelect = document.getElementById('category-filter-select');
  if (catSelect) {
    catSelect.addEventListener('change', (e) => {
      state.activeCategory = e.target.value;
      renderCatalog();
    });
  }

  const sortSelect = document.getElementById('sort-filter-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderCatalog();
    });
  }

  lucide.createIcons();
});

// Professional Thin Liquid Fuel / Oil Ripple Refraction Engine
function initThinFuelOilEffect() {
  const heroSection = document.getElementById('hero-section');
  const canvas = document.getElementById('fuel-canvas');
  const dispMap = document.getElementById('fuel-displacement');
  const turbEl = document.getElementById('fuel-turbulence');
  if (!heroSection || !canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let ripples = [];
  let lastMouse = { x: 0, y: 0 };
  let targetDisplacement = 0;
  let currentDisplacement = 0;

  function resize() {
    width = canvas.width = heroSection.offsetWidth;
    height = canvas.height = heroSection.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  // Thin liquid fuel droplet ripple ring (Exact 10% Opacity)
  class ThinFuelRipple {
    constructor(x, y, vx, vy) {
      this.x = x;
      this.y = y;
      this.radius = Math.random() * 5 + 4;
      this.maxRadius = Math.random() * 35 + 25;
      this.speed = Math.random() * 0.7 + 0.5;
      this.alpha = 0.10; // Exact 10% opacity
      this.decay = Math.random() * 0.005 + 0.003;
      this.vx = (vx || 0) * 0.04;
      this.vy = (vy || 0) * 0.04;
    }

    update() {
      this.radius += this.speed;
      this.alpha -= this.decay;
      this.x += this.vx;
      this.y += this.vy;
    }

    draw(context) {
      if (this.alpha <= 0) return;
      context.save();
      
      // Thin liquid fuel specular sheen gradient (10% Opacity Base)
      const grad = context.createRadialGradient(
        this.x - this.radius * 0.15, this.y - this.radius * 0.15, 0,
        this.x, this.y, this.radius
      );
      
      grad.addColorStop(0, `rgba(255, 255, 255, ${this.alpha * 0.8})`);
      grad.addColorStop(0.6, `rgba(255, 255, 255, ${this.alpha * 0.4})`);
      grad.addColorStop(0.9, `rgba(0, 0, 0, ${this.alpha * 0.2})`);
      grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

      context.fillStyle = grad;
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fill();

      // Thin fuel surface rim reflection highlight
      context.strokeStyle = `rgba(255, 255, 255, ${this.alpha * 0.9})`;
      context.lineWidth = 0.8;
      context.beginPath();
      context.arc(this.x, this.y, this.radius * 0.92, 0, Math.PI * 2);
      context.stroke();

      context.restore();
    }
  }

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - lastMouse.x;
    const dy = y - lastMouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Subtle liquid displacement scale (faint 10% wave max)
    targetDisplacement = Math.min(8, dist * 0.15 + 2);

    if (dist > 3) {
      ripples.push(new ThinFuelRipple(x, y, dx, dy));
      if (Math.random() < 0.35) {
        ripples.push(new ThinFuelRipple(x + (Math.random() - 0.5) * 14, y + (Math.random() - 0.5) * 14, dx * 0.3, dy * 0.3));
      }
    }

    lastMouse.x = x;
    lastMouse.y = y;
  });

  heroSection.addEventListener('mouseleave', () => {
    targetDisplacement = 0;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    currentDisplacement += (targetDisplacement - currentDisplacement) * 0.07;
    targetDisplacement *= 0.91;

    if (dispMap) {
      dispMap.setAttribute('scale', currentDisplacement.toFixed(2));
    }
    if (turbEl) {
      const freqX = 0.009 + (currentDisplacement * 0.0002);
      const freqY = 0.014 + (currentDisplacement * 0.0003);
      turbEl.setAttribute('baseFrequency', `${freqX.toFixed(4)} ${freqY.toFixed(4)}`);
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.update();
      r.draw(ctx);
      if (r.alpha <= 0 || r.radius >= r.maxRadius) {
        ripples.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// Permanent Default Scroll Transition Engine (3D Card Stacking)
function setScrollTransitionMode(mode = 'stack') {
  document.body.classList.remove('transition-parallax', 'transition-curtain', 'transition-zoom');
  document.body.classList.add('transition-stack');
}

function initStackingCardEffect() {
  setScrollTransitionMode('stack');

  const cards = Array.from(document.querySelectorAll('.stack-card'));
  if (cards.length === 0) return;

  let ticking = false;

  function updateStacking() {
    const stickyTop = 84;
    const vh = window.innerHeight;

    for (let i = 0; i < cards.length - 1; i++) {
      const card = cards[i];
      const nextCard = cards[i + 1];
      const nextRect = nextCard.getBoundingClientRect();

      if (nextRect.top < vh && nextRect.top > stickyTop) {
        const rawProgress = (vh - nextRect.top) / (vh - stickyTop);
        const progress = Math.min(Math.max(rawProgress, 0), 1);

        const scale = 1 - (progress * 0.04);
        const translateY = -(progress * 16);
        const opacity = 1 - (progress * 0.15);

        card.style.transform = `scale(${scale.toFixed(4)}) translateY(${translateY.toFixed(2)}px)`;
        card.style.opacity = opacity.toFixed(3);
        card.style.filter = 'none';
      } else if (nextRect.top <= stickyTop) {
        card.style.transform = `scale(0.96) translateY(-16px)`;
        card.style.opacity = '0.85';
        card.style.filter = 'none';
      } else {
        card.style.transform = 'scale(1) translateY(0px)';
        card.style.opacity = '1';
        card.style.filter = 'none';
      }
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateStacking);
      ticking = true;
    }
  }, { passive: true });

  updateStacking();
}

