document.addEventListener("DOMContentLoaded", function () {
    // Mobile Navigation Toggle
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    // Gallery Filtering
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const filterValue = this.getAttribute("data-filter");

            galleryItems.forEach(item => {
                if (filterValue === "all" || item.classList.contains(filterValue)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });

    // Lightbox (Photo Modal)
    const modal = document.getElementById("photoModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const closeModal = document.querySelector(".close-modal");

    galleryItems.forEach(item => {
        item.addEventListener("click", function () {
            const img = this.querySelector("img");
            const title = this.querySelector("h3").textContent;
            const desc = this.querySelector("p").textContent;

            modalImage.src = img.src;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            modal.style.display = "block";
        });
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the image
    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Load More Functionality
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    let visibleItems = 8;

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", function () {
            const hiddenItems = Array.from(galleryItems).slice(visibleItems, visibleItems + 4);
            hiddenItems.forEach(item => (item.style.display = "block"));
            visibleItems += 4;

            if (visibleItems >= galleryItems.length) {
                loadMoreBtn.style.display = "none";
            }
        });
    }
});