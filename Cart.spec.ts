import Cart from "./Cart";

describe("Cart", () => {
  it("should return 0 when getTotal is called in a newly created cart", () => {
    const cart = new Cart();
    expect(cart.getTotal()).toBe(0);
  });
});
