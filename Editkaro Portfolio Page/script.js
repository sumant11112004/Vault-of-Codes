// Smooth year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle?.addEventListener('click', () => nav.classList.toggle('open'));

// ===== Portfolio Filter =====
const filterButtons = document.querySelectorAll('.filter__btn');
const tiles = document.querySelectorAll('.tile');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const cat = btn.dataset.filter;
    tiles.forEach(t => {
      const match = cat === 'all' || t.dataset.cat === cat;
      t.style.display = match ? 'block' : 'none';
    });
  });
});

// ===== Lightbox (image preview) =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCap = document.getElementById('lightboxCap');
const lightboxClose = document.getElementById('lightboxClose');

document.getElementById('portfolioGrid').addEventListener('click', e => {
  const fig = e.target.closest('.tile');
  if(!fig) return;
  const img = fig.querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCap.textContent = fig.querySelector('figcaption')?.textContent || '';
  lightbox.classList.add('open');
});
lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.remove('open'); });

// ===== Testimonials Slider =====
const slider = document.getElementById('slider');
const slides = slider.querySelectorAll('.slide');
const dotsWrap = document.getElementById('sliderDots');

let index = 0;
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Testimonial ${i+1}`);
  if(i === 0) dot.classList.add('is-active');
  dot.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(dot);
});

function goTo(i){
  slides[index].classList.remove('is-active');
  dotsWrap.children[index].classList.remove('is-active');
  index = i;
  slides[index].classList.add('is-active');
  dotsWrap.children[index].classList.add('is-active');
}
function next(){ goTo((index + 1) % slides.length); }

let timer = setInterval(next, 5000);
slider.addEventListener('mouseenter', () => clearInterval(timer));
slider.addEventListener('mouseleave', () => timer = setInterval(next, 5000));

// Close mobile nav on link click
document.querySelectorAll('.nav a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});
