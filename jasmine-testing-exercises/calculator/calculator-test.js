
it('should calculate the monthly rate correctly', function () {
  // 10000 for 5 years and 5%
  expect(calculateMonthlyPayment({amount : 10000 , years : 5 , rate : 5})).toEqual("188.71");
  //no loan
  expect(calculateMonthlyPayment({amount : 0 , years : 5 , rate : 5})).toEqual("0.00");
  //no interest rate
  expect(calculateMonthlyPayment({amount : 10000 , years : 5 , rate : 0})).toEqual("166.67");
});


it("should return a result with 2 decimal places", function() {
  // ..
  expect(calculateMonthlyPayment({amount:10000, years : 5 , rate : 5})).toMatch("^[0-9]+(\.[0-9]{2})?$");
  expect(calculateMonthlyPayment({amount : 10000 , years : 5 , rate : 5})).toMatch("^[0-9]+(\.[0-9]{2})?$");
  expect(calculateMonthlyPayment({amount : 0 , years : 5 , rate : 5})).toMatch("^[0-9]+(\.[0-9]{2})?$");
  expect(calculateMonthlyPayment({amount : 10000 , years : 5 , rate : 0})).toMatch("^[0-9]+(\.[0-9]{2})?$");
});

/// etc
