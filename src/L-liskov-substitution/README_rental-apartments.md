# Liskov Substitution Principle (LSP) - Rental Apartments

Kolla koden i rental-apartments och diskutera innan ni läser här.

**Principen**: Objekt av en superklass ska kunna ersättas med objekt av en subklass utan att förändra programmets korrekthet. Med andra ord, subklasser ska vara utbytbara med sin superklass.

**Exemplet**: I vårt rental-apartments exempel har vi en grundklass `RentalApartment` och två subklasser `LuxuryRentalApartment` och `BigRentalApartment`. Båda subklasserna ärver från `RentalApartment` och kan användas överallt där `RentalApartment` förväntas.

**Varför fungerar detta?**:

- Alla subklasser kan användas i `findApartments` funktionen utan problem
- De ärver alla grundläggande metoder (`bathroom()`, `kitchen()`, `bedroom()`)
- De utökar funktionaliteten utan att bryta den grundläggande kontraktet
- `type` propertyn används för att identifiera olika typer av lägenheter

**Exempel på implementation av findApartments**:

```typescript
function findApartments(apartments: RentalApartment[], type: string) {
  const filteredApartments = apartments.filter(
    (apartment) => apartment.type === type
  );
  if (filteredApartments.length > 0) {
    return filteredApartments;
  } else {
    return apartments;
  }
}
```
