const bag = JSON.parse(localStorage.getItem('moriBag') || '[]');
const subtotal = bag.reduce((sum, product) => sum + product.price, 0);
let shipping = 0;
const money = value => `$${value.toFixed(2)}`;
const country = document.getElementById('country');
const savedUser = JSON.parse(localStorage.getItem('moriCurrentUser') || 'null');
const countryNames = { VN: 'Vietnam', US: 'United States (US)', GB: 'United Kingdom (UK)', SG: 'Singapore', CA: 'Canada', AU: 'Australia', JP: 'Japan', KR: 'South Korea', TH: 'Thailand', MY: 'Malaysia', PH: 'Philippines', ID: 'Indonesia', IN: 'India', OTHER: 'European Countries and Other Regions' };
if (savedUser) {
    document.getElementById('fullName').value = savedUser.username || '';
    document.getElementById('phone').value = savedUser.phone || '';
    const countryOption = Array.from(country.options).find(option => option.textContent.trim() === countryNames[savedUser.country]);
    if (countryOption) country.value = countryOption.value;
}
const updateShipping = () => {
    shipping = country.value ? Number(country.value) : 0;
    document.getElementById('summaryShipping').textContent = country.value ? money(shipping) : 'Select country';
    document.getElementById('summaryTotal').textContent = money(subtotal + shipping);
};
const completeOrder = () => {
    localStorage.removeItem('moriBag');
    document.body.classList.add('order-complete');
    document.getElementById('paypal-button-container').hidden = true;
    document.getElementById('orderSuccess').classList.add('open');
};

document.getElementById('summaryCount').textContent = bag.length;
document.getElementById('summarySubtotal').textContent = money(subtotal);
document.getElementById('summaryShipping').textContent = 'Select country';
document.getElementById('summaryTotal').textContent = money(subtotal);
document.getElementById('summaryItems').innerHTML = bag.length ? bag.map(product => `<div class="summary-item"><img src="${product.image}" alt="${product.name}"><div><h3>${product.name}</h3><p>${product.meta}</p></div><strong>${money(product.price)}</strong></div>`).join('') : '<p class="empty-cart">Your bag is empty. Add a piece before checking out.</p>';
country.addEventListener('change', updateShipping);
if (savedUser && country.value) updateShipping();

const form = document.getElementById('paymentForm');
form.addEventListener('submit', event => {
    event.preventDefault();
    if (!bag.length) {
        document.getElementById('checkoutError').textContent = 'Please add a product before placing your order.';
        return;
    }
    if (!country.value) {
        document.getElementById('checkoutError').textContent = 'Please select a country to calculate shipping.';
        country.focus();
        return;
    }
    completeOrder();
});

const paymentMethod = document.querySelector('.payment-method');
const paypalOption = document.createElement('label');
paypalOption.className = 'payment-option';
paypalOption.innerHTML = '<input type="radio" name="payment" value="paypal" id="paypalPayment"> <span>Pay with PayPal</span><b>PAYPAL</b>';
const paypalContainer = document.createElement('div');
paypalContainer.id = 'paypal-button-container';
paypalContainer.hidden = true;
paymentMethod.append(paypalOption, paypalContainer);

document.querySelectorAll('input[name="payment"]').forEach(input => input.addEventListener('change', () => {
    const paypalSelected = input.value === 'paypal' && input.checked;
    paypalContainer.hidden = !paypalSelected;
    document.querySelector('.place-order').hidden = paypalSelected;
}));

if (window.paypal && bag.length) {
    window.paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
        onClick: () => {
            if (!form.reportValidity()) {
                document.getElementById('checkoutError').textContent = 'Please complete your shipping details before payment.';
                return false;
            }
            return true;
        },
        createOrder: (data, actions) => actions.order.create({ purchase_units: [{ amount: { currency_code: 'USD', value: (subtotal + shipping).toFixed(2) } }] }),
        onApprove: (data, actions) => actions.order.capture().then(() => {
            completeOrder();
        }),
        onCancel: () => { document.getElementById('checkoutError').textContent = 'PayPal payment was cancelled.'; },
        onError: error => { console.error('PayPal error:', error); document.getElementById('checkoutError').textContent = 'PayPal payment could not be completed. Please check your Sandbox Personal Account and try again.'; }
    }).render('#paypal-button-container');
}
