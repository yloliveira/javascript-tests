import Cart from "./Cart";

const product1 = {
  id: "1",
  title: "Product 1",
  price: 4990,
};

const product2 = {
  id: "2",
  title: "Product 2",
  price: 9990,
};

let cart;

beforeEach(() => {
  cart = new Cart();
});

describe("Cart", () => {
  describe("getTotal()", () => {
    it("should return 0 when getTotal is called in a newly created cart", () => {
      expect(cart.getTotal()).toBe(0);
    });

    it("should add new products and return the correct cart total value", () => {
      cart.addProduct(product1, 2);
      cart.addProduct(product2, 1);

      expect(cart.getTotal()).toBe(19970);
    });

    it("should remove new products and return the correct cart total value", () => {
      cart.addProduct(product1, 2);
      cart.addProduct(product2, 1);

      cart.removeProduct(product1.id, 1);
      cart.removeProduct(product2.id, 1);

      expect(cart.getTotal()).toBe(4990);
    });
  });

  describe("checkOut()", () => {
    it("should return the correct cart summary", () => {
      cart.addProduct(product1, 2);
      cart.addProduct(product2, 1);

      expect(cart.checkOut()).toMatchInlineSnapshot(`
        {
          "items": [
            {
              "product": {
                "id": "1",
                "price": 4990,
                "title": "Product 1",
              },
              "quantity": 2,
            },
            {
              "product": {
                "id": "2",
                "price": 9990,
                "title": "Product 2",
              },
              "quantity": 1,
            },
          ],
          "total": 19970,
        }
      `);
    });

    it("should clean the cart when checkout", () => {
      cart.addProduct(product1, 2);
      cart.addProduct(product2, 1);

      cart.checkOut();

      expect(cart.getTotal()).toBe(0);
      expect(cart.getSummary()).toMatchInlineSnapshot(`
        {
          "items": [],
          "total": 0,
        }
      `);
    });
  });
});
