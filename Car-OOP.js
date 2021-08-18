class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  honk() {
    console.log("Beep.");
  }

  toString() {
    console.log(`The car is a ${this.make} ${this.model} from ${this.year}`);
  }
}

class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 4;
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 2;
  }

  revEngine() {
    console.log("VROOM!!!");
  }
}

class Garage {
    constructor(capacity) {
        this.capacity = capacity
        this.vehicles = []
    }

    add(vehicle) {
        if(vehicle instanceof Vehicle) {
            if(this.vehicles.length < this.capacity) {
                this.vehicles.push(vehicle.constructor.name)
                console.log("Vehicle added!")
            } else {
                console.log("Garage is full!")
            }
        } else {
            console.log('Only vehicles go in the garage!')
        }
    }
}

const myGarage = new Garage(2)
myGarage.add(new Car ('Toyota', 'Tacoma', 2005))
myGarage.add(new Car ('Toyota', 'Supra', 1999))
myGarage.add(new Car ('Kia', 'Soul', 2017)) //thank god the garage is full
console.log(myGarage.vehicles)