
  afterEach(function () {
    balance = 0
    account = []
    ledger = []
  });

describe("deposit", function() {


  it("can accept a deposit", function() {
    deposit("10/01/2012", 1000.00);
    expect(account[0]).toEqual(["10/01/2012", "1000.00", "",  "1000.00" ]);
  });

  it("has a balance", function () {
    deposit("10/01/2012", 1000.00);
    expect(balance).toEqual("1000.00")
  });

  it("can increase the balance correctly", function () {
     deposit("10/01/2012", 1000.00);
     deposit("13/01/2012", 2000.00);
     expect(balance).toEqual("3000.00")
   });

  it("can add decimals correctly and return the balance in the correct format", function () {
    deposit("10/01/2012", 1000.32);
    deposit("10/01/2012", 985.64);
    expect(balance).toEqual("1985.96");
  })

 })

describe("withdrawal", function() {


  it("can apply a withdrawal to the balance", function () {
    withdrawal("14/01/2012", 500.00);
    expect(balance).toEqual("-500.00")
  });

  it("can add a withdrawal to the statement", function () {
    withdrawal("14/01/2012", 500.00);
    expect(balance).toEqual("-500.00");
    expect(account[0]).toEqual(["14/01/2012", "", "500.00",  "-500.00" ]);
  });

  it("can subtract decimals correctly and return the balance in the correct format", function () {
    deposit("10/01/2012", 1567.23);
    withdrawal("10/01/2012", 625.12);
    withdrawal("10/01/2012", 87.23);
    expect(balance).toEqual("854.88");
  })

})

describe ("statement", function() {

  it("records multiple transactions", function (){
    deposit("10/01/2012", 1000.00);
    deposit("13/01/2012", 2000.00);
    withdrawal("14/01/2012", 500.00);
    expect(account[2]).toEqual(["10/01/2012", "1000.00", "",  "1000.00"]);
    expect(account[1]).toEqual(["13/01/2012", "2000.00", "",  "3000.00"]);
    expect(account[0]).toEqual(["14/01/2012", "", "500.00",  "2500.00"]);
  });

  it("generates a statement entry in the correct deposit format", function() {
    deposit("10/01/2012", 1000.00);
    printStatement();
    expect(statement).toEqual("date || credit || debit || balance\n10/01/2012 || 1000.00 || || 1000.00")
  });

  it("generates a statement entry in the correct withdrawal format", function() {
    withdrawal("14/01/2012", 500.00);
    printStatement();
    expect(statement).toEqual("date || credit || debit || balance\n14/01/2012 || || 500.00 || -500.00")
  });

  it("generates a complete statement in the correct format", function() {
    deposit("10/01/2012", 1000.00);
    deposit("13/01/2012", 2000.00);
    withdrawal("14/01/2012", 500.00);
    printStatement();
    expect(statement).toEqual("date || credit || debit || balance\n14/01/2012 || || 500.00 || 2500.00\n13/01/2012 || 2000.00 || || 3000.00\n10/01/2012 || 1000.00 || || 1000.00")
  })

})
