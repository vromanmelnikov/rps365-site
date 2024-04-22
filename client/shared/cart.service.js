class CartService {
  increaseCount() {
    const count = document.getElementById("cart_item_count");
    let countValue = parseInt(count.innerHTML) + 1;

    count.innerHTML = countValue;
  }

  decreaseCount() {
    const count = document.getElementById("cart_item_count");
    let countValue = parseInt(count.innerHTML) === 0 ? 0 : parseInt(count.innerHTML) - 1;

    count.innerHTML = countValue;
  }

  getCartCount() {
    let cart = JSON.parse(window.localStorage.getItem("cart"));
    let count = 0;
    if (cart) {
      count = cart.length;
    }
    return count;
  }

  addProductToCart(product, typeCost) {
    let cart = JSON.parse(window.localStorage.getItem("cart"));
    let cost = parseInt(window.localStorage.getItem("cost"));

    let newProduct = { ...product };

    if (!cart) {
      cart = [];
    }
    if (!cost) {
      cost = 0;
    }

    const existed = cart.filter(
      (item) => item.id === newProduct.id && item.type.id === newProduct.type.id
    )[0];
    if (existed) {
      newProduct.count = existed.count + 1;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === newProduct.id && cart[i].type.id === newProduct.type.id) {
          cart[i] = newProduct
        }
      }
    } else {
      newProduct.count = 1;
      cart.push(newProduct);

      this.increaseCount();
    }

    cost += parseInt(typeCost);

    window.localStorage.setItem("cart", JSON.stringify(cart));
    window.localStorage.setItem("cost", cost);
  }

  changeProductCount(index, count) {
    let cart = JSON.parse(window.localStorage.getItem("cart"));
    let cost = parseInt(window.localStorage.getItem("cost"));

    let item = cart[index];

    cost -= item.count * item.type.cost;

    item.count = count;

    cost += item.count * item.type.cost;

    window.localStorage.setItem("cart", JSON.stringify(cart));
    window.localStorage.setItem("cost", cost);

    return cost;
  }

  deleteItem(index) {
    let cart = JSON.parse(window.localStorage.getItem("cart"));
    let cost = parseInt(window.localStorage.getItem("cost"));

    let item = cart[index];

    cost -= item.count * item.type.cost;

    cart = cart.filter((item, itemIndex) => itemIndex !== index)

    window.localStorage.setItem("cart", JSON.stringify(cart));
    window.localStorage.setItem("cost", cost);

    this.decreaseCount()

    return cost;
  }

  getCartForMail() {
    let cart = JSON.parse(window.localStorage.getItem("cart"))
      .map(item => ({
        title: item.title,
        subtitle: item.subtitle,
        typeTitle: item.type.title,
        cost: item.type.cost,
        count: item.count
      }))
    let cost = parseInt(window.localStorage.getItem("cost"));

    return ({
      items: cart,
      cost
    })
  }

  clearCart() {
    window.localStorage.setItem("cart", JSON.stringify([]));
    window.localStorage.setItem("cost", JSON.stringify(0));
  }
}

export default CartService = new CartService();
