interface Vehicle {
  startEngine(): void;
  accelerate(): void;
  fly(): void; // Not all vehicles can fly!
  sail(): void; // Not all vehicles can sail!
  honk(): void; // Some vehicles don't have horns
}

class Car implements Vehicle {
  startEngine(): void {
    console.log("Car engine started");
  }

  accelerate(): void {
    console.log("Car accelerating");
  }

  honk(): void {
    console.log("Car honking: Beep beep!");
  }

  // Forced to implement methods that don't make sense for a car
  fly(): void {
    throw new Error("Cars cannot fly!");
  }

  sail(): void {
    throw new Error("Cars cannot sail!");
  }
}

class Airplane implements Vehicle {
  startEngine(): void {
    console.log("Airplane engines started");
  }

  accelerate(): void {
    console.log("Airplane accelerating for takeoff");
  }

  fly(): void {
    console.log("Airplane flying");
  }

  // Forced to implement methods that don't make sense for an airplane
  sail(): void {
    throw new Error("Airplanes cannot sail!");
  }

  honk(): void {
    throw new Error("Airplanes don't honk!");
  }
}

class Bicycle implements Vehicle {
  accelerate(): void {
    console.log("Bicycle pedaling faster");
  }

  honk(): void {
    console.log("Bicycle bell: Ring ring!");
  }

  // Forced to implement methods that don't make sense for a bicycle
  startEngine(): void {
    throw new Error("Bicycles don't have engines!");
  }

  fly(): void {
    throw new Error("Bicycles cannot fly!");
  }

  sail(): void {
    throw new Error("Bicycles cannot sail!");
  }
}

// Uppgift!
// Problemet här är att alla fordon tvingas implementera metoder de inte behöver
// Skapa flera mindre, specifika interfaces istället för ett stort "Vehicle" interface

export { Vehicle, Car, Airplane, Bicycle };
