/* =============================================
   Video Gallery Lightbox
   ============================================= */

const videoItems  = document.querySelectorAll('.video-item[data-yt-id]');
const lightbox    = document.getElementById('lightbox');
const lbIframe     = document.getElementById('lbIframe');
const lbCaption    = document.getElementById('lbCaption');
const lbClose      = document.getElementById('lbClose');
const lbPrev       = document.getElementById('lbPrev');
const lbNext       = document.getElementById('lbNext');

let currentIndex = 0;

const videos = Array.from(videoItems).map(item => ({
  id:    item.getAttribute('data-yt-id'),
  title: item.querySelector('.cap-title')?.textContent || '',
}));

function embedSrc(id) {
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
}

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
  lbIframe.src = '';
}

function updateLightbox() {
  const v = videos[currentIndex];
  lbIframe.src = embedSrc(v.id);
  lbCaption.textContent = v.title;
}

function nextVideo() {
  currentIndex = (currentIndex + 1) % videos.length;
  updateLightbox();
}

function prevVideo() {
  currentIndex = (currentIndex - 1 + videos.length) % videos.length;
  updateLightbox();
}

videoItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', prevVideo);
lbNext.addEventListener('click', nextVideo);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowRight') nextVideo();
  if (e.key === 'ArrowLeft')  prevVideo();
});
