document.addEventListener('DOMContentLoaded', function() {
    // Navigation Toggle
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.querySelector("nav .pages ul");

    menuToggle.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });

    // Modal elements
    const modal = document.getElementById('newsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.close');
    
    // Load saved news from localStorage
    loadSavedNews();
    
    // News submission form handler
    const newsForm = document.getElementById('newsSubmissionForm');
    if (newsForm) {
        newsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('newsTitle').value;
            const content = document.getElementById('newsContent').value;
            const imageInput = document.getElementById('newsImage');
            
            // Create a new news item object
            const newsItem = {
                title: title,
                content: content,
                imageUrl: imageInput.files && imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : ''
            };
            
            // Add to news container
            addNewsCard(newsItem);
            
            // Save to localStorage
            saveNewsItem(newsItem);
            
            // Reset form
            newsForm.reset();
            
            // Show success message
            alert('News submitted successfully! It will now appear in the Recent News section.');
        });
    }
    
    // Close modal when clicking X
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
    
    // Handle news link clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('news-link')) {
            e.preventDefault();
            
            const title = e.target.getAttribute('data-title');
            const content = e.target.getAttribute('data-content');
            const imgElement = e.target.closest('.news-card').querySelector('img');
            
            modalTitle.textContent = title;
            modalContent.textContent = content.replace(/&quot;/g, '"');
            
            if (imgElement) {
                modalImage.src = imgElement.src;
                modalImage.style.display = 'block';
            } else {
                modalImage.style.display = 'none';
            }
            
            modal.style.display = 'block';
        }
    });
    
    // Search functionality
    const searchBar = document.getElementById('searchbar');
    if (searchBar) {
        searchBar.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const newsCards = document.querySelectorAll('.news-card');
            
            newsCards.forEach(card => {
                const title = card.querySelector('h2').textContent.toLowerCase();
                const content = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Function to add a news card to the container
    function addNewsCard(newsItem) {
        const newsContainer = document.getElementById('newsContainer');
        const newCard = document.createElement('div');
        newCard.className = 'news-card';
        
        let imageHTML = '';
        if (newsItem.imageUrl) {
            imageHTML = `<img src="${newsItem.imageUrl}" alt="${newsItem.title}">`;
        }
        
        newCard.innerHTML = `
            ${imageHTML}
            <div class="news-content">
                <h2><a href="#" class="news-link" data-title="${newsItem.title}" data-content="${newsItem.content.replace(/"/g, '&quot;')}">${newsItem.title}</a></h2>
                <p>${newsItem.content.substring(0, 100)}...</p>
            </div>
        `;
        
        // Add to the top of the container
        newsContainer.insertBefore(newCard, newsContainer.firstChild);
    }
    
    // Function to save news item to localStorage
    function saveNewsItem(newsItem) {
        let savedNews = JSON.parse(localStorage.getItem('bweranyangiNews')) || [];
        savedNews.unshift(newsItem); // Add new item to beginning
        localStorage.setItem('bweranyangiNews', JSON.stringify(savedNews));
    }
    
    // Function to load saved news from localStorage
    function loadSavedNews() {
        const savedNews = JSON.parse(localStorage.getItem('bweranyangiNews')) || [];
        savedNews.forEach(newsItem => {
            addNewsCard(newsItem);
        });
    }
});