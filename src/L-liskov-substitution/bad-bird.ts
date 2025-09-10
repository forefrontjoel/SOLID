class Bird {
  fly(): string {
    return "I'm flying!";
  }

  layEggs(): string {
    return "Laying eggs!";
  }
}

class Eagle extends Bird {
  fly(): string {
    return "The bird is flying!";
  }

  layEggs(): string {
    return "Laying eagle eggs!";
  }
}

class Ostrich extends Bird {
  fly(): string {
    throw new Error("Ostriches cannot fly!");
  }

  layEggs(): string {
    return "Laying ostrich eggs!";
  }
}

function makeBirdFly(bird: Bird): string {
  return bird.fly();
}

// Uppgift!
// Ändra klasserna så att vi följer Liskov Substitution Principle.
// Skriv om makeBirdFly så att den bara accepterar fåglar som kan flyga.

export { Bird, Eagle, Ostrich, makeBirdFly };
