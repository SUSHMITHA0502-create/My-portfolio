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

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
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

})();

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");

  // Define project details and images
  const projects = {
      "1": {
          title: "Smart Surveillance System",
          category: "AI & Deep Learning",
          technology_stack: "PyTorch, YOLOv5, Flask",
          programming_language: "Python",
          url: "https://github.com/SUSHMITHA0502-create/Smart-Surveillance-System",
          images: [
              "assets/img/portfolio/Project1-1.png",
              "assets/img/portfolio/Project1-2.png",
              "assets/img/portfolio/Project1-3.png"
          ],
          heading: "AI-Powered Smart Surveillance with Alarm Integration",
          description: " An AI-powered security system using YOLOv5 to detect threats in real-time. It triggers an alarm and sends instant WhatsApp notifications using Flask and Twilio API, enhancing safety and monitoring efficiency."
      },
      "2": {
          title: "Traffic Sign Detection",
          category: "Machine Learning & Image Processing",
          technology_stack: "TensorFlow, Keras, OpenCV, CNNs",
          programming_language: "Python",
          url: "https://github.com/yourusername/traffic-detection",
          images: [
              "assets/img/portfolio/traffic-1.png",
              "assets/img/portfolio/traffic-2.png",
              "assets/img/portfolio/traffic-3.png"
          ],
          heading: "Traffic Sign Detection Using CNN",
          description: "Developed a machine learning-based traffic sign recognition system using CNNs. The model accurately detects and classifies traffic signs from images, enhancing road safety and supporting autonomous driving applications. Implemented data preprocessing, normalization, and real-time recognition for improved performance."
      },
      "3": {
          title: "Disaster Awareness System",
          category: "Web Development",
          technology_stack: "HTML, CSS, JavaScript, MySQL",
          programming_language: "Python (Django)",
          url: "https://github.com/yourusername/disaster-awareness",
          images: [
              "assets/img/portfolio/disaster-1.png",
              "assets/img/portfolio/disaster-2.png",
              "assets/img/portfolio/disaster-3.png"
          ],
          heading: "Disaster Awareness Management System",
          description: "Developed a machine learning-based traffic sign recognition system using CNNs. The model accurately detects and classifies traffic signs from images, enhancing road safety and supporting autonomous driving applications. Implemented data preprocessing, normalization, and real-time recognition for improved performance."
      },
      "4": {
          title: "Bank Locker Management System",
          category: "Security & Finance",
          technology_stack: "Node.js, React.js, MySQL",
          programming_language: "JavaScript, Python, Java",
          url: "https://github.com/yourusername/bank-locker",
          images: [
              "assets/img/portfolio/bank-1.png",
              "assets/img/portfolio/bank-2.png",
              "assets/img/portfolio/bank-3.png"
          ],
          heading: "Bank Locker Management System",
          description: "The objective of a Bank Locker Management System is to securely automate locker allocation, access control, customer management, and payment tracking for efficient and safe locker services."
      }
  };

  // Update project details if project exists
  if (projects[projectId]) {
      document.getElementById("project-category").textContent = projects[projectId].category;
      document.getElementById("project-technology").textContent = projects[projectId].technology_stack;
      document.getElementById("project-language").textContent = projects[projectId].programming_language;
      document.getElementById("project-url").href = projects[projectId].url;
      document.getElementById("project-url").textContent = "Click Here";
      document.getElementById("project-heading").textContent = projects[projectId].heading;
      document.getElementById("project-description").textContent = projects[projectId].description;

      // Insert images dynamically
      const imagesContainer = document.getElementById("project-images");
      imagesContainer.innerHTML = ""; // Clear existing images

      projects[projectId].images.forEach(image => {
          const slide = document.createElement("div");
          slide.className = "swiper-slide";
          slide.innerHTML = `<img src="${image}" alt="Project Image">`;
          imagesContainer.appendChild(slide);
      });
  } else {
      console.log("Project not found!");
  }
});

window.addEventListener("load", function () {
  window.scrollTo(0, 0);
});


window.onload = function () {
  if (window.location.hash) {
      window.location.href = window.location.pathname;
  }
};
