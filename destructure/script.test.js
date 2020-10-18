describe("#raceResults", function() {
  it("Return the object", function() {
    expect(raceResults(['Tom', 'Margaret', 'Allison', 'David', 'Pierre'])).toEqual({
      first: "Tom", 
      second: "Margaret", 
      third: "Allison", 
      rest: ["David", "Pierre"]
    });
  });
});


