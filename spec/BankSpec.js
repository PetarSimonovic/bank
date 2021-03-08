describe("deposit", function() {

  afterEach(function () {
    balance = 0
    account = []
  });


  it("should be able to accept a deposit", function() {
    deposit("10/01/2012", 1000.00);
    expect(account[0]).toEqual(["10/01/2012", "||", 1000.00,  1000.00 ]);
  });

  it("should have a balance", function () {
    deposit("10/01/2012", 1000.00);
    expect(balance).toEqual(1000.00)
  });

  it("should be able to update the balance correctly", function () {
     deposit("10/01/2012", 1000.00);
     deposit("13/01/2012", 2000.00);
     expect(balance).toEqual(3000.00)
   });

})
