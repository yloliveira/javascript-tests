type Product = {
  title: string;
  price: number;
};

type Item = {
  product: Product;
  quantity: number;
};

export default class Cart {
  items: Item[] = [];

  getTotal() {
    return this.items.reduce(
      (acc, cur) => acc + cur.product.price * cur.quantity,
      0
    );
  }

  addProduct(product: Product, quantity: number) {
    this.items.push({ product, quantity });
  }
}
