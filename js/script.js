// JavaScript for interactive components
document.addEventListener('DOMContentLoaded', () => {
  /* Testimonial slider */
  const slidesContainer = document.getElementById('testimonial-slides');
  const slides = slidesContainer.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.testimonials .slider-btn.prev');
  const nextBtn = document.querySelector('.testimonials .slider-btn.next');
  let currentIndex = 0;

  function updateSlider() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }

  // Auto play slider every 6 seconds
  let autoPlay = setInterval(showNext, 6000);

  nextBtn?.addEventListener('click', () => {
    clearInterval(autoPlay);
    showNext();
    autoPlay = setInterval(showNext, 6000);
  });

  prevBtn?.addEventListener('click', () => {
    clearInterval(autoPlay);
    showPrev();
    autoPlay = setInterval(showNext, 6000);
  });

  /* Back-to-top button */
  const backToTopBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Highlight nav links based on scroll position */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  function setActiveLink() {
    let index = sections.length;
    while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
    navLinks.forEach((link) => link.classList.remove('active'));
    const activeSectionId = sections[index]?.getAttribute('id');
    const activeLink = document.querySelector(`.main-nav a[href="#${activeSectionId}"]`);
    if (activeLink) activeLink.classList.add('active');
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  /* Apply interactive tilt effect to service cards when VanillaTilt is available */
  if (typeof VanillaTilt !== 'undefined') {
    const serviceCards = document.querySelectorAll('.service-item');
    // Initialize vanilla tilt with subtle 3D effect
    VanillaTilt.init(serviceCards, {
      max: 15,
      speed: 400,
      scale: 1.05,
      glare: true,
      "max-glare": 0.2,
    });
  }

  /* Hero text slider
   * Instead of sliding horizontally (which caused layout issues),
   * cycle through each slide by toggling the display property. This
   * keeps the container height consistent and prevents the hero image
   * from being pushed out of place on subsequent slides.
   */
  const heroSlider = document.getElementById('hero-slider');
  if (heroSlider) {
    const heroSlides = Array.from(heroSlider.querySelectorAll('.hero-slide'));
    let heroIndex = 0;
    // Show only the current slide
    function showHero() {
      heroSlides.forEach((slide, idx) => {
        slide.style.display = idx === heroIndex ? 'block' : 'none';
      });
    }
    // Initialize the first slide
    showHero();
    // Cycle through slides every 5 seconds
    setInterval(() => {
      heroIndex = (heroIndex + 1) % heroSlides.length;
      showHero();
    }, 5000);
  }
});