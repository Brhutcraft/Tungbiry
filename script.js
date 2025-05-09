document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle Logic ---
    // Lấy các phần tử cần thiết
    const hamburger = document.querySelector('.hamburger');
    const mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper'); // Vùng bọc menu mobile
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay'); // Lớp phủ nền
    const closeBtn = document.querySelector('.mobile-menu .close-btn'); // Nút đóng
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu .nav-links a'); // Links trong menu mobile

    // Hàm để mở menu
    function openMobileMenu() {
        mobileMenuWrapper.classList.add('open');
        mobileMenuOverlay.classList.add('visible');
        document.body.classList.add('menu-open'); // Thêm class vào body để ngăn cuộn
    }

    // Hàm để đóng menu
    function closeMobileMenu() {
        mobileMenuWrapper.classList.remove('open');
        mobileMenuOverlay.classList.remove('visible');
        document.body.classList.remove('menu-open'); // Xóa class khỏi body
    }

    // Mở menu khi bấm hamburger
    if (hamburger) { // Kiểm tra xem hamburger có tồn tại không
        hamburger.addEventListener('click', function() {
            openMobileMenu();
        });
    }


    // Đóng menu khi bấm nút đóng
     if (closeBtn) { // Kiểm tra xem nút đóng có tồn tại không
        closeBtn.addEventListener('click', function() {
            closeMobileMenu();
        });
    }


    // Đóng menu khi bấm lớp phủ nền
    if (mobileMenuOverlay) { // Kiểm tra xem overlay có tồn tại không
         mobileMenuOverlay.addEventListener('click', function() {
            closeMobileMenu();
        });
    }


    // Đóng menu khi bấm vào một link trong menu (chỉ trên mobile)
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Chỉ đóng menu nếu đang ở màn hình mobile và menu đang mở
            if (window.innerWidth <= 768 && mobileMenuWrapper.classList.contains('open')) {
                 closeMobileMenu();
            }
        });
    });


    // --- Hide/Show Navbar on Scroll (Mobile Only) Logic ---
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    let navbarHeight = navbar.offsetHeight;

    window.addEventListener('scroll', function() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Chỉ áp dụng logic ẩn/hiện navbar trên mobile và khi menu mobile KHÔNG mở
        if (window.innerWidth <= 768 && !mobileMenuWrapper.classList.contains('open')) {
            if (currentScrollTop > lastScrollTop && currentScrollTop > navbarHeight) {
                 // Cuộn xuống
                 navbar.classList.add('hidden');
            } else if (currentScrollTop < lastScrollTop || currentScrollTop <= 0) {
                 // Cuộn lên hoặc ở đầu trang
                 navbar.classList.remove('hidden');
            }
        } else if (window.innerWidth > 768) {
             // Trên desktop, luôn đảm bảo navbar không bị ẩn
             if (navbar.classList.contains('hidden')) {
                navbar.classList.remove('hidden');
             }
        }
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });

    window.addEventListener('resize', () => {
        navbarHeight = navbar.offsetHeight;
         // Khi resize trên mobile và navbar đang ở trạng thái ẩn
         if (window.innerWidth <= 768) {
             const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
             if (currentScrollTop > navbarHeight && lastScrollTop > navbarHeight) {
                  // Nếu đang cuộn xuống và menu mobile KHÔNG mở, giữ ẩn
                  if (!mobileMenuWrapper.classList.contains('open')) {
                    navbar.classList.add('hidden');
                 }
             } else {
                 // Ngược lại, hiển thị navbar
                 navbar.classList.remove('hidden');
             }
             // Đảm bảo menu mobile đóng nếu resize từ mobile lên desktop
              if (window.innerWidth > 768 && mobileMenuWrapper.classList.contains('open')) {
                  closeMobileMenu();
              }

         } else {
              // Trên desktop, luôn đảm bảo navbar không bị ẩn
              navbar.classList.remove('hidden');
              // Đảm bảo menu mobile ẩn trên desktop
               if (mobileMenuWrapper.classList.contains('open')) {
                   closeMobileMenu(); // Đóng menu nếu nó đang mở khi chuyển sang desktop
               }
         }
    });


    // --- Horizontal Scroll Animation for Quotes Slider ---
    // Lấy khung chứa slider và các item trích dẫn
    const quotesSliderWrapper = document.querySelector('.quotes-slider-wrapper');
    const quoteItems = document.querySelectorAll('.quotes-slider-wrapper .quote-item');

    // Chỉ chạy code nếu tìm thấy khung slider và có item
    if (quotesSliderWrapper && quoteItems.length > 0) {

        // Tùy chọn cho Intersection Observer
        const observerOptions = {
            root: quotesSliderWrapper, // Thiết lập khung cuộn ngang làm "root" (khung nhìn)
            rootMargin: '0px', // Không thêm margin cho root
            threshold: 0.5 // Kích hoạt khi 50% của item nằm trong khung nhìn
        };

        // Hàm callback sẽ chạy khi một item giao nhau với root
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Nếu item nằm trong khung nhìn
                    entry.target.classList.add('is-in-view'); // Thêm class để kích hoạt CSS animation
                    // Nếu chỉ muốn animation chạy 1 lần duy nhất cho mỗi item, bỏ comment dòng dưới:
                    // observer.unobserve(entry.target);
                } else {
                    // Nếu item đi ra khỏi khung nhìn
                     entry.target.classList.remove('is-in-view'); // Xóa class để có thể re-animate khi cuộn lại
                }
            });
        };

        // Tạo Intersection Observer
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Bắt đầu theo dõi từng item trích dẫn
        quoteItems.forEach(item => {
            observer.observe(item);
        });
    }
    // --- Kết thúc Horizontal Scroll Animation ---


    // --- AOS Initialization ---
    AOS.init({
      duration: 800,
      once: true, // Chỉ chạy animation 1 lần khi phần tử đi vào viewport
      mirror: false // Không lặp lại animation khi cuộn lên
    });

});
