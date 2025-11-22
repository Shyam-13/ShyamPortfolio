/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
    document.body.classList.toggle('sidebar-expanded');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);
  
window.addEventListener('load', function() {
  setTimeout(() => {
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "auto" });
    }

    // Remove hash from URL (#about, #contact etc.)
    history.replaceState(null, null, " ");
  }, 100);
});

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Custom site data driven enhancements
   */
  const siteData = window.SHYAM_DATA || {
    services: [],
    portfolio: [],
    blogs: []
  };

  const root = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleBtntop = document.getElementById('theme-toggletop');

  const themeKey = 'shyam_theme_pref';
  const sidebar = document.getElementById('header');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      const icon = themeToggleBtn.querySelector('i');
      if (icon) {
        icon.className = theme === 'light' ? 'bi bi-sun' : 'bi bi-moon-stars';
      }
    }

    if (themeToggleBtntop) {
      const icon = themeToggleBtntop.querySelector('i');
      if (icon) {
        icon.className = theme === 'light' ? 'bi bi-sun' : 'bi bi-moon-stars';
      }
    }
  }

  const storedTheme = localStorage.getItem(themeKey) || 'dark';
  applyTheme(storedTheme);

  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem(themeKey, nextTheme);
  });
  
  themeToggleBtntop?.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem(themeKey, nextTheme);
  });

  if (sidebar) {
    sidebar.addEventListener('mouseenter', () => {
      document.body.classList.add('sidebar-expanded');
    });
    sidebar.addEventListener('mouseleave', () => {
      document.body.classList.remove('sidebar-expanded');
    });
    sidebar.addEventListener('focusin', () => {
      document.body.classList.add('sidebar-expanded');
    });
    sidebar.addEventListener('focusout', () => {
      document.body.classList.remove('sidebar-expanded');
    });
  }

  const body = document.body;
  const isHome = body.classList.contains('index-page');
  const isServiceDetailsPage = body.classList.contains('service-details-page');
  const isPortfolioDetailsPage = body.classList.contains('portfolio-details-page');
  const isBlogPage = body.classList.contains('blog-page');

  const portfolioState = {
    filter: 'all',
    chunk: 3,
    visible: 0
  };

  let blogModalInstance = null;
  let blogModalElement = null;

  function initHeroParallax() {
    const hero = document.getElementById('hero');
    const orbs = document.querySelectorAll('.hero-orb');
    if (!hero || !orbs.length) return;

    const strength = 30;

    hero.addEventListener('mousemove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) - 0.5;
      const y = ((event.clientY - rect.top) / rect.height) - 0.5;

      hero.style.setProperty('--hero-tilt-x', `${y * strength}deg`);
      hero.style.setProperty('--hero-tilt-y', `${-x * strength}deg`);

      orbs.forEach((orb, index) => {
        const depth = (index + 1) * 6;
        orb.style.transform = `translate3d(${x * depth}px, ${y * depth * -1}px, 0) scale(${1 + x * 0.1})`;
      });
    });

    hero.addEventListener('mouseleave', () => {
      hero.style.setProperty('--hero-tilt-x', '0deg');
      hero.style.setProperty('--hero-tilt-y', '0deg');
      orbs.forEach((orb) => {
        orb.style.transform = '';
      });
    });
  }

  function renderServicesGrid() {
    const container = document.getElementById('services-container');
    if (!container || !Array.isArray(siteData.services)) return;
    container.innerHTML = '';
    siteData.services.forEach((service, index) => {
      const col = document.createElement('div');
      col.className = 'col-lg-4 col-md-6';
      col.innerHTML = `
        <div class="service-card" data-aos="fade-up" data-aos-delay="${(index + 1) * 80}">
          <div class="service-head">
            <div>
              <h4>${service.title}</h4>
              <p class="text-muted mb-0">${service.tagline}</p>
            </div>
          </div>
          <p>${service.description}</p>
          <ul>
            ${service.highlights.map((point) => `<li>${point}</li>`).join('')}
          </ul>
          <div class="d-flex justify-content-between align-items-center mt-auto">
            <span class="badge bg-light text-dark">Playbook ready</span>
            <a class="read-more-link" href="service-details.html?service=${service.id}">Read More <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  }

  //  function createPortfolioCard(item) {
  //   return `
  //     <div class="col-lg-4 col-md-6">
  //       <div class="portfolio-card">
  //         <img src="${item.cover}" alt="${item.title}">
  //         <div class="portfolio-body">
  //           <span class="badge">${item.category}</span>
  //           <h4>${item.title}</h4>
  //           <p>${item.description}</p>
  //           <div class="actions">
  //             <a class="btn btn-outline-gradient btn-sm" href="${item.preview}" target="_blank" rel="noopener">
  //               <i class="bi bi-box-arrow-up-right"></i> Visit
  //             </a>
  //             <a class="read-more-link" href="portfolio-details.html?id=${item.id}">
  //               Case Study <i class="bi bi-arrow-right"></i>
  //             </a>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   `;
  // }

  function createPortfolioCard(item) {
    return `
      <div class="col-lg-4 col-md-6">
        <div class="portfolio-card">
          <img src="${item.cover}" alt="${item.title}">
          <div class="portfolio-body">
            <span class="badge">${item.category}</span>
            <h4>${item.title}</h4>
            <p>${item.description}</p>
          </div>
        </div>
      </div>
    `;
  }

  function getFilteredPortfolioItems() {
    if (!Array.isArray(siteData.portfolio)) return [];
    if (portfolioState.filter === 'all') {
      return siteData.portfolio;
    }
    return siteData.portfolio.filter((item) => item.category === portfolioState.filter);
  }

  function renderPortfolioItems(increment = false) {
    const container = document.getElementById('portfolio-container');
    const loadMoreBtn = document.getElementById('portfolio-load-more');
    if (!container) return;

    if (increment) {
      portfolioState.visible += portfolioState.chunk;
    } else {
      portfolioState.visible = portfolioState.chunk;
    }

    const filteredItems = getFilteredPortfolioItems();
    const visibleItems = filteredItems.slice(0, portfolioState.visible);
    container.innerHTML = visibleItems.map(createPortfolioCard).join('');

    if (loadMoreBtn) {
      if (portfolioState.visible >= filteredItems.length) {
        loadMoreBtn.classList.add('d-none');
      } else {
        loadMoreBtn.classList.remove('d-none');
      }
    }
  }

  function setupPortfolioFilters() {
    const filterContainer = document.getElementById('portfolio-filters');
    if (!filterContainer || !Array.isArray(siteData.portfolio)) return;

    const categories = Array.from(new Set(siteData.portfolio.map((item) => item.category)));
    const createButton = (value, label) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.filter = value;
      button.textContent = label;
      if (value === portfolioState.filter) {
        button.classList.add('filter-active');
      }
      return button;
    };

    filterContainer.innerHTML = '';
    filterContainer.appendChild(createButton('all', 'All'));
    categories.forEach((category) => {
      filterContainer.appendChild(createButton(category, category));
    });

    filterContainer.addEventListener('click', (event) => {
      const target = event.target.closest('button[data-filter]');
      if (!target) return;
      const newFilter = target.dataset.filter;
      if (newFilter === portfolioState.filter) return;

      portfolioState.filter = newFilter;
      filterContainer.querySelectorAll('button').forEach((btn) => btn.classList.remove('filter-active'));
      target.classList.add('filter-active');
      renderPortfolioItems();
    });
  }

  function setupPortfolioSection() {
    if (!document.getElementById('portfolio-container')) return;
    setupPortfolioFilters();
    renderPortfolioItems();
    const loadMoreBtn = document.getElementById('portfolio-load-more');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => renderPortfolioItems(true));
    }
  }

  function formatBlogMeta(blog) {
    const date = new Date(blog.date);
    return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · ${blog.readTime}`;
  }

    function createBlogCard(blog) {
    return `
      <div class="col-lg-4 col-md-6">
        <article class="blog-card" data-blog-id="${blog.id}" role="button" tabindex="0">
          <img src="${blog.cover}" alt="${blog.title}">
          <div class="blog-content">
            <p class="blog-meta">${formatBlogMeta(blog)}</p>
            <h4>${blog.title}</h4>
            <p>${blog.excerpt}</p>
            <span class="read-more-link">Read story <i class="bi bi-arrow-right"></i></span>
          </div>
        </article>
      </div>
    `;
  }



  function renderBlogs(containerId, limit) {
    const container = document.getElementById(containerId);
    if (!container || !Array.isArray(siteData.blogs)) return;
    const sorted = [...siteData.blogs].sort((a, b) => new Date(b.date) - new Date(a.date));
    const items = typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
    container.innerHTML = items.map(createBlogCard).join('');
  }

  function initBlogModal() {
    blogModalElement = document.getElementById('blogModal');
    if (blogModalElement && window.bootstrap) {
      blogModalInstance = new bootstrap.Modal(blogModalElement);
    }
  }

  function openBlogModal(blogId) {
    if (!blogModalInstance || !blogModalElement) return;
    const blog = siteData.blogs.find((entry) => entry.id === blogId);
    if (!blog) return;
    blogModalElement.querySelector('#blog-modal-title').textContent = blog.title;
    blogModalElement.querySelector('#blog-modal-meta').textContent = formatBlogMeta(blog);
    blogModalElement.querySelector('#blog-modal-cover').src = blog.cover;
    blogModalElement.querySelector('#blog-modal-cover').alt = blog.title;
    blogModalElement.querySelector('#blog-modal-content').innerHTML = blog.content;
    blogModalInstance.show();
  }

  function attachBlogCardEvents(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.addEventListener('click', (event) => {
      const card = event.target.closest('[data-blog-id]');
      if (!card) return;
      openBlogModal(card.dataset.blogId);
    });
    container.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      const card = event.target.closest('[data-blog-id]');
      if (!card) return;
      openBlogModal(card.dataset.blogId);
    });
  }

  function renderServiceDetailsPage() {
    const listContainer = document.getElementById('services-list');
    const detailsContainer = document.getElementById('service-details-content');
    if (!listContainer || !detailsContainer || !siteData.services.length) return;

    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get('service');
    const activeService = siteData.services.find((svc) => svc.id === requestedId) || siteData.services[0];

    listContainer.innerHTML = siteData.services.map((service) => `
      <a href="service-details.html?service=${service.id}" class="${service.id === activeService.id ? 'active' : ''}">
        ${service.title}
      </a>
    `).join('');

    detailsContainer.innerHTML = `
      <p class="eyebrow mb-2">${activeService.tagline}</p>
      <h2>${activeService.details.heroHeading}</h2>
      <p class="text-muted mb-4">${activeService.details.heroSubheading}</p>
      <img src="${activeService.cover}" alt="${activeService.title}" class="img-fluid rounded-4 mb-4">
      <p>${activeService.details.overview}</p>
      <ul class="mt-3">
        ${activeService.details.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
      </ul>
      <div class="row g-3 mt-4">
        <div class="col-md-6">
          <h4>Deliverables</h4>
          <ul>
            ${activeService.details.deliverables.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div class="col-md-6">
          <h4>Metrics</h4>
          <ul>
            ${activeService.details.metrics.map((metric) => `<li>${metric.label}: ${metric.value}</li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="mt-4">
        <h4>Tools &amp; Platforms</h4>
        <div class="pill-row mt-2">
          ${activeService.details.tools.map((tool) => `<span class="pill">${tool}</span>`).join('')}
        </div>
      </div>
    `;
  }

  function renderPortfolioDetailsPage() {
    const container = document.getElementById('portfolio-detail');
    if (!container || !siteData.portfolio.length) return;
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get('id');
    const project = siteData.portfolio.find((item) => item.id === requestedId) || siteData.portfolio[0];

    const titleEl = document.getElementById('portfolio-detail-title');
    const summaryEl = document.getElementById('portfolio-detail-summary');
    if (titleEl) titleEl.textContent = project.title;
    if (summaryEl) summaryEl.textContent = project.summary;

    container.innerHTML = `
      <div class="row gy-5">
        <div class="col-lg-8">
          <div class="portfolio-details-slider swiper init-swiper">
            <div class="swiper-config">{
              "loop": true,
              "speed": 600,
              "autoplay": { "delay": 4000 },
              "pagination": { "el": ".swiper-pagination", "clickable": true }
            }</div>
            <div class="swiper-wrapper">
              ${project.gallery.map((img) => `<div class="swiper-slide"><img src="${img}" alt="${project.title} view"></div>`).join('')}
            </div>
            <div class="swiper-pagination"></div>
          </div>
          <div class="portfolio-description mt-4">
            <h2>${project.title}</h2>
            <p>${project.summary}</p>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="portfolio-info">
            <h3>Project Info</h3>
            <ul>
              <li><strong>Category:</strong> <span>${project.category}</span></li>
              <li><strong>Stack:</strong> <span>${project.tech.join(', ')}</span></li>
              <li><strong>Preview:</strong> <a href="${project.preview}" target="_blank" rel="noopener">Visit Project</a></li>
            </ul>
          </div>
          <div class="portfolio-description mt-4">
            <h2>Impact</h2>
            <ul>
              ${project.impact.map((point) => `<li>${point}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;

    if (typeof initSwiper === 'function') {
      initSwiper();
    }
  }

  function initCustomFeatures() {
    if (isHome) {
      renderServicesGrid();
      setupPortfolioSection();
      renderBlogs('blog-cards', 3);
      initHeroParallax();
      initBlogModal();
      attachBlogCardEvents('blog-cards');
    }

    if (isServiceDetailsPage) {
      renderServiceDetailsPage();
    }

    if (isPortfolioDetailsPage) {
      renderPortfolioDetailsPage();
    }

    if (isBlogPage) {
      renderBlogs('blog-page-cards');
      initBlogModal();
      attachBlogCardEvents('blog-page-cards');
    }
  }

  window.addEventListener('load', initCustomFeatures);

})();


'use strict';

const canvas = document.getElementsByTagName('canvas')[0];
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let config = {
  TEXTURE_DOWNSAMPLE: 1,
  DENSITY_DISSIPATION: 0.98,
  VELOCITY_DISSIPATION: 0.99,
  PRESSURE_DISSIPATION: 0.8,
  PRESSURE_ITERATIONS: 25,
  CURL: 28,
  SPLAT_RADIUS: 0.004 };


let pointers = [];
let splatStack = [];

const { gl, ext } = getWebGLContext(canvas);

function getWebGLContext(canvas) {
  const params = { alpha: false, depth: false, stencil: false, antialias: false };

  let gl = canvas.getContext('webgl2', params);
  const isWebGL2 = !!gl;
  if (!isWebGL2)
  gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);

  let halfFloat;
  let supportLinearFiltering;
  if (isWebGL2) {
    gl.getExtension('EXT_color_buffer_float');
    supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
  } else {
    halfFloat = gl.getExtension('OES_texture_half_float');
    supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
  let formatRGBA;
  let formatRG;
  let formatR;

  if (isWebGL2)
  {
    formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
    formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
    formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
  } else

  {
    formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
  }

  return {
    gl,
    ext: {
      formatRGBA,
      formatRG,
      formatR,
      halfFloatTexType,
      supportLinearFiltering } };


}

function getSupportedFormat(gl, internalFormat, format, type)
{
  if (!supportRenderTextureFormat(gl, internalFormat, format, type))
  {
    switch (internalFormat) {

      case gl.R16F:
        return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
      case gl.RG16F:
        return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
      default:
        return null;}

  }

  return {
    internalFormat,
    format };

}

function supportRenderTextureFormat(gl, internalFormat, format, type) {
  let texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

  let fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  if (status != gl.FRAMEBUFFER_COMPLETE)
  return false;
  return true;
}

function pointerPrototype() {
  this.id = -1;
  this.x = 0;
  this.y = 0;
  this.dx = 0;
  this.dy = 0;
  this.down = false;
  this.moved = false;
  this.color = [30, 0, 300];
}

pointers.push(new pointerPrototype());

class GLProgram {
  constructor(vertexShader, fragmentShader) {
    this.uniforms = {};
    this.program = gl.createProgram();

    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS))
    throw gl.getProgramInfoLog(this.program);

    const uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
      const uniformName = gl.getActiveUniform(this.program, i).name;
      this.uniforms[uniformName] = gl.getUniformLocation(this.program, uniformName);
    }
  }

  bind() {
    gl.useProgram(this.program);
  }}


function compileShader(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
  throw gl.getShaderInfoLog(shader);

  return shader;
};

const baseVertexShader = compileShader(gl.VERTEX_SHADER, `
    precision highp float;
    precision mediump sampler2D;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`);

const clearShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision mediump sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`);

const displayShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision mediump sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
`);

const splatShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision mediump sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`);

const advectionManualFilteringShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision mediump sampler2D;

    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform float dt;
    uniform float dissipation;

    vec4 bilerp (in sampler2D sam, in vec2 p) {
        vec4 st;
        st.xy = floor(p - 0.5) + 0.5;
        st.zw = st.xy + 1.0;
        vec4 uv = st * texelSize.xyxy;
        vec4 a = texture2D(sam, uv.xy);
        vec4 b = texture2D(sam, uv.zy);
        vec4 c = texture2D(sam, uv.xw);
        vec4 d = texture2D(sam, uv.zw);
        vec2 f = p - st.xy;
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    void main () {
        vec2 coord = gl_FragCoord.xy - dt * texture2D(uVelocity, vUv).xy;
        gl_FragColor = dissipation * bilerp(uSource, coord);
        gl_FragColor.a = 1.0;
    }
`);

const advectionShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision mediump sampler2D;

    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform float dt;
    uniform float dissipation;

    void main () {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        gl_FragColor = dissipation * texture2D(uSource, coord);
        gl_FragColor.a = 1.0;
    }
`);

const divergenceShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision mediump sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;

    vec2 sampleVelocity (in vec2 uv) {
        vec2 multiplier = vec2(1.0, 1.0);
        if (uv.x < 0.0) { uv.x = 0.0; multiplier.x = -1.0; }
        if (uv.x > 1.0) { uv.x = 1.0; multiplier.x = -1.0; }
        if (uv.y < 0.0) { uv.y = 0.0; multiplier.y = -1.0; }
        if (uv.y > 1.0) { uv.y = 1.0; multiplier.y = -1.0; }
        return multiplier * texture2D(uVelocity, uv).xy;
    }

    void main () {
        float L = sampleVelocity(vL).x;
        float R = sampleVelocity(vR).x;
        float T = sampleVelocity(vT).y;
        float B = sampleVelocity(vB).y;
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`);

const curlShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision mediump sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0);
    }
`);

const vorticityShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision mediump sampler2D;

    varying vec2 vUv;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = vec2(abs(T) - abs(B), 0.0);
        force *= 1.0 / length(force + 0.00001) * curl * C;
        vec2 vel = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
    }
`);

const pressureShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision mediump sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;

    vec2 boundary (in vec2 uv) {
        uv = min(max(uv, 0.0), 1.0);
        return uv;
    }

    void main () {
        float L = texture2D(uPressure, boundary(vL)).x;
        float R = texture2D(uPressure, boundary(vR)).x;
        float T = texture2D(uPressure, boundary(vT)).x;
        float B = texture2D(uPressure, boundary(vB)).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`);

const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision mediump sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    vec2 boundary (in vec2 uv) {
        uv = min(max(uv, 0.0), 1.0);
        return uv;
    }

    void main () {
        float L = texture2D(uPressure, boundary(vL)).x;
        float R = texture2D(uPressure, boundary(vR)).x;
        float T = texture2D(uPressure, boundary(vT)).x;
        float B = texture2D(uPressure, boundary(vB)).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`);

let textureWidth;
let textureHeight;
let density;
let velocity;
let divergence;
let curl;
let pressure;
initFramebuffers();

const clearProgram = new GLProgram(baseVertexShader, clearShader);
const displayProgram = new GLProgram(baseVertexShader, displayShader);
const splatProgram = new GLProgram(baseVertexShader, splatShader);
const advectionProgram = new GLProgram(baseVertexShader, ext.supportLinearFiltering ? advectionShader : advectionManualFilteringShader);
const divergenceProgram = new GLProgram(baseVertexShader, divergenceShader);
const curlProgram = new GLProgram(baseVertexShader, curlShader);
const vorticityProgram = new GLProgram(baseVertexShader, vorticityShader);
const pressureProgram = new GLProgram(baseVertexShader, pressureShader);
const gradienSubtractProgram = new GLProgram(baseVertexShader, gradientSubtractShader);

function initFramebuffers() {
  textureWidth = gl.drawingBufferWidth >> config.TEXTURE_DOWNSAMPLE;
  textureHeight = gl.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE;

  const texType = ext.halfFloatTexType;
  const rgba = ext.formatRGBA;
  const rg = ext.formatRG;
  const r = ext.formatR;

  density = createDoubleFBO(2, textureWidth, textureHeight, rgba.internalFormat, rgba.format, texType, ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST);
  velocity = createDoubleFBO(0, textureWidth, textureHeight, rg.internalFormat, rg.format, texType, ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST);
  divergence = createFBO(4, textureWidth, textureHeight, r.internalFormat, r.format, texType, gl.NEAREST);
  curl = createFBO(5, textureWidth, textureHeight, r.internalFormat, r.format, texType, gl.NEAREST);
  pressure = createDoubleFBO(6, textureWidth, textureHeight, r.internalFormat, r.format, texType, gl.NEAREST);
}

function createFBO(texId, w, h, internalFormat, format, type, param) {
  gl.activeTexture(gl.TEXTURE0 + texId);
  let texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

  let fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.viewport(0, 0, w, h);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return [texture, fbo, texId];
}

function createDoubleFBO(texId, w, h, internalFormat, format, type, param) {
  let fbo1 = createFBO(texId, w, h, internalFormat, format, type, param);
  let fbo2 = createFBO(texId + 1, w, h, internalFormat, format, type, param);

  return {
    get read() {
      return fbo1;
    },
    get write() {
      return fbo2;
    },
    swap() {
      let temp = fbo1;
      fbo1 = fbo2;
      fbo2 = temp;
    } };

}

const blit = (() => {
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  return destination => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  };
})();

let lastTime = Date.now();
multipleSplats(parseInt(Math.random() * 20) + 5);
update();

function update() {
  resizeCanvas();

  const dt = Math.min((Date.now() - lastTime) / 1000, 0.016);
  lastTime = Date.now();

  gl.viewport(0, 0, textureWidth, textureHeight);

  if (splatStack.length > 0)
  multipleSplats(splatStack.pop());

  advectionProgram.bind();
  gl.uniform2f(advectionProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
  gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read[2]);
  gl.uniform1i(advectionProgram.uniforms.uSource, velocity.read[2]);
  gl.uniform1f(advectionProgram.uniforms.dt, dt);
  gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
  blit(velocity.write[1]);
  velocity.swap();

  gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read[2]);
  gl.uniform1i(advectionProgram.uniforms.uSource, density.read[2]);
  gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
  blit(density.write[1]);
  density.swap();

  for (let i = 0; i < pointers.length; i++) {
    const pointer = pointers[i];
    if (pointer.moved) {
      splat(pointer.x, pointer.y, pointer.dx, pointer.dy, pointer.color);
      pointer.moved = false;
    }
  }

  curlProgram.bind();
  gl.uniform2f(curlProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
  gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read[2]);
  blit(curl[1]);

  vorticityProgram.bind();
  gl.uniform2f(vorticityProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
  gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read[2]);
  gl.uniform1i(vorticityProgram.uniforms.uCurl, curl[2]);
  gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
  gl.uniform1f(vorticityProgram.uniforms.dt, dt);
  blit(velocity.write[1]);
  velocity.swap();

  divergenceProgram.bind();
  gl.uniform2f(divergenceProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
  gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read[2]);
  blit(divergence[1]);

  clearProgram.bind();
  let pressureTexId = pressure.read[2];
  gl.activeTexture(gl.TEXTURE0 + pressureTexId);
  gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
  gl.uniform1i(clearProgram.uniforms.uTexture, pressureTexId);
  gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE_DISSIPATION);
  blit(pressure.write[1]);
  pressure.swap();

  pressureProgram.bind();
  gl.uniform2f(pressureProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
  gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence[2]);
  pressureTexId = pressure.read[2];
  gl.uniform1i(pressureProgram.uniforms.uPressure, pressureTexId);
  gl.activeTexture(gl.TEXTURE0 + pressureTexId);
  for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
    gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
    blit(pressure.write[1]);
    pressure.swap();
  }

  gradienSubtractProgram.bind();
  gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
  gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read[2]);
  gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read[2]);
  blit(velocity.write[1]);
  velocity.swap();

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  displayProgram.bind();
  gl.uniform1i(displayProgram.uniforms.uTexture, density.read[2]);
  blit(null);

  requestAnimationFrame(update);
}

function splat(x, y, dx, dy, color) {
  splatProgram.bind();
  gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read[2]);
  gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
  gl.uniform2f(splatProgram.uniforms.point, x / canvas.width, 1.0 - y / canvas.height);
  gl.uniform3f(splatProgram.uniforms.color, dx, -dy, 1.0);
  gl.uniform1f(splatProgram.uniforms.radius, config.SPLAT_RADIUS);
  blit(velocity.write[1]);
  velocity.swap();

  gl.uniform1i(splatProgram.uniforms.uTarget, density.read[2]);
  gl.uniform3f(splatProgram.uniforms.color, color[0] * 0.3, color[1] * 0.3, color[2] * 0.3);
  blit(density.write[1]);
  density.swap();
}

function multipleSplats(amount) {
  for (let i = 0; i < amount; i++) {
    const color = [Math.random() * 10, Math.random() * 10, Math.random() * 10];
    const x = canvas.width * Math.random();
    const y = canvas.height * Math.random();
    const dx = 1000 * (Math.random() - 0.5);
    const dy = 1000 * (Math.random() - 0.5);
    splat(x, y, dx, dy, color);
  }
}

function resizeCanvas() {
  if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    initFramebuffers();
  }
}
/* -------------------------------------------
   USE HERO AS THE INTERACTION LAYER
   Canvas stays background only (no listeners)
------------------------------------------- */

const hero = document.querySelector(".hero");

// 🟢 Mouse Move (main interaction)
hero.addEventListener("mousemove", (e) => {
  const rect = hero.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  pointers[0].down = true;
  pointers[0].moved = true;
  pointers[0].dx = (x - pointers[0].x) * 10;
  pointers[0].dy = (y - pointers[0].y) * 10;
  pointers[0].x = x;
  pointers[0].y = y;

  // random color per move
  pointers[0].color = [
    Math.random() + 0.2,
    Math.random() + 0.2,
    Math.random() + 0.2,
  ];
});

// 🟢 Handle mouse leaving hero area
hero.addEventListener("mouseleave", () => {
  pointers[0].down = false;
});

// 🟢 Touch Start
hero.addEventListener(
  "touchstart",
  (e) => {
    if (!e.target.closest('canvas')) return; // allow button/link clicks

    const rect = hero.getBoundingClientRect();
    const touches = e.targetTouches;

    for (let i = 0; i < touches.length; i++) {
      if (i >= pointers.length) pointers.push(new pointerPrototype());

      pointers[i].id = touches[i].identifier;
      pointers[i].down = true;
      pointers[i].x = touches[i].clientX - rect.left;
      pointers[i].y = touches[i].clientY - rect.top;
      pointers[i].color = [
        Math.random() + 0.2,
        Math.random() + 0.2,
        Math.random() + 0.2,
      ];
    }
  },
  { passive: true }
);


// 🟢 Touch Move
hero.addEventListener(
  "touchmove",
  (e) => {
    if (!e.target.closest('canvas')) return;

    const rect = hero.getBoundingClientRect();
    const touches = e.targetTouches;

    for (let i = 0; i < touches.length; i++) {
      let pointer = pointers[i];
      pointer.moved = pointer.down;
      pointer.dx = (touches[i].clientX - rect.left - pointer.x) * 10;
      pointer.dy = (touches[i].clientY - rect.top - pointer.y) * 10;
      pointer.x = touches[i].clientX - rect.left;
      pointer.y = touches[i].clientY - rect.top;
    }
  },
  { passive: true }
);


// 🟢 Touch End
hero.addEventListener("touchend", (e) => {
  const touches = e.changedTouches;
  for (let i = 0; i < touches.length; i++) {
    for (let j = 0; j < pointers.length; j++) {
      if (touches[i].identifier === pointers[j].id) {
        pointers[j].down = false;
      }
    }
  }
});

  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });


  document.addEventListener('keydown', function(e) {
    if (
      e.keyCode === 123 || 
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
      return false;
    }
  });


  setInterval(function() {
    const before = new Date().getTime();
    debugger;
    const after = new Date().getTime();
    if (after - before > 100) {
      window.location.href = "/";
    }
  }, 1000);


const heroSection = document.getElementById("hero");
// Disable touch scrolling inside hero
heroSection.addEventListener("touchmove", function (e) {
  e.preventDefault();
}, { passive: false });


