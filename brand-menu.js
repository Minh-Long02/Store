(() => {
    const sessionRole = sessionStorage.getItem('moriRole');
    const storedRole = localStorage.getItem('moriRole');
    const hasCurrentUser = !!localStorage.getItem('moriCurrentUser');
    const role = sessionRole || storedRole || (hasCurrentUser ? 'user' : '');
    const isLoggedIn = sessionStorage.getItem('moriLoggedIn') === 'true' || role === 'admin' || hasCurrentUser;
    if (role === 'admin') {
        sessionStorage.setItem('moriLoggedIn', 'true');
        sessionStorage.setItem('moriRole', 'admin');
        localStorage.setItem('moriRole', 'admin');
    }

    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = '@media(max-width:800px){.brand-mobile-toggle{display:flex!important;align-items:center;justify-content:center;width:44px;height:44px;padding:0;background:#fff;color:#000;border:0;flex:0 0 44px;font-size:0;line-height:0;gap:5px}.brand-mobile-toggle span{display:block;width:20px;height:2px;background:#000;margin:0!important}.collection-sidebar,.product-sidebar,.brand-sidebar,.shipping-page>.home-sidebar,.checkout-page>.home-sidebar{display:none!important}.collection-sidebar.open,.product-sidebar.open,.brand-sidebar.open,.shipping-page>.home-sidebar.open,.checkout-page>.home-sidebar.open{display:block!important;position:relative!important;inset:auto!important;width:100%!important;height:auto!important;margin:0!important;padding:18px 20px!important;border:0!important}.collection-sidebar.open .sidebar-logo,.product-sidebar.open .sidebar-logo,.brand-sidebar.open .sidebar-logo,.shipping-page>.home-sidebar.open .sidebar-logo,.checkout-page>.home-sidebar.open .sidebar-logo{display:block!important;margin:0 auto 18px!important}.collection-sidebar.open .sidebar-nav,.product-sidebar.open .sidebar-nav,.brand-sidebar.open .sidebar-nav,.shipping-page>.home-sidebar.open .sidebar-nav,.checkout-page>.home-sidebar.open .sidebar-nav{display:grid!important;gap:13px!important}.collection-sidebar.open .sidebar-nav>a,.product-sidebar.open .sidebar-nav>a,.brand-sidebar.open .sidebar-nav>a,.shipping-page>.home-sidebar.open .sidebar-nav>a,.checkout-page>.home-sidebar.open .sidebar-nav>a{display:block!important}.collection-sidebar.open .sidebar-foot,.product-sidebar.open .sidebar-foot,.brand-sidebar.open .sidebar-foot,.shipping-page>.home-sidebar.open .sidebar-foot,.checkout-page>.home-sidebar.open .sidebar-foot{display:grid!important;margin-top:22px!important}.collection-header,.product-header,.shipping-page>.shipping-header,.checkout-page>.checkout-header{position:relative!important}.collection-header .brand-mobile-toggle,.product-header .brand-mobile-toggle,.shipping-page>.shipping-header .brand-mobile-toggle,.checkout-page>.checkout-header .brand-mobile-toggle{display:flex!important}.collection-header,.product-header,.shipping-page>.shipping-header,.checkout-page>.checkout-header{justify-content:space-between!important}.collection-header .brand-mobile-toggle+img,.product-header .brand-mobile-toggle+img,.shipping-page>.shipping-header .brand-mobile-toggle+img,.checkout-page>.checkout-header .brand-mobile-toggle+*{margin-left:auto;margin-right:auto}.checkout-page>.checkout-header{height:70px;padding:0 20px}.checkout-page>.checkout-header .checkout-brand-image{width:120px}.checkout-page>.checkout-header .back-link{font-size:9px}}@media(min-width:801px){.brand-mobile-toggle{display:none!important}}';
    mobileStyle.textContent += '@media(max-width:800px){.collection-header>a[aria-label="Chalice Craft home"],.product-header>a[aria-label="Chalice Craft home"],.site-header>a[aria-label="Chalice Craft home"],.checkout-header .checkout-brand{position:absolute!important;left:50%!important;top:50%!important;right:auto!important;grid-column:1/-1!important;width:112px!important;transform:translate(-50%,-50%)!important;margin:0!important;display:block!important}.collection-header>a[aria-label="Chalice Craft home"] img,.product-header>a[aria-label="Chalice Craft home"] img,.site-header>a[aria-label="Chalice Craft home"] img{display:block!important}}';
    mobileStyle.textContent += '@media(max-width:800px){.site-header .menu-button,.brand-mobile-toggle{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important;width:44px!important;height:44px!important;min-width:44px!important;min-height:44px!important;padding:0!important;margin:0!important;background:#fff!important;border:0!important;font-size:0!important;line-height:0!important}.site-header .menu-button span,.brand-mobile-toggle span{display:block!important;flex:0 0 2px!important;width:20px!important;height:2px!important;min-height:2px!important;margin:0!important;padding:0!important;background:#000!important;line-height:0!important}}';
    mobileStyle.textContent += '@media(max-width:800px){.home-sidebar.open,.collection-sidebar.open,.product-sidebar.open,.brand-sidebar.open{position:fixed!important;top:104px!important;right:0!important;bottom:0!important;left:0!important;width:100vw!important;height:auto!important;max-height:calc(100vh - 104px)!important;margin:0!important;padding:22px 20px 28px!important;overflow-y:auto!important;overflow-x:hidden!important;z-index:20!important;background:#fff!important;box-shadow:0 12px 24px rgba(17,45,42,.12)!important}.home-sidebar.open .sidebar-nav,.collection-sidebar.open .sidebar-nav,.product-sidebar.open .sidebar-nav,.brand-sidebar.open .sidebar-nav{display:grid!important;width:100%!important;gap:13px!important}.home-sidebar.open .sidebar-nav a,.home-sidebar.open .sidebar-filter-title,.home-sidebar.open .sidebar-filter button,.collection-sidebar.open .sidebar-nav a,.product-sidebar.open .sidebar-nav a,.brand-sidebar.open .sidebar-nav a{font:10px/1.25 var(--sans)!important;letter-spacing:.02em!important;text-transform:uppercase!important}.home-sidebar.open .sidebar-foot,.collection-sidebar.open .sidebar-foot,.product-sidebar.open .sidebar-foot,.brand-sidebar.open .sidebar-foot{display:none!important}.shipping-page>.home-sidebar.open,.checkout-page>.home-sidebar.open{position:fixed!important;top:104px!important;right:0!important;bottom:0!important;left:0!important;width:100vw!important;height:auto!important;max-height:calc(100vh - 104px)!important;margin:0!important;padding:22px 20px 28px!important;overflow-y:auto!important;z-index:20!important;background:#fff!important}.shipping-page>.home-sidebar.open .sidebar-nav,.checkout-page>.home-sidebar.open .sidebar-nav{display:grid!important;width:100%!important;gap:13px!important}.shipping-page>.home-sidebar.open .sidebar-nav a,.checkout-page>.home-sidebar.open .sidebar-nav a{font:10px/1.25 var(--sans)!important;letter-spacing:.02em!important;text-transform:uppercase!important}.shipping-page>.home-sidebar.open .sidebar-foot,.checkout-page>.home-sidebar.open .sidebar-foot{display:none!important}}';
    mobileStyle.textContent += '@media(min-width:801px){.site-header>a[aria-label="Chalice Craft home"],.collection-header>a[aria-label="Chalice Craft home"],.product-header>a[aria-label="Chalice Craft home"],.shipping-header>.wordmark,.checkout-header>.checkout-brand{display:none!important}}';
    mobileStyle.textContent += '.collection-header,.product-header,.shipping-page>.shipping-header,.checkout-page>.checkout-header{position:relative!important}.brand-page-actions{position:absolute;right:4vw;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:14px;z-index:3}.brand-page-account,.brand-page-cart,.brand-page-actions .product-cart-link{display:inline-flex;align-items:center;gap:5px;font:10px/17px var(--mono);text-transform:uppercase;letter-spacing:.06em;white-space:nowrap}.brand-page-cart svg,.brand-page-actions .product-cart-icon{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.5}.brand-page-cart span,.brand-page-actions .product-cart-link span{display:inline-flex;align-items:center;justify-content:center;min-width:16px;height:16px;padding:0 4px;border-radius:50%;background:var(--coral);font-size:9px}';
    mobileStyle.textContent += '@media(max-width:800px){.brand-page-actions{right:20px;gap:10px}.brand-page-account{font-size:8px}.brand-page-cart,.brand-page-actions .product-cart-link{font-size:0}.brand-page-cart svg,.brand-page-actions .product-cart-icon{width:18px;height:18px}}';
    mobileStyle.textContent += '@media(max-width:800px){.home-sidebar.open .sidebar-logo,.collection-sidebar.open .sidebar-logo,.product-sidebar.open .sidebar-logo,.brand-sidebar.open .sidebar-logo,.shipping-page>.home-sidebar.open .sidebar-logo,.checkout-page>.home-sidebar.open .sidebar-logo{display:none!important}}';
    document.head.append(mobileStyle);

    const stickyStyle = document.createElement('style');
    stickyStyle.textContent = '.announcement,.brand-bar{position:sticky!important;top:0;z-index:30;background:#fff}.site-header,.collection-header,.product-header{position:sticky!important;top:34px;z-index:29;background:#fff}.shipping-page>.shipping-header,.checkout-page>.checkout-header{position:sticky!important;top:0;z-index:30;background:#fff}@media(min-width:761px){.site-header{top:25px!important}}';
    document.head.append(stickyStyle);
    const sidebar = document.querySelector('.collection-sidebar, .product-sidebar, .brand-sidebar, .home-sidebar');
    const header = document.querySelector('.collection-header, .product-header, .shipping-page > .shipping-header, .checkout-page > .checkout-header, .site-header');
    const menuButton = header?.querySelector('.menu-button, .brand-mobile-toggle');
    if (sidebar && header && !menuButton) {
        const toggle = document.createElement('button');
        toggle.className = 'brand-mobile-toggle';
        toggle.type = 'button';
        toggle.setAttribute('aria-label', 'Open menu');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<span></span><span></span>';
        header.prepend(toggle);
    }
    const activeMenuButton = menuButton || header?.querySelector('.brand-mobile-toggle');
    if (sidebar && activeMenuButton && activeMenuButton.dataset.menuBound !== 'true') {
        activeMenuButton.addEventListener('click', () => {
            const isOpen = sidebar.classList.toggle('open');
            activeMenuButton.setAttribute('aria-expanded', String(isOpen));
            activeMenuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        });
        activeMenuButton.dataset.menuBound = 'true';
    }
    if (header && !header.querySelector('#loginToggle, .brand-page-actions')) {
        const actions = document.createElement('div');
        actions.className = 'brand-page-actions';
        const account = document.createElement('a');
        account.className = 'brand-page-account';
        account.href = isLoggedIn ? (role === 'admin' ? 'dashboard.html' : 'index.html?profile=1') : 'index.html?auth=1';
        account.textContent = isLoggedIn ? 'Profile' : 'Reg / Log';
        account.setAttribute('aria-label', isLoggedIn ? 'Open profile' : 'Register or sign in');
        actions.append(account);
        const existingCart = header.querySelector('.product-cart-bar');
        if (existingCart) {
            actions.append(existingCart.querySelector('.product-cart-link'));
            existingCart.remove();
        } else {
            const cart = document.createElement('a');
            cart.className = 'brand-page-cart';
            cart.href = 'checkout.html';
            cart.setAttribute('aria-label', 'Open shopping cart');
            cart.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6"></path><circle cx="10" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle></svg><span>0</span>';
            actions.append(cart);
        }
        header.append(actions);
        const count = actions.querySelector('span');
        if (count) count.textContent = JSON.parse(localStorage.getItem('moriBag') || '[]').length;
    }

    const accountAction = header?.querySelector('.brand-page-account');
    if (accountAction) {
        accountAction.href = isLoggedIn ? (role === 'admin' ? 'dashboard.html' : 'index.html?profile=1') : 'index.html?auth=1';
        accountAction.textContent = isLoggedIn ? 'Profile' : 'Reg / Log';
        accountAction.setAttribute('aria-label', isLoggedIn ? 'Open profile' : 'Register or sign in');
    }
    const categoryLabels = {
        necklaces: 'Necklaces',
        bracelets: 'Bracelets',
        rings: 'Rings',
        earrings: 'Earrings'
    };
    const categories = JSON.parse(localStorage.getItem('moriCategories') || '[]');
    const storedProducts = JSON.parse(localStorage.getItem('moriProducts') || '[]');
    storedProducts.forEach(product => {
        if (product.type && !categories.includes(product.type)) categories.push(product.type);
    });
    localStorage.setItem('moriCategories', JSON.stringify(categories));
    document.querySelectorAll('.sidebar-nav').forEach(nav => {
        const existing = new Set([...nav.querySelectorAll('[data-category], a[href*="type="]')].map(link => link.dataset.category || new URL(link.href).searchParams.get('type')));
        const anchor = [...nav.children].find(item => item.textContent.trim().toLowerCase() === 'hair clips') || nav.lastElementChild;
        categories.forEach(category => {
            if (existing.has(category) || !category) return;
            const link = document.createElement('a');
            link.dataset.category = category;
            link.href = `collection.html?type=${encodeURIComponent(category)}`;
            link.textContent = categoryLabels[category] || category.replace(/-/g, ' ');
            nav.insertBefore(link, anchor || null);
        });
    });
    const filterTabs = document.getElementById('filterTabs');
    if (filterTabs) {
        [...categories].filter(Boolean).sort((a, b) => a.localeCompare(b)).forEach(category => {
            if (filterTabs.querySelector(`[data-filter="${CSS.escape(category)}"]`)) return;
            const link = document.createElement('a');
            link.dataset.filter = category;
            link.href = `collection.html?type=${encodeURIComponent(category)}`;
            link.textContent = categoryLabels[category] || category.replace(/-/g, ' ');
            filterTabs.append(link);
        });
    }

    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        if (link.textContent.trim().toLowerCase() !== 'green ring drop') return;
        const target = new URL(link.getAttribute('href') || '', window.location.href);
        const targetType = (target.searchParams.get('type') || '').toLowerCase();
        if (targetType === 'bracelets') {
            link.remove();
        }
    });

    const currentUrl = new URL(window.location.href);
    const currentFile = currentUrl.pathname.split('/').pop().toLowerCase() || 'index.html';
    const currentType = (currentUrl.searchParams.get('type') || '').toLowerCase();
    const sideLinks = [...document.querySelectorAll('.sidebar-nav a[href]')];
    sideLinks.forEach(link => link.removeAttribute('aria-current'));

    let activeLink = null;
    if (currentFile === 'collection.html' && currentType) {
        const collectionMatches = sideLinks.filter(link => {
            const target = new URL(link.getAttribute('href'), currentUrl);
            const targetFile = target.pathname.split('/').pop().toLowerCase();
            const targetType = (target.searchParams.get('type') || '').toLowerCase();
            return targetFile === 'collection.html' && targetType === currentType;
        });

        if (collectionMatches.length > 1) {
            const preferredText = currentType.replace(/-/g, ' ');
            activeLink = collectionMatches.find(link => link.textContent.trim().toLowerCase() === preferredText) || collectionMatches[0];
        } else {
            activeLink = collectionMatches[0] || null;
        }
    }

    if (!activeLink) {
        activeLink = sideLinks.find(link => {
            const target = new URL(link.getAttribute('href'), currentUrl);
            const targetFile = target.pathname.split('/').pop().toLowerCase();
            return targetFile === currentFile;
        }) || null;
    }

    if (activeLink) {
        activeLink.setAttribute('aria-current', 'page');
    }

    const categoryTitles = document.querySelectorAll('.sidebar-filter-title');
    categoryTitles.forEach(title => title.classList.remove('is-active'));
    if (currentFile === 'index.html' || currentFile === 'collection.html' || currentFile === 'product.html') {
        categoryTitles.forEach(title => title.classList.add('is-active'));
    }
})();
