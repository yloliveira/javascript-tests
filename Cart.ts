type Product = {
  id: string;
  title: string;
  price: number;
};

type Item = {
  product: Product;
  quantity: number;
};

export default class Cart {
  private items: Item[] = [];

  getTotal() {
    return this.items.reduce(
      (acc, cur) => acc + cur.product.price * cur.quantity,
      0
    );
  }

  addProduct(product: Product, quantity: number) {
    this.items.push({ product, quantity });
  }

  removeProduct(productId: string, quantity: number) {
    const index = this.items.findIndex(item => {
      return item.product.id === productId;
    });

    if (quantity >= this.items[index].quantity) {
      this.items.splice(index, 1);
    } else {
      this.items[index].quantity -= quantity;
    }
  }
}
