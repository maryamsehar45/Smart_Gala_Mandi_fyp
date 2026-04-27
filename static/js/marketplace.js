// CATEGORY FILTER
function filterCategory(category) {
  document.querySelectorAll('.product-card').forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display ="flex";
    } else {
      card.style.display = "none";
    }
  });
}
// SEARCH FILTER
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.toLowerCase();
  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.querySelector('h5').textContent.toLowerCase();
    if(name.includes(searchValue) || searchValue === ''){
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});

// CITY FILTER
const cityFilter = document.getElementById('cityFilter');
cityFilter.addEventListener('change', () => {
  const cityValue = cityFilter.value.toLowerCase();
  document.querySelectorAll('.product-card').forEach(card => {
    const city = card.querySelector('.city').textContent.toLowerCase();
    if(city.includes(cityValue) || cityValue === 'all'){
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.whatsapp-btn').forEach(btn => {
    const productName = btn.closest('.product-info').querySelector('h5').textContent;
    const currentHref = btn.getAttribute('href');
    const newHref = currentHref.replace('product', productName);
    btn.setAttribute('href', newHref);
  });
});
  // Simple auto-scroll function
function scrollToProducts() {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Update category click events
document.querySelectorAll('.category-box').forEach(box => {
    box.addEventListener('click', function() {
        // First get the category
        const onclickAttr = this.getAttribute('onclick');
        const match = onclickAttr.match(/filterCategory\('([^']+)'\)/);
        if (match) {
            const category = match[1];
            // Call filter function
            filterCategory(category);
            // Scroll to products after short delay
            setTimeout(scrollToProducts, 300);
        }
    });
});

// Update All Products button
document.querySelector('.all-products-btn').addEventListener('click', function() {
    filterCategory('all');
    setTimeout(scrollToProducts, 300);
});

// Update search functionality
document.getElementById('searchInput').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        // Your search logic here
        setTimeout(scrollToProducts, 300);
    }
});

// Update city filter
document.getElementById('cityFilter').addEventListener('change', function() {
    // Your city filter logic here
    setTimeout(scrollToProducts, 300);
});