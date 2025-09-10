# Open/Closed Principle (OCP)

Kolla koden i bad-calculator och diskutera innan ni läser här.

Kör tester genom npm test -- src/O-open-closed/bad-calculator.test.ts

**Problemet**: Utvecklarna av systemet har valt att utröna vilken form som ska beräknas baserat på om det finns `base`, `height` eller `radius`. Om man nu lägger till en ny form så som triangel som också har `base` och `height` så kan detta skapa buggar.
Utvecklarna har helt enkelt tänkt att det aldrig ska finnas fler former och därmed inte byggt systemet med Open-Closed-tänk från början

_SPOILERS NEDANFÖR_

**En lösning**: Skapa ett interface `Shape` som beskriver att alla klasser som implementerar `Shape` så som `class Rectangle implements Shape` måste ha metoden `area()` på sig. På så sätt ansvarar varje form för sin egen area. Skapa klassen `AreaCalculator` med metoden `calculateArea` som tar in en `shape` och returnerar `shape.area()`.

På detta sätt får vi en lösning där vi fritt kan lägga till nya former utan att modifiera redan etablerad kod.

```typescript
interface Shape {
  area(): number;
}

class AreaCalculator {
  calculateArea(shape: Shape): number {
    return shape.area();
  }
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  area(): number {
    return this.width * this.height;
  }
}

class Circle implements Shape {
  constructor(private radius: number) {}

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Triangle implements Shape {
  constructor(private base: number, private height: number) {}

  area(): number {
    return (this.base * this.height) / 2;
  }
}

export { Shape, AreaCalculator, Rectangle, Circle, Triangle };
```

```typescript
import { AreaCalculator, Rectangle, Circle, Triangle } from "./good-calculator";

describe("Open-Closed Principle - Good Implementation", () => {
  let calculator: AreaCalculator;

  beforeEach(() => {
    calculator = new AreaCalculator();
  });

  describe("Basic shapes", () => {
    test("rectangle calculation works correctly", () => {
      const rectangle = new Rectangle(5, 10);
      expect(calculator.calculateArea(rectangle)).toBe(50);
    });

    test("circle calculation works correctly", () => {
      const circle = new Circle(3);
      expect(calculator.calculateArea(circle)).toBeCloseTo(28.27, 2);
    });

    test("triangle calculation works correctly", () => {
      const triangle = new Triangle(6, 8);
      expect(calculator.calculateArea(triangle)).toBe(24);
    });
  });
});
```
