import {
  RentalApartment,
  LuxuryRentalApartment,
  BigRentalApartment,
  findApartments,
} from "./rental-apartments";

describe("Rental Apartments", () => {
  test("findApartments should return all luxury available apartments", () => {
    const apartment1 = new RentalApartment();
    const apartment2 = new LuxuryRentalApartment();
    const apartment3 = new BigRentalApartment();
    const apartments = [apartment1, apartment2, apartment3];

    const availableApartments = findApartments(apartments, "Luxury");
    expect(availableApartments).toHaveLength(1);
  });

  test("findApartments should return all big available apartments", () => {
    const apartment1 = new BigRentalApartment();
    const apartment2 = new BigRentalApartment();
    const apartment3 = new BigRentalApartment();
    const apartments = [apartment1, apartment2, apartment3];

    const availableApartments = findApartments(apartments, "Big");
    expect(availableApartments).toHaveLength(3);
  });

  test("findApartments should return all apartments if the selected type does not exist", () => {
    const apartment1 = new BigRentalApartment();
    const apartment2 = new BigRentalApartment();
    const apartment3 = new BigRentalApartment();
    const apartment4 = new RentalApartment();
    const apartments = [apartment1, apartment2, apartment3, apartment4];

    const availableApartments = findApartments(apartments, "Luxury");
    expect(availableApartments).toHaveLength(4);
  });
});
