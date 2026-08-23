const ADMIN = sessionStorage.getItem('moriRole') === 'admin' || localStorage.getItem('moriRole') === 'admin';
if (ADMIN) localStorage.setItem('moriRole', 'admin');
if (!ADMIN) window.location.href = 'index.html';
const defaults = [{name:'Serein Pendant',type:'necklaces',meta:'Recycled silver / 18”',price:6,image:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=85',tag:'New'},{name:'Tide Pool Ring',type:'rings',meta:'Sterling silver',price:4,image:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=85'},{name:'Sol Shell Hoops',type:'earrings',meta:'Gold vermeil',price:5,image:'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=700&q=85',tag:'Best seller'},{name:'Moss Cuff',type:'bracelets',meta:'Brass / hand patina',price:7,image:'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=700&q=85'},{name:'Nami Chain',type:'necklaces',meta:'Gold plated / 16”',price:8,image:'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=700&q=85'},{name:'Pebble Signet',type:'rings',meta:'Sterling silver',price:9,image:'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=85'},{name:'Pearl Study Studs',type:'earrings',meta:'Freshwater pearl',price:6.1,image:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=85',tag:'Limited'},{name:'Luna Threader',type:'earrings',meta:'Recycled silver',price:3,image:'https://images.unsplash.com/photo-1535556116002-6281ff3e9f9c?auto=format&fit=crop&w=700&q=85'}];
let products = JSON.parse(localStorage.getItem('moriProducts') || 'null') || defaults;
let content = JSON.parse(localStorage.getItem('moriContent') || 'null') || {announcement:'Worldwide shipping ✳ rates calculated at checkout',about:'We believe the best objects become part of you. Chalice Craft is a study in shape, texture and the beautiful pause between too much and just enough.',email:'bychalice.craft@gmail.com',copyright:'© 2026 Chalice Craft',location:'Ho Chi Minh City / Worldwide',legal:'Privacy & terms'};
content.aboutImages = content.aboutImages || ['Image/HRbanner_Chalice%20craft.jpg'];
const $ = id => document.getElementById(id);
document.documentElement.lang = 'en';
document.getElementById('logoutButton').textContent = 'Log out';
document.querySelector('.admin-title > p:last-child').textContent = 'Manage products and the content customers see on the website.';
document.getElementById('addProductButton').textContent = '+ Add product';
document.querySelectorAll('.admin-panel .panel-head h2')[0].textContent = 'Products';
document.querySelectorAll('.admin-panel .panel-head h2')[1].textContent = 'Website content';
document.getElementById('saveContentButton').textContent = 'Save content';
['Announcement bar', 'About Us', 'Contact email', 'Copyright', 'Operating region', 'Legal information'].forEach((text, index) => { const label = document.querySelectorAll('#contentForm > label')[index]; if (label) label.firstChild.textContent = text; });
['Product name', 'Category', 'Short description', 'Price (USD)', 'Image URL', 'Product tag'].forEach((text, index) => { const label = document.querySelectorAll('#productForm > label')[index]; if (label) label.firstChild.textContent = text; });
document.querySelector('#productForm .primary-button').textContent = 'Save product';
document.getElementById('logoutButton').addEventListener('click', () => { localStorage.removeItem('moriRole'); localStorage.removeItem('moriLoggedIn'); }, true);
const productImageInput = $('productImage');
productImageInput.type = 'text';
productImageInput.required = false;
const uploadLabel = document.createElement('label');
uploadLabel.textContent = 'Upload image from computer';
const uploadInput = document.createElement('input');
uploadInput.type = 'file';
uploadInput.accept = 'image/*';
uploadLabel.append(uploadInput);
productImageInput.closest('label').after(uploadLabel);
uploadInput.addEventListener('change', () => {
	const file = uploadInput.files[0];
	if (!file) return;
	const reader = new FileReader();
	reader.onload = () => { productImageInput.value = reader.result; };
	reader.readAsDataURL(file);
});
const aboutTitleField = document.createElement('label'); aboutTitleField.textContent = 'About Us section title'; aboutTitleField.innerHTML += '<input id="contentAboutTitle" required>'; $('contentAbout').closest('label').before(aboutTitleField); $('contentAboutTitle').value = content.aboutTitle || 'Chalice Craft ♡';
const imageField = document.createElement('label'); imageField.textContent = 'About Us section images'; imageField.innerHTML += '<textarea id="contentAboutImages" placeholder="One image URL per line"></textarea><span>Or upload images from your computer</span><input id="contentAboutImageUpload" type="file" accept="image/*" multiple>'; $('contentAbout').closest('label').after(imageField); $('contentAboutImages').value = content.aboutImages.join('\n');
document.getElementById('contentAboutImageUpload').addEventListener('change', event => { Array.from(event.target.files).forEach(file => { const reader = new FileReader(); reader.onload = () => { const field = $('contentAboutImages'); field.value = field.value ? `${field.value}\n${reader.result}` : reader.result; }; reader.readAsDataURL(file); }); });
document.getElementById('saveContentButton').addEventListener('click', () => { content.aboutImages = document.getElementById('contentAboutImages').value.split('\n').map(value => value.trim()).filter(Boolean); localStorage.setItem('moriContent', JSON.stringify(content)); });
document.getElementById('saveContentButton').addEventListener('click', () => { content.aboutTitle = document.getElementById('contentAboutTitle').value.trim(); localStorage.setItem('moriContent', JSON.stringify(content)); });
function renderProducts(){ $('productTable').innerHTML=products.map((p,i)=>`<div class="product-row"><img src="${p.image}" alt="${p.name}"><strong>${p.name}</strong><span class="category">${p.type}</span><span class="row-price">$${Number(p.price).toFixed(2)}</span><div class="row-actions"><button data-edit="${i}">Edit</button><button class="delete" data-delete="${i}">Delete</button></div></div>`).join('') || '<p>No products yet.</p>'; document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>openProduct(Number(b.dataset.edit)));document.querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>{products.splice(Number(b.dataset.delete),1);saveProducts();renderProducts()})}
function saveProducts(){localStorage.setItem('moriProducts',JSON.stringify(products))}
document.getElementById('productForm').addEventListener('submit', e => {
	const image = productImageInput.value.trim();
	if (!image) {
		e.preventDefault();
		e.stopImmediatePropagation();
		$('productMessage').textContent = 'Please enter a URL or upload an image.';
		return;
	}
	e.preventDefault();
	e.stopImmediatePropagation();
	const value = { name: $('productName').value.trim(), type: $('productType').value, meta: $('productMeta').value.trim(), price: Number($('productPrice').value), image, tag: $('productTag').value.trim() };
	const index = $('productId').value;
	if (index === '') products.push(value); else products[Number(index)] = value;
	saveProducts();
	renderProducts();
	$('productModal').classList.remove('open');
});
function openProduct(index=null){$('productModal').classList.add('open');$('productMessage').textContent='';$('productForm').reset();$('productId').value=index===null?'':index;$('productModalTitle').textContent=index===null?'Add product':'Edit product';if(index!==null){const p=products[index];['Name','Type','Meta','Price','Image','Tag'].forEach(key=>{const field=$(`product${key}`);field.value=p[key.toLowerCase()] ?? ''})}}
$('addProductButton').onclick=()=>openProduct();$('closeProductModal').onclick=()=>$('productModal').classList.remove('open');$('productModal').onclick=e=>{if(e.target.id==='productModal')$('productModal').classList.remove('open')};$('productForm').onsubmit=e=>{e.preventDefault();const value={name:$('productName').value.trim(),type:$('productType').value,meta:$('productMeta').value.trim(),price:Number($('productPrice').value),image:$('productImage').value.trim(),tag:$('productTag').value.trim()};const index=$('productId').value;if(index==='')products.push(value);else products[Number(index)]=value;saveProducts();renderProducts();$('productModal').classList.remove('open')};
['announcement','about','email','copyright','location','legal'].forEach(key=>{ $(`content${key[0].toUpperCase()+key.slice(1)}`).value=content[key] });$('saveContentButton').onclick=()=>{$('contentForm').reportValidity();if(!$('contentForm').checkValidity())return;['announcement','about','email','copyright','location','legal'].forEach(key=>content[key]=$(`content${key[0].toUpperCase()+key.slice(1)}`).value.trim());localStorage.setItem('moriContent',JSON.stringify(content));$('contentMessage').textContent='Đã lưu nội dung website.';setTimeout(()=>$('contentMessage').textContent='',2500)};$('logoutButton').onclick=()=>{sessionStorage.clear();window.location.href='index.html'};renderProducts();
