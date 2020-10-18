describe("#hasDuplicate", function() {
  it("Return if the array has duplicate values", function() {
    
    expect(hasDuplicate([1,3,2,1])).toEqual(true);
    expect(hasDuplicate([1,5,-1,4])).toEqual(false);
  });
});



describe("#vowelCount", function() {
  it("Return the vowel count", function() {
    const m   = vowelCount('awesome');
    
    expect(m.get("a")).toEqual(1);
    expect(m.get("e")).toEqual(2);
    expect(m.get("o")).toEqual(1);
  });
});


