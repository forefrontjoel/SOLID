# Liskov Substitution Principle (LSP) - Bad Example

Kolla koden i bad-bird och diskutera innan ni läser här.

Kör tester genom npm test -- src/L-liskov-substitution/bad-bird.test.ts

**Problemet**: Utvecklarna har skapat en `Bird` klass som alla fåglar ärver från. Problemet är att inte alla fåglar kan flyga (t.ex. strutsar), men `Bird` klassen förutsätter att alla fåglar kan flyga genom `fly()` metoden. När vi försöker använda `Ostrich` där en `Bird` förväntas i `makeBirdFly` funktionen, så kastas ett exception och systemet kraschar.

Detta bryter mot Liskov Substitution Principle som säger att objekt av en superklass ska kunna ersättas med objekt av en subklass utan att ändra programmets korrekthet.

**Varför bryter detta LSP?**:

- `Ostrich` kan inte ersätta `Bird` utan att ändra programmets beteende
- `makeBirdFly` fungerar med `Bird` och `Eagle` men kraschar med `Ostrich`
- Subklassen (`Ostrich`) stärker prekonditioner genom att kasta exception

_SPOILERS NEDANFÖR_

**En lösning**: Omstrukturera hierarkin så att vi separerar förmågor. Skapa en abstrakt `Bird` klass med gemensamma egenskaper, och sedan separata interfaces för olika förmågor som `Flyable`. På så sätt kan varje fågel implementera endast de förmågor den faktiskt har.

```typescript
abstract class Bird {
  abstract layEggs(): string;
}

interface Flyable {
  fly(): string;
}

class Eagle extends Bird implements Flyable {
  fly(): string {
    return "The bird is flying!";
  }

  layEggs(): string {
    return "Laying eagle eggs!";
  }
}

class Ostrich extends Bird {
  layEggs(): string {
    return "Laying ostrich eggs!";
  }

  run(): string {
    return "Running very fast!";
  }
}

// Nu kan vi skapa funktioner som endast jobbar med de förmågor som garanterat finns
function makeBirdLayEggs(bird: Bird): string {
  return bird.layEggs(); // Alla fåglar kan lägga ägg
}

function makeFlyableFly(flyable: Flyable): string {
  return flyable.fly(); // Endast saker som kan flyga
}

export { Bird, Flyable, Eagle, Ostrich, makeBirdLayEggs, makeFlyableFly };
```
