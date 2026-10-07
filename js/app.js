
// ============================================================
// Multi-Language Category Dictionary (ID, EN, ZH)
// ============================================================
const CATEGORY_I18N = {
  id: {
    'patch-cable': 'Patch Cable & Networking',
    'hdmi-video': 'HDMI & Video Cables',
    'displayport': 'DisplayPort 8K / 16K',
    'dvi-vga': 'Kabel DVI & VGA',
    'audio': 'Kabel Audio & Instrumen',
    'power-cable': 'Kabel Daya & PDU',
    'adapter': 'Adapters & Converters',
    'computer-acc': 'Chargers & Mobile Acc',
    'usb-charging': 'USB & Fast Data',
    'earphone-tws': 'Audio & Earphones'
  },
  en: {
    'patch-cable': 'Patch Cable & Networking',
    'hdmi-video': 'HDMI & Video Cables',
    'displayport': 'DisplayPort 8K / 16K',
    'dvi-vga': 'DVI & VGA Cables',
    'audio': 'Audio & Instrument Cables',
    'power-cable': 'Power & PDU Cables',
    'adapter': 'Adapters & Converters',
    'computer-acc': 'Chargers & Mobile Acc',
    'usb-charging': 'USB & Fast Data',
    'earphone-tws': 'Audio & Earphones'
  },
  zh: {
    'patch-cable': '网络跳线与布线系统',
    'hdmi-video': 'HDMI 与高清视频线',
    'displayport': 'DisplayPort 8K / 16K 高清线',
    'dvi-vga': 'DVI 与 VGA 工程线缆',
    'audio': '专业音频与乐器线缆',
    'power-cable': '重型电源线与 PDU 线缆',
    'adapter': '转接器与信号转换器',
    'computer-acc': '充电器与数码配件',
    'usb-charging': 'USB 与极速数据线',
    'earphone-tws': 'TWS 蓝牙耳机与音频'
  }
};

function getCategoryName(catId, lang) {
  const l = lang || window.currentLanguage || 'id';
  if (CATEGORY_I18N[l] && CATEGORY_I18N[l][catId]) {
    return CATEGORY_I18N[l][catId];
  }
  if (CATEGORY_I18N['en'] && CATEGORY_I18N['en'][catId]) {
    return CATEGORY_I18N['en'][catId];
  }
  return catId;
}
window.getCategoryName = getCategoryName;

/**
 * HOWELL Official Showcase Catalog Controller
 * Brand: HOWELL (PT Howell Niaga Indonesia) - Est. 2009
 * Features: High-Contrast Light & Dark Mode, Apple Aesthetics, Pure Showcase Catalog with Cart & QRIS Gateway
 */

// ============================================================
// Smooth Scroll Navigation Helper
// ============================================================
window.scrollToId = function(id) {
  if (typeof window.showFloatingHeader === 'function') {
    window.showFloatingHeader();
  }
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.getElementById('site-header');
  const headerOffset = header ? header.offsetHeight + 14 : 80;

  if (window.lenis && typeof window.lenis.scrollTo === 'function') {
    window.lenis.scrollTo(el, {
      offset: -headerOffset,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  } else {
    const top = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - headerOffset);
    window.scrollTo({ top, behavior: 'smooth' });
  }

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
  catalogInitialLimit: 4,
  activeProductDetail: null,
  activeDetailTab: 'specs',
  activeLength: null,
  activeColor: null,
  detailQty: 1,
  theme: 'light',
  expandedCards: new Set()
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

const TOAST_I18N = {
  id: {
    fav_remove: "Dihapus dari daftar favorit",
    fav_remove_title: "Favorit",
    fav_add: (name) => `"${name}" disimpan ke favorit`,
    fav_add_title: "Produk Tersimpan",
    copy_success: "Tautan produk berhasil disalin!",
    copy_title: "Berbagi Produk",
  },
  en: {
    fav_remove: "Removed from saved products",
    fav_remove_title: "Favorites",
    fav_add: (name) => `"${name}" saved to favorites`,
    fav_add_title: "Saved Product",
    copy_success: "Product link copied to clipboard!",
    copy_title: "Share Product",
  },
  zh: {
    fav_remove: "已从收藏夹移除",
    fav_remove_title: "我的收藏",
    fav_add: (name) => `"${name}" 已加入收藏夹`,
    fav_add_title: "已保存产品",
    copy_success: "产品链接已成功复制！",
    copy_title: "分享产品",
  }
};

// Wishlist System
const wishlistSystem = {
  toggle(productId) {
    const curL = window.currentLanguage || localStorage.getItem('howell_lang') || 'id';
    const t = TOAST_I18N[curL] || TOAST_I18N.id;
    const idx = state.wishlist.indexOf(productId);
    const product = HOWELL_PRODUCTS.find(p => p.id === productId);
    if (idx > -1) {
      state.wishlist.splice(idx, 1);
      showToast(t.fav_remove, t.fav_remove_title, "heart-off");
    } else {
      state.wishlist.push(productId);
      showToast(t.fav_add(product?.name || ''), t.fav_add_title, "heart");
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
        <img src="${encodedSrc}" alt="${product.name}" loading="lazy" decoding="async" onerror="this.src='assets/howell-logo.png'" onclick="event.stopPropagation(); openImageZoom('${encodedSrc}', '${safeTitle}')" class="w-full h-full object-contain ${pClass} transition-transform duration-500 group-hover/img:scale-105 cursor-zoom-in" title="Klik foto untuk perbesar / zoom">
        
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
        btn.className = 'flex items-center gap-2 px-4 py-2 rounded-full border border-[#D2D2D7] bg-white text-xs sm:text-[13px] font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all select-none cursor-pointer';
      } else {
        btn.className = 'flex items-center gap-2 px-4 py-2 rounded-full border border-[#1D1D1F] bg-[#1D1D1F] text-white text-xs sm:text-[13px] font-semibold transition-all select-none cursor-pointer shadow-xs';
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

  const currentLang = window.currentLanguage || 'id';
  const allChipLabel = currentLang === 'zh' ? '全部' : (currentLang === 'en' ? 'All' : 'Semua');
  let html = `
    <button type="button" onclick="filterByCategory('all')" class="category-chip-btn ${isAllActive ? 'active' : ''}">
      <span>${allChipLabel}</span>
      <span class="cat-count-pill ml-1">(${allCount})</span>
    </button>
  `;

  HOWELL_CATEGORIES.forEach(cat => {
    const count = (typeof HOWELL_PRODUCTS !== 'undefined') ? HOWELL_PRODUCTS.filter(p => p.category === cat.id).length : 0;
    const isActive = state.activeCategory === cat.id;
    html += `
      <button type="button" onclick="filterByCategory('${cat.id}')" class="category-chip-btn ${isActive ? 'active' : ''}">
        <span>${getCategoryName(cat.id, currentLang)}</span>
        <span class="cat-count-pill ml-1">(${count})</span>
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
  state.availabilityStock = stockEl ? stockEl.checked : false;
  renderCatalog();
}

// CableTime Sort Change
function changeCatalogSort(val) {
  state.sortBy = val;
  renderCatalog();
}

// ── Card Show More / Show Less ───────────────────────────────
window.toggleCardExpand = function(productId, event) {
  if (event) event.stopPropagation();
  const isExpanded = state.expandedCards.has(productId);

  if (isExpanded) {
    state.expandedCards.delete(productId);
  } else {
    state.expandedCards.add(productId);
  }

  // Toggle expand panel
  const panel = document.getElementById('expand-panel-' + productId);
  const btn   = document.getElementById('expand-btn-' + productId);
  if (panel) panel.classList.toggle('is-open', !isExpanded);
  if (btn)   btn.classList.toggle('is-open', !isExpanded);

  // Update button label
  if (btn) {
    const label = btn.querySelector('.expand-label');
    if (label) label.textContent = isExpanded ? 'Spesifikasi' : 'Tutup Detail';
  }
};

// Apple-style View Mode Toggle (Grid vs List Segmented Control)
function setCatalogViewMode(mode) {
  state.viewMode = mode;
  const gridBtn = document.getElementById('view-mode-grid-btn');
  const listBtn = document.getElementById('view-mode-list-btn');
  if (gridBtn && listBtn) {
    if (mode === 'grid') {
      gridBtn.className = 'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white text-[#1D1D1F] shadow-xs cursor-pointer transition-all';
      listBtn.className = 'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] cursor-pointer transition-all';
    } else {
      listBtn.className = 'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white text-[#1D1D1F] shadow-xs cursor-pointer transition-all';
      gridBtn.className = 'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] cursor-pointer transition-all';
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
    filtered = filtered.filter(p => (p.stockQty && p.stockQty > 0) || p.readyStock !== false);
  }

  // Sorting logic (Relevance, Name, SKU, Price, Rating)
  if (state.sortBy === 'name' || state.sortBy === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (state.sortBy === 'name-desc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  } else if (state.sortBy === 'sku') {
    filtered.sort((a, b) => (a.sku || '').localeCompare(b.sku || ''));
  } else if (state.sortBy === 'price-asc') {
    filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (state.sortBy === 'price-desc') {
    filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (state.sortBy === 'rating' || state.sortBy === 'rating-desc') {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  // Update live count
  if (countEl) {
    const curL = window.currentLanguage || 'id';
    const unitText = curL === 'zh' ? ' 款产品' : (curL === 'en' ? ' products' : ' produk');
    countEl.textContent = `${filtered.length}${unitText}`;
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
        <span>${(window.currentLanguage === 'zh' ? '全部产品' : (window.currentLanguage === 'en' ? 'All Products' : 'Semua Produk'))}</span>
        <span class="text-[11px] text-slate-400">(${allCount})</span>
      </button>
      ${HOWELL_CATEGORIES.map(cat => {
        const count = HOWELL_PRODUCTS.filter(p => p.category === cat.id).length;
        const isActive = state.activeCategory === cat.id;
        return `
          <button type="button" onclick="filterByCategory('${cat.id}')" class="w-full flex items-center justify-between py-1 text-left text-[13px] transition-colors ${isActive ? 'text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'}">
            <span class="truncate">${getCategoryName(cat.id, window.currentLanguage || 'id')}</span>
            <span class="text-[11px] text-slate-400 shrink-0 ml-1">(${count})</span>
          </button>
        `;
      }).join('')}
    `;
  }

  if (filtered.length === 0) {
    catalogGrid.className = 'col-span-full py-16 text-center';
    const curL = window.currentLanguage || 'id';
    const emptyTitle = curL === 'zh' ? '未找到符合条件的产品' : (curL === 'en' ? 'No Matching Products Found' : 'Tidak Ada Produk yang Sesuai');
    const emptyDesc = curL === 'zh' ? '请尝试调整搜索关键词或选择其他产品分类。' : (curL === 'en' ? 'Try adjusting your search query or selected product category.' : 'Coba sesuaikan pencarian atau kategori produk Anda.');
    const resetText = curL === 'zh' ? '重置筛选条件' : (curL === 'en' ? 'Reset Filters' : 'Reset Filter');
    catalogGrid.innerHTML = `
      <div class="py-16 text-center rounded-2xl p-8 border border-slate-200 font-sans max-w-md mx-auto">
        <div class="w-14 h-14 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400 mb-4">
          <i data-lucide="search-x" class="w-7 h-7"></i>
        </div>
        <h3 class="text-base font-bold text-slate-900">${emptyTitle}</h3>
        <p class="text-xs text-slate-500 mt-1">${emptyDesc}</p>
        <button onclick="resetFilters()" class="mt-4 px-5 py-2 rounded-full bg-black text-white text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer">${resetText}</button>
      </div>
    `;
    if (loadMoreBox) loadMoreBox.innerHTML = '';
    if (window.lucide) lucide.createIcons();
    return;
  }

  // 4-Product Initial Limit & "See More" Logic (Strict 4 Cards Per Row)
  const limit = state.catalogInitialLimit || 4;
  const shouldLimit = !state.catalogExpanded && filtered.length > limit;
  const displayed = shouldLimit ? filtered.slice(0, limit) : filtered;

  if (state.viewMode === 'list') {
    catalogGrid.className = 'flex flex-col gap-3 w-full';
    catalogGrid.innerHTML = displayed.map(product => {
      const encodedSrc = encodeURI(product.image);

      return `
        <div onclick="openProductDetail('${product.id}')" class="bg-white rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-lg flex items-center gap-4 p-3 sm:p-4">
          <div class="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-[#F5F5F7] rounded-xl overflow-hidden flex items-center justify-center p-3">
            <img src="${encodedSrc}" alt="${product.name}" loading="lazy" decoding="async" onerror="this.src='assets/howell-logo.png'" class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out">
          </div>
          <div class="flex-1 min-w-0">
            <span class="text-[10px] font-medium uppercase tracking-wider text-[#86868B]">${getCategoryName(product.category, window.currentLanguage || 'id') || product.categoryName || 'HOWELL'}</span>
            <h3 class="text-[13px] sm:text-[14px] font-semibold text-[#1D1D1F] leading-snug line-clamp-2 mt-0.5">${product.name}</h3>
          </div>
          <svg class="w-4 h-4 text-[#C7C7CC] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      `;
    }).join('');
  } else {
    // Grid View — Minimal Product Card
    catalogGrid.className = 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full items-stretch';
    catalogGrid.innerHTML = displayed.map(product => {
      const encodedSrc = encodeURI(product.image);

      return `
        <div onclick="openProductDetail('${product.id}')" class="product-card-pro flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-lg">
          <div class="w-full aspect-square bg-[#F5F5F7] flex items-center justify-center overflow-hidden p-6">
            <img src="${encodedSrc}" alt="${product.name}" loading="lazy" decoding="async" onerror="this.src='assets/howell-logo.png'"
              class="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105">
          </div>
          <div class="px-3.5 py-3 flex flex-col gap-0.5">
            <span class="text-[10px] font-medium uppercase tracking-wider text-[#86868B]">${getCategoryName(product.category, window.currentLanguage || 'id') || product.categoryName || 'HOWELL'}</span>
            <h3 class="text-[13px] sm:text-[14px] font-semibold text-[#1D1D1F] leading-snug tracking-[-0.012em] line-clamp-2">${product.name}</h3>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render "See More" / "Lihat Lebih Banyak" Button (Apple Pill Style)
  if (loadMoreBox) {
    if (filtered.length > limit) {
      if (shouldLimit) {
        const remaining = filtered.length - limit;
        const curL = window.currentLanguage || 'id';
        const seeMoreText = curL === 'zh' ? `查看其余 ${remaining} 款产品` : (curL === 'en' ? `See ${remaining} More Products` : `Lihat ${remaining} Produk Lainnya`);
        const showingOfText = curL === 'zh' ? `显示 ${limit} / ${filtered.length} 款 HOWELL 目录产品` : (curL === 'en' ? `Showing ${limit} of ${filtered.length} HOWELL catalog products` : `Menampilkan ${limit} dari ${filtered.length} produk katalog HOWELL`);
        loadMoreBox.innerHTML = `
          <div class="flex flex-col items-center gap-2 pt-4">
            <button type="button" onclick="toggleCatalogExpand(true)" class="group px-7 py-2.5 rounded-full border border-[#D2D2D7] bg-white hover:bg-[#F5F5F7] text-[#1D1D1F] text-[13px] font-semibold transition-all flex items-center gap-2 select-none cursor-pointer">
              <span>${seeMoreText}</span>
              <i data-lucide="chevron-down" class="w-4 h-4 text-[#86868B] group-hover:translate-y-0.5 transition-transform stroke-[1.75]"></i>
            </button>
            <span class="text-[11px] text-[#86868B]">${showingOfText}</span>
          </div>
        `;
      } else {
        const curL = window.currentLanguage || 'id';
        const showLessText = curL === 'zh' ? '收起产品列表' : (curL === 'en' ? 'Show Less' : 'Tampilkan Lebih Sedikit');
        const showingAllText = curL === 'zh' ? `显示全部 ${filtered.length} 款产品` : (curL === 'en' ? `Showing all ${filtered.length} catalog products` : `Menampilkan seluruh ${filtered.length} produk katalog`);
        loadMoreBox.innerHTML = `
          <div class="flex flex-col items-center gap-2 pt-4">
            <button type="button" onclick="toggleCatalogExpand(false)" class="group px-7 py-2.5 rounded-full border border-[#D2D2D7] bg-white hover:bg-[#F5F5F7] text-[#1D1D1F] text-[13px] font-semibold transition-all flex items-center gap-2 select-none cursor-pointer">
              <span>${showLessText}</span>
              <i data-lucide="chevron-up" class="w-4 h-4 text-[#86868B] group-hover:-translate-y-0.5 transition-transform stroke-[1.75]"></i>
            </button>
            <span class="text-[11px] text-[#86868B]">${showingAllText}</span>
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
  if (typeof expand === 'boolean') {
    state.catalogExpanded = expand;
  } else {
    state.catalogExpanded = !state.catalogExpanded;
  }
  renderCatalog();
  if (!state.catalogExpanded) {
    scrollToId('catalog-section');
  }
}

/// Print / Export Entire HOWELL Product Catalog as PDF (All Products - Master B2B Table Format)
function printCatalogPDF(cat = 'all', autoPrint = false) {
  let url = 'print-catalog.html';
  const params = [];
  const curL = window.currentLanguage || localStorage.getItem('howell_lang') || 'id';
  if (curL) {
    params.push(`lang=${encodeURIComponent(curL)}`);
  }
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
  featuredGrid.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 w-full';
  featuredGrid.innerHTML = featuredList.map(product => {
    const encodedSrc = encodeURI(product.image);

    return `
      <div onclick="openProductDetail('${product.id}')" class="group flex flex-col cursor-pointer bg-transparent select-none">
        <div class="relative w-full aspect-square bg-[#f4f4f4] rounded-[6px] overflow-hidden flex items-center justify-center p-5 group-hover:bg-[#ededed] transition-colors duration-200">
          <img src="${encodedSrc}" alt="${product.name}" class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300">
        </div>
        <div class="pt-3 pb-1 font-sans flex flex-col justify-between flex-1">
          <h3 class="text-[13px] sm:text-[14px] font-semibold text-[#1a1a1a] line-clamp-2 leading-[1.35] hover:text-amber-600 transition-colors">${product.name}</h3>
        </div>
      </div>
    `;
  }).join('');
  if (window.lucide) lucide.createIcons();
};

window.renderCategoryCards = function renderCategoryCards() {
  const curL = window.currentLanguage || "id";
  const categoryContainer = document.getElementById('category-cards-grid');
  if (!categoryContainer) return;

  categoryContainer.innerHTML = HOWELL_CATEGORIES.map(cat => `
    <div onclick="filterByCategory('${cat.id}')" class="glass-card p-6 cursor-pointer flex flex-col justify-between group hover:border-yellow-500/60 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl transition-all">
      <div>
        <div class="w-11 h-11 rounded-2xl bg-amber-100 text-[#997600] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <i data-lucide="${cat.icon}" class="w-5 h-5"></i>
        </div>
        <h3 class="text-base font-bold text-slate-900 group-hover:text-[#b88e00] transition-colors tracking-tight">${getCategoryName(cat.id, curL)}</h3>
        <p class="text-xs text-slate-600 mt-1.5 leading-relaxed">${cat.desc}</p>
      </div>
      <div class="mt-6 flex items-center justify-between text-xs font-bold text-[#b88e00]">
        <span>${cat.count} ${curL==='zh'?'款认证现货':(curL==='en'?'SKUs Available':'SKU Tersedia')}</span>
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
  const curL = window.currentLanguage || 'id';
  const waMsg = curL === 'zh' 
    ? `您好 HOWELL，我对贵司产品 ${product.name} (SKU: ${product.sku || '-'}` + (state.activeLength !== 'Standard' ? ` 规格长度 ${state.activeLength}` : '') + `) 很感兴趣，请问是否有现货及详细工程报价？`
    : (curL === 'en'
      ? `Hello HOWELL, I am interested in ${product.name} (SKU: ${product.sku || '-'}` + (state.activeLength !== 'Standard' ? ` length variant ${state.activeLength}` : '') + `). Please share technical specs and availability.`
      : `Halo HOWELL, saya tertarik dengan produk ${product.name} (SKU: ${product.sku || '-'}` + (state.activeLength !== 'Standard' ? ` varian panjang ${state.activeLength}` : '') + `). Mohon informasi spesifikasi & ketersediaan stok.`);
  const waInquiryUrl = `https://wa.me/6281188031976?text=${encodeURIComponent(waMsg)}`;

  const txtBack = curL === 'zh' ? '返回产品目录' : (curL === 'en' ? 'Back to Product Catalog' : 'Kembali ke Katalog Produk');
  const txtZoomHint = curL === 'zh' ? '点击图片查看大图' : (curL === 'en' ? 'Click image to zoom' : 'Klik foto untuk perbesar gambar');
  const txtZoomBtn = curL === 'zh' ? '放大图片' : (curL === 'en' ? 'Zoom Image' : 'Perbesar Foto');
  const txtLengthLabel = curL === 'zh' ? '线长规格可选：' : (curL === 'en' ? 'Length Variants:' : 'Pilihan Varian Panjang:');
  const txtWaBtn = curL === 'zh' ? '通过 WhatsApp 咨询产品' : (curL === 'en' ? 'Product Inquiry via WhatsApp' : 'Konsultasi Produk via WhatsApp');
  const txtB2bBtn = curL === 'zh' ? '申请 B2B 企业工程报价' : (curL === 'en' ? 'B2B & Corporate Project Inquiries' : 'Permintaan Penawaran B2B & Proyek Korporat');
  const txtStoreLabel = curL === 'zh' ? '官方直营电商店铺：' : (curL === 'en' ? 'Available on Official Stores:' : 'Tersedia di Toko Online Resmi:');
  const txtQualityTitle = curL === 'zh' ? '品质保障与官方正品' : (curL === 'en' ? 'Quality Guarantee & Official Distribution' : 'Jaminan Mutu & Distribusi Resmi');
  const txtQualityDesc = curL === 'zh' 
    ? '由 <strong>PT Howell Niaga Indonesia</strong> 官方直供。全线缆及适配器均通过严苛 QC 检测，采用 100% 高纯度无氧铜 (OFC)，并享有官方 12 个月换新质保。'
    : (curL === 'en'
      ? 'Distributed officially by <strong>PT Howell Niaga Indonesia</strong>. All cables and adapters undergo strict QC testing, feature 100% oxygen-free copper (OFC), and include a 12-month official replacement warranty.'
      : 'Didistribusikan resmi oleh <strong>PT Howell Niaga Indonesia</strong>. Seluruh kabel dan adaptor melewati pengujian QC ketat, 100% tembaga bebas oksigen (OFC), dan bergaransi resmi 12 bulan tukar baru.');
  const txtShareLabel = curL === 'zh' ? '分享产品：' : (curL === 'en' ? 'Share Product:' : 'Bagikan Produk:');
  const txtShareFb = curL === 'zh' ? '分享到 Facebook' : (curL === 'en' ? 'Share to Facebook' : 'Share ke Facebook');
  const txtShareTw = curL === 'zh' ? '分享到 X' : (curL === 'en' ? 'Share to X' : 'Share ke X');
  const txtShareWa = curL === 'zh' ? '分享到 WhatsApp' : (curL === 'en' ? 'Share to WhatsApp' : 'Share ke WhatsApp');
  const txtShareCopy = curL === 'zh' ? '复制产品链接' : (curL === 'en' ? 'Copy Link' : 'Salin Tautan');
  const txtTabSpecs = curL === 'zh' ? '技术规格' : (curL === 'en' ? 'Technical Specs' : 'Spesifikasi Teknis');
  const txtTabDesc = curL === 'zh' ? '产品亮点与概述' : (curL === 'en' ? 'Overview & Features' : 'Ikhtisar & Fitur');
  const txtHighlightsTitle = curL === 'zh' ? 'HOWELL 核心产品优势：' : (curL === 'en' ? 'Key HOWELL Advantages:' : 'Keunggulan Kunci HOWELL:');
  const txtHighlights = curL === 'zh' ? [
    '采用高纯度无氧铜 (OFC) 导体，信号传输零衰减。',
    '双层全屏蔽结构，强力抗电磁与射频干扰 (EMI/RFI)。',
    '镀金抗氧化触点，耐插拔寿命突破 10,000 次。',
    'PT Howell Niaga Indonesia 严苛出厂质检认证，品质保障。'
  ] : (curL === 'en' ? [
    'Certified oxygen-free high-purity copper conductor (OFC / pure copper).',
    'Dual-layer shielding against electromagnetic and radio interference (EMI/RFI shielding).',
    'Gold-plated contacts engineered for oxidation resistance and 10,000+ insertion cycles.',
    'Strict international QC testing certified by PT Howell Niaga Indonesia.'
  ] : [
    'Material konduktor tembaga murni bersertifikasi bebas oksigen (OFC / pure copper).',
    'Pelindung ganda anti-interferensi elektromagnetik & radio (EMI/RFI shielding).',
    'Konektor kontak berlapis emas tahan oksidasi hingga lebih dari 10.000 kali pemasangan.',
    'Lolos sertifikasi QC ketat berstandar internasional dari PT Howell Niaga Indonesia.'
  ]);
  const txtLearnMore = curL === 'zh' ? '展开详情 ▾' : (curL === 'en' ? 'Learn More ▾' : 'Pelajari Selengkapnya ▾');
  const txtShowLess = curL === 'zh' ? '收起详情 ▲' : (curL === 'en' ? 'Show Less ▲' : 'Lebih sedikit ▲');
  const txtMobileWa = curL === 'zh' ? 'WhatsApp 咨询' : (curL === 'en' ? 'WhatsApp Consultation' : 'Konsultasi WhatsApp');

  containerEl.innerHTML = `
    <!-- Top Back Navigation & Breadcrumbs -->
    <div class="flex items-center justify-between gap-3 mb-5 flex-wrap">
      <button type="button" onclick="closeModal('product-detail-modal'); scrollToId('catalog-section');" class="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-black px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer shadow-xs">
        <i data-lucide="arrow-left" class="w-4 h-4"></i>
        <span>${txtBack}</span>
      </button>
      <div class="text-xs text-slate-500 flex items-center gap-1.5 font-medium flex-wrap">
        <button type="button" onclick="closeModal('product-detail-modal'); scrollToId('home');" class="hover:text-black cursor-pointer">Home</button>
        <span class="opacity-40">/</span>
        <button type="button" onclick="closeModal('product-detail-modal'); filterByCategory('${product.category}'); scrollToId('catalog-section');" class="hover:text-black cursor-pointer">${getCategoryName(product.category, curL) || product.categoryName}</button>
        <span class="opacity-40">/</span>
        <span class="text-slate-700 truncate max-w-xs sm:max-w-md">${product.name}</span>
      </div>
    </div>

    <!-- Main 2-Column Product Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

      <!-- Left Column: Single Large Product Image Only -->
      <div class="lg:col-span-6">
        <div class="aspect-square w-full bg-transparent rounded-2xl overflow-hidden relative flex items-center justify-center p-6 sm:p-8 group/detailimg border border-slate-100">
          <img id="detail-main-img" src="${encodedSrc}" alt="${product.name}" onclick="openImageZoom('${encodedSrc}', '${safeTitle}')" class="w-full h-full object-contain mix-blend-multiply cursor-zoom-in group-hover/detailimg:scale-105 transition-transform duration-300" title="Klik untuk Zoom">
          <!-- Zoom button -->
          <button type="button" onclick="openImageZoom('${encodedSrc}', '${safeTitle}')" class="absolute top-4 right-4 z-20 w-9 h-9 rounded-[8px] bg-white text-slate-700 hover:text-black flex items-center justify-center shadow-sm transition-all cursor-pointer border border-slate-200" title="${txtZoomBtn}">
            <i data-lucide="zoom-in" class="w-4 h-4"></i>
          </button>
        </div>
        <!-- Hint -->
        <div class="mt-3 flex items-center justify-between text-xs text-slate-400 px-1 font-medium">
          <span>${txtZoomHint}</span>
          <span class="text-[11px] font-bold text-slate-400">HOWELL</span>
        </div>
      </div>

      <!-- Right Column: Product Info & Actions -->
      <div class="lg:col-span-6 flex flex-col gap-4">

        <!-- Product Title -->
        <h1 id="detail-modal-name" class="text-xl sm:text-2xl lg:text-[26px] font-bold text-slate-900 leading-snug tracking-tight">${product.name}</h1>

        <!-- Category Badge -->
        <div class="flex items-center gap-2 flex-wrap text-xs -mt-1">
          <span class="font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-[6px] border border-slate-200">
            ${getCategoryName(product.category, curL) || product.categoryName || 'HOWELL'}
          </span>
        </div>

        <!-- Short Description + Expand -->
        <div class="text-xs sm:text-sm text-slate-600 leading-relaxed">
          <span id="detail-short-desc">${(product.summary || product.tagline || '').substring(0, 130)}${(product.summary || '').length > 130 ? '…' : ''}</span>
          ${(product.summary || '').length > 130 ? `
            <span id="detail-full-desc" class="hidden"> ${product.summary}</span>
            <button type="button" onclick="(function(){var s=document.getElementById('detail-short-desc'),f=document.getElementById('detail-full-desc'),b=this;if(f.classList.contains('hidden')){f.classList.remove('hidden');s.classList.add('hidden');b.textContent='${txtShowLess}';}else{f.classList.add('hidden');s.classList.remove('hidden');b.textContent='${txtLearnMore}';}}).call(this)" class="text-slate-900 font-semibold underline cursor-pointer ml-1 hover:text-[#b88e00] transition-colors">${txtLearnMore}</button>
          ` : ''}
        </div>

        <!-- Length Variant Selector (if applicable) -->
        ${product.variants?.lengths ? `
          <div>
            <label class="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">${txtLengthLabel}</label>
            <div class="flex flex-wrap gap-2" id="detail-length-pills">
              ${product.variants.lengths.map(len => `
                <button type="button" onclick="selectVariantLength('${len}')" data-variant-length="${len}" class="px-3.5 py-2 rounded-[8px] text-xs font-bold border transition-all cursor-pointer ${state.activeLength === len ? 'bg-[#FFC700] text-slate-950 border-[#FFC700] shadow-xs' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}">
                  ${len}
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Primary CTA: WhatsApp Inquiry Button -->
        <div class="space-y-2.5 pt-2">
          <a id="detail-wa-inquiry-btn" href="${waInquiryUrl}" target="_blank" rel="noopener noreferrer" 
            class="w-full h-12 rounded-[8px] bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-sm transition-all select-none cursor-pointer">
            <i data-lucide="phone" class="w-4 h-4"></i>
            <span>${txtWaBtn}</span>
            <span class="text-xs opacity-75">→</span>
          </a>

          <!-- B2B Procurement Button -->
          <button type="button" onclick="closeModal('product-detail-modal'); openB2BModal();" 
            class="w-full h-11 rounded-[8px] bg-slate-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all select-none cursor-pointer">
            <i data-lucide="building-2" class="w-4 h-4 text-[#FFC700]"></i>
            <span>${txtB2bBtn}</span>
          </button>
        </div>

        <!-- Official Online Channels -->
        <div class="space-y-2 pt-1">
          <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">${txtStoreLabel}</label>
          <div class="grid grid-cols-3 gap-2">
            <a href="https://shopee.co.id/howellcable?categoryId=100013&entryPoint=ShopByPDP&itemId=49006388534" target="_blank" rel="noopener noreferrer" class="py-2.5 px-2 rounded-[8px] bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 text-orange-600 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all">
              <img src="assets/shopee-logo.webp" alt="Shopee" class="w-4 h-4 object-contain">
              <span>Shopee</span>
            </a>
            <a href="https://tk.tokopedia.com/ZSqShWPvf/" target="_blank" rel="noopener noreferrer" class="py-2.5 px-2 rounded-[8px] bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-600 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all">
              <img src="assets/tokopedia-logo.png" alt="Tokopedia" class="w-4 h-4 object-contain">
              <span>Tokopedia</span>
            </a>
            <a href="https://www.tiktok.com/@howell_official?_r=1&_t=ZS-99aNN6XJUF2" target="_blank" rel="noopener noreferrer" class="py-2.5 px-2 rounded-[8px] bg-slate-900 hover:bg-black text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all">
              <img src="assets/tiktok-logo.avif" alt="TikTok" class="w-4 h-4 object-contain rounded-xs">
              <span>TikTok</span>
            </a>
          </div>
        </div>

        <!-- Quality & Verification Box -->
        <div class="p-4 rounded-2xl bg-[#f8f9fa] border border-slate-200 space-y-2">
          <div class="flex items-center gap-2">
            <i data-lucide="award" class="w-4 h-4 text-[#FFC700]"></i>
            <h4 class="text-xs font-bold text-slate-900">${txtQualityTitle}</h4>
          </div>
          <p class="text-[11px] text-slate-500 leading-relaxed">${txtQualityDesc}</p>
        </div>

        <!-- Social Share -->
        <div class="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span class="font-semibold text-slate-700">${txtShareLabel}</span>
            <button type="button" onclick="shareProduct('facebook')" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all cursor-pointer" title="${txtShareFb}"><svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></button>
            <button type="button" onclick="shareProduct('twitter')" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-black hover:text-white flex items-center justify-center transition-all cursor-pointer" title="${txtShareTw}"><svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></button>
            <button type="button" onclick="shareProduct('whatsapp')" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all cursor-pointer" title="${txtShareWa}"><i data-lucide="phone" class="w-3.5 h-3.5"></i></button>
            <button type="button" onclick="shareProduct('copy')" class="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-all cursor-pointer" title="${txtShareCopy}"><i data-lucide="link" class="w-3.5 h-3.5"></i></button>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom Section: Specifications, Overview & Warranty Tabs -->
    <div class="mt-10 pt-8 border-t border-slate-200">
      <div class="flex border-b border-slate-200 gap-6 text-sm font-semibold mb-6">
        <button type="button" onclick="switchDetailTab('specs')" id="tab-btn-specs" class="pb-3 border-b-2 border-black text-black font-bold transition-colors select-none cursor-pointer">${txtTabSpecs}</button>
        <button type="button" onclick="switchDetailTab('desc')" id="tab-btn-desc" class="pb-3 border-b-2 border-transparent text-slate-500 hover:text-black transition-colors select-none cursor-pointer">${txtTabDesc}</button>
      </div>

      <!-- Tab: Spesifikasi -->
      <div id="tab-content-specs" class="space-y-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${Object.entries(product.specs || {}).map(([key, val]) => {
            const isMono = false;
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
          <h5 class="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">${txtHighlightsTitle}</h5>
          <ul class="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            ${txtHighlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>

    <!-- Mobile Sticky Bar (< 1024px) -->
    <div class="block lg:hidden sticky -bottom-6 sm:-bottom-8 -mx-5 sm:-mx-8 p-3.5 sm:p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 shadow-lg mt-6">
      <div class="flex items-center gap-2">
        <a id="mobile-detail-wa-btn" href="${waInquiryUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 h-11 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer">
          <i data-lucide="phone" class="w-4 h-4"></i>
          <span>${txtMobileWa}</span>
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
  const curL = window.currentLanguage || localStorage.getItem('howell_lang') || 'id';
  const t = TOAST_I18N[curL] || TOAST_I18N.id;
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
      showToast(t.copy_success, t.copy_title, 'link');
    }).catch(() => {
      showToast(t.copy_success, t.copy_title, 'link');
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
  const modal = document.getElementById('b2b-kerjasama-modal') || document.getElementById('b2b-quote-modal');
  if (!modal) return;

  if (typeof stopScroll === 'function') stopScroll();
  modal.classList.remove('hidden', 'pointer-events-none', 'opacity-0');
  modal.classList.add('opacity-100');

  const tag = document.getElementById('b2b-modal-inquiry-tag');
  const waLink = document.getElementById('b2b-modal-wa-link');
  const emailLink = document.getElementById('b2b-modal-email-link');

  if (productName) {
    if (tag) {
      tag.textContent = 'Inquiry: ' + productName;
      tag.classList.remove('hidden');
    }
    if (waLink) {
      const msg = encodeURIComponent('Halo Sales B2B Howell, saya tertarik untuk penawaran produk: ' + productName + '.');
      waLink.href = 'https://wa.me/6285771666931?text=' + msg;
    }
    if (emailLink) {
      const subj = 'Inquiry B2B - ' + productName;
      emailLink.href = 'mailto:nick@howellcable.com?subject=' + encodeURIComponent(subj);
      emailLink.setAttribute('onclick', "openEmailModal(event, 'nick@howellcable.com', '" + subj.replace(/'/g, "\'") + "', 'Sales B2B')");
    }
  } else {
    if (tag) tag.classList.add('hidden');
    if (waLink) {
      waLink.href = 'https://wa.me/6285771666931?text=' + encodeURIComponent('Halo Sales B2B Howell, saya ingin berkonsultasi mengenai kerjasama / pengadaan B2B.');
    }
    if (emailLink) {
      emailLink.href = 'mailto:nick@howellcable.com?subject=' + encodeURIComponent('Inquiry Kerjasama B2B Howell');
      emailLink.setAttribute('onclick', "openEmailModal(event, 'nick@howellcable.com', 'Inquiry Kerjasama B2B Howell', 'Sales B2B')");
    }
  }
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
window.openImageZoom = openImageZoom;
window.openB2BModal = openB2BModal;
window.toggleCatalogExpand = toggleCatalogExpand;
window.printCatalogPDF = printCatalogPDF;

// closeModal is defined authoritatively in index.html inline script

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

// Toggle Visi & Misi Expandable Detail Panels
function toggleVisiMisiDetail(type) {
  const isVisi = type === 'visi';
  const panel = document.getElementById(isVisi ? 'visi-detail-panel' : 'misi-detail-panel');
  const card = document.getElementById(isVisi ? 'visi-card' : 'misi-card');
  const badge = document.getElementById(isVisi ? 'visi-card-badge' : 'misi-card-badge');
  
  if (!panel || !card) return;

  const isHidden = panel.classList.contains('hidden');
  const chevron = badge ? badge.querySelector('svg') : null;

  if (isHidden) {
    panel.classList.remove('hidden');
    panel.classList.add('animate-visi-misi');
    card.setAttribute('aria-expanded', 'true');
    card.classList.add('border-slate-400', 'shadow-md');
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  } else {
    panel.classList.add('hidden');
    panel.classList.remove('animate-visi-misi');
    card.setAttribute('aria-expanded', 'false');
    card.classList.remove('border-slate-400', 'shadow-md');
    if (chevron) chevron.style.transform = 'rotate(0deg)';
  }
}

window.toggleVisiMisiDetail = toggleVisiMisiDetail;

// ============================================================
// Hero Cinematic Video Controller
// ============================================================
window.heroVideoController = (function() {
  const videoPlaylist = [
    {
      src: 'assets/Video/moon-walk.mp4',
      poster: 'assets/Video/moon-walk-poster.jpg',
      label: 'Cinematic Vision'
    },
    {
      src: 'assets/motion-header.mp4',
      poster: 'assets/motion-header-poster.jpg',
      label: 'Hardware 3D'
    }
  ];

  let currentIndex = 0;
  let isPausedByUser = false;

  function init() {
    const video = document.getElementById('hero-background-video');
    if (!video) return;

    // Check prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      isPausedByUser = true;
      updatePlayPauseBtn();
      return;
    }

    // Try autoplay
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(function(err) {
        console.warn('Hero video autoplay blocked by browser policy:', err);
        isPausedByUser = true;
        updatePlayPauseBtn();
      });
    }

    // Loop seamlessly
    video.addEventListener('ended', function() {
      video.currentTime = 0;
      video.play().catch(function() {});
    });

    // Performance & Battery Optimization: Pause video when scrolled out of view
    if ('IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (!entry.isIntersecting) {
            if (!video.paused) video.pause();
          } else {
            if (!isPausedByUser && video.paused) {
              video.play().catch(function() {});
            }
          }
        });
      }, { threshold: 0.1 });
      videoObserver.observe(video);
    }

    // Pause video when browser tab is inactive / hidden
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        if (!video.paused) video.pause();
      } else {
        const rect = video.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!isPausedByUser && isInView && video.paused) {
          video.play().catch(function() {});
        }
      }
    });
  }

  function switchNext() {
    const video = document.getElementById('hero-background-video');
    const labelEl = document.getElementById('hero-video-active-label');
    if (!video) return;

    video.classList.add('is-transitioning');
    setTimeout(function() {
      currentIndex = (currentIndex + 1) % videoPlaylist.length;
      const currentItem = videoPlaylist[currentIndex];
      video.poster = currentItem.poster;
      video.src = currentItem.src;
      video.load();
      if (!isPausedByUser) {
        video.play().catch(function() {});
      }
      if (labelEl) {
        labelEl.textContent = currentItem.label;
      }
      setTimeout(function() {
        video.classList.remove('is-transitioning');
      }, 150);
    }, 300);
  }

  function togglePlayPause() {
    const video = document.getElementById('hero-background-video');
    if (!video) return;
    if (video.paused) {
      video.play().catch(function() {});
      isPausedByUser = false;
    } else {
      video.pause();
      isPausedByUser = true;
    }
    updatePlayPauseBtn();
  }

  function updatePlayPauseBtn() {
    const btn = document.getElementById('hero-video-playpause-btn');
    const video = document.getElementById('hero-background-video');
    if (!btn || !video) return;
    btn.textContent = video.paused ? '▶' : '⏸';
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 50);
  }

  return {
    switchNext: switchNext,
    togglePlayPause: togglePlayPause
  };
})();
