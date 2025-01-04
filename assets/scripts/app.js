class Product {
  // title;
  // imageUrl;
  // price;
  // description;

  constructor(title, image, price, desc) {
    this.title = title;
    this.imageUrl = image;
    this.price = price;
    this.description = desc;
  }
}
class ShopingCart {
  items = [];
  addProduct(product) {
    this.items.push(product);
    this.totalOutput = `<h2>Total \$${1}</h2>`;
  }

  render() {
    const cartEl = document.createElement("section");
    cartEl.innerHTML = `
    <h2>Total \$${0}</h2>
    <button>Order Now!</button>
    `;
    cartEl.className = "cart";
    this.totalOutput = cartEl.querySelector("h2");
    return cartEl;
  }
}
class ProductItem {
  // product;
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    console.log("adding to cart");
  }
  render(prod) {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
      <div>
      <img src = "${prod.imageUrl}" alt = "${prod.title}">
      <div class = "product-item__content">
      <h2>${prod.title}</h2>
      <h3>\$${prod.price}</h3>
      <p>${prod.description}</p>
      <button>Add to Cart</button>
      </div>
      </div>
      `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
    return prodEl;
  }
}
class ProductList {
  products = [
    new Product(
      "Pillow",
      "https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I",
      299,
      "A soft Pillow"
    ),
    new Product(
      "A Carpet",
      "https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I",
      499,
      "A Carpet which you might like or not."
    ),
  ];
  constructor() {}
  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render(prod);
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById("app");
    const cart = new ShopingCart();
    const cartEl = cart.render();
    const productList = new ProductList();
    const prodEl = productList.render();
    renderHook.append(prodEl);
    renderHook.append(cartEl);
  }
}

const shop = new Shop();
shop.render();
