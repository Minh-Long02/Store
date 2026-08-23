const bag = JSON.parse(localStorage.getItem('moriBag') || '[]');
const subtotal = bag.reduce((sum, product) => sum + product.price, 0);
let shipping = 0;
const money = value => `$${value.toFixed(2)}`;
const country = document.getElementById('country');
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

const form = document.getElementById('paymentForm');
form.addEventListener('submit', event => {
    event.preventDefault();
    if (!bag.length) {
        document.getElementById('checkoutError').textContent = 'Vui lòng thêm sản phẩm trước khi đặt hàng.';
        return;
    }
    if (!country.value) {
        document.getElementById('checkoutError').textContent = 'Vui lòng chọn quốc gia để tính phí vận chuyển.';
        country.focus();
        return;
    }
    completeOrder();
});

const paymentMethod = document.querySelector('.payment-method');
const paypalOption = document.createElement('label');
paypalOption.className = 'payment-option';
paypalOption.innerHTML = '<input type="radio" name="payment" value="paypal" id="paypalPayment"> <span>Thanh toán qua PayPal</span><b>PAYPAL</b>';
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
                document.getElementById('checkoutError').textContent = 'Vui lòng điền đủ thông tin giao hàng trước khi thanh toán.';
                return false;
            }
            return true;
        },
        createOrder: (data, actions) => actions.order.create({ purchase_units: [{ amount: { currency_code: 'USD', value: (subtotal + shipping).toFixed(2) } }] }),
        onApprove: (data, actions) => actions.order.capture().then(() => {
            completeOrder();
        }),
        onCancel: () => { document.getElementById('checkoutError').textContent = 'Bạn đã hủy thanh toán PayPal.'; },
        onError: error => { console.error('PayPal error:', error); document.getElementById('checkoutError').textContent = 'Không thể hoàn tất thanh toán PayPal. Hãy kiểm tra đúng Sandbox Personal Account và thử lại.'; }
    }).render('#paypal-button-container');
}
