document.addEventListener('DOMContentLoaded', () => {
    // --- Active Navigation Link ---
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        const isFactoryDetail = ['nha-xuong-trung-ha.html', 'nha-xuong-co-tiet.html'].includes(currentPath);
        if (linkPath === currentPath || (isFactoryDetail && linkPath === 'projects.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === currentPath);
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
            const isOpen = mainNav.classList.toggle('is-open');
            mobileMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('is-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Reset mobile menu on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 992) {
                mainNav.classList.remove('is-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
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

    // --- Warehouse Gallery Slider ---
    const warehouseGallery = document.getElementById('warehouse-gallery');
    const warehouseSlides = document.querySelectorAll('.warehouse-slide');
    const warehouseDots = document.querySelectorAll('.warehouse-dot');
    const warehousePrev = document.getElementById('warehouse-slider-prev');
    const warehouseNext = document.getElementById('warehouse-slider-next');

    if (warehouseGallery && warehouseSlides.length > 0 && warehouseDots.length > 0 && warehousePrev && warehouseNext) {
        let warehouseActiveIndex = 0;
        let galleryTimer;

        const showWarehouseSlide = (index) => {
            warehouseActiveIndex = (index + warehouseSlides.length) % warehouseSlides.length;

            warehouseSlides.forEach((slide, slideIndex) => {
                slide.classList.toggle('active', slideIndex === warehouseActiveIndex);
            });

            warehouseDots.forEach((dot, dotIndex) => {
                dot.classList.toggle('active', dotIndex === warehouseActiveIndex);
                dot.setAttribute('aria-current', dotIndex === warehouseActiveIndex ? 'true' : 'false');
            });
        };

        const nextWarehouseSlide = () => showWarehouseSlide(warehouseActiveIndex + 1);
        const prevWarehouseSlide = () => showWarehouseSlide(warehouseActiveIndex - 1);
        const startGalleryTimer = () => {
            galleryTimer = window.setInterval(nextWarehouseSlide, 10000);
        };
        const stopGalleryTimer = () => {
            window.clearInterval(galleryTimer);
        };

        warehouseNext.addEventListener('click', () => {
            stopGalleryTimer();
            nextWarehouseSlide();
            startGalleryTimer();
        });

        warehousePrev.addEventListener('click', () => {
            stopGalleryTimer();
            prevWarehouseSlide();
            startGalleryTimer();
        });

        warehouseDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopGalleryTimer();
                showWarehouseSlide(index);
                startGalleryTimer();
            });
        });

        warehouseGallery.addEventListener('mouseenter', stopGalleryTimer);
        warehouseGallery.addEventListener('mouseleave', startGalleryTimer);
        warehouseGallery.addEventListener('focusin', stopGalleryTimer);
        warehouseGallery.addEventListener('focusout', startGalleryTimer);

        showWarehouseSlide(0);
        startGalleryTimer();
    }

    // --- Premium Projects Slider ---
    const projectsSlider = document.getElementById('projects-slider');
    const sliderPrev = document.getElementById('slider-prev');
    const sliderNext = document.getElementById('slider-next');

    if (projectsSlider && sliderPrev && sliderNext) {
        const projectsData = [
            { "area": "4.032 m² & 2.730 m²", "bays": "-", "description": "KCN Trung Hà, Lô E5. PCCC tự động, trạm XLNT.", "detailUrl": "nha-xuong-trung-ha.html", "height": "10.85m", "id": 1, "load": "3 Tấn/m²", "location": "KCN Trung Hà, Phú Thọ", "name": "Nhà xưởng KCN Trung Hà" },
            { "area": "Theo hiện trạng", "bays": "-", "description": "KCN Cổ Tiết. Hạ tầng đồng bộ, phù hợp ngành sản xuất sạch.", "detailUrl": "nha-xuong-co-tiet.html", "height": "8m", "id": 2, "load": "5 Tấn/m²", "location": "KCN Cổ Tiết, Phú Thọ", "name": "Nhà xưởng KCN Cổ Tiết" }
        ];

        let activeIndex = 0;
        const imgPaths = [
            'assets/images/z7785901913433_5861751b5076d731ec691d57c3774813.jpg',
            'assets/images/z7785901904159_b3eaa8c1fc4112d0cbdd14efe704529d.jpg'
        ];

        const renderSlider = () => {
            projectsSlider.innerHTML = projectsData.map((project, index) => {
                const isActive = index === activeIndex ? 'active' : '';
                const localImage = imgPaths[index % imgPaths.length];

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
                            <a href="lien-he.html" class="btn btn-primary btn-full flex-center gap-2">
                                <span class="material-symbols-outlined">call</span> Liên hệ ngay
                            </a>
                            <a href="${project.detailUrl}" class="btn btn-outline icon-btn flex-center" aria-label="Xem chi tiết ${project.name}">
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

    // --- Route Planner (Google Maps, no API key) ---
    const routeForm = document.getElementById('route-form');
    const routeFrame = document.getElementById('route-map');
    const routeOpen = document.getElementById('route-open');

    if (routeForm && routeFrame) {
        const buildEmbed = (from, to) =>
            `https://maps.google.com/maps?saddr=${encodeURIComponent(from)}&daddr=${encodeURIComponent(to)}&hl=vi&output=embed`;
        const buildLink = (from, to) =>
            `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}`;

        routeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const from = document.getElementById('route-from').value.trim();
            const to = document.getElementById('route-to').value.trim();
            if (!from || !to) return;

            routeFrame.src = buildEmbed(from, to);
            if (routeOpen) {
                routeOpen.href = buildLink(from, to);
                routeOpen.classList.remove('is-hidden');
            }
        });
    }

    // --- Map link inputs: dán link Google Maps → lưu link gốc + hiển thị địa chỉ đã decode ---
    const mapInputs = document.querySelectorAll('[data-map-input]');

    if (mapInputs.length > 0) {
        // Chưa có backend nên tạm lưu link gốc theo id input trong biến này.
        // Khi submit form / có nơi lưu thật thì đọc từ đây.
        const rawMapLinks = {};
        window.rawMapLinks = rawMapLinks;

        const decodeSegment = (seg) => {
            try { return decodeURIComponent(seg).replace(/\+/g, ' ').trim(); }
            catch (e) { return seg.replace(/\+/g, ' ').trim(); }
        };

        // Chuyển link Maps thành text địa chỉ dễ đọc (ưu tiên tên địa danh, sau mới tới toạ độ).
        const toReadableAddress = (value) => {
            const s = value.trim();
            if (!s) return null;
            // Tên địa danh trong /maps/place/<name>/
            const place = s.match(/\/maps\/place\/([^/@?]+)/);
            if (place) return decodeSegment(place[1]);
            // Link chỉ đường /maps/dir/<điểm đi>/<điểm đến>/... → lấy điểm cuối là tên địa chỉ.
            const dir = s.match(/\/maps\/dir\/(.+?)(?:\/@|\/data|\?|$)/);
            if (dir) {
                const segs = dir[1].split('/')
                    .filter((p) => p && !/^@/.test(p) && !/^-?\d+\.\d+,-?\d+\.\d+$/.test(p));
                if (segs.length) return decodeSegment(segs[segs.length - 1]);
            }
            // Link tìm kiếm /maps/search/<query>
            const search = s.match(/\/maps\/search\/([^/@?]+)/);
            if (search) return decodeSegment(search[1]);
            // ?q=<text> hoặc ?query=<text> (không phải toạ độ)
            const q = s.match(/[?&](?:q|query)=([^&]+)/);
            if (q && !/^-?\d+\.\d+,-?\d+\.\d+$/.test(decodeURIComponent(q[1]))) return decodeSegment(q[1]);
            // Cuối cùng mới rơi về toạ độ: @lat,lng / !3dlat!4dlng / ?q=lat,lng
            const coord = s.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
                || s.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/)
                || s.match(/[?&](?:q|query|ll|destination)=(-?\d+\.\d+),(-?\d+\.\d+)/);
            if (coord) return `Toạ độ ${coord[1]}, ${coord[2]}`;
            return null; // không phải link Maps nhận dạng được
        };

        const isMapLink = (value) => /^https?:\/\/|google\.[^/]+\/maps|maps\.app|goo\.gl/i.test(value.trim());

        mapInputs.forEach((input) => {
            const hint = document.createElement('div');
            hint.className = 'map-link-addr';
            const addrText = document.createElement('span');
            addrText.className = 'map-link-addr-text';
            const openLink = document.createElement('a');
            openLink.className = 'map-link-open';
            openLink.target = '_blank';
            openLink.rel = 'noopener';
            openLink.innerHTML = '<span class="material-symbols-outlined">open_in_new</span> Mở Google Maps';
            hint.append(addrText, openLink);
            input.insertAdjacentElement('afterend', hint);

            const refresh = () => {
                const value = input.value.trim();
                if (isMapLink(value)) {
                    rawMapLinks[input.id || input.name || ''] = value; // lưu nguyên link
                    const readable = toReadableAddress(value);
                    addrText.textContent = readable
                        ? '📍 ' + readable
                        : '🔗 Đã lưu link bản đồ (link rút gọn không đọc được tên địa chỉ).';
                    openLink.href = value;
                    hint.classList.add('active');
                } else {
                    delete rawMapLinks[input.id || input.name || ''];
                    addrText.textContent = '';
                    openLink.removeAttribute('href');
                    hint.classList.remove('active');
                }
            };

            input.addEventListener('input', refresh);
            input.addEventListener('paste', () => setTimeout(refresh, 0));
            refresh(); // xử lý giá trị có sẵn (nếu được điền trước)
        });
    }
});
