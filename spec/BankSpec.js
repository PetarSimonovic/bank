describe("Bank", function() {
  var bank;

  it("should be able to accept a deposit", function() {
    deposit("10/01/2012", 1000.00);
    expect(account[0]).toEqual(["10/01/2012", "||", 1000.00,  1000.00 ]);
  });

  it("should have a balance", function () {
    account = []
    deposit("10/01/2012", 1000.00);
    expect(balance).toEqual(1000.00)
  });

})
