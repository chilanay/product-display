document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://dummyjson.com/products/?limit=100';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(productData => {
            console.log('Product Data:', productData);
            displayProductCards(productData).display = 'flex';
        })

        .catch(error => {
            console.error('Error:', error);
        });
});

function displayProductCards(productData) {
    const productCardsContainer = document.getElementById('cards');

    if (!productCardsContainer) {
        console.error('Product cards container not found');
        return;
    }

    productData.products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', product.id);

        card.innerHTML = `<div class="card" onclick="openProductDetailPage(${product.id})">
        <h1 class="title">${product.title}</h1>
        <img src="${product.thumbnail}" alt="img" class="images">
        <p class="price">Price: ${product.price} $</p>
        <p>Discount: ${product.discountPercentage}%</p>
        <p class="category">Category: ${product.category}</p>
        <p>Stock: ${product.stock}</p>
        <p>Stock: ${product.description}</p>
    </div> `;

        card.addEventListener('click', function () {
            const productId = card.getAttribute('data-id');
            openProductDetailPage(productId);
        });

        productCardsContainer.appendChild(card);
    });
}

function openProductDetailPage(productId) {
    window.location.href = `product.html?id=${productId}`;
}