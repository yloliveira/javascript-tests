import Money, { Dinero as MoneyType } from "dinero.js";

type Product = {
  id: string;
  title: string;
  price: number;
  discountCondition?: {
    minimum: number;
    percentage: number;
  };
};

type Item = {
  product: Product;
  quantity: number;
};

type Summary = {
  items: Item[];
  total: number;
};

export default class Cart {
  private items: Item[] = [];

  getTotal(): MoneyType {
    return this.items.reduce((acc, item) => {
      const amount = Money({ amount: item.product.price * item.quantity });
      let discount = Money({ amount: 0 });

      if (
        item.product.discountCondition &&
        item.product.discountCondition.percentage &&
        item.quantity >= item.product.discountCondition.minimum
      ) {
        discount = amount.percentage(item.product.discountCondition.percentage);
      }

      return acc.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }

  addProduct(product: Product, quantity: number): void {
    this.items.push({ product, quantity });
  }

  removeProduct(productId: string, quantity: number): void {
    const index = this.items.findIndex(item => {
      return item.product.id === productId;
    });

    if (quantity >= this.items[index].quantity) {
      this.items.splice(index, 1);
    } else {
      this.items[index].quantity -= quantity;
    }
  }

  getSummary(): Summary {
    return {
      items: this.items,
      total: this.getTotal().getAmount(),
    };
  }

  checkOut(): Summary {
    const { items, total } = this.getSummary();
    this.cleanCart();

    return { items, total };
  }

  private cleanCart() {
    this.items = [];
  }
}
