type Product = {
  title: string;
  price: number;
};

type Item = {
  product: Product;
  quantity: number;
};

const items: Item[] = [];

export default class Cart {
  getTotal() {
    return items.reduce(
      (acc, cur) => acc + cur.product.price * cur.quantity,
      0
    );
  }

  addProduct(product: Product, quantity: number) {
    items.push({ product, quantity });
  }
}
