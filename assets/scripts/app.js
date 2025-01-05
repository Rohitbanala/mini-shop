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
class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }
  createElement(tag, cssClassName, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClassName) {
      rootElement.className = cssClassName;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}
class ShopingCart extends Component {
  items = [];
  set cartItem(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total \$${this.totalSum}</h2>`;
  }
  get totalSum() {
    return this.items.reduce((prevValue, currItem) => {
      return prevValue + currItem.price;
    }, 0);
  }
  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItem = updatedItems;
  }
  constructor(renderHook) {
    super(renderHook);
  }
  render() {
    const cartEl = this.createElement("section", "cart");
    cartEl.innerHTML = `
    <h2>Total \$${0}</h2>
    <button>Order Now!</button>
    `;
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
    App.addProductToCart(this.product);
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
    this.cart = new ShopingCart("app");
    this.cart.render();
    const productList = new ProductList();
    const prodEl = productList.render();
    renderHook.append(prodEl);
  }
}
class App {
  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}
App.init();
