# Single Responsibility Principle (SRP)

Kolla koden i bad-order och diskutera innan ni läser här.

**Problemet**: `Order`-klassen har flera ansvarsområden - den hanterar både orderdata och processar beställningar (validering, rabattberäkning och e-post). Om man vill ändra rabattregler eller e-postformat måste man modifiera Order-klassen, vilket kan skapa buggar i orderhanteringen. Dessutom behöver en Order skapas upp bara för att testa mailfunktionaliteten eller rabattuträkningen.

Detta bryter mot Single Responsibility Principle som säger att varje modul endast ska ha en anledning att ändras.

_SPOILERS NEDANFÖR_

**En lösning**: Skapa separata klasser för varje ansvar. `OrderValidator` för validering, `DiscountCalculator` för rabattberäkningar, `EmailService` för e-post. Order-klassen ska bara hantera orderdata. Koordinera alla klasser i en separat funktion vars ansvar är att hantera flödet som följer när en Order skapas.

På detta sätt får vi en lösning där varje klass har ETT ansvar och kan ändras oberoende av de andra.

```typescript
interface Item {
  name: string;
  price: number;
}

class Order {
  private readonly items: Item[];
  private readonly customerEmail: string;
  private readonly total: number;

  constructor(customerEmail: string, items: Item[]) {
    this.customerEmail = customerEmail;
    this.items = items;
    this.total = items.reduce((sum, item) => sum + item.price, 0);
  }

  getTotal(): number {
    return this.total;
  }

  getItems(): Item[] {
    return this.items;
  }

  getCustomerEmail(): string {
    return this.customerEmail;
  }
}

class OrderValidator {
  constructor(private order: Order) {}

  validate(): void {
    if (this.order.getItems().length === 0) {
      throw new Error("Cannot process empty order");
    }
    if (this.order.getTotal() <= 0) {
      throw new Error("Invalid order total");
    }
  }
}

class DiscountCalculator {
  calculateDiscount(total: number): number {
    if (total > 100) {
      return total * 0.1;
    }
    return 0;
  }
}

class EmailService {
  sendOrderConfirmation(customerEmail: string, total: number): void {
    const message = `Order processed! Total: $${total}`;
    console.log(`Sending email to ${customerEmail}: ${message}`);
  }
}

// Användning - koordinerar alla klasser
const order = new Order("customer@example.com", [
  { name: "Laptop", price: 1000 },
  { name: "Mouse", price: 25 },
]);

const validator = new OrderValidator(order);
const discountCalculator = new DiscountCalculator();
const emailService = new EmailService();

validator.validate();
const discount = discountCalculator.calculateDiscount(order.getTotal());
const finalTotal = order.getTotal() - discount;
emailService.sendOrderConfirmation(order.getCustomerEmail(), finalTotal);
```
