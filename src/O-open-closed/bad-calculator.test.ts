import { AreaCalculator, Rectangle, Circle } from "./bad-calculator";

describe("Open-Closed Principle - Real Bug Example", () => {
  const calculator = new AreaCalculator();

  test("rectangle calculation works correctly", () => {
    const triangle = new Rectangle(2, 6);
    expect(calculator.calculateArea(triangle)).toBe(12);
  });

  test("circle calculation works correctly", () => {
    const circle = new Circle(3);
    expect(calculator.calculateArea(circle)).toBeCloseTo(28.27, 2);
  });

  test("triangle calculation works correctly", () => {
    //const triangle = new Triangle(2, 4);
    //expect(calculator.calculateArea(triangle)).toBe(4);
  });
});
