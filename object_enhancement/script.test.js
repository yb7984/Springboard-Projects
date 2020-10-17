describe("#createInstructor", function() {
  it("Return the instructor with firstName and lastName", function() {
    expect(createInstructor("Sam" , "John")).toEqual({firstName : "Sam" , lastName : "John"});
  });
});

describe("#createInstructor1", function() {
  it("Return the instructor", function() {
    expect(createInstructor1()).toEqual({
      firstName: "Colt" ,
      42 : "That is my favorite!"
    });
  });
});


describe("#createInstructor2", function() {
  it("Return the instructor with sayHi", function() {
    expect(createInstructor2().sayHi()).toEqual("Hi!");
  });
  it("Return the instructor with sayBye", function() {
    expect(createInstructor2().sayBye()).toEqual("Colt says bye!");
  });
});


describe("#createAnimal", function() {
  it("Return the instructor", function() {
    expect(createAnimal("dog", "bark", "Woooof!").bark()).toEqual("Woooof!");
  });
});
