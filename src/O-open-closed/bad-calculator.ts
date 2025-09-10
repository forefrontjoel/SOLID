class AreaCalculator {
  calculateArea(shape: any): number {
    if (shape.base && shape.height) {
      return shape.base * shape.height;
    } else if (shape.radius) {
      return Math.PI * shape.radius * shape.radius;
    }

    throw new Error("Unknown shape");
  }
}

class Rectangle {
  constructor(public base: number, public height: number) {}
}

class Circle {
  constructor(public radius: number) {}
}

const calculator = new AreaCalculator();

const rectangle = new Rectangle(5, 10);
console.log("Rectangle Area:", calculator.calculateArea(rectangle));

const circle = new Circle(3);
console.log("Circle Area:", calculator.calculateArea(circle));

// Uppgift:
// Lägg till en klass: Triangle
// Lägg till i calculateArea så att dess area räknas ut
// Skapa ett test som verifierar att det fungerar

export { AreaCalculator, Rectangle, Circle };
