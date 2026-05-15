/* =============================================
   Gallery Lightbox
   ============================================= */

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox  = document.getElementById('lightbox');
const lbImage   = document.getElementById('lbImage');
const lbCaption = document.getElementById('lbCaption');
const lbClose   = document.getElementById('lbClose');
const lbPrev    = document.getElementById('lbPrev');
const lbNext    = document.getElementById('lbNext');

let currentIndex = 0;

const photos = Array.from(galleryItems).map(item => ({
  src:     item.querySelector('img').getAttribute('src'),
  title:   item.querySelector('.cap-title')?.textContent || '',
  sub:     item.querySelector('.cap-sub')?.textContent || '',
}));

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const p = photos[currentIndex];
  lbImage.src = p.src;
  lbImage.alt = p.title;
  lbCaption.textContent = p.title + (p.sub ? ' — ' + p.sub : '');
}

function nextPhoto() {
  currentIndex = (currentIndex + 1) % photos.length;
  updateLightbox();
}

function prevPhoto() {
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  updateLightbox();
}

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', prevPhoto);
lbNext.addEventListener('click', nextPhoto);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowRight') nextPhoto();
  if (e.key === 'ArrowLeft')  prevPhoto();
});
