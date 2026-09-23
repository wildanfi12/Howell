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

  if (id === 'stats-overview-section' || id === 'about-us') {
    setTimeout(() => {
      if (typeof window.triggerStatsCounterAnimation === 'function') {
        window.triggerStatsCounterAnimation(true);
      }
    }, 500);
  }
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
window.state = state;

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
    <div class="w-9 h-9 rounded-full bg-[#FFC700]/20 border border-yellow-400/40 flex items-center justify-center text-yellow-700 font-bold shrink-0">
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
   CATALOG SHOWCASE CONTROLLER & SAFE STUBS
   ========================================================================== */
window.saveCart = function() {};
window.getCartSubtotal = function() { return 0; };
window.updateCartBadge = function() {
  document.querySelectorAll('.cart-badge-count').forEach(el => el.classList.add('hidden'));
  const floatBtn = document.getElementById('floating-cart-btn');
  if (floatBtn) floatBtn.classList.add('hidden');
};
window.addToCart = function(productId) {
  if (typeof window.openProductDetail === 'function') {
    window.openProductDetail(productId);
  }
};
window.updateCartQty = function() {};
window.removeFromCart = function() {};
window.clearCart = function() {};
window.toggleCartDrawer = function() {};
window.renderCartDrawer = function() {};
window.openCheckoutModal = function() {};
window.backToCheckoutForm = function() {};
window.handlePaymentMethodChange = function() {};
window.submitQrisCheckout = function(e) { if (e) e.preventDefault(); };
window.confirmQrisManualPayment = function() {};

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
        <div onclick="event.stopPropagation(); openImageZoom('${encodedSrc}', '${safeTitle}')" class="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white text-xs font-bold gap-1.5 backdrop-blur-[2px] cursor-pointer">
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

// Select Length Variant (CableTime Showcase Style)
window.selectVariantLength = function selectVariantLength(len) {
  state.activeLength = len;
  const product = state.activeProductDetail;
  if (!product) return;

  document.querySelectorAll('#detail-length-pills button, #product-detail-modal button[data-variant-length]').forEach(btn => {
    if (btn.getAttribute('data-variant-length') === len) {
      btn.className = 'px-3.5 py-2 rounded-xl text-xs font-bold border transition-all bg-[#FFC700] text-slate-950 border-[#FFC700] shadow-sm';
    } else {
      btn.className = 'px-3.5 py-2 rounded-xl text-xs font-bold border transition-all bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
    }
  });

  const waMsg = `Halo HOWELL, saya tertarik dengan produk ${product.name} (SKU: ${product.sku || '-'})` + (len !== 'Standard' ? ` varian panjang ${len}` : '') + `. Mohon informasi spesifikasi teknis & ketersediaan stok.`;
  const waUrl = `https://wa.me/6281188031976?text=${encodeURIComponent(waMsg)}`;
  const waBtn = document.getElementById('detail-wa-inquiry-btn');
  if (waBtn) waBtn.href = waUrl;
  const mobileWaBtn = document.getElementById('mobile-detail-wa-btn');
  if (mobileWaBtn) mobileWaBtn.href = waUrl;
};

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

// CableTime Sidebar Toggle Controller (Desktop inline / Mobile & Tablet off-canvas drawer)
window.toggleCatalogSidebar = function toggleCatalogSidebar(forceState) {
  const sidebar = document.getElementById('catalog-filter-sidebar');
  const backdrop = document.getElementById('catalog-filter-backdrop');
  const btn = document.getElementById('btn-toggle-filter');
  if (!sidebar) return;

  const isMobileOrTablet = window.innerWidth < 1024;

  if (isMobileOrTablet) {
    const shouldOpen = typeof forceState === 'boolean' ? forceState : !sidebar.classList.contains('open');
    if (shouldOpen) {
      sidebar.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  } else {
    // Desktop inline toggle
    if (typeof forceState === 'boolean') {
      if (forceState) sidebar.classList.remove('hidden');
      else sidebar.classList.add('hidden');
    } else {
      sidebar.classList.toggle('hidden');
    }
    if (btn) {
      if (sidebar.classList.contains('hidden')) {
        btn.className = 'flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-slate-300 bg-white text-xs sm:text-[13px] font-medium text-slate-800 hover:border-slate-400 hover:bg-slate-50 transition-all select-none cursor-pointer';
      } else {
        btn.className = 'flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-slate-900 bg-slate-900 text-white text-xs sm:text-[13px] font-medium shadow-sm transition-all select-none cursor-pointer';
      }
    }
  }
};

// Quick Category Filter Chips Renderer (Touch Scroll)
window.renderCategoryChips = function renderCategoryChips() {
  const container = document.getElementById('catalog-category-chips');
  if (!container || typeof HOWELL_CATEGORIES === 'undefined') return;

  const allCount = (typeof HOWELL_PRODUCTS !== 'undefined') ? HOWELL_PRODUCTS.length : 137;
  const isAllActive = !state.activeCategory || state.activeCategory === 'all';

  let html = `
    <button type="button" onclick="filterByCategory('all')" class="category-chip-btn shrink-0 px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${isAllActive ? 'active' : ''}">
      <span>Semua</span>
      <span class="opacity-70 text-[11px] ml-1">(${allCount})</span>
    </button>
  `;

  HOWELL_CATEGORIES.forEach(cat => {
    const count = (typeof HOWELL_PRODUCTS !== 'undefined') ? HOWELL_PRODUCTS.filter(p => p.category === cat.id).length : 0;
    const isActive = state.activeCategory === cat.id;
    html += `
      <button type="button" onclick="filterByCategory('${cat.id}')" class="category-chip-btn shrink-0 px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${isActive ? 'active' : ''}">
        <span>${cat.name}</span>
        <span class="opacity-70 text-[11px] ml-1">(${count})</span>
      </button>
    `;
  });

  container.innerHTML = html;
};

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

// Catalog & Product Filtering Renderer (Corporate Showcase Style)
window.renderCatalog = function renderCatalog() {
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

  // Availability filter
  if (state.availabilityStock) {
    filtered = filtered.filter(p => p.rating >= 4.0);
  }

  // Sorting logic (Name, Rating)
  if (state.sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Update live count
  if (countEl) {
    countEl.textContent = `${filtered.length} produk`;
  }

  if (typeof renderCategoryChips === 'function') {
    renderCategoryChips();
  }

  // Render Sidebar Category Accordion (#acc-body-category)
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
        <p class="text-xs text-slate-500 mt-1">Coba sesuaikan pencarian atau kategori produk Anda.</p>
        <button onclick="resetFilters()" class="mt-4 px-5 py-2 rounded-full bg-black text-white text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer">Reset Filter</button>
      </div>
    `;
    if (loadMoreBox) loadMoreBox.innerHTML = '';
    if (window.lucide) lucide.createIcons();
    return;
  }

  // 6-Product Limit & "See More" Logic
  const limit = state.catalogInitialLimit || 6;
  const shouldLimit = !state.catalogExpanded && filtered.length > limit;
  const displayed = shouldLimit ? filtered.slice(0, limit) : filtered;

  if (state.viewMode === 'list') {
    catalogGrid.className = 'flex flex-col gap-4 w-full';
    catalogGrid.innerHTML = displayed.map(product => {
      const encodedSrc = encodeURI(product.image);

      return `
        <div onclick="openProductDetail('${product.id}')" class="group flex flex-col sm:flex-row items-center gap-5 cursor-pointer bg-white p-4 hover:bg-slate-50 transition-colors duration-200 select-none border-b border-[#e5e5e5] pb-5">
          <div class="w-36 h-36 shrink-0 bg-[#f4f4f4] rounded-[6px] overflow-hidden relative flex items-center justify-center p-3">
            <img src="${encodedSrc}" alt="${product.name}" class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300">
          </div>
          <div class="flex-1 flex flex-col justify-between h-full py-1 w-full">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[9px] font-black uppercase tracking-widest text-[#92400E]">${product.categoryName || 'HOWELL'}</span>
                <span class="text-[10px] text-slate-400 font-mono">SKU: ${product.sku || '-'}</span>
              </div>
              <h3 class="text-[14px] sm:text-[16px] font-semibold text-slate-900 mt-1 hover:text-amber-600 transition-colors line-clamp-2 leading-snug">${product.name}</h3>
              <p class="text-xs text-slate-500 line-clamp-2 mt-1">${product.summary || ''}</p>
            </div>
            <div class="mt-4 pt-2 flex items-center justify-between border-t border-slate-100">
              <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">✓ Garansi Resmi 12 Bulan</span>
              <span class="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors flex items-center gap-1">Lihat Detail &amp; Spesifikasi →</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  } else {
    // Grid View — Corporate Showcase Style (No Price, Clean CTA)
    catalogGrid.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-5 w-full';
    catalogGrid.innerHTML = displayed.map(product => {
      const encodedSrc = encodeURI(product.image);
      const rating = product.rating || 4.8;
      const stars = '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));

      return `
        <div class="product-card-pro flex flex-col" style="cursor:pointer;" onclick="openProductDetail('${product.id}')">
          <!-- Image Wrapper -->
          <div class="card-img-wrap">
            <img src="${encodedSrc}" alt="${product.name}" loading="lazy" onerror="this.src='assets/howell-logo.png'">
            <!-- Quick View Button -->
            <button class="quick-view-btn" onclick="event.stopPropagation(); openProductDetail('${product.id}')" title="Lihat Detail">
              <i data-lucide="eye" style="width:14px;height:14px;color:#0F172A;"></i>
            </button>
            <!-- Hover Action: Detail Spesifikasi -->
            <div class="card-actions">
              <button type="button" onclick="event.stopPropagation(); openProductDetail('${product.id}')" 
                class="w-full mx-2 py-2.5 rounded-xl text-[11px] font-bold text-black cursor-pointer transition-all flex items-center justify-center gap-1.5" 
                style="background: #FFC700; box-shadow: 0 4px 16px rgba(255,199,0,0.35);">
                <i data-lucide="eye" style="width:13px;height:13px;"></i>
                Lihat Spesifikasi
              </button>
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-3 flex flex-col gap-1 flex-1">
            <!-- Category + Rating Row -->
            <div class="flex items-center justify-between">
              <span class="text-[9px] font-black uppercase tracking-widest" style="color:#92400E;">${product.categoryName || 'HOWELL'}</span>
              <span class="star-rating text-[9px]" title="${rating} / 5">${stars.slice(0,5)} <span class="text-slate-400 text-[9px]">${rating}</span></span>
            </div>

            <!-- Product Name -->
            <h3 class="text-[11px] sm:text-[12px] font-semibold text-slate-900 line-clamp-2 leading-snug flex-1" style="letter-spacing:-0.01em;">${product.name}</h3>

            <!-- Specs & Detail Link Row (Clean, No Price) -->
            <div class="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
              <div class="badge-certified">✓ Garansi Resmi</div>
              <span class="text-[10px] font-bold text-slate-600 hover:text-black flex items-center gap-0.5">Detail →</span>
            </div>
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
              <span>Lihat ${remaining} Produk Lainnya</span>
              <i data-lucide="chevron-down" class="w-4 h-4 group-hover:translate-y-0.5 transition-transform"></i>
            </button>
            <span class="text-[11px] text-slate-400">Menampilkan ${limit} dari ${filtered.length} produk katalog HOWELL</span>
          </div>
        `;
      } else {
        loadMoreBox.innerHTML = `
          <div class="flex flex-col items-center gap-2 pt-4">
            <button type="button" onclick="toggleCatalogExpand(false)" class="group px-8 py-3 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-2 select-none cursor-pointer">
              <span>Tampilkan Lebih Sedikit</span>
              <i data-lucide="chevron-up" class="w-4 h-4 group-hover:-translate-y-0.5 transition-transform"></i>
            </button>
            <span class="text-[11px] text-slate-400">Menampilkan seluruh ${filtered.length} produk katalog</span>
          </div>
        `;
      }
    } else {
      loadMoreBox.innerHTML = '';
    }
  }

  if (window.lucide) {
    lucide.createIcons();
  }
};

// Toggle Catalog See More
function toggleCatalogExpand(expand) {
  state.catalogExpanded = expand;
  renderCatalog();
  if (!expand) {
    scrollToId('catalog-section');
  }
}

/// Print / Export Entire HOWELL Product Catalog as PDF (All Products - Master B2B Table Format)
function printCatalogPDF(cat = 'all', autoPrint = false) {
  let url = 'print-catalog.html';
  const params = [];
  if (cat && cat !== 'all') {
    params.push(`cat=${encodeURIComponent(cat)}`);
  }
  if (autoPrint) {
    params.push('autoprint=1');
  }
  if (params.length > 0) {
    url += '?' + params.join('&');
  }
  const printWin = window.open(url, '_blank');
  if (!printWin || printWin.closed || typeof printWin.closed === 'undefined') {
    window.location.href = url;
  }
}

window.renderFeaturedProducts = function renderFeaturedProducts() {
  const featuredGrid = document.getElementById('featured-products-grid');
  if (!featuredGrid) return;

  const featuredList = HOWELL_PRODUCTS.slice(0, 12);
  featuredGrid.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 w-full';
  featuredGrid.innerHTML = featuredList.map(product => {
    const encodedSrc = encodeURI(product.image);

    return `
      <div onclick="openProductDetail('${product.id}')" class="group flex flex-col cursor-pointer bg-transparent select-none">
        <div class="relative w-full aspect-square bg-[#f4f4f4] rounded-[6px] overflow-hidden flex items-center justify-center p-5 group-hover:bg-[#ededed] transition-colors duration-200">
          <img src="${encodedSrc}" alt="${product.name}" class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300">
        </div>
        <div class="pt-3 pb-1 font-sans flex flex-col justify-between flex-1">
          <h3 class="text-[13px] sm:text-[14px] font-semibold text-[#1a1a1a] line-clamp-2 leading-[1.35] hover:text-amber-600 transition-colors mb-1.5">${product.name}</h3>
          <div class="text-[11px] font-bold text-emerald-700 mt-auto flex items-center gap-1">✓ Garansi 12 Bulan</div>
        </div>
      </div>
    `;
  }).join('');
  if (window.lucide) lucide.createIcons();
};

window.renderCategoryCards = function renderCategoryCards() {
  const categoryContainer = document.getElementById('category-cards-grid');
  if (!categoryContainer) return;

  categoryContainer.innerHTML = HOWELL_CATEGORIES.map(cat => `
    <div onclick="filterByCategory('${cat.id}')" class="glass-card p-6 cursor-pointer flex flex-col justify-between group hover:border-yellow-500/60 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl transition-all">
      <div>
        <div class="w-11 h-11 rounded-2xl bg-amber-100 text-[#997600] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <i data-lucide="${cat.icon}" class="w-5 h-5"></i>
        </div>
        <h3 class="text-base font-bold text-slate-900 group-hover:text-[#b88e00] transition-colors tracking-tight">${cat.name}</h3>
        <p class="text-xs text-slate-600 mt-1.5 leading-relaxed">${cat.desc}</p>
      </div>
      <div class="mt-6 flex items-center justify-between text-xs font-bold text-[#b88e00]">
        <span>${cat.count} SKUs Available</span>
        <i data-lucide="arrow-right" class="w-4 h-4 transform group-hover:translate-x-1 transition-transform"></i>
      </div>
    </div>
  `).join('');
  if (window.lucide) lucide.createIcons();
}

// Product Detail Modal (CableTime Product Page Experience)
window.openProductDetail = function openProductDetail(productId) {
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
  const waMsg = `Halo HOWELL, saya tertarik dengan produk ${product.name} (SKU: ${product.sku || '-'})` + (state.activeLength !== 'Standard' ? ` varian panjang ${state.activeLength}` : '') + `. Mohon informasi spesifikasi & ketersediaan stok.`;
  const waInquiryUrl = `https://wa.me/6281188031976?text=${encodeURIComponent(waMsg)}`;

  containerEl.innerHTML = `
    <!-- Top Back Navigation & Breadcrumbs -->
    <div class="flex items-center justify-between gap-3 mb-5 flex-wrap">
      <button type="button" onclick="closeModal('product-detail-modal'); scrollToId('catalog-section');" class="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-black px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer shadow-xs">
        <i data-lucide="arrow-left" class="w-4 h-4"></i>
        <span>Kembali ke Katalog Produk</span>
      </button>
      <div class="text-xs text-slate-500 flex items-center gap-1.5 font-medium flex-wrap">
        <button type="button" onclick="closeModal('product-detail-modal'); scrollToId('home');" class="hover:text-black cursor-pointer">Home</button>
        <span class="opacity-40">/</span>
        <button type="button" onclick="closeModal('product-detail-modal'); filterByCategory('${product.category}'); scrollToId('catalog-section');" class="hover:text-black cursor-pointer">${product.categoryName}</button>
        <span class="opacity-40">/</span>
        <span class="text-slate-700 truncate max-w-xs sm:max-w-md">${product.name}</span>
      </div>
    </div>

    <!-- Main 2-Column Product Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

      <!-- Left Column: Single Large Product Image Only -->
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

      <!-- Right Column: Product Info & Actions -->
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

        <!-- Short Description + Expand -->
        <div class="text-xs sm:text-sm text-slate-600 leading-relaxed">
          <span id="detail-short-desc">${(product.summary || product.tagline || '').substring(0, 130)}${(product.summary || '').length > 130 ? '…' : ''}</span>
          ${(product.summary || '').length > 130 ? `
            <span id="detail-full-desc" class="hidden"> ${product.summary}</span>
            <button type="button" onclick="(function(){var s=document.getElementById('detail-short-desc'),f=document.getElementById('detail-full-desc'),b=this;if(f.classList.contains('hidden')){f.classList.remove('hidden');s.classList.add('hidden');b.textContent='Lebih sedikit ▲';}else{f.classList.add('hidden');s.classList.remove('hidden');b.textContent='Pelajari Selengkapnya ▾';}}).call(this)" class="text-slate-900 font-semibold underline cursor-pointer ml-1 hover:text-[#b88e00] transition-colors">Pelajari Selengkapnya ▾</button>
          ` : ''}
        </div>

        <!-- Length Variant Selector (if applicable) -->
        ${product.variants?.lengths ? `
          <div>
            <label class="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Pilihan Varian Panjang:</label>
            <div class="flex flex-wrap gap-2" id="detail-length-pills">
              ${product.variants.lengths.map(len => `
                <button type="button" onclick="selectVariantLength('${len}')" data-variant-length="${len}" class="px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${state.activeLength === len ? 'bg-[#FFC700] text-slate-950 border-[#FFC700] shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}">
                  ${len}
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Primary CTA: WhatsApp Inquiry Button -->
        <div class="space-y-2.5 pt-2">
          <a id="detail-wa-inquiry-btn" href="${waInquiryUrl}" target="_blank" rel="noopener noreferrer" 
            class="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-emerald-600/20 transition-all select-none cursor-pointer">
            <i data-lucide="phone" class="w-4 h-4"></i>
            <span>Konsultasi Produk via WhatsApp</span>
            <span class="text-xs opacity-75">→</span>
          </a>

          <!-- B2B Procurement Button -->
          <button type="button" onclick="closeModal('product-detail-modal'); openB2BModal();" 
            class="w-full h-11 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all select-none cursor-pointer">
            <i data-lucide="building-2" class="w-4 h-4 text-[#FFC700]"></i>
            <span>Permintaan Penawaran B2B &amp; Proyek Korporat</span>
          </button>
        </div>

        <!-- Official Online Channels -->
        <div class="space-y-2 pt-1">
          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tersedia di Toko Online Resmi:</label>
          <div class="grid grid-cols-3 gap-2">
            <a href="https://shopee.co.id/howellcable?categoryId=100013&entryPoint=ShopByPDP&itemId=49006388534" target="_blank" rel="noopener noreferrer" class="py-2.5 px-2 rounded-xl bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 text-orange-600 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all">
              <img src="assets/shopee-logo.webp" alt="Shopee" class="w-4 h-4 object-contain">
              <span>Shopee</span>
            </a>
            <a href="https://tk.tokopedia.com/ZSqShWPvf/" target="_blank" rel="noopener noreferrer" class="py-2.5 px-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-600 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all">
              <img src="assets/tokopedia-logo.png" alt="Tokopedia" class="w-4 h-4 object-contain">
              <span>Tokopedia</span>
            </a>
            <a href="https://www.tiktok.com/@howell_official?_r=1&_t=ZS-99aNN6XJUF2" target="_blank" rel="noopener noreferrer" class="py-2.5 px-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all">
              <img src="assets/tiktok-logo.avif" alt="TikTok" class="w-4 h-4 object-contain rounded-xs">
              <span>TikTok</span>
            </a>
          </div>
        </div>

        <!-- Quality & Verification Box -->
        <div class="p-4 rounded-2xl bg-[#f8f9fa] border border-slate-200 space-y-2">
          <div class="flex items-center gap-2">
            <i data-lucide="award" class="w-4 h-4 text-[#FFC700]"></i>
            <h4 class="text-xs font-bold text-slate-900">Jaminan Mutu &amp; Distribusi Resmi</h4>
          </div>
          <p class="text-[11px] text-slate-500 leading-relaxed">
            Didistribusikan resmi oleh <strong>PT Howell Niaga Indonesia</strong>. Seluruh kabel dan adaptor melewati pengujian QC ketat, 100% tembaga bebas oksigen (OFC), dan bergaransi resmi 12 bulan tukar baru.
          </p>
        </div>

        <!-- Social Share -->
        <div class="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span class="font-semibold text-slate-700">Bagikan Produk:</span>
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
          ${Object.entries(product.specs || {}).map(([key, val]) => {
            const isMono = /SKU|Model|Part|Code|Barcode/i.test(key);
            return `
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span class="text-slate-500 font-semibold">${key}:</span>
              <span class="font-bold text-slate-900 ${isMono ? 'font-mono' : ''}">${val}</span>
            </div>
          `;
          }).join('')}
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
          <p class="text-[#997600] leading-relaxed">Seluruh produk kabel &amp; adaptor resmi HOWELL dilindungi garansi 12 bulan penggantian unit baru terhadap kerusakan akibat cacat produksi pabrik. Klaim dapat diajukan dengan mudah melalui konfirmasi ke admin customer service WhatsApp kami.</p>
        </div>
      </div>
    </div>

    <!-- Mobile Sticky Bar (< 1024px) -->
    <div class="block lg:hidden sticky -bottom-6 sm:-bottom-8 -mx-5 sm:-mx-8 p-3.5 sm:p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 shadow-lg mt-6">
      <div class="flex items-center gap-2">
        <a id="mobile-detail-wa-btn" href="${waInquiryUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 h-11 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer">
          <i data-lucide="phone" class="w-4 h-4"></i>
          <span>Konsultasi WhatsApp</span>
        </a>
        <a href="https://shopee.co.id/howellcable?categoryId=100013&entryPoint=ShopByPDP&itemId=49006388534" target="_blank" rel="noopener noreferrer" class="h-11 px-3 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 font-bold text-xs flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-transform" title="Shopee">
          <img src="assets/shopee-logo.webp" alt="Shopee" class="w-4 h-4 object-contain">
          <span class="hidden sm:inline">Shopee</span>
        </a>
        <a href="https://tk.tokopedia.com/ZSqShWPvf/" target="_blank" rel="noopener noreferrer" class="h-11 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-transform" title="Tokopedia">
          <img src="assets/tokopedia-logo.png" alt="Tokopedia" class="w-4 h-4 object-contain">
          <span class="hidden sm:inline">Tokopedia</span>
        </a>
      </div>
    </div>
  `;

  modalEl.style.removeProperty('display');
  modalEl.style.removeProperty('opacity');
  modalEl.style.removeProperty('pointer-events');
  modalEl.style.display = 'flex';
  modalEl.classList.remove('pointer-events-none', 'opacity-0', 'hidden');
  modalEl.classList.add('opacity-100');
  if (typeof stopScroll === 'function') stopScroll();
  if (window.lucide) lucide.createIcons();
};

function changeDetailQty(delta) {}
function addToCartFromDetail() {}
function buyWithQrisFromDetail() {}
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

window.closeModal = function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    if (typeof window.popModalStack === 'function') {
      window.popModalStack(modalId);
    }
    modal.style.pointerEvents = 'none';
    modal.style.opacity = '0';
    modal.classList.add('pointer-events-none', 'opacity-0');
    modal.classList.remove('opacity-100');
    setTimeout(() => {
      modal.style.display = 'none';
      modal.classList.add('hidden');
    }, 300);
    if (typeof startScroll === 'function') startScroll();
  }
};

window.backToCartFromCheckout = function backToCartFromCheckout() {
  const modal = document.getElementById('qris-checkout-modal');
  if (modal) {
    if (typeof window.popModalStack === 'function') {
      window.popModalStack('qris-checkout-modal');
    }
    modal.style.pointerEvents = 'none';
    modal.style.opacity = '0';
    modal.style.display = 'none';
    modal.classList.add('pointer-events-none', 'opacity-0', 'hidden');
    modal.classList.remove('opacity-100');
  }
  if (typeof window.toggleCartDrawer === 'function') {
    window.toggleCartDrawer(true);
  }
};

function filterByCategory(catId) {
  if (catId === 'usb-charging') catId = 'computer-acc';
  state.activeCategory = catId;
  state.catalogExpanded = false;
  if (typeof toggleCatalogSidebar === 'function' && window.innerWidth < 1024) {
    toggleCatalogSidebar(false);
  }
  if (typeof renderCategoryChips === 'function') {
    renderCategoryChips();
  }
  if (typeof window.scrollToId === 'function') {
    window.scrollToId('catalog-section');
  } else {
    const section = document.getElementById('catalog-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  }

  document.querySelectorAll('#category-pills-container button').forEach(btn => {
    if (btn.getAttribute('data-cat') === catId) {
      btn.className = 'px-4 py-2 rounded-full text-xs font-bold transition-all bg-[#FFC700] text-slate-950 border border-[#FFC700] shadow-sm';
    } else {
      btn.className = 'px-4 py-2 rounded-full text-xs font-bold transition-all bg-white border border-slate-200 text-slate-700 hover:bg-slate-50';
    }
  });

  renderCatalog();
}

function resetFilters() {
  state.activeCategory = 'all';
  state.searchQuery = '';
  state.priceFilter = 'all';
  state.sortBy = 'relevance';
  state.catalogExpanded = false;
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) searchInput.value = '';
  if (typeof renderCategoryChips === 'function') {
    renderCategoryChips();
  }
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
window.handlePaymentMethodChange = handlePaymentMethodChange;
window.copyBcaAccount = copyBcaAccount;
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

window.closeModal = function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    if (typeof window.popModalStack === 'function') {
      window.popModalStack(modalId);
    }
    modal.style.pointerEvents = 'none';
    modal.style.opacity = '0';
    modal.classList.add('pointer-events-none', 'opacity-0');
    modal.classList.remove('opacity-100');
    setTimeout(() => {
      modal.style.display = 'none';
      modal.classList.add('hidden');
    }, 300);
    if (typeof startScroll === 'function') startScroll();
  }
};

window.backToCartFromCheckout = function backToCartFromCheckout() {
  const modal = document.getElementById('qris-checkout-modal');
  if (modal) {
    if (typeof window.popModalStack === 'function') {
      window.popModalStack('qris-checkout-modal');
    }
    modal.style.pointerEvents = 'none';
    modal.style.opacity = '0';
    modal.style.display = 'none';
    modal.classList.add('pointer-events-none', 'opacity-0', 'hidden');
    modal.classList.remove('opacity-100');
  }
  if (typeof window.toggleCartDrawer === 'function') {
    window.toggleCartDrawer(true);
  }
};

function filterByCategory(catId) {
  if (catId === 'usb-charging') catId = 'computer-acc';
  state.activeCategory = catId;
  state.catalogExpanded = false;
  if (typeof toggleCatalogSidebar === 'function' && window.innerWidth < 1024) {
    toggleCatalogSidebar(false);
  }
  if (typeof renderCategoryChips === 'function') {
    renderCategoryChips();
  }
  if (typeof window.scrollToId === 'function') {
    window.scrollToId('catalog-section');
  } else {
    const section = document.getElementById('catalog-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  }

  document.querySelectorAll('#category-pills-container button').forEach(btn => {
    if (btn.getAttribute('data-cat') === catId) {
      btn.className = 'px-4 py-2 rounded-full text-xs font-bold transition-all bg-[#FFC700] text-slate-950 border border-[#FFC700] shadow-sm';
    } else {
      btn.className = 'px-4 py-2 rounded-full text-xs font-bold transition-all bg-white border border-slate-200 text-slate-700 hover:bg-slate-50';
    }
  });

  renderCatalog();
}

function resetFilters() {
  state.activeCategory = 'all';
  state.searchQuery = '';
  state.priceFilter = 'all';
  state.sortBy = 'relevance';
  state.catalogExpanded = false;
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) searchInput.value = '';
  if (typeof renderCategoryChips === 'function') {
    renderCategoryChips();
  }
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
window.handlePaymentMethodChange = handlePaymentMethodChange;
window.copyBcaAccount = copyBcaAccount;
window.backToCheckoutForm = backToCheckoutForm;
window.confirmBcaPayment = confirmBcaPayment;
window.submitQrisCheckout = submitQrisCheckout;
window.confirmQrisPayment = confirmQrisPayment;
window.openImageZoom = openImageZoom;
window.openB2BModal = openB2BModal;
window.toggleCatalogExpand = toggleCatalogExpand;
window.printCatalogPDF = printCatalogPDF;

// Toggle Visi & Misi Expandable Detail Panels
function toggleVisiMisiDetail(type) {
  const isVisi = type === 'visi';
  const panel = document.getElementById(isVisi ? 'visi-detail-panel' : 'misi-detail-panel');
  const card = document.getElementById(isVisi ? 'visi-card' : 'misi-card');
  const badge = document.getElementById(isVisi ? 'visi-card-badge' : 'misi-card-badge');
  
  if (!panel || !card) return;

  const isHidden = panel.classList.contains('hidden');

  if (isHidden) {
    panel.classList.remove('hidden');
    panel.classList.add('animate-visi-misi');
    card.setAttribute('aria-expanded', 'true');
    if (isVisi) {
      card.classList.add('border-amber-500', 'ring-2', 'ring-amber-500/20');
      if (badge) {
        badge.textContent = 'TUTUP DETAIL';
        badge.classList.remove('bg-amber-50', 'text-amber-700', 'border-amber-200/60');
        badge.classList.add('bg-amber-500', 'text-white', 'border-amber-500');
      }
    } else {
      card.classList.add('border-amber-500', 'ring-2', 'ring-amber-500/20');
      if (badge) {
        badge.textContent = 'TUTUP DETAIL';
        badge.classList.remove('bg-amber-50', 'text-amber-700', 'border-amber-200/60');
        badge.classList.add('bg-slate-900', 'text-white', 'border-slate-900');
      }
    }
  } else {
    panel.classList.add('hidden');
    panel.classList.remove('animate-visi-misi');
    card.setAttribute('aria-expanded', 'false');
    if (isVisi) {
      card.classList.remove('border-amber-500', 'ring-2', 'ring-amber-500/20');
      if (badge) {
        badge.textContent = 'KLIK DETAIL';
        badge.classList.add('bg-amber-50', 'text-amber-700', 'border-amber-200/60');
        badge.classList.remove('bg-amber-500', 'text-white', 'border-amber-500');
      }
    } else {
      card.classList.remove('border-amber-500', 'ring-2', 'ring-amber-500/20');
      if (badge) {
        badge.textContent = 'KLIK DETAIL';
        badge.classList.add('bg-amber-50', 'text-amber-700', 'border-amber-200/60');
        badge.classList.remove('bg-slate-900', 'text-white', 'border-slate-900');
      }
    }
  }
}

window.toggleVisiMisiDetail = toggleVisiMisiDetail;
