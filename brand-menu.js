(() => {
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = '@media(max-width:800px){.brand-mobile-toggle{display:flex!important;align-items:center;justify-content:center;width:44px;height:44px;padding:0;background:#fff;color:#000;border:0;flex:0 0 44px}.brand-mobile-toggle span{display:block;width:20px;height:2px;background:#000;margin:3px 0}.collection-sidebar,.product-sidebar,.brand-sidebar,.shipping-page>.home-sidebar,.checkout-page>.home-sidebar{display:none!important}.collection-sidebar.open,.product-sidebar.open,.brand-sidebar.open,.shipping-page>.home-sidebar.open,.checkout-page>.home-sidebar.open{display:block!important;position:relative!important;inset:auto!important;width:100%!important;height:auto!important;margin:0!important;padding:18px 20px!important;border:0!important}.collection-sidebar.open .sidebar-logo,.product-sidebar.open .sidebar-logo,.brand-sidebar.open .sidebar-logo,.shipping-page>.home-sidebar.open .sidebar-logo,.checkout-page>.home-sidebar.open .sidebar-logo{display:block!important;margin:0 auto 18px!important}.collection-sidebar.open .sidebar-nav,.product-sidebar.open .sidebar-nav,.brand-sidebar.open .sidebar-nav,.shipping-page>.home-sidebar.open .sidebar-nav,.checkout-page>.home-sidebar.open .sidebar-nav{display:grid!important;gap:13px!important}.collection-sidebar.open .sidebar-nav>a,.product-sidebar.open .sidebar-nav>a,.brand-sidebar.open .sidebar-nav>a,.shipping-page>.home-sidebar.open .sidebar-nav>a,.checkout-page>.home-sidebar.open .sidebar-nav>a{display:block!important}.collection-sidebar.open .sidebar-foot,.product-sidebar.open .sidebar-foot,.brand-sidebar.open .sidebar-foot,.shipping-page>.home-sidebar.open .sidebar-foot,.checkout-page>.home-sidebar.open .sidebar-foot{display:grid!important;margin-top:22px!important}.collection-header,.product-header,.shipping-page>.shipping-header,.checkout-page>.checkout-header{position:relative!important}.collection-header .brand-mobile-toggle,.product-header .brand-mobile-toggle,.shipping-page>.shipping-header .brand-mobile-toggle,.checkout-page>.checkout-header .brand-mobile-toggle{display:flex!important}.collection-header,.product-header,.shipping-page>.shipping-header,.checkout-page>.checkout-header{justify-content:space-between!important}.collection-header .brand-mobile-toggle+img,.product-header .brand-mobile-toggle+img,.shipping-page>.shipping-header .brand-mobile-toggle+img,.checkout-page>.checkout-header .brand-mobile-toggle+*{margin-left:auto;margin-right:auto}.checkout-page>.checkout-header{height:70px;padding:0 20px}.checkout-page>.checkout-header .checkout-brand-image{width:120px}.checkout-page>.checkout-header .back-link{font-size:9px}}@media(min-width:801px){.brand-mobile-toggle{display:none!important}}';
    document.head.append(mobileStyle);
    const sidebar = document.querySelector('.collection-sidebar, .product-sidebar, .brand-sidebar, .shipping-page > .home-sidebar, .checkout-page > .home-sidebar');
    const header = document.querySelector('.collection-header, .product-header, .shipping-page > .shipping-header, .checkout-page > .checkout-header, .site-header');
    if (sidebar && header && !header.querySelector('.menu-button, .brand-mobile-toggle')) {
        const toggle = document.createElement('button');
        toggle.className = 'brand-mobile-toggle';
        toggle.type = 'button';
        toggle.setAttribute('aria-label', 'Open menu');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<span></span><span></span>';
        header.prepend(toggle);
        toggle.addEventListener('click', () => {
            const isOpen = sidebar.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen);
        });
    } else if (sidebar && header) {
        const toggle = header.querySelector('.brand-mobile-toggle');
        toggle?.addEventListener('click', () => {
            const isOpen = sidebar.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen);
        });
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
        categories.forEach(category => {
            if (!category || filterTabs.querySelector(`[data-filter="${CSS.escape(category)}"]`)) return;
            const button = document.createElement('button');
            button.dataset.filter = category;
            button.textContent = categoryLabels[category] || category.replace(/-/g, ' ');
            button.type = 'button';
            filterTabs.append(button);
        });
    }
})();
