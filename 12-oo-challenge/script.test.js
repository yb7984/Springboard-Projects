describe("#Vehicle", function() {
  it("#Vehicle.honk()", function() {
    let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);
    expect(myFirstVehicle.honk()).toEqual("Beep.");
  });
  it("#Vehicle.toString()", function() {
    let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);
    expect(myFirstVehicle.toString()).toEqual("The vehicle is a Honda Monster Truck from 1999.");
  });
});

describe("#Car", function() {
  it("#Car", function() {
    let myFirstCar = new Car("Toyota", "Corolla", 2005);
    expect(myFirstCar.toString()).toEqual("The vehicle is a Toyota Corolla from 2005.");
    expect(myFirstCar.honk()).toEqual("Beep.");
    expect(myFirstCar.numWheels).toEqual(4);
  });
});


describe("#Motorcycle", function() {
  it("#Motorcycle", function() {
    let myFirstMotorcycle = new Motorcycle("Honda", "Nighthawk", 2000);
    expect(myFirstMotorcycle.toString()).toEqual("The vehicle is a Honda Nighthawk from 2000.");
    expect(myFirstMotorcycle.honk()).toEqual("Beep.");
    expect(myFirstMotorcycle.revEngine()).toEqual("VROOM!!!");
    expect(myFirstMotorcycle.numWheels).toEqual(2);
  });
});


describe("#Garage", function() {
  it("#Garage", function() {
    //garage with capacity of 2
    let garage = new Garage(2);

    //garage is empty
    expect(garage.vehicles).toEqual([]);
    
    //add a Car
    expect(garage.add(new Car("Hyundai", "Elantra", 2015))).toEqual("Vehicle added!");
    expect(garage.vehicles.length).toEqual(1);

    //string is not a Vehicle
    expect(garage.add("Taco")).toEqual("Only vehicles are allowed in here!");

    //add a Motorcycle
    expect(garage.add(new Motorcycle("Honda", "Nighthawk", 2000))).toEqual("Vehicle added!");
    expect(garage.vehicles.length).toEqual(2);

    
    //add another Motorcycle whe garage is full
    expect(garage.add(new Motorcycle("Honda", "Nighthawk", 2001))).toEqual("Sorry, we’re full.");
  });
});