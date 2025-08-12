// Advanced Lightbox Gallery with grayscale-to-color thumbnail interaction
document.addEventListener('DOMContentLoaded', function () {
  const images = [
    { src: 'equipe1.jpg', alt: 'Équipe Zythomaniacs 1 grand format' },
    { src: 'equipe2.jpg', alt: 'Équipe Zythomaniacs 2 grand format' },
    { src: 'equipe3.jpg', alt: 'Équipe Zythomaniacs 3 grand format' },
    { src: 'equipe4.jpg', alt: 'Équipe Zythomaniacs 4 grand format' },
    { src: 'equipe5.jpg', alt: 'Équipe Zythomaniacs 5 grand format' },
    { src: 'equipe6.jpg', alt: 'Équipe Zythomaniacs 6 grand format' },
    { src: 'equipe7.jpg', alt: 'Équipe Zythomaniacs 7 grand format' },
    { src: 'equipe8.jpg', alt: 'Équipe Zythomaniacs 8 grand format' }
  ];

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const thumbs = document.querySelectorAll('.gallery-thumb');

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    setActiveThumb(index);
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const { src, alt } = images[currentIndex];
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    setActiveThumb(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  }

  function setActiveThumb(index) {
    thumbs.forEach((thumb, i) => {
      if (i === 0) return; // First image always in color
      if (i === index) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });
  }

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', function (e) {
      e.preventDefault();
      const index = parseInt(thumb.dataset.index, 10);
      openLightbox(index);
    });
  });

  closeBtn.addEventListener('click', function () {
    closeLightbox();
  });

  prevBtn.addEventListener('click', function () {
    showPrev();
  });

  nextBtn.addEventListener('click', function () {
    showNext();
  });

  // Support ESC key and left/right arrows
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // Close if click outside image
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
});
