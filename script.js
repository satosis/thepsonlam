document.addEventListener('DOMContentLoaded', () => {
    // --- Active Navigation Link ---
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- Sticky Header ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
        });
        
        // Reset mobile menu on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 992) {
                mainNav.style.display = '';
            }
        });
    }

    // --- Tabs Functionality (for Projects page) ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabBtns.length > 0 && tabPanes.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and panes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                // Add active class to corresponding pane
                const targetTab = btn.getAttribute('data-tab');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    // --- Lightbox Functionality ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

    if (lightbox && lightboxImg && lightboxClose) {
        lightboxTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                lightbox.classList.add('active');
                lightboxImg.src = this.src;
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        // Close lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightboxImg.src = ''; // Clear image source after animation
                document.body.style.overflow = ''; // Restore scrolling
            }, 300); // Wait for transition
        };

        lightboxClose.addEventListener('click', closeLightbox);
        
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // --- Premium Projects Slider ---
    const projectsSlider = document.getElementById('projects-slider');
    const sliderPrev = document.getElementById('slider-prev');
    const sliderNext = document.getElementById('slider-next');

    if (projectsSlider && sliderPrev && sliderNext) {
        const projectsData = [
            { "area": "4.032 m²", "bays": "-", "description": "KCN Trung Hà, Lô E5. PCCC tự động, trạm XLNT.", "height": "10.85m", "id": 1, "load": "3 Tấn/m²", "location": "KCN Trung Hà, Phú Thọ", "name": "Nhà xưởng 1 - Trung Hà" },
            { "area": "2.730 m²", "bays": "-", "description": "KCN Trung Hà, Lô E5. Tiêu chuẩn cao cấp.", "height": "10.85m", "id": 2, "load": "3 Tấn/m²", "location": "KCN Trung Hà, Phú Thọ", "name": "Nhà xưởng 2 - Trung Hà" },
            { "area": "800 m²", "bays": "-", "description": "Cụm công nghiệp Cổ Tiết. Tiêu chuẩn công nghiệp.", "height": "8m", "id": 3, "load": "-", "location": "CCN Cổ Tiết, Phú Thọ", "name": "Nhà xưởng 1 - Cổ Tiết" },
            { "area": "4.500 m²", "bays": "-", "description": "Cụm công nghiệp Cổ Tiết. Hệ thống đồng bộ.", "height": "8m", "id": 4, "load": "-", "location": "CCN Cổ Tiết, Phú Thọ", "name": "Nhà xưởng 2 - Cổ Tiết" },
            { "area": "9.000 m²", "bays": "-", "description": "Cụm công nghiệp Cổ Tiết. Quy mô lớn.", "height": "8m", "id": 5, "load": "-", "location": "CCN Cổ Tiết, Phú Thọ", "name": "Nhà xưởng 3 - Cổ Tiết" },
            { "area": "9.000 m²", "bays": "-", "description": "Cụm công nghiệp Cổ Tiết. Tiêu chuẩn cao cấp.", "height": "8m", "id": 6, "load": "-", "location": "CCN Cổ Tiết, Phú Thọ", "name": "Nhà xưởng 4 - Cổ Tiết" }
        ];

        let activeIndex = 0;
        const imgPaths = ['assets/images/hero_factory.png', 'assets/images/interior_factory.png', 'assets/images/aerial_factory.png'];

        const renderSlider = () => {
            projectsSlider.innerHTML = projectsData.map((project, index) => {
                const isActive = index === activeIndex ? 'active' : '';
                const localImage = imgPaths[index % 3];

                return `
                <div class="slider-item ${isActive}">
                    <div class="slider-image-col">
                        <img src="${localImage}" class="slider-img" alt="${project.name}">
                        <div class="slider-img-overlay"></div>
                        <div class="slider-badge-container">
                            <span class="badge badge-primary uppercase tracking-widest">Available Now</span>
                            <p class="location-text"><span class="material-symbols-outlined">location_on</span> ${project.location}</p>
                        </div>
                    </div>
                    <div class="slider-info-col">
                        <div class="info-top">
                            <h3 class="info-title">${project.name}</h3>
                            <p class="info-desc">${project.description}</p>
                            <div class="specs-grid">
                                <div class="spec-item">
                                    <span class="spec-label">Diện tích tổng</span>
                                    <strong class="spec-value">${project.area}</strong>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Chiều cao</span>
                                    <strong class="spec-value">${project.height}</strong>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Cửa xuất nhập</span>
                                    <strong class="spec-value">${project.bays}</strong>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Sức chịu tải</span>
                                    <strong class="spec-value">${project.load}</strong>
                                </div>
                            </div>
                        </div>
                        <div class="info-actions">
                            <a href="contact.html" class="btn btn-primary btn-full flex-center gap-2">
                                <span class="material-symbols-outlined">call</span> Liên hệ ngay
                            </a>
                            <a href="projects.html" class="btn btn-outline icon-btn flex-center">
                                <span class="material-symbols-outlined">info</span>
                            </a>
                        </div>
                    </div>
                </div>`;
            }).join('');
        };

        renderSlider();

        sliderNext.addEventListener('click', () => {
            activeIndex = (activeIndex + 1) % projectsData.length;
            renderSlider();
        });

        sliderPrev.addEventListener('click', () => {
            activeIndex = (activeIndex - 1 + projectsData.length) % projectsData.length;
            renderSlider();
        });
    }
});
