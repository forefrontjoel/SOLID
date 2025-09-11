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

/*
Utvecklarna av systemet har valt att utröna vilken form som ska beräknas baserat på om det finns `base`, `height` eller `radius`. 
Om man nu lägger till en ny form så som triangel som också har `base` och `height` så kan detta skapa buggar.
Utvecklarna har helt enkelt tänkt att det aldrig ska finnas fler former och därmed inte byggt systemet med Open-Closed-tänk från början
*/

// Uppgift 1:
// Lägg till en klass: Triangle med properties base och height
// Lägg till i calculateArea så att dess area räknas ut. Se hur detta kan bli problematiskt.
// Skapa gärna ett test som verifierar att det fungerar eller som påvisar problemet.

// Uppgift 2:
// Fixa koden så att den följer Open-Closed Principle

export { AreaCalculator, Rectangle, Circle };
