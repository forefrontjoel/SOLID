class RentalApartment {
  type = "Basic";
  bathroom(): string {
    return "This apartment has a bathroom.";
  }
  kitchen(): string {
    return "This apartment has a kitchen.";
  }
  bedroom(): string {
    return "This apartment has a bedroom.";
  }
}

class LuxuryRentalApartment extends RentalApartment {
  type = "Luxury";
  swimmingPool(): string {
    return "This apartment has a swimming pool.";
  }
  gym(): string {
    return "This apartment has a gym.";
  }
}

class BigRentalApartment extends RentalApartment {
  type = "Big";
  extraBedroom(): string {
    return "This apartment has an extra bedroom.";
  }
}

function findApartments(apartments: any, type: string) {} // <-- Implementera denna funktion. Ändra typen any

// Detta exempel är ämnat att visa att LSP gör det enkelt att hantera sub och basklasser

// Uppgift 1:
// Du hyr ut lägenheter.
// Dina användare söker efter lägenheter på din sida.

// Skapa en lista av lägenheter av olika typer. (Som en väldigt dum databas, se testerna för exempel)
// Skriv om funktioen findApartments som tar in en lista av alla apartments och returnerar alla lägenheter av den typ som du skickar in.

// Tips: Skapa en lista av alla lägenheter. Använd sedan filter för att returnera de lägenheter som matchar den valda typen.

/*
const example = ["katt", "hund", "fisk"]
const onlyKatt = example.filter(word => word === "katt")
*/

// Uppgift 2:
// Om den valda typen av lägenhet inte finns vill du marknadsföra dina andra typer av lägenheter.
// Ändra findApartments så att den returnerar alla lägenheter som inte är av den valda typen om den valda typen inte finns.
// (Detta är kanske inte en optimal sökfunktion i verkligheten men visar på smidigheten med att följa LSP)

export {
  RentalApartment,
  LuxuryRentalApartment,
  BigRentalApartment,
  findApartments,
};
