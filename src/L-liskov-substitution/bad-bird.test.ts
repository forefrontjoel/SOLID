import { Eagle, Ostrich, makeBirdFly } from "./bad-bird";

describe("Liskov Substitution Principle - Real Bug Example", () => {
  test("eagle can fly without issues", () => {
    const eagle = new Eagle();
    expect(makeBirdFly(eagle)).toBe("Soaring high like an eagle!");
  });

  test("all birds can lay eggs", () => {
    const eagle = new Eagle();
    const ostrich = new Ostrich();

    expect(eagle.layEggs()).toBe("Laying eagle eggs!");
    expect(ostrich.layEggs()).toBe("Laying ostrich eggs!");
  });
});
