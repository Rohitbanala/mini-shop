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
class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}
class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }
  render() {}
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
  }
}

class ProductItem extends Component {
  // product;
  constructor(product, renderHook) {
    super(renderHook, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }
  render() {
    const prodEl = this.createElement("li", "product-item");

    prodEl.innerHTML = `
      <div>
      <img src = "${this.product.imageUrl}" alt = "${this.product.title}">
      <div class = "product-item__content">
      <h2>${this.product.title}</h2>
      <h3>\$${this.product.price}</h3>
      <p>${this.product.description}</p>
      <button>Add to Cart</button>
      </div>
      </div>
      `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
  }
}
class ProductList extends Component {
  products = [];
  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }
  fetchProducts() {
    this.products = [
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
    this.renderProducts();
  }
  renderProducts() {
    for (const prod of this.products) {
      new ProductItem(prod, "prod-list");
    }
  }
  render() {
    this.createElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    if (this.products && this.products.length > 0) {
      this.renderProducts();
    }
  }
}

class Shop {
  constructor() {
    this.render();
  }
  render() {
    this.cart = new ShopingCart("app");
    new ProductList("app");
  }
}
class App {
  static init() {
    const shop = new Shop();

    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}
App.init();
