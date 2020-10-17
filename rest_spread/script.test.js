describe("#filterOutOdds", function() {
  it("not returning the odds number", function() {
    expect(filterOutOdds(1,2,3)).toEqual([2]);
  });
  it("works for negative numbers", function() {
    expect(filterOutOdds(1, -2, -3)).toEqual([-2]);
  });
});


describe("#findMin", function() {
  it("returning the smallest number", function() {
    expect(findMin(1,4,12,-3)).toEqual(-3);
  });
  it("returning the smallest number", function() {
    expect(findMin(1,-1)).toEqual(-1);
  });
  it("returning the smallest number", function() {
    expect(findMin(3,1)).toEqual(1);
  });
});

describe("#mergeObjects", function() {
  it("accepts two objects and returns a new object which contains all the keys and values of the first object and second object", function() {
    expect(mergeObjects({a:1, b:2}, {c:3, d:4})).toEqual({a:1, b:2, c:3, d:4});
  });
});


describe("#removeRandom", function() {
  it("remove a random element in the items array", function() {
    expect(removeRandom([1, -2, -3]).length).toEqual(2);
  });
});



describe("#extend", function() {
  it("Return a new array with every item in array1 and array2", function() {
    expect(extend([1, -2, -3] , [2 , 3])).toEqual([1, -2, -3 , 2 , 3]);
  });
});


describe("#addKeyVal", function() {
  it("Return a new object with all the keys and values from obj and a new key/value pair", function() {
    expect(addKeyVal({a:1, b:2} , "c" , 3)).toEqual({a:1, b:2 , c:3});
  });
});


describe("#removeKey", function() {
  it("Return a new object with a key removed.", function() {
    expect(removeKey({a:1, b:2 , c:3} , "c")).toEqual({a:1, b:2});
  });
});


describe("#combine", function() {
  it("Combine two objects and return a new object", function() {
    expect(combine({a:1, b:2} , {c:3 , d:4})).toEqual({a:1, b:2 , c:3 , d:4});
  });
});


describe("#update", function() {
  it("Return a new object with a modified key and value", function() {
    expect(update({a:1, b:2} , "b" , 3)).toEqual({a:1, b:3});
  });
});







