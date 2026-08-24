{
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.querySelector('.home-sidebar');
    menuToggle.addEventListener('click', () => { const isOpen = mobileMenu.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(isOpen)); menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu'); });
    menuToggle.dataset.menuBound = 'true';
    let toastTimer;
    function showToast(message) { toastMessage.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 3500); }
    document.getElementById('toastClose').addEventListener('click', () => { clearTimeout(toastTimer); toast.classList.remove('show'); });
    const duplicateRegisterForms = document.querySelectorAll('#loginModal form#registerForm');
    if (duplicateRegisterForms.length > 1) duplicateRegisterForms[0].remove();
    const duplicateAccountSwitches = document.querySelectorAll('#loginModal .account-switch');
    if (duplicateAccountSwitches.length > 1) duplicateAccountSwitches[0].remove();
    const registerForm = document.getElementById('registerForm');
    const registerError = document.getElementById('signupError');
    const accountSwitch = document.getElementById('accountSwitch');
    const accountPrompt = document.getElementById('accountPrompt');
    const countrySelect = document.getElementById('signupCountry');
    const phoneCode = document.getElementById('phoneCode');
    const signupUsername = document.getElementById('signupUsername');
    const signupPhone = document.getElementById('signupPhone');
    signupUsername.maxLength = 30;
    signupUsername.pattern = '[A-Za-z0-9]+';
    signupPhone.maxLength = 15;
    signupPhone.pattern = '[0-9]{1,15}';
    signupUsername.addEventListener('input', () => { signupUsername.value = signupUsername.value.replace(/[^A-Za-z0-9]/g, ''); });
    signupPhone.addEventListener('input', () => { signupPhone.value = signupPhone.value.replace(/\D/g, '').slice(0, 15); });
    function showRegister(show) { loginForm.hidden = show; registerForm.hidden = !show; accountPrompt.textContent = show ? 'Already have an account?' : 'Do not have an account?'; accountSwitch.textContent = show ? 'Sign in' : 'Sign up'; (show ? document.getElementById('signupUsername') : document.getElementById('username')).focus(); }
    accountSwitch.addEventListener('click', event => { event.preventDefault(); event.stopImmediatePropagation(); showRegister(registerForm.hidden); }, true);
    countrySelect.addEventListener('change', () => { phoneCode.textContent = countrySelect.selectedOptions[0].dataset.code; });
    registerForm.addEventListener('submit', event => { event.preventDefault(); const username = document.getElementById('signupUsername').value.trim(); const phone = document.getElementById('signupPhone').value.trim(); const password = document.getElementById('signupPassword').value; const confirmation = document.getElementById('signupConfirmPassword').value; const accounts = JSON.parse(localStorage.getItem('moriAccounts') || '[]'); if (accounts.some(account => account.username.toLowerCase() === username.toLowerCase())) { registerError.textContent = 'That username is already taken.'; return; } if (password !== confirmation) { registerError.textContent = 'Passwords do not match.'; return; } const account = { username, phone: `${phoneCode.textContent} ${phone}`, country: countrySelect.value, password }; accounts.push(account); localStorage.setItem('moriAccounts', JSON.stringify(accounts)); localStorage.setItem('moriCurrentUser', JSON.stringify(account)); sessionStorage.setItem('moriLoggedIn', 'true'); sessionStorage.setItem('moriRole', 'user'); loginToggle.textContent = '♙'; loginToggle.setAttribute('aria-label', 'Open profile'); closeLogin(); showToast('Account created successfully'); });
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
const homeHeroImage = document.getElementById('homeHeroImage');
if (homeHeroImage && siteContent.homeHero) homeHeroImage.src = siteContent.homeHero;
const featuredGallery = document.getElementById('featuredGallery');
if (featuredGallery) {
    const defaultGallery = [
        'Image/HRbanner_Chalice%20craft.jpg',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1400&q=85'
    ];
    const galleryImages = siteContent.homeGallery?.length ? siteContent.homeGallery : defaultGallery;
    if (featuredGallery) {
        featuredGallery.innerHTML = galleryImages.map((image, index) => `<img class="${index === 0 ? 'active' : ''}" src="${image}" alt="Chalice Craft featured image ${index + 1}">`).join('');
        const dots = document.getElementById('featuredGalleryDots');
        dots.innerHTML = galleryImages.map((image, index) => `<button class="${index === 0 ? 'active' : ''}" data-gallery-index="${index}" aria-label="Show image ${index + 1}"></button>`).join('');
        let galleryIndex = 0;
        const showGalleryImage = index => {
            galleryIndex = (index + galleryImages.length) % galleryImages.length;
            featuredGallery.querySelectorAll('img').forEach((image, imageIndex) => image.classList.toggle('active', imageIndex === galleryIndex));
            dots.querySelectorAll('button').forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === galleryIndex));
        };
        dots.querySelectorAll('button').forEach(dot => dot.addEventListener('click', () => showGalleryImage(Number(dot.dataset.galleryIndex))));
        if (galleryImages.length > 1) setInterval(() => showGalleryImage(galleryIndex + 1), 4500);
    }
}
const homeGallery = document.getElementById('homeGallery');
if (homeGallery) {
    const galleryImages = [...homeGallery.querySelectorAll('img')];
    let galleryIndex = 0;
    let autoSlideTimer;
    const showImage = index => { galleryIndex = (index + galleryImages.length) % galleryImages.length; galleryImages.forEach((image, imageIndex) => image.classList.toggle('active', imageIndex === galleryIndex)); };
    const restartAutoSlide = () => { clearInterval(autoSlideTimer); if (galleryImages.length > 1) autoSlideTimer = setInterval(() => showImage(galleryIndex + 1), 4500); };
    document.getElementById('galleryPrev')?.addEventListener('click', () => { showImage(galleryIndex - 1); restartAutoSlide(); });
    document.getElementById('galleryNext')?.addEventListener('click', () => { showImage(galleryIndex + 1); restartAutoSlide(); });
    let startX = 0;
    homeGallery.addEventListener('touchstart', event => { startX = event.touches[0].clientX; clearInterval(autoSlideTimer); }, { passive: true });
    homeGallery.addEventListener('touchend', event => { const distance = event.changedTouches[0].clientX - startX; if (Math.abs(distance) > 50) showImage(galleryIndex + (distance < 0 ? 1 : -1)); restartAutoSlide(); }, { passive: true });
    homeGallery.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
    homeGallery.addEventListener('mouseleave', restartAutoSlide);
    showImage(0);
    restartAutoSlide();
}
const introHero = document.querySelector('.collection-intro');
if (introHero) {
    const introImages = siteContent.homeGallery?.length ? siteContent.homeGallery : [
        'Image/HRbanner_Chalice%20craft.jpg',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1400&q=85'
    ];
    let introIndex = 0;
    const showIntroImage = index => {
        introIndex = (index + introImages.length) % introImages.length;
        introHero.style.setProperty('--intro-hero-image', `url("${introImages[introIndex]}")`);
    };
    showIntroImage(0);
    if (introImages.length > 1) setInterval(() => showIntroImage(introIndex + 1), 4500);
}
if (localStorage.getItem('moriRole') === 'admin') {
    sessionStorage.setItem('moriLoggedIn', 'true');
    sessionStorage.setItem('moriRole', 'admin');
}
let currentFilter = 'all', currentSort = 'featured', currentPage = 1, bag = [];
const grid = document.getElementById('productGrid');
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
const loginModal = document.getElementById('loginModal'); const loginForm = document.getElementById('loginForm'); const loginError = document.getElementById('loginError'); const loginToggle = document.getElementById('loginToggle'); function openLogin() { loginModal.classList.add('open'); loginError.textContent = ''; document.getElementById('username').focus() } function closeLogin() { loginModal.classList.remove('open') } loginToggle.addEventListener('click', openLogin); document.getElementById('closeLogin').addEventListener('click', closeLogin); loginModal.addEventListener('click', e => { if (e.target === loginModal) closeLogin() }); loginForm.addEventListener('submit', e => { e.preventDefault(); const username = document.getElementById('username').value.trim(); const password = document.getElementById('password').value; const accounts = JSON.parse(localStorage.getItem('moriAccounts') || '[]'); const adminPassword = localStorage.getItem('moriAdminPassword') || 'admin123'; if (username === 'admin' && password === adminPassword) { sessionStorage.setItem('moriLoggedIn', 'true'); sessionStorage.setItem('moriRole', 'admin'); localStorage.setItem('moriRole', 'admin'); showToast('Admin login successful'); window.location.href = 'dashboard.html' } else { const account = accounts.find(item => item.username === username && item.password === password); if (account) { localStorage.setItem('moriCurrentUser', JSON.stringify(account)); sessionStorage.setItem('moriLoggedIn', 'true'); sessionStorage.setItem('moriRole', 'user'); loginToggle.textContent = '♙'; loginToggle.setAttribute('aria-label', 'Open profile'); closeLogin(); showToast('Welcome back'); } else { loginError.textContent = 'Please enter a valid username and password.'; document.getElementById('password').focus() } } }); if (sessionStorage.getItem('moriLoggedIn') === 'true') { loginToggle.textContent = '♙'; loginToggle.setAttribute('aria-label', 'Open profile') }
bag = JSON.parse(localStorage.getItem('moriBag') || '[]'); document.getElementById('cartToggle').addEventListener('click', () => { document.getElementById('cartDrawer').classList.add('open'); document.getElementById('scrim').classList.add('open') }); function closeDrawer() { document.getElementById('cartDrawer').classList.remove('open'); document.getElementById('scrim').classList.remove('open') } document.getElementById('closeCart').addEventListener('click', closeDrawer); document.getElementById('scrim').addEventListener('click', closeDrawer); document.getElementById('checkoutButton').addEventListener('click', () => { window.location.href = 'checkout.html' }); updateBag(); render();
const profileDrawer = document.getElementById('profileDrawer'); const profileForm = document.getElementById('profileForm'); const profileError = document.getElementById('profileError'); const profileFields = { username: document.getElementById('profileUsername'), phone: document.getElementById('profilePhone'), country: document.getElementById('profileCountry') }; const savedAccounts = JSON.parse(localStorage.getItem('moriAccounts') || '[]'); let currentUser = JSON.parse(localStorage.getItem('moriCurrentUser') || 'null'); if (!currentUser && sessionStorage.getItem('moriRole') === 'user') currentUser = savedAccounts[savedAccounts.length - 1] || null; if (currentUser) localStorage.setItem('moriCurrentUser', JSON.stringify(currentUser)); function setProfileIcon() { loginToggle.textContent = '♙'; loginToggle.setAttribute('aria-label', 'Open profile'); } function openProfile() { if (!currentUser) return openLogin(); profileFields.username.value = currentUser.username; profileFields.phone.value = currentUser.phone.replace(/^\+\d+\s*/, ''); profileFields.country.value = currentUser.country || 'VN'; profileDrawer.classList.add('open'); document.getElementById('scrim').classList.add('open'); } function closeProfile() { profileDrawer.classList.remove('open'); document.getElementById('scrim').classList.remove('open'); } function saveCurrentUser(user) { currentUser = user; localStorage.setItem('moriCurrentUser', JSON.stringify(user)); setProfileIcon(); } loginToggle.addEventListener('click', event => { if (currentUser) { event.stopImmediatePropagation(); openProfile(); } }, true); document.getElementById('closeProfile').addEventListener('click', closeProfile); document.getElementById('scrim').addEventListener('click', closeProfile); profileForm.addEventListener('submit', event => { event.preventDefault(); const accounts = JSON.parse(localStorage.getItem('moriAccounts') || '[]'); const duplicate = accounts.some(account => account.username.toLowerCase() === profileFields.username.value.trim().toLowerCase() && account.username !== currentUser.username); if (duplicate) { profileError.textContent = 'That username is already taken.'; return; } const code = profileFields.country.selectedOptions[0].dataset.code || '+'; const updated = { ...currentUser, username: profileFields.username.value.trim(), phone: `${code} ${profileFields.phone.value.trim()}`, country: profileFields.country.value }; const accountIndex = accounts.findIndex(account => account.username === currentUser.username); if (accountIndex >= 0) accounts[accountIndex] = updated; localStorage.setItem('moriAccounts', JSON.stringify(accounts)); saveCurrentUser(updated); closeProfile(); showToast('Profile updated successfully'); }); if (currentUser) setProfileIcon();