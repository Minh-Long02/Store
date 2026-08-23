{
const duplicateRegisterForms = document.querySelectorAll('#loginModal form#registerForm');
if (duplicateRegisterForms.length > 1) duplicateRegisterForms[0].remove();
const registerForm = document.getElementById('registerForm');
const registerError = document.getElementById('signupError');
const accountSwitch = document.getElementById('accountSwitch');
const accountPrompt = document.getElementById('accountPrompt');
const countrySelect = document.getElementById('signupCountry');
const phoneCode = document.getElementById('phoneCode');
function showRegister(show) { loginForm.hidden = show; registerForm.hidden = !show; accountPrompt.textContent = show ? 'Already have an account?' : 'Do not have an account?'; accountSwitch.textContent = show ? 'Sign in' : 'Sign up'; (show ? document.getElementById('signupUsername') : document.getElementById('username')).focus(); }
countrySelect.addEventListener('change', () => { phoneCode.textContent = countrySelect.selectedOptions[0].dataset.code; });
registerForm.addEventListener('submit', event => { event.preventDefault(); const username = document.getElementById('signupUsername').value.trim(); const phone = document.getElementById('signupPhone').value.trim(); const password = document.getElementById('signupPassword').value; const confirmation = document.getElementById('signupConfirmPassword').value; const accounts = JSON.parse(localStorage.getItem('moriAccounts') || '[]'); if (accounts.some(account => account.username.toLowerCase() === username.toLowerCase())) { registerError.textContent = 'That username is already taken.'; return; } if (password !== confirmation) { registerError.textContent = 'Passwords do not match.'; return; } accounts.push({ username, phone: `${phoneCode.textContent} ${phone}`, country: countrySelect.value, password }); localStorage.setItem('moriAccounts', JSON.stringify(accounts)); sessionStorage.setItem('moriLoggedIn', 'true'); sessionStorage.setItem('moriRole', 'user'); loginToggle.textContent = '●'; loginToggle.setAttribute('aria-label', 'Signed in'); closeLogin(); });
}
const products = [
    { name: 'Serein Pendant', type: 'necklaces', meta: 'Recycled silver / 18”', price: 6, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=85', tag: 'New' },
    { name: 'Tide Pool Ring', type: 'rings', meta: 'Sterling silver', price: 4, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=85' },
    { name: 'Sol Shell Hoops', type: 'earrings', meta: 'Gold vermeil', price: 5, image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=700&q=85', tag: 'Best seller' },
    { name: 'Moss Cuff', type: 'bracelets', meta: 'Brass / hand patina', price: 7, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=700&q=85' },
    { name: 'Nami Chain', type: 'necklaces', meta: 'Gold plated / 16”', price: 8, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=700&q=85' },
    { name: 'Pebble Signet', type: 'rings', meta: 'Sterling silver', price: 9, image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=85' },
    { name: 'Pearl Study Studs', type: 'earrings', meta: 'Freshwater pearl', price: 6.1, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=85', tag: 'Limited' },
    { name: 'Luna Threader', type: 'earrings', meta: 'Recycled silver', price: 3, image: 'https://images.unsplash.com/photo-1535556116002-6281ff3e9f9c?auto=format&fit=crop&w=700&q=85' }
];
const savedProducts = JSON.parse(localStorage.getItem('moriProducts') || 'null');
if (savedProducts) products.splice(0, products.length, ...savedProducts);
const siteContent = JSON.parse(localStorage.getItem('moriContent') || 'null') || { announcement: 'Worldwide shipping ✳ rates calculated at checkout', about: 'We believe the best objects become part of you. Chalice Craft is a study in shape, texture and the beautiful pause between too much and just enough.', email: 'bychalice.craft@gmail.com', copyright: '© 2026 Chalice Craft', location: 'Ho Chi Minh City / Worldwide', legal: 'Privacy & terms' };
siteContent.about = siteContent.about.replace(/\bMori\b/g, 'Chalice Craft').replace(/\bMori Objects\b/g, 'Chalice Craft');
siteContent.copyright = siteContent.copyright.replace(/\bMori Objects\b/g, 'Chalice Craft');
if (siteContent.announcement === 'Free shipping on orders over $75 ✳ made slowly, worn daily') siteContent.announcement = 'Worldwide shipping ✳ rates calculated at checkout';
if (siteContent.email === 'hello@mori.objects') siteContent.email = 'bychalice.craft@gmail.com';
if (localStorage.getItem('moriRole') === 'admin') {
    sessionStorage.setItem('moriLoggedIn', 'true');
    sessionStorage.setItem('moriRole', 'admin');
}
let currentFilter = 'all', currentSort = 'featured', currentPage = 1, bag = [];
const grid = document.getElementById('productGrid');
const searchField = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
function renderSearchResults(query = '') {
    const keyword = query.trim().toLowerCase();
    if (!keyword) { searchResults.innerHTML = ''; return; }
    const matches = products.filter(product => [product.name, product.type, product.meta, product.tag].filter(Boolean).join(' ').toLowerCase().includes(keyword));
    searchResults.innerHTML = matches.length ? matches.map(product => `<button class="search-result" data-product-index="${products.indexOf(product)}"><img src="${product.image}" alt="${product.name}"><span><strong>${product.name}</strong><small>${product.meta}</small></span><b>$${product.price.toFixed(2)}</b></button>`).join('') : '<p class="search-empty">No pieces found. Try another keyword.</p>';
}
searchField.addEventListener('input', () => renderSearchResults(searchField.value));
searchResults.addEventListener('click', event => {
    const result = event.target.closest('[data-product-index]');
    if (!result) return;
    currentFilter = 'all';
    currentPage = Math.floor(Number(result.dataset.productIndex) / 8) + 1;
    document.querySelectorAll('#filterTabs button').forEach(button => button.classList.toggle('active', button.dataset.filter === 'all'));
    render();
    searchOverlay.classList.remove('open');
    searchField.value = '';
    searchResults.innerHTML = '';
    grid.scrollIntoView({ behavior: 'smooth' });
});
function render() {
    let list = products.filter(p => currentFilter === 'all' || p.type === currentFilter);
    if (currentSort === 'low') list.sort((a, b) => a.price - b.price);
    if (currentSort === 'high') list.sort((a, b) => b.price - a.price);
    const pageCount = Math.ceil(list.length / 8);
    currentPage = Math.min(currentPage, Math.max(pageCount, 1));
    const pageItems = list.slice((currentPage - 1) * 8, currentPage * 8);
    grid.innerHTML = pageItems.map(p => `<article class="product-card"><div class="product-image">${p.tag ? `<span class="tag">${p.tag}</span>` : ''}<button class="wishlist" aria-label="Thêm ${p.name} vào yêu thích">♡</button><img src="${p.image}" alt="${p.name}" loading="lazy"></div><div class="product-info"><div><h3 class="product-name">${p.name}</h3><div class="product-meta">${p.meta}</div></div><div class="product-price">$${p.price.toFixed(2)}</div></div><button class="add-button" data-index="${products.indexOf(p)}">Add to bag</button></article>`).join('');
    document.querySelectorAll('.wishlist').forEach(b => b.addEventListener('click', () => b.classList.toggle('liked')));
    document.querySelectorAll('.add-button').forEach(b => b.addEventListener('click', () => addToBag(products[b.dataset.index])));
    document.getElementById('pagination').innerHTML = pageCount > 1 ? `<button class="pagination-arrow" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''} aria-label="Previous page">←</button>${Array.from({ length: pageCount }, (_, i) => `<button class="pagination-page${i + 1 === currentPage ? ' active' : ''}" data-page="${i + 1}">${i + 1}</button>`).join('')}<button class="pagination-arrow" data-page="${currentPage + 1}" ${currentPage === pageCount ? 'disabled' : ''} aria-label="Next page">→</button>` : '';
}
document.getElementById('pagination').addEventListener('click', e => { if (e.target.disabled) return; currentPage = Number(e.target.dataset.page); render(); document.getElementById('productGrid').scrollIntoView({ behavior: 'smooth' }); });
document.getElementById('filterTabs').addEventListener('click', e => { if (e.target.tagName === 'BUTTON') currentPage = 1; }, true);
document.getElementById('sortMenu').addEventListener('click', e => { if (e.target.tagName === 'BUTTON') currentPage = 1; }, true);
function addToBag(product) { bag.push(product); updateBag(); document.getElementById('cartDrawer').classList.add('open'); document.getElementById('scrim').classList.add('open') }
function updateBag() { localStorage.setItem('moriBag', JSON.stringify(bag)); document.getElementById('cartCount').textContent = bag.length; document.getElementById('drawerCount').textContent = bag.length; document.getElementById('cartTotal').textContent = `$${bag.reduce((sum, p) => sum + p.price, 0).toFixed(2)}`; document.getElementById('cartItems').innerHTML = bag.length ? bag.map((p, i) => `<div class="cart-line"><img src="${p.image}" alt="${p.name}"><div><h3>${p.name}</h3><p>$${p.price.toFixed(2)}</p></div><button class="remove-item" data-remove="${i}">×</button></div>`).join('') : '<p class="empty-cart">Your bag is waiting for something special.</p>'; document.querySelectorAll('.remove-item').forEach(b => b.addEventListener('click', () => { bag.splice(b.dataset.remove, 1); updateBag() })) }
document.getElementById('filterTabs').addEventListener('click', e => { if (e.target.tagName !== 'BUTTON') return; document.querySelectorAll('#filterTabs button').forEach(b => b.classList.remove('active')); e.target.classList.add('active'); currentFilter = e.target.dataset.filter; render() }); document.getElementById('sortButton').addEventListener('click', () => document.getElementById('sortMenu').classList.toggle('open')); document.getElementById('sortMenu').addEventListener('click', e => { if (e.target.tagName !== 'BUTTON') return; currentSort = e.target.dataset.sort; document.getElementById('sortButton').textContent = `Sort: ${e.target.textContent.split(':')[0]}`; document.getElementById('sortMenu').classList.remove('open'); render() });
const loginModal = document.getElementById('loginModal'); const loginForm = document.getElementById('loginForm'); const loginError = document.getElementById('loginError'); const loginToggle = document.getElementById('loginToggle'); function openLogin() { loginModal.classList.add('open'); loginError.textContent = ''; document.getElementById('username').focus() } function closeLogin() { loginModal.classList.remove('open') } loginToggle.addEventListener('click', openLogin); document.getElementById('closeLogin').addEventListener('click', closeLogin); loginModal.addEventListener('click', e => { if (e.target === loginModal) closeLogin() }); loginForm.addEventListener('submit', e => { e.preventDefault(); const username = document.getElementById('username').value.trim(); const password = document.getElementById('password').value; if (username === 'admin' && password === 'admin123') { sessionStorage.setItem('moriLoggedIn', 'true'); sessionStorage.setItem('moriRole', 'admin'); window.location.href = 'dashboard.html' } else if (username && password) { sessionStorage.setItem('moriLoggedIn', 'true'); sessionStorage.setItem('moriRole', 'user'); loginToggle.textContent = '●'; loginToggle.setAttribute('aria-label', 'Đã đăng nhập'); closeLogin() } else { loginError.textContent = 'Vui lòng nhập đầy đủ thông tin.'; document.getElementById('password').focus() } }); if (sessionStorage.getItem('moriLoggedIn') === 'true') { loginToggle.textContent = '●'; loginToggle.setAttribute('aria-label', 'Đã đăng nhập') }
bag = JSON.parse(localStorage.getItem('moriBag') || '[]'); const searchOverlay = document.getElementById('searchOverlay'); document.getElementById('searchToggle').addEventListener('click', () => { searchOverlay.classList.add('open'); document.getElementById('searchInput').focus() }); document.getElementById('closeSearch').addEventListener('click', () => searchOverlay.classList.remove('open')); document.getElementById('cartToggle').addEventListener('click', () => { document.getElementById('cartDrawer').classList.add('open'); document.getElementById('scrim').classList.add('open') }); function closeDrawer() { document.getElementById('cartDrawer').classList.remove('open'); document.getElementById('scrim').classList.remove('open') } document.getElementById('closeCart').addEventListener('click', closeDrawer); document.getElementById('scrim').addEventListener('click', closeDrawer); document.getElementById('checkoutButton').addEventListener('click', () => { window.location.href = 'checkout.html' }); document.getElementById('signupForm').addEventListener('submit', e => { e.preventDefault(); document.getElementById('formMessage').textContent = 'You are on the list. See you soon.'; e.target.reset() }); updateBag(); render();