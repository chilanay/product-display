// Event listener for when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // URL for fetching product data
    const apiUrl = 'https://dummyjson.com/products/?limit=100';

    // Fetching product data from the API
    fetch(apiUrl)
        .then(response => {
            // Checking if the network response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parsing the JSON response
            return response.json();
        })
        .then(productData => {
            // Logging the fetched product data to the console
            console.log('Product Data:', productData);
            // Displaying product cards by calling the displayProductCards function
            displayProductCards(productData).display = 'flex';
        })
        .catch(error => {
            // Handling errors by logging them to the console
            console.error('Error:', error);
        });
});

// Function to display product cards on the webpage
function displayProductCards(productData) {
    // Finding the container where product cards will be displayed
    const productCardsContainer = document.getElementById('cards');

    // Checking if the product cards container exists
    if (!productCardsContainer) {
        console.error('Product cards container not found');
        return;
    }

    // Iterating through each product in the product data
    productData.products.forEach(product => {
        // Creating a new card element
        const card = document.createElement('div');
        // Adding a 'card' class to the card element
        card.classList.add('card');
        // Setting a 'data-id' attribute with the product's ID
        card.setAttribute('data-id', product.id);

        // Setting the HTML content of the card using a template string
        card.innerHTML = `<div class="card" onclick="openProductDetailPage(${product.id})">
            <h1 class="title">${product.title}</h1>
            <img src="${product.thumbnail}" alt="img" class="images">
            <p class="price">Price: ${product.price} $</p>
            <p>Discount: ${product.discountPercentage}%</p>
            <p class="category">Category: ${product.category}</p>
            <p>Stock: ${product.stock}</p>
            <p>Stock: ${product.description}</p>
        </div>`;

        // Adding a click event listener to the card
        card.addEventListener('click', function () {
            // Retrieving the product ID from the 'data-id' attribute
            const productId = card.getAttribute('data-id');
            // Opening the product detail page with the selected product ID
            openProductDetailPage(productId);
        });

        // Appending the card to the product cards container
        productCardsContainer.appendChild(card);
    });
}

// Function to open the product detail page with a specific product ID
function openProductDetailPage(productId) {
    // Redirecting to the product detail page with the given product ID
    window.location.href = `product.html?id=${productId}`;
}
