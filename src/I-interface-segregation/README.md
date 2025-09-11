# Interface Segregation Principle (ISP)

Kolla koden i bad-car och diskutera innan ni läser här.

**Problemet**: Utvecklarna har skapat ett stort "Vehicle" interface som tvingar alla fordon att implementera metoder de inte behöver. En bil tvingas implementera `fly()` och `sail()` metoder som bara kastar fel. Detta bryter mot Interface Segregation Principle eftersom klienter (fordon) tvingas vara beroende av metoder de inte använder.

_SPOILERS NEDANFÖR_

**En lösning**: Istället för ett stort interface, skapa flera små och specifika interfaces som varje klass kan välja att implementera baserat på sina faktiska kapaciteter.

```typescript
// Grundläggande rörelse som alla fordon delar
interface Movable {
  accelerate(): void;
  brake(): void;
}

// För fordon med motorer
interface EngineOperated {
  startEngine(): void;
  stopEngine(): void;
}

// För flygande fordon
interface Flyable {
  fly(): void;
  land(): void;
}

// För vattenfordon
interface Sailable {
  sail(): void;
  anchor(): void;
}

// Nu implementerar varje fordon bara de interfaces de faktiskt behöver
class Car implements Movable, EngineOperated {
  // Implementerar bara metoder som är relevanta för bilar
}

class Bicycle implements Movable {
  // Implementerar bara metoder som är relevanta för cyklar
  // Ingen motor, ingen flygning
}

class Airplane implements Movable, EngineOperated, Flyable {
  // Implementerar bara metoder som är relevanta för flygplan
  // Ingen segling
}
```
