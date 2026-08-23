const content = JSON.parse(localStorage.getItem('moriContent') || 'null');
if (content) {
    content.about = content.about.replace(/\bMori\b/g, 'Chalice Craft').replace(/\bMori Objects\b/g, 'Chalice Craft');
    content.copyright = content.copyright.replace(/\bMori Objects\b/g, 'Chalice Craft');
    if (content.email === 'hello@mori.objects') content.email = 'bychalice.craft@gmail.com';
}
const galleryDefault = ['Image/HRbanner_Chalice%20craft.jpg', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85'];
const galleryImages = content?.aboutImages?.length ? content.aboutImages : galleryDefault;
const galleryImage = document.getElementById('aboutGalleryImage');
const galleryDots = document.getElementById('galleryDots');
let galleryIndex = 0;
function showGalleryImage(index) { galleryIndex = (index + galleryImages.length) % galleryImages.length; galleryImage.src = galleryImages[galleryIndex]; galleryDots.innerHTML = galleryImages.map((_, i) => `<button class="gallery-dot${i === galleryIndex ? ' active' : ''}" aria-label="Ảnh ${i + 1}"></button>`).join(''); galleryDots.querySelectorAll('button').forEach((dot, i) => dot.onclick = () => showGalleryImage(i)); }
document.getElementById('galleryPrev').onclick = () => showGalleryImage(galleryIndex - 1);
document.getElementById('galleryNext').onclick = () => showGalleryImage(galleryIndex + 1);
showGalleryImage(0);
setInterval(() => showGalleryImage(galleryIndex + 1), 4500);
if (content) {
    if (content.about && content.about.startsWith('We believe the best objects')) {
        content.about = 'Welcome to Chalice Craft ♡\n\nChalice Craft is a small studio inspired by our love for ceramics and handmade creations. We make unique jewelry, accessories, and little ceramic pieces by hand.\n\nOur pieces are carefully crafted with attention to detail and thoroughly glazed on both sides. Each piece has its own little differences and character, making every creation truly one of a kind.\n\nWe always want you to have the best experience shopping with us. Your feedback helps us grow, so feel free to reach out via email at bychalice.craft@gmail.com with any questions or suggestions.\n\nThank you for supporting handmade ♡';
        localStorage.setItem('moriContent', JSON.stringify(content));
    }
    const values = { announcementBar: content.announcement, aboutText: content.about, aboutBody: content.about, footerCopyright: content.copyright, footerLocation: content.location, footerLegal: content.legal };
    Object.entries(values).forEach(([id, value]) => { const element = document.getElementById(id); if (element) element.innerHTML = id === 'announcementBar' ? value.replace('✳', '<span>✳</span>') : id === 'aboutBody' ? value.replace(/\n/g, '<br>') : value; });
    const email = document.getElementById('footerEmail');
    if (email) email.href = `mailto:${content.email}`;
}
