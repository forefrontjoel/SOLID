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

  processOrder(): void {
    if (this.items.length === 0) {
      throw new Error("Cannot process empty order");
    }
    if (this.total <= 0) {
      throw new Error("Invalid order total");
    }

    let discount = 0;
    if (this.total > 100) {
      discount = this.total * 0.1;
    }
    const finalTotal = this.total - discount;

    const message = `Order processed! Total: $${finalTotal}`;
    console.log(`Sending email to ${this.customerEmail}: ${message}`);
  }
}

// Uppgift!
// Dela upp ansvaren i olika klasser så att det bättre följer Single Responsibility Principle.
