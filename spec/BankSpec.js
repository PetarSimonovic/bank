describe("deposit", function() {

  afterEach(function () {
    balance = 0
    account = []
  });


  it("can accept a deposit", function() {
    deposit("10/01/2012", 1000.00);
    expect(account[0]).toEqual(["10/01/2012", "||", 1000.00,  1000.00 ]);
  });

  it("has a balance", function () {
    deposit("10/01/2012", 1000.00);
    expect(balance).toEqual(1000.00)
  });

  it("can increase the balance correctly", function () {
     deposit("10/01/2012", 1000.00);
     deposit("13/01/2012", 2000.00);
     expect(balance).toEqual(3000.00)
   });

   it("can process a withdrawal", function () {
      withdrawal("14/01/2012", 500.00);
      expect(balance).toEqual(-500.00)
    });


})
