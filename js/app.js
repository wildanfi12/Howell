/**
 * HOWELL Official Showcase Catalog Controller
 * Brand: HOWELL (PT Howell Niaga Indonesia) - Est. 2009
 * Features: High-Contrast Light & Dark Mode, Apple Aesthetics, Pure Showcase Catalog with Cart & QRIS Gateway
 */

// ============================================================
// Smooth Scroll Navigation Helper
// ============================================================
window.scrollToId = function(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const headerOffset = document.getElementById('site-header')
    ? document.getElementById('site-header').offsetHeight
    : 80;
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: 'smooth' });
};


// Global Application State
const state = {
  wishlist: [],
  cart: JSON.parse(localStorage.getItem('howell_cart') || '[]'),
  activeCategory: 'all',
  sortBy: 'relevance',
  searchQuery: '',
  priceFilter: 'all',
  availabilityStock: false,
  availabilityWarranty: false,
  viewMode: 'grid',
  catalogExpanded: false,
  catalogInitialLimit: 6,
  activeProductDetail: null,
  activeDetailTab: 'specs',
  activeLength: null,
  activeColor: null,
  detailQty: 1,
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
  toast.className = 'glass-panel p-4 rounded-2xl border border-yellow-500/40 shadow-2xl flex items-center gap-3 transform translate-y-4 opacity-0 transition-all duration-300 pointer-events-auto min-w-[280px] max-w-md bg-white/90 backdrop-blur-xl z-50';
  toast.innerHTML = `
    <div class="w-9 h-9 rounded-full bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center text-yellow-700 font-bold shrink-0">
      <i data-lucide="${icon}" class="w-4 h-4"></i>
    </div>
    <div class="flex-1">
      <h4 class="text-xs font-bold text-yellow-800 uppercase tracking-wider">${title}</h4>
      <p class="text-xs text-slate-800 mt-0.5">${message}</p>
    </div>
    <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-slate-900 p-1">
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>
  `;
  
  toastContainer.appendChild(toast);
  if (window.lucide) lucide.createIcons();

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
      showToast("Removed from saved products", "Favorites", "heart-off");
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
          <button onclick="removeFromCart(${idx})" class="text-slate-400 hover:text-red-500 text-xs transition-colors p-1" title="Hapus Item">âœ•</button>
        </div>
        <h4 class="text-xs font-bold text-slate-900 truncate leading-snug">${item.name}</h4>
        <div class="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
          <span class="bg-slate-200 px-1.5 py-0.2 rounded font-semibold text-slate-700">${item.length}</span>
          <span class="font-extrabold text-emerald-600">${formatRupiah(item.price)}</span>
        </div>
        <div class="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-200">
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
        <span>âœ“</span> Standard QRIS Pembayaran Nasional
      </div>

      <h3 class="text-xl font-bold text-slate-900">Scan Barcode QRIS Resmi</h3>
      <p class="text-xs text-slate-500 max-w-sm mx-auto">Gunakan aplikasi e-Wallet atau m-Banking Anda untuk melakukan pembayaran QRIS di bawah ini.</p>

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
            <span class="btn-pill-badge bg-white text-emerald-700">ðŸ’¬</span>
          </span>
        </button>
      </div>
    </div>
  `;
}

function confirmQrisPayment(name, phone, address) {
  const totalRp = getCartSubtotal();
  const itemsText = state.cart.map(i => `â€¢ ${i.name} (${i.length}) x${i.quantity} = ${formatRupiah(i.price * i.quantity)}`).join('\n');

  let waMsg = `Halo *HOWELL Indonesia*, saya telah melakukan pembayaran via *QRIS Standar Nasional* dengan detail pesanan berikut:\n\n` +
    `*STRUK PESANAN KERANJANG HOWELL*\n` +
    `---------------------------------------\n` +
    `â€¢ *Nama Pembeli:* ${name}\n` +
    `â€¢ *No. WhatsApp:* ${phone}\n` +
    `â€¢ *Alamat Pengiriman:* ${address}\n\n` +
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

// Product Specifications Snippet for Cards
function renderProductSpecsSnippet(product) {
  const ignored = ['Barcodes', 'Barcode', 'SKU Series', 'SKU Code', 'Warranty'];
  const entries = [];
  if (product.specs) {
    for (const [k, v] of Object.entries(product.specs)) {
      if (!ignored.includes(k) && v) {
        entries.push({ key: k, val: v });
      }
    }
  }

  const topEntries = entries.slice(0, 2);
  let html = '';
  if (topEntries.length > 0) {
    html = topEntries.map(e => `
      <div class="flex items-center justify-between text-[11px] leading-tight py-0.5 border-b border-slate-200/50 last:border-0">
        <span class="text-slate-500 font-medium shrink-0">${e.key}:</span>
        <span class="font-bold text-slate-800 text-right truncate max-w-[170px]">${e.val}</span>
      </div>
    `).join('');
  }

  if (product.tagline) {
    html += `
      <div class="pt-1 mt-0.5 text-[10px] text-slate-500 truncate font-medium flex items-center gap-1" title="${product.tagline}">
        <span class="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
        <span class="truncate">${product.tagline}</span>
      </div>
    `;
  }

  return html || `<div class="text-[11px] text-slate-500">Standar Industri HOWELL Original</div>`;
}

// Product Visual Renderer Helper
function renderProductVisual(product, isLarge = false) {
  const pClass = isLarge ? 'p-4' : 'p-3';
  if (product.image) {
    const encodedSrc = encodeURI(product.image);
    const safeTitle = (product.name || '').replace(/'/g, "\\'");
    return `
      <div class="relative w-full h-full flex items-center justify-center group/img overflow-hidden">
        <img src="${encodedSrc}" alt="${product.name}" onclick="event.stopPropagation(); openImageZoom('${encodedSrc}', '${safeTitle}')" class="w-full h-full object-contain ${pClass} transition-transform duration-500 group-hover/img:scale-105 cursor-zoom-in" title="Klik foto untuk perbesar / zoom">
        
        <!-- Hover Zoom Overlay Hint -->
        <div onclick="event.stopPropagation(); openImageZoom('${encodedSrc}', '${safeTitle}')" class="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white text-xs font-bold gap-1.5 backdrop-blur-[2px] cursor-pointer">
          <i data-lucide="zoom-in" class="w-4 h-4 text-amber-400"></i>
          <span>Zoom Foto</span>
        </div>

        <!-- Floating Zoom Pill Button -->
        <button type="button" onclick="event.stopPropagation(); openImageZoom('${encodedSrc}', '${safeTitle}')" class="absolute bottom-2.5 right-2.5 z-20 px-2.5 py-1 rounded-full bg-slate-900/85 hover:bg-black text-white text-[10px] sm:text-[11px] font-bold flex items-center gap-1.5 shadow-md backdrop-blur-md transition-all hover:scale-105 border border-white/20 select-none cursor-pointer" title="Perbesar / Zoom Foto">
          <i data-lucide="zoom-in" class="w-3.5 h-3.5 text-amber-400"></i>
          <span>Zoom</span>
        </button>
      </div>
    `;
  }
  return product.svgRender || `<div class="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs uppercase font-sans">HOWELL Product</div>`;
}

// Select Length Variant & Update Price Dynamic
// Select Length Variant & Update Price Dynamically (CableTime Style)
function selectVariantLength(len) {
  state.activeLength = len;
  const product = state.activeProductDetail;
  if (!product) return;

  let price = product.price || 0;
  if (product.variantPrices && product.variantPrices[len]) {
    price = product.variantPrices[len];
  }

  const priceEl = document.getElementById('detail-active-price') || document.getElementById('modal-product-price');
  if (priceEl) priceEl.textContent = formatRupiah(price);

  document.querySelectorAll('#detail-length-pills button, #product-detail-modal button[data-variant-length]').forEach(btn => {
    if (btn.getAttribute('data-variant-length') === len) {
      btn.className = 'px-3.5 py-2 rounded-xl text-xs font-bold border transition-all bg-amber-400 text-slate-950 border-amber-400 shadow-sm';
    } else {
      btn.className = 'px-3.5 py-2 rounded-xl text-xs font-bold border transition-all bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
    }
  });
}


// CableTime Filter Accordion Controller
function toggleFilterAccordion(type) {
  const body = document.getElementById(`acc-body-${type}`);
  const icon = document.getElementById(`acc-icon-${type}`);
  if (!body) return;
  body.classList.toggle('hidden');
  if (icon) {
    icon.textContent = body.classList.contains('hidden') ? '+' : '-';
  }
}

// CableTime Sidebar Toggle Controller
function toggleCatalogSidebar() {
  const sidebar = document.getElementById('catalog-filter-sidebar');
  const btn = document.getElementById('btn-toggle-filter');
  if (!sidebar) return;
  sidebar.classList.toggle('hidden');
  if (btn) {
    if (sidebar.classList.contains('hidden')) {
      btn.className = 'flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 bg-white text-[13px] font-medium text-slate-800 hover:border-slate-400 hover:bg-slate-50 transition-all select-none cursor-pointer';
    } else {
      btn.className = 'flex items-center gap-2 px-4 py-2 rounded-full border border-slate-900 bg-slate-900 text-white text-[13px] font-medium shadow-sm transition-all select-none cursor-pointer';
    }
  }
}

// CableTime Price Range Filter
function changePriceFilter(val) {
  state.priceFilter = val;
  renderCatalog();
}

// CableTime Availability Filter
function applyAvailabilityFilter() {
  const stockEl = document.getElementById('filter-stock-ready');
  const warrEl = document.getElementById('filter-official-warranty');
  state.availabilityStock = stockEl ? stockEl.checked : false;
  state.availabilityWarranty = warrEl ? warrEl.checked : false;
  renderCatalog();
}

// CableTime Sort Change
function changeCatalogSort(val) {
  state.sortBy = val;
  renderCatalog();
}

// CableTime View Mode Toggle (Grid vs List)
function setCatalogViewMode(mode) {
  state.viewMode = mode;
  const gridBtn = document.getElementById('view-mode-grid-btn');
  const listBtn = document.getElementById('view-mode-list-btn');
  if (gridBtn && listBtn) {
    if (mode === 'grid') {
      gridBtn.className = 'w-8 h-8 rounded-lg flex items-center justify-center bg-black text-white transition-all shadow-sm cursor-pointer';
      listBtn.className = 'w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all cursor-pointer';
    } else {
      listBtn.className = 'w-8 h-8 rounded-lg flex items-center justify-center bg-black text-white transition-all shadow-sm cursor-pointer';
      gridBtn.className = 'w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all cursor-pointer';
    }
  }
  renderCatalog();
}

// Catalog & Product Filtering Renderer (CableTime Collections Style)
function renderCatalog() {
  const catalogGrid = document.getElementById('product-catalog-grid');
  const countEl = document.getElementById('catalog-count');
  const loadMoreBox = document.getElementById('catalog-load-more-box');
  if (!catalogGrid) return;

  let filtered = [...HOWELL_PRODUCTS];

  // Category filter
  if (state.activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === state.activeCategory);
  }

  // Live search query filter
  if (state.searchQuery.trim() !== '') {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.summary.toLowerCase().includes(query) || 
      p.categoryName.toLowerCase().includes(query) || 
      (p.sku && p.sku.toLowerCase().includes(query))
    );
  }

  // Price range filter
  if (state.priceFilter === 'under50k') {
    filtered = filtered.filter(p => p.price < 50000);
  } else if (state.priceFilter === '50k-150k') {
    filtered = filtered.filter(p => p.price >= 50000 && p.price <= 150000);
  } else if (state.priceFilter === 'over150k') {
    filtered = filtered.filter(p => p.price > 150000);
  }

  // Availability filter
  if (state.availabilityStock) {
    filtered = filtered.filter(p => p.rating >= 4.0);
  }

  // Sorting logic (CableTime)
  if (state.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Update live count matching CableTime
  if (countEl) {
    countEl.textContent = `${filtered.length} produk`;
  }

  // Render Sidebar Category Accordion (#acc-body-category) - Flat minimal CableTime style
  const catContainer = document.getElementById('acc-body-category');
  if (catContainer) {
    const allCount = HOWELL_PRODUCTS.length;
    catContainer.innerHTML = `
      <button type="button" onclick="filterByCategory('all')" class="w-full flex items-center justify-between py-1 text-left text-[13px] transition-colors ${state.activeCategory === 'all' ? 'text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'}">
        <span>Semua Produk</span>
        <span class="text-[11px] text-slate-400">(${allCount})</span>
      </button>
      ${HOWELL_CATEGORIES.map(cat => {
        const count = HOWELL_PRODUCTS.filter(p => p.category === cat.id).length;
        const isActive = state.activeCategory === cat.id;
        return `
          <button type="button" onclick="filterByCategory('${cat.id}')" class="w-full flex items-center justify-between py-1 text-left text-[13px] transition-colors ${isActive ? 'text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'}">
            <span class="truncate">${cat.name}</span>
            <span class="text-[11px] text-slate-400 shrink-0 ml-1">(${count})</span>
          </button>
        `;
      }).join('')}
    `;
  }

  if (filtered.length === 0) {
    catalogGrid.className = 'col-span-full py-16 text-center';
    catalogGrid.innerHTML = `
      <div class="py-16 text-center rounded-2xl p-8 border border-slate-200 font-sans max-w-md mx-auto">
        <div class="w-14 h-14 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400 mb-4">
          <i data-lucide="search-x" class="w-7 h-7"></i>
        </div>
        <h3 class="text-base font-bold text-slate-900">Tidak Ada Produk yang Sesuai</h3>
        <p class="text-xs text-slate-500 mt-1">Coba sesuaikan filter atau kategori produk Anda.</p>
        <button onclick="resetFilters()" class="mt-4 px-5 py-2 rounded-full bg-black text-white text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer">Reset Filter</button>
      </div>
    `;
    if (loadMoreBox) loadMoreBox.innerHTML = '';
    if (window.lucide) lucide.createIcons();
    return;
  }

  // 6-Product Limit & "See More" (Lihat Lebih Banyak) Logic
  const limit = state.catalogInitialLimit || 6;
  const shouldLimit = !state.catalogExpanded && filtered.length > limit;
  const displayed = shouldLimit ? filtered.slice(0, limit) : filtered;

  // Set Grid vs List container classes
  if (state.viewMode === 'list') {
    catalogGrid.className = 'flex flex-col gap-4 w-full';
    catalogGrid.innerHTML = displayed.map(product => {
      const formattedPrice = formatRupiah(product.price);
      const encodedSrc = encodeURI(product.image);

      return `
        <div onclick="openProductDetail('${product.id}')" class="group flex flex-col sm:flex-row items-center gap-5 cursor-pointer bg-white p-4 hover:bg-slate-50 transition-colors duration-200 select-none border-b border-[#e5e5e5] pb-5">
          <div class="w-36 h-36 shrink-0 bg-[#f4f4f4] rounded-[6px] overflow-hidden relative flex items-center justify-center p-3">
            <img src="${encodedSrc}" alt="${product.name}" class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300">
          </div>
          <div class="flex-1 flex flex-col justify-between h-full py-1 w-full">
            <div>
              <div class="flex items-center gap-2 flex-wrap text-[11px] mb-1">
                <span class="uppercase font-bold text-slate-400 tracking-wider">${product.categoryName}</span>
                <span class="font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">SKU: ${product.sku || '-'}</span>
                <span class="text-emerald-700 bg-emerald-50 font-semibold px-1.5 py-0.5 rounded border border-emerald-200/60">✓ Garansi 12 Bulan</span>
              </div>
              <h3 class="text-[14px] sm:text-[16px] font-semibold text-slate-900 mt-1 hover:text-[#c4301c] transition-colors line-clamp-2 leading-snug">${product.name}</h3>
              <p class="text-xs text-slate-600 font-medium mt-1">${product.tagline || ''}</p>
              <p class="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">${product.summary || product.description || ''}</p>
            </div>
            <div class="mt-3 pt-2 flex items-center justify-between">
              <span class="text-[17px] font-bold text-[#c4301c]">${formattedPrice}</span>
              <span class="text-xs font-semibold text-slate-700 hover:text-black transition-colors flex items-center gap-1">Lihat Detail &amp; Spesifikasi →</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  } else {
    // Grid View — CableTime style with SKU, Specs & Warranty badges on every card
    catalogGrid.className = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 w-full';
    catalogGrid.innerHTML = displayed.map(product => {
      const formattedPrice = formatRupiah(product.price);
      const encodedSrc = encodeURI(product.image);

      return `
        <div onclick="openProductDetail('${product.id}')" class="group flex flex-col cursor-pointer bg-transparent select-none">
          <!-- Image area: CableTime light grey box #f4f4f4, 1:1 aspect-ratio, rounded-[4px] -->
          <div class="relative w-full aspect-square bg-[#f4f4f4] rounded-[6px] overflow-hidden flex items-center justify-center p-6 sm:p-7 group-hover:bg-[#ededed] transition-colors duration-200">
            <img src="${encodedSrc}" alt="${product.name}" class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300">
            <!-- Hover pill: "Tambahkan ke Keranjang" -->
            <div class="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto">
              <button type="button" onclick="event.stopPropagation(); addToCart('${product.id}')" class="bg-white text-slate-900 text-xs sm:text-[13px] font-semibold px-5 py-2.5 rounded-full shadow-md hover:bg-black hover:text-white transition-all whitespace-nowrap border border-slate-200/80 cursor-pointer">
                Tambahkan ke Keranjang
              </button>
            </div>
          </div>

          <!-- Product Details Under Image: Name, SKU, Warranty & Specs -->
          <div class="pt-3 pb-1 font-sans flex flex-col justify-between flex-1">
            <div>
              <!-- Product Title -->
              <h3 class="text-[13px] sm:text-[14px] font-semibold text-[#1a1a1a] line-clamp-2 leading-[1.35] hover:text-[#c4301c] transition-colors mb-1.5">${product.name}</h3>

              <!-- SKU & Warranty Badges -->
              <div class="flex items-center gap-1.5 flex-wrap text-[10.5px] mb-1.5">
                <span class="font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">SKU: ${product.sku || '-'}</span>
                <span class="text-emerald-700 bg-emerald-50 font-semibold px-1.5 py-0.5 rounded border border-emerald-200/60">✓ Garansi 12 Bulan</span>
              </div>

              <!-- Key Specs Snippet from SKU specs / tagline -->
              <p class="text-[11px] text-slate-500 line-clamp-1 leading-tight mb-2 font-medium" title="${product.tagline || ''}">${product.tagline || 'Original HOWELL High-Grade'}</p>
            </div>

            <!-- Single Red Price -->
            <div class="text-[15px] sm:text-[16px] font-bold text-[#c4301c] mt-auto">${formattedPrice}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render "See More" / "Lihat Lebih Banyak" Button
  if (loadMoreBox) {
    if (filtered.length > limit) {
      if (shouldLimit) {
        const remaining = filtered.length - limit;
        loadMoreBox.innerHTML = `
          <div class="flex flex-col items-center gap-2 pt-4">
            <button type="button" onclick="toggleCatalogExpand(true)" class="group px-8 py-3.5 rounded-full border border-slate-900 bg-slate-900 hover:bg-black text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 select-none cursor-pointer">
              <span>Lihat Lebih Banyak (${remaining} Produk Lainnya)</span>
              <i data-lucide="chevron-down" class="w-4 h-4 group-hover:translate-y-0.5 transition-transform text-amber-400"></i>
            </button>
            <span class="text-xs text-slate-500 font-medium">Menampilkan ${limit} dari ${filtered.length} produk resmi HOWELL</span>
          </div>
        `;
      } else {
        loadMoreBox.innerHTML = `
          <div class="flex flex-col items-center gap-2 pt-4">
            <button type="button" onclick="toggleCatalogExpand(false)" class="group px-8 py-3.5 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center gap-2 select-none cursor-pointer">
              <span>Tampilkan Lebih Sedikit (6 Teratas)</span>
              <i data-lucide="chevron-up" class="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-slate-600"></i>
            </button>
            <span class="text-xs text-slate-500 font-medium">Menampilkan seluruh ${filtered.length} produk resmi HOWELL</span>
          </div>
        `;
      }
    } else {
      loadMoreBox.innerHTML = '';
    }
  }

  if (window.lucide) lucide.createIcons();
}

// Toggle Catalog See More
function toggleCatalogExpand(expand) {
  state.catalogExpanded = expand;
  renderCatalog();
  if (!expand) {
    scrollToId('catalog-section');
  }
}

// Print / Export Entire HOWELL Product Catalog as PDF (All Products)
function printCatalogPDF() {
  const todayStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const allProducts = [...HOWELL_PRODUCTS];

  const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>HOWELL Official Product Catalog - Cetak PDF</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', Arial, -apple-system, sans-serif;
      background: #ffffff;
      color: #111111;
      padding: 24px;
      font-size: 11px;
      line-height: 1.4;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .no-print-toolbar {
      position: sticky;
      top: 0;
      z-index: 999;
      background: #111827;
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.18);
    }
    .btn-print {
      background: #c4301c;
      color: #ffffff;
      border: none;
      padding: 8px 20px;
      border-radius: 9999px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-print:hover {
      background: #a82615;
    }
    .btn-close {
      background: #374151;
      color: #ffffff;
      border: none;
      padding: 8px 16px;
      border-radius: 9999px;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
    }
    .btn-close:hover {
      background: #4b5563;
    }
    .header-box {
      border-bottom: 3px solid #111827;
      padding-bottom: 16px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #111827;
    }
    .catalog-subtitle {
      font-size: 11.5px;
      font-weight: 700;
      color: #c4301c;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      margin: 3px 0 5px 0;
    }
    .company-meta {
      font-size: 10.5px;
      color: #4b5563;
      line-height: 1.45;
    }
    .edition-badge {
      background: #111827;
      color: #ffffff;
      font-weight: 700;
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 6px;
      display: inline-block;
      margin-bottom: 5px;
      text-align: right;
    }
    .catalog-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .catalog-table th {
      background: #f3f4f6;
      border-top: 1px solid #d1d5db;
      border-bottom: 2px solid #111827;
      padding: 9px 8px;
      font-weight: 700;
      font-size: 10.5px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      text-align: left;
    }
    .catalog-table td {
      padding: 9px 8px;
      border-bottom: 1px solid #e5e7eb;
      vertical-align: top;
    }
    .catalog-table tr:nth-child(even) {
      background: #f9fafb;
    }
    .sku-pill {
      font-family: monospace;
      font-weight: 700;
      font-size: 10.5px;
      background: #e5e7eb;
      color: #1f2937;
      padding: 2px 5px;
      border-radius: 4px;
      display: inline-block;
      margin-bottom: 3px;
    }
    .warranty-tag {
      font-weight: 700;
      color: #059669;
      font-size: 10.5px;
    }
    .price-tag {
      font-weight: 800;
      color: #c4301c;
      font-size: 12.5px;
      text-align: right;
      white-space: nowrap;
    }
    .page-break {
      break-inside: avoid;
      page-break-inside: avoid;
    }
    @media print {
      .no-print-toolbar { display: none !important; }
      body { padding: 0 !important; font-size: 9.5px !important; }
      @page {
        size: A4 portrait;
        margin: 1.2cm 1cm;
      }
      .page-break {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }
    }
  </style>
</head>
<body>

  <!-- Non-printable Action Bar -->
  <div class="no-print-toolbar">
    <div style="display:flex; align-items:center; gap:10px;">
      <span style="font-weight:700; font-size:14px;">🖨️ Cetak / Simpan PDF Seluruh Katalog HOWELL</span>
      <span style="font-size:11px; color:#9ca3af;">(${allProducts.length} Produk Terdaftar Lengkap)</span>
    </div>
    <div style="display:flex; align-items:center; gap:8px;">
      <button class="btn-print" onclick="window.print()">Cetak / Simpan PDF</button>
      <button class="btn-close" onclick="window.close()">Tutup</button>
    </div>
  </div>

  <!-- Official Catalog Header -->
  <div class="header-box">
    <div>
      <div class="brand-title">HOWELL INDONESIA</div>
      <div class="catalog-subtitle">Katalog Resmi Produk &amp; Spesifikasi Teknis (Master Catalog)</div>
      <div class="company-meta">
        <strong>PT Howell Niaga Indonesia</strong> • Distributor Resmi Sejak 2009<br>
        Blk. G, Jl. Pluit Raya No.Kav 19 7-8, Penjaringan, Jakarta Utara 14440<br>
        WhatsApp CS: +62 811-8803-1976 | Website: www.howell.co.id
      </div>
    </div>
    <div style="text-align:right;">
      <div class="edition-badge">EDISI RESMI • ${todayStr}</div>
      <div style="font-size:11px; color:#4b5563;">
        Total: <strong>${allProducts.length} SKU Produk</strong><br>
        Garansi: <strong>12 Bulan Ganti Baru</strong>
      </div>
    </div>
  </div>

  <!-- Full Table of All 32 Products -->
  <table class="catalog-table">
    <thead>
      <tr>
        <th style="width:28px; text-align:center;">No</th>
        <th style="width:70px; text-align:center;">Foto</th>
        <th style="width:130px;">SKU &amp; Kategori</th>
        <th>Nama Produk &amp; Spesifikasi Teknis</th>
        <th style="width:90px; text-align:center;">Garansi Resmi</th>
        <th style="width:115px; text-align:right;">Harga Resmi</th>
      </tr>
    </thead>
    <tbody>
      ${allProducts.map((p, idx) => {
        const specsText = p.specs 
          ? Object.entries(p.specs).filter(([k]) => !['Barcode', 'Barcodes', 'SKU Series', 'SKU Code'].includes(k)).map(([k, v]) => `<strong>${k}:</strong> ${v}`).join(' • ')
          : '';
        return `
          <tr class="page-break">
            <td style="text-align:center; font-weight:700; color:#6b7280;">${idx + 1}</td>
            <td style="text-align:center;">
              <img src="${encodeURI(p.image)}" alt="" style="width:58px; height:58px; object-fit:contain; border:1px solid #e5e7eb; border-radius:4px; padding:2px; background:#fff; margin:0 auto; display:block;">
            </td>
            <td>
              <span class="sku-pill">${p.sku || '-'}</span>
              <div style="font-size:9.5px; color:#6b7280; font-weight:600; text-transform:uppercase;">${p.categoryName || ''}</div>
            </td>
            <td>
              <div style="font-weight:700; font-size:11.5px; color:#111827; margin-bottom:2px;">${p.name}</div>
              <div style="font-size:10px; color:#374151; margin-bottom:2px;">${p.tagline || ''}</div>
              <div style="font-size:9.5px; color:#6b7280; line-height:1.4;">${specsText}</div>
            </td>
            <td style="text-align:center;">
              <div class="warranty-tag">12 Bulan</div>
              <div style="font-size:9px; color:#6b7280;">Ganti Baru</div>
            </td>
            <td class="price-tag">${formatRupiah(p.price)}</td>
          </tr>
        `;
      }).join('')}
    </tbody>
  </table>

  <!-- Catalog Footer -->
  <div style="border-top:2px solid #111827; padding-top:10px; display:flex; justify-content:space-between; font-size:9.5px; color:#6b7280;">
    <div>
      © ${new Date().getFullYear()} PT Howell Niaga Indonesia. Seluruh hak cipta dilindungi undang-undang.<br>
      Katalog ini dicetak resmi dari sistem e-commerce HOWELL untuk keperluan B2B, tender, dan ritel.
    </div>
    <div style="text-align:right;">
      CS WhatsApp: <strong>+62 811-8803-1976</strong><br>
      Website Resmi: <strong>www.howell.co.id</strong>
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  <\/script>
</body>
</html>`;

  // Open clean dedicated print window
  const printWin = window.open('', '_blank');
  if (printWin) {
    printWin.document.open();
    printWin.document.write(htmlContent);
    printWin.document.close();
  } else {
    // If popup blocker intervened, use invisible iframe
    let printFrame = document.getElementById('catalog-print-iframe');
    if (!printFrame) {
      printFrame = document.createElement('iframe');
      printFrame.id = 'catalog-print-iframe';
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      printFrame.style.width = '0';
      printFrame.style.height = '0';
      printFrame.style.border = '0';
      document.body.appendChild(printFrame);
    }
    const doc = printFrame.contentWindow.document;
    doc.open();
    doc.write(htmlContent);
    doc.close();
    setTimeout(() => {
      printFrame.contentWindow.focus();
      printFrame.contentWindow.print();
    }, 600);
  }
}

function renderFeaturedProducts() {
  const featuredGrid = document.getElementById('featured-products-grid');
  if (!featuredGrid) return;

  const featuredList = HOWELL_PRODUCTS.slice(0, 8);
  featuredGrid.className = 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full';
  featuredGrid.innerHTML = featuredList.map(product => {
    const formattedPrice = formatRupiah(product.price);
    const originalPrice = Math.round(product.price * 1.35);
    const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);
    const encodedSrc = encodeURI(product.image);

    return `
      <div onclick="openProductDetail('${product.id}')" class="group relative flex flex-col cursor-pointer bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-slate-300 select-none font-sans">
        <div class="aspect-square w-full bg-[#f7f7f7] rounded-xl overflow-hidden relative flex items-center justify-center p-3 sm:p-4 group-hover:bg-[#f0f0f0] transition-colors">
          <span class="absolute top-2 left-2 bg-[#ff5a00] text-white text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm uppercase tracking-wide z-10">
            ${product.badge || `${discountPercent}% OFF`}
          </span>
          <img src="${encodedSrc}" alt="${product.name}" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500">
        </div>
        <div class="p-3 pt-2.5 flex flex-col justify-between flex-1">
          <h3 class="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-amber-600 line-clamp-2 leading-snug transition-colors">${product.name}</h3>
          <div class="mt-2 flex items-baseline gap-1.5 flex-wrap">
            <span class="text-sm sm:text-base font-black text-[#e02b20]">${formattedPrice}</span>
            <span class="text-xs text-slate-400 line-through font-medium">${formatRupiah(originalPrice)}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
  if (window.lucide) lucide.createIcons();
}

function renderCategoryCards() {
  const categoryContainer = document.getElementById('category-cards-grid');
  if (!categoryContainer) return;

  categoryContainer.innerHTML = HOWELL_CATEGORIES.map(cat => `
    <div onclick="filterByCategory('${cat.id}')" class="glass-card p-6 cursor-pointer flex flex-col justify-between group hover:border-yellow-500/60 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl transition-all">
      <div>
        <div class="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <i data-lucide="${cat.icon}" class="w-5 h-5"></i>
        </div>
        <h3 class="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors tracking-tight">${cat.name}</h3>
        <p class="text-xs text-slate-600 mt-1.5 leading-relaxed">${cat.desc}</p>
      </div>
      <div class="mt-6 flex items-center justify-between text-xs font-bold text-amber-700">
        <span>${cat.count} SKUs Available</span>
        <i data-lucide="arrow-right" class="w-4 h-4 transform group-hover:translate-x-1 transition-transform"></i>
      </div>
    </div>
  `).join('');
  if (window.lucide) lucide.createIcons();
}

// Product Detail Modal (CableTime Product Page Experience)
function openProductDetail(productId) {
  const product = HOWELL_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  state.activeProductDetail = product;
  state.activeLength = product.variants?.lengths?.[0] || 'Standard';
  state.activeColor = product.variants?.colors?.[0] || 'Standard';
  state.detailQty = 1;
  state.activeDetailTab = 'specs';

  const modalEl = document.getElementById('product-detail-modal');
  const containerEl = document.getElementById('product-detail-content') || document.getElementById('product-modal-content');
  if (!modalEl || !containerEl) return;

  const encodedSrc = encodeURI(product.image);
  const safeTitle = (product.name || '').replace(/'/g, "\\'");
  const currentPrice = (product.variantPrices && product.variantPrices[state.activeLength]) ? product.variantPrices[state.activeLength] : product.price;


  containerEl.innerHTML = `
    <!-- Breadcrumbs (CableTime style) -->
    <div class="text-xs text-slate-500 mb-5 flex items-center gap-1.5 font-medium flex-wrap">
      <button type="button" onclick="closeModal('product-detail-modal'); scrollToId('home');" class="hover:text-black cursor-pointer">Rumah</button>
      <span class="opacity-40">/</span>
      <button type="button" onclick="closeModal('product-detail-modal'); filterByCategory('${product.category}'); scrollToId('catalog-section');" class="hover:text-black cursor-pointer">${product.categoryName}</button>
      <span class="opacity-40">/</span>
      <span class="text-slate-700 truncate max-w-xs sm:max-w-md">${product.name}</span>
    </div>

    <!-- Main 2-Column Product Layout (CableTime: single photo | right info) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

      <!-- Left Column: Single Large Product Image Only (CableTime Style) -->
      <div class="lg:col-span-6">
        <div class="aspect-square w-full bg-[#f4f4f4] rounded-2xl overflow-hidden relative flex items-center justify-center p-8 sm:p-12 group/detailimg border border-slate-100">
          <img id="detail-main-img" src="${encodedSrc}" alt="${product.name}" onclick="openImageZoom('${encodedSrc}', '${safeTitle}')" class="w-full h-full object-contain cursor-zoom-in group-hover/detailimg:scale-105 transition-transform duration-300" title="Klik untuk Zoom">
          <!-- Zoom button -->
          <button type="button" onclick="openImageZoom('${encodedSrc}', '${safeTitle}')" class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white text-slate-700 hover:text-black flex items-center justify-center shadow-md transition-all cursor-pointer border border-slate-200" title="Perbesar Foto">
            <i data-lucide="zoom-in" class="w-4 h-4"></i>
          </button>
        </div>
        <!-- Warranty Hint -->
        <div class="mt-3 flex items-center justify-between text-xs text-slate-400 px-1 font-medium">
          <span>Klik foto untuk perbesar gambar</span>
          <span class="font-semibold text-emerald-600">✓ Garansi Resmi 12 Bulan</span>
        </div>
      </div>

      <!-- Right Column: Product Info (CableTime Match) -->
      <div class="lg:col-span-6 flex flex-col gap-4">

        <!-- Product Title -->
        <h1 class="text-xl sm:text-2xl lg:text-[26px] font-bold text-slate-900 leading-snug">${product.name}</h1>

        <!-- SKU & Warranty Badges -->
        <div class="flex items-center gap-2 flex-wrap text-xs -mt-1">
          <span class="font-mono font-bold bg-slate-100 text-slate-800 px-2.5 py-1 rounded border border-slate-200">SKU: ${product.sku || '-'}</span>
          <span class="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200/80 flex items-center gap-1.5">
            <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
            <span>Garansi Resmi 12 Bulan (PT Howell Niaga Indonesia)</span>
          </span>
        </div>

        <!-- Price (Red bold, no discount/strikethrough) -->
        <div class="flex items-baseline gap-2.5 flex-wrap">
          <span id="detail-active-price" class="text-2xl sm:text-3xl font-bold text-[#c4301c] tracking-tight">${formatRupiah(currentPrice)}</span>
        </div>

        <!-- Short Description + "Pelajari Selengkapnya" expand -->
        <div class="text-xs sm:text-sm text-slate-600 leading-relaxed">
          <span id="detail-short-desc">${(product.summary || product.tagline || '').substring(0, 120)}${(product.summary || '').length > 120 ? '…' : ''}</span>
          ${(product.summary || '').length > 120 ? `
            <span id="detail-full-desc" class="hidden"> ${product.summary}</span>
            <button type="button" onclick="(function(){var s=document.getElementById('detail-short-desc'),f=document.getElementById('detail-full-desc'),b=this;if(f.classList.contains('hidden')){f.classList.remove('hidden');s.classList.add('hidden');b.textContent='Lebih sedikit ▲';}else{f.classList.add('hidden');s.classList.remove('hidden');b.textContent='Pelajari Selengkapnya ▾';}}).call(this)" class="text-slate-900 font-semibold underline cursor-pointer ml-1 hover:text-amber-700 transition-colors">Pelajari Selengkapnya ▾</button>
          ` : ''}
        </div>

        <!-- Length Variant Selector (if applicable) -->
        ${product.variants?.lengths ? `
          <div>
            <label class="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Pilih Panjang:</label>
            <div class="flex flex-wrap gap-2" id="detail-length-pills">
              ${product.variants.lengths.map(len => `
                <button type="button" onclick="selectVariantLength('${len}')" data-variant-length="${len}" class="px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${state.activeLength === len ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}">
                  ${len}
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Stepper + Add To Cart (same row, CableTime style: [-] [qty] [+] | black wide button) -->
        <div class="flex items-stretch gap-3">
          <!-- Stepper -->
          <div class="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden shrink-0 h-12">
            <button type="button" onclick="changeDetailQty(-1)" class="w-10 h-full flex items-center justify-center text-slate-700 hover:bg-slate-100 text-lg font-bold select-none cursor-pointer">−</button>
            <span id="detail-qty-display" class="w-10 text-center text-sm font-bold text-slate-900">${state.detailQty || 1}</span>
            <button type="button" onclick="changeDetailQty(1)" class="w-10 h-full flex items-center justify-center text-slate-700 hover:bg-slate-100 text-lg font-bold select-none cursor-pointer">+</button>
          </div>
          <!-- Add To Cart black full-width button -->
          <button type="button" onclick="addToCartFromDetail()" class="flex-1 h-12 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all select-none cursor-pointer">
            Tambahkan ke Keranjang
          </button>
        </div>

        <!-- QRIS / PayPal-style amber button (CableTime: yellow full-width) -->
        <button type="button" onclick="buyWithQrisFromDetail()" class="w-full h-12 rounded-xl bg-[#f5c518] hover:bg-[#e0b000] text-slate-900 font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all select-none cursor-pointer">
          <i data-lucide="qr-code" class="w-4 h-4"></i>
          <span>Bayar dengan QRIS</span>
        </button>

        <!-- Opsi Pembayaran Lainnya link -->
        <div class="text-center -mt-1">
          <button type="button" onclick="toggleMarketplaceOptions()" class="text-xs text-slate-600 hover:text-slate-900 font-medium underline underline-offset-2 select-none cursor-pointer">Opsi pembayaran lainnya</button>
          <div id="detail-marketplace-options" class="hidden mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-2">
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

        <!-- Payment & Security box (CableTime Match) -->
        <div class="p-4 rounded-2xl bg-[#f8f9fa] border border-slate-200 space-y-2.5">
          <h4 class="text-xs font-bold text-slate-900">Payment &amp; Security</h4>
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-black text-red-600 tracking-tight">QRIS</span>
            <span class="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-blue-800">BCA</span>
            <span class="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-amber-700">MANDIRI</span>
            <span class="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-blue-600">BRI</span>
            <span class="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-orange-600">BNI</span>
            <span class="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-emerald-600">GoPay</span>
            <span class="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-purple-700">OVO</span>
            <span class="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-sky-600">DANA</span>
            <span class="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-orange-500">ShopeePay</span>
            <span class="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-blue-900">VISA</span>
            <span class="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-red-500">Mastercard</span>
          </div>
          <p class="text-[11px] text-slate-500 leading-relaxed">
            Informasi pembayaran Anda diproses dengan aman. Kami tidak menyimpan detail kartu kredit atau memiliki akses ke informasi pembayaran Anda.
          </p>
        </div>

        <!-- Social Share -->
        <div class="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span class="font-semibold text-slate-700">Bagikan:</span>
          <div class="flex items-center gap-2">
            <button type="button" onclick="shareProduct('facebook')" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all cursor-pointer" title="Share ke Facebook"><i data-lucide="facebook" class="w-3.5 h-3.5"></i></button>
            <button type="button" onclick="shareProduct('twitter')" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-black hover:text-white flex items-center justify-center transition-all cursor-pointer" title="Share ke X"><i data-lucide="twitter" class="w-3.5 h-3.5"></i></button>
            <button type="button" onclick="shareProduct('whatsapp')" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all cursor-pointer" title="Share ke WhatsApp"><i data-lucide="phone" class="w-3.5 h-3.5"></i></button>
            <button type="button" onclick="shareProduct('copy')" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-all cursor-pointer" title="Salin Tautan"><i data-lucide="link" class="w-3.5 h-3.5"></i></button>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom Section: Specifications, Overview & Warranty Tabs -->
    <div class="mt-10 pt-8 border-t border-slate-200">
      <div class="flex border-b border-slate-200 gap-6 text-sm font-semibold mb-6">
        <button type="button" onclick="switchDetailTab('specs')" id="tab-btn-specs" class="pb-3 border-b-2 border-black text-black font-bold transition-colors select-none cursor-pointer">Spesifikasi Teknis</button>
        <button type="button" onclick="switchDetailTab('desc')" id="tab-btn-desc" class="pb-3 border-b-2 border-transparent text-slate-500 hover:text-black transition-colors select-none cursor-pointer">Ikhtisar &amp; Fitur</button>
        <button type="button" onclick="switchDetailTab('warranty')" id="tab-btn-warranty" class="pb-3 border-b-2 border-transparent text-slate-500 hover:text-black transition-colors select-none cursor-pointer">Garansi &amp; Kebijakan</button>
      </div>

      <!-- Tab: Spesifikasi -->
      <div id="tab-content-specs" class="space-y-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${Object.entries(product.specs || {}).map(([key, val]) => `
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span class="text-slate-500 font-semibold">${key}:</span>
              <span class="font-bold text-slate-900">${val}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab: Ikhtisar & Fitur -->
      <div id="tab-content-desc" class="hidden text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
        <p>${product.description || product.summary}</p>
        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <h5 class="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Keunggulan Kunci HOWELL:</h5>
          <ul class="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li>Material konduktor tembaga murni bersertifikasi bebas oksigen (OFC / pure copper).</li>
            <li>Pelindung ganda anti-interferensi elektromagnetik &amp; radio (EMI/RFI shielding).</li>
            <li>Konektor kontak berlapis emas tahan oksidasi hingga lebih dari 10.000 kali pemasangan.</li>
            <li>Lolos sertifikasi QC ketat berstandar internasional dari PT Howell Niaga Indonesia.</li>
          </ul>
        </div>
      </div>

      <!-- Tab: Garansi -->
      <div id="tab-content-warranty" class="hidden text-xs sm:text-sm text-slate-700 space-y-3">
        <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs">
          <h4 class="font-bold text-amber-900 mb-1">Garansi Resmi 12 Bulan Ganti Baru (PT Howell Niaga Indonesia)</h4>
          <p class="text-amber-800 leading-relaxed">Seluruh produk kabel &amp; adaptor resmi HOWELL dilindungi garansi 12 bulan penggantian unit baru terhadap kerusakan akibat cacat produksi pabrik. Klaim dapat diajukan dengan mudah melalui konfirmasi ke admin customer service WhatsApp kami.</p>
        </div>
      </div>
    </div>
  `;

  modalEl.classList.remove('pointer-events-none', 'opacity-0', 'hidden');
  modalEl.classList.add('opacity-100');
  if (typeof stopScroll === 'function') stopScroll();
  if (window.lucide) lucide.createIcons();
}

function changeDetailQty(delta) {
  state.detailQty = Math.max(1, (state.detailQty || 1) + delta);
  const qtyDisplay = document.getElementById('detail-qty-display');
  if (qtyDisplay) qtyDisplay.textContent = state.detailQty;
}

function addToCartFromDetail() {
  const product = state.activeProductDetail;
  if (!product) return;
  addToCart(product.id, state.activeLength, state.activeColor, state.detailQty || 1);
  closeModal('product-detail-modal');
  toggleCartDrawer(true);
}

function buyWithQrisFromDetail() {
  const product = state.activeProductDetail;
  if (!product) return;
  addToCart(product.id, state.activeLength, state.activeColor, state.detailQty || 1);
  closeModal('product-detail-modal');
  openCheckoutModal();
}

function toggleMarketplaceOptions() {
  const box = document.getElementById('detail-marketplace-options');
  if (box) box.classList.toggle('hidden');
}

function shareProduct(platform) {
  const product = state.activeProductDetail;
  const url = window.location.href;
  const title = product ? product.name : 'HOWELL Official Products';

  if (platform === 'facebook') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  } else if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
  } else if (platform === 'whatsapp') {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
  } else if (platform === 'copy') {
    navigator.clipboard?.writeText(url).then(() => {
      showToast('Tautan produk berhasil disalin!', 'Berbagi Produk', 'link');
    }).catch(() => {
      showToast('Tautan produk disalin!', 'Berbagi Produk', 'link');
    });
  }
}

function switchDetailTab(tab) {
  state.activeDetailTab = tab;
  ['desc', 'specs', 'warranty'].forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    const content = document.getElementById(`tab-content-${t}`);

    if (t === tab) {
      if (btn) btn.className = 'pb-3 border-b-2 border-black text-black font-bold transition-colors select-none cursor-pointer';
      if (content) content.classList.remove('hidden');
    } else {
      if (btn) btn.className = 'pb-3 border-b-2 border-transparent text-slate-500 hover:text-black transition-colors select-none cursor-pointer';
      if (content) content.classList.add('hidden');
    }
  });
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.add('pointer-events-none', 'opacity-0');
    modal.classList.remove('opacity-100');
  }
}

function filterByCategory(catId) {
  state.activeCategory = catId;
  const section = document.getElementById('catalog-section');
  if (section) section.scrollIntoView({ behavior: 'smooth' });

  document.querySelectorAll('#category-pills-container button').forEach(btn => {
    if (btn.getAttribute('data-cat') === catId) {
      btn.className = 'px-4 py-2 rounded-full text-xs font-bold transition-all bg-amber-400 text-slate-950 border border-amber-400 shadow-sm';
    } else {
      btn.className = 'px-4 py-2 rounded-full text-xs font-bold transition-all bg-white border border-slate-200 text-slate-700 hover:bg-slate-50';
    }
  });

  renderCatalog();
}

function resetFilters() {
  state.activeCategory = 'all';
  state.searchQuery = '';
  state.sortBy = 'featured';
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) searchInput.value = '';
  filterByCategory('all');
}

// Lightbox Photo Zoom System
function openImageZoom(imgSrc, title) {
  if (typeof window.openImageZoomModal === 'function') {
    window.openImageZoomModal(imgSrc, title);
    return;
  }
  const modal = document.getElementById('image-zoom-modal');
  const imgEl = document.getElementById('zoom-modal-img') || document.getElementById('image-zoom-target');
  const titleEl = document.getElementById('zoom-modal-title') || document.getElementById('image-zoom-title');
  if (!modal || !imgEl) return;

  imgEl.src = imgSrc;
  if (titleEl) titleEl.textContent = title || 'HOWELL Product View';
  modal.classList.remove('hidden', 'opacity-0');
  modal.classList.add('opacity-100');
}
window.openImageZoom = openImageZoom;

// B2B Quote Modal Controller
function openB2BModal(productName = '') {
  const modal = document.getElementById('b2b-quote-modal');
  const inputEl = document.getElementById('b2b-product-input');
  if (!modal) return;

  if (inputEl && productName) {
    inputEl.value = productName;
  }
  modal.classList.remove('hidden');
}

// Initialize Application Logic on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateCartBadge();
  if (typeof renderCategoryCards === 'function') renderCategoryCards();
  if (typeof renderCatalog === 'function') renderCatalog();
  if (typeof renderFeaturedProducts === 'function') renderFeaturedProducts();

  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (typeof renderCatalog === 'function') renderCatalog();
    });
  }

  const sortSelect = document.getElementById('catalog-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      if (typeof renderCatalog === 'function') renderCatalog();
    });
  }
});

// Explicit Global Window Exports for Event Handlers
window.state = state;
window.renderCatalog = renderCatalog;
window.renderCatalogGrid = renderCatalog;
window.openProductDetail = openProductDetail;
window.selectVariantLength = selectVariantLength;
window.changeDetailQty = changeDetailQty;
window.addToCartFromDetail = addToCartFromDetail;
window.buyWithQrisFromDetail = buyWithQrisFromDetail;
window.toggleMarketplaceOptions = toggleMarketplaceOptions;
window.shareProduct = shareProduct;
window.switchDetailTab = switchDetailTab;
window.toggleCatalogSidebar = toggleCatalogSidebar;
window.toggleFilterAccordion = toggleFilterAccordion;
window.changePriceFilter = changePriceFilter;
window.applyAvailabilityFilter = applyAvailabilityFilter;
window.changeCatalogSort = changeCatalogSort;
window.setCatalogViewMode = setCatalogViewMode;
window.filterByCategory = filterByCategory;
window.resetFilters = resetFilters;
window.closeModal = closeModal;
window.addToCart = addToCart;
window.updateCartQty = updateCartQty;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.toggleCartDrawer = toggleCartDrawer;
window.renderCartDrawer = renderCartDrawer;
window.openCheckoutModal = openCheckoutModal;
window.submitQrisCheckout = submitQrisCheckout;
window.confirmQrisPayment = confirmQrisPayment;
window.openImageZoom = openImageZoom;
window.openB2BModal = openB2BModal;
window.toggleCatalogExpand = toggleCatalogExpand;
window.printCatalogPDF = printCatalogPDF;
