// Define the API endpoint to fetch product data
const apiUrl = 'https://dummyjson.com/products/?limit=100';

// Execute code when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    const cardsContainer = document.getElementById('cards');
    const itemsPerPage = 10; // Number of products to display per page
    let currentPage = 1; // Current page number

    // Fetch product data from the API
    fetch(apiUrl)
        .then(response => {
            // Check if the network response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON
        })
        .then(userData => {
            console.log('User Data:', userData);
            const products = userData.products; // Extract product data from the response

            // Extract unique categories from the products and populate the category dropdown
            const categories = [...new Set(products.map(product => product.category))];
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.toLowerCase();
                option.textContent = category;
                categorySelect.appendChild(option);
            });

            // Function to render product cards based on the provided array of products
            function renderProducts(productsToRender) {
                const data = productsToRender.map(values => `
                    <div class="card" onclick="openProductDetailPage(${values.id})">
                        <h1 class="title">${values.title}</h1>
                        <img src="${values.thumbnail}" alt="img" class="images">
                        <p class="price">Price: ${values.price} $</p>
                        <p>Discount: ${values.discountPercentage}%</p>
                        <p class="category">Category: ${values.category}</p>
                        <p>Stock: ${values.stock}</p>
                    </div>`
                ).join('');

                cardsContainer.innerHTML = data; // Set the HTML content of the cards container
            }

            // Function to paginate the products and return the products for the current page
            function paginate(productsToPaginate) {
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                return productsToPaginate.slice(startIndex, endIndex);
            }

            // Function to update pagination buttons based on the total number of pages
            function updatePaginationButtons(totalPages) {
                const paginationContainer = document.getElementById('pagination');
                paginationContainer.innerHTML = ''; // Clear previous pagination buttons

                for (let i = 1; i <= totalPages; i++) {
                    const button = document.createElement('button');
                    button.textContent = i;
                    button.addEventListener('click', () => {
                        currentPage = i; // Update the current page on button click
                        const paginatedProducts = paginate(products);
                        renderProducts(paginatedProducts);
                        updatePaginationButtons(totalPages);
                    });
                    paginationContainer.appendChild(button);
                }
            }

            // Initial rendering of products and pagination buttons
            const paginatedProducts = paginate(products);
            renderProducts(paginatedProducts);
            const totalPages = Math.ceil(products.length / itemsPerPage);
            updatePaginationButtons(totalPages);

            // Event listener for the search input to filter products
            searchInput.addEventListener('input', function (event) {
                currentPage = 1; // Reset to the first page when searching
                const searchTerm = event.target.value.toLowerCase();
                const filteredProducts = filterProducts(products, searchTerm, categorySelect.value);
                const paginatedProducts = paginate(filteredProducts);
                renderProducts(paginatedProducts);
                const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
                updatePaginationButtons(totalPages);
            });

            // Event listener for the category dropdown to filter products
            categorySelect.addEventListener('change', function () {
                currentPage = 1; // Reset to the first page when changing the category
                const searchTerm = searchInput.value.toLowerCase();
                const filteredProducts = filterProducts(products, searchTerm, categorySelect.value);
                const paginatedProducts = paginate(filteredProducts);
                renderProducts(paginatedProducts);
                const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
                updatePaginationButtons(totalPages);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Function to open the product detail page for a given productId
function openProductDetailPage(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Function to filter products based on search term and selected category
function filterProducts(products, searchTerm, selectedCategory) {
    return products.filter(product =>
        (selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory) &&
        (product.title.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm))
    );
}
