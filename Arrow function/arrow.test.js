describe("#double", function() {
  it("doubles values in an array", function() {
    expect(double([1, 2, 3])).toEqual([2, 4, 6]);
  });
  it("works for negative numbers", function() {
    expect(double([1, -2, -3])).toEqual([2, -4, -6]);
  });
});


describe("#doubleShort", function() {
  it("doubles values in an array", function() {
    expect(doubleShort([1, 2, 3])).toEqual([2, 4, 6]);
  });
  it("works for negative numbers", function() {
    expect(doubleShort([1, -2, -3])).toEqual([2, -4, -6]);
  });
});


describe("#squareAndFindEvens", function() {
  it("find the even numbers after square", function() {
    expect(squareAndFindEvens([1, 2, 3])).toEqual([4]);
  });
  it("works for negative numbers", function() {
    expect(squareAndFindEvens([1, -2, -3])).toEqual([4]);
  });
});