// manhung-script.js
document.addEventListener('DOMContentLoaded', function() {
    // --- AOS Initialization (đã có trong script.js chính, nếu script.js được load trước) ---
    // Nếu script.js không load AOS cho trang này, bạn có thể thêm lại:
    // AOS.init({
    //     duration: 800, // values from 0 to 3000, with step 50ms
    //     once: true, // whether animation should happen only once - while scrolling down
    // });


    // --- Modal Functionality ---
    const viewCodeButtons = document.querySelectorAll('.btn-view-code');
    const closeModalButtons = document.querySelectorAll('.close-modal-btn');
    const modalOverlays = document.querySelectorAll('.code-modal-overlay');

    viewCodeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.dataset.codeTarget;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('show'); // Sử dụng class 'show' để kích hoạt
                // Kích hoạt lại Prism cho nội dung vừa hiển thị (nếu cần)
                // Prism.highlightAllUnder(modal); // Highlight code trong modal cụ thể
            }
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.code-modal-overlay').classList.remove('show');
        });
    });

    // Đóng modal khi nhấp chuột ra ngoài (vào overlay)
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(event) {
            if (event.target === this) { // Chỉ đóng nếu click trực tiếp vào overlay
                this.classList.remove('show');
            }
        });
    });


    // --- Copy to Clipboard Functionality ---
    // Lưu ý: PrismJS có plugin copy-to-clipboard riêng, nếu dùng nó thì không cần đoạn này.
    // Đoạn này dành cho các nút copy tự tạo.
    const copyCodeButtons = document.querySelectorAll('.btn-copy-code');
    copyCodeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.previousElementSibling; // Lấy thẻ <pre> ngay trước nút
            if (codeBlock && codeBlock.querySelector('code')) {
                const codeToCopy = codeBlock.querySelector('code').innerText;
                navigator.clipboard.writeText(codeToCopy).then(() => {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i> Đã chép!';
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Không thể sao chép: ', err);
                    // Có thể thông báo lỗi cho người dùng
                });
            }
        });
    });

    // --- Basic Filtering and Sorting (Placeholder - cần logic phức tạp hơn) ---
    const searchInput = document.getElementById('embedCodeSearch');
    const categoryLinks = document.querySelectorAll('.category-list a');
    const sortSelect = document.getElementById('embedCodeSort');
    const codeCards = document.querySelectorAll('.embed-code-card');

    // Search (ví dụ đơn giản)
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            codeCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('.description').textContent.toLowerCase();
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Category filter (ví dụ đơn giản)
    if (categoryLinks.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // Xóa class active ở link cũ
                document.querySelector('.category-list a.active-category').classList.remove('active-category');
                // Thêm class active cho link hiện tại
                this.classList.add('active-category');

                const selectedCategory = this.dataset.category;
                codeCards.forEach(card => {
                    const cardTags = Array.from(card.querySelectorAll('.tags .tag')).map(tag => tag.textContent.toLowerCase().replace(/\s+/g, '-')); // Ví dụ: "UI Elements" -> "ui-elements"
                    if (selectedCategory === 'all' || cardTags.includes(selectedCategory) || card.querySelector('.tags .tag').textContent.toLowerCase().includes(selectedCategory)) { // Cần cải thiện logic matching tag
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    // Prism.highlightAll(); // Gọi ở cuối để highlight tất cả code trên trang khi load xong
});

// Gọi Prism.highlightAll() sau khi mọi thứ đã sẵn sàng và DOM được cập nhật
// Hoặc gọi trong các callback khi nội dung thay đổi (ví dụ: sau khi filter)
window.onload = () => {
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
};
