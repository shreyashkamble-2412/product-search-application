const productsDiv = document.getElementById("products");
const status = document.getElementById("status");

async function getProducts() {
    try {
        const response =
            await fetch("https://dummyjson.com/products?limit=5");

        if (!response.ok) {
            throw new Error("API Error");
        }

        const data = await response.json();

        productsDiv.innerHTML = data.products.map(product => `
            <div class="card">
                <img src="${product.thumbnail}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Category: ${product.category}</p>
            </div>
        `).join("");

        status.textContent = "Products Loaded Successfully!";
    } catch (error) {
        status.textContent = "Error loading products!";
        console.log(error);
    }
}

getProducts();
