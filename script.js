const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const products = document.getElementById("products");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const search = input.value.trim();

    if (!search) {
        status.textContent = "Please enter a product name!";
        products.innerHTML = "";
        return;
    }

    status.textContent = "Loading...";
    products.innerHTML = "";

    try {

        const response = await fetch(
            `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}`
        );

        if (!response.ok) {
            throw new Error("API Error");
        }

        const data = await response.json();

        const result = data.products.filter(
            product => product.stock > 0
        );

        if (result.length === 0) {
            status.textContent = "No products found!";
            return;
        }

        products.innerHTML = result.map(product => `
            <div class="card">

                <img
                    src="${product.thumbnail}"
                    alt="${product.title}"
                >

                <h3>${product.title}</h3>

                <p>Category: ${product.category}</p>

                <p>Price: $${product.price}</p>

                <p>⭐ ${product.rating}</p>

            </div>
        `).join("");

        status.textContent = `${result.length} product(s) found.`;

    } catch (error) {

        status.textContent = "Something went wrong!";
        console.log(error);

    }
});
