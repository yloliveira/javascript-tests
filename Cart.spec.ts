import Cart from "./Cart";

const product1 = {
  title: "Product 1",
  price: 4990,
};

const product2 = {
  title: "Product 2",
  price: 9990,
};

describe("Cart", () => {
  it("should return 0 when getTotal is called in a newly created cart", () => {
    const cart = new Cart();
    expect(cart.getTotal()).toBe(0);
  });

  it("should add new products and return the correct cart total value", () => {
    const cart = new Cart();

    cart.addProduct(product1, 2);
    cart.addProduct(product2, 1);

    expect(cart.getTotal()).toBe(19970);
  });
});
