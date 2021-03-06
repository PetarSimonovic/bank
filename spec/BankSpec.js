describe ("Bank", function () {

  var bank;

  beforeEach(function () {
    bank = new Bank();
  })

  afterEach(function () {
    balance = 0
    account = []
    ledger = []
  });

  describe("deposit", function() {

    it("can accept a deposit", function() {
      bank.deposit("10/01/2012", 1000.00);
      expect(bank.account[0]).toEqual('10/01/2012 || 1000.00 || || 1000.00');
    });

    it("has a balance that accounts for trailing zeroes", function () {
      bank.deposit("10/01/2012", 1000.00);
      expect(bank.balance).toEqual("1000.00")
    });

    it("has a balance that accounts for trailing zeroes", function () {
      bank.deposit("10/01/2012", 100);
      expect(bank.balance).toEqual("100.00")
    });


    it("can increase the balance correctly", function () {
       bank.deposit("10/01/2012", 1000.00);
       bank.deposit("13/01/2012", 2000.00);
       expect(bank.balance).toEqual("3000.00")
     });

    it("can add decimals correctly and return the balance in the correct format", function () {
      bank.deposit("10/01/2012", 1000.32);
      bank.deposit("10/01/2012", 985.64);
      expect(bank.balance).toEqual("1985.96");
    });

    it("can add and subtract decimals correctly and return the balance in the correct format", function () {
      bank.deposit("10/01/2012", 854.88);
      bank.deposit("10/01/2012", 95.23);
      bank.withdrawal("10/01/2012", 105.26);
      bank.deposit("10/01/2012", 145.12);
      bank.withdrawal("10/01/2012", 5.00);
      expect(bank.balance).toEqual("984.97");
    });

  })

describe("withdrawal", function() {


  it("can apply a withdrawal to the balance", function () {
    bank.withdrawal("14/01/2012", 500.00);
    expect(bank.balance).toEqual("-500.00")
  });

  it("can add a withdrawal to the statement", function () {
    bank.withdrawal("14/01/2012", 500.00);
    expect(bank.balance).toEqual("-500.00");
    expect(bank.account[0]).toEqual("14/01/2012 || || 500.00 || -500.00");
  });

  it("can subtract decimals correctly and return the balance in the correct format", function () {
    bank.deposit("10/01/2012", 1567.23);
    bank.withdrawal("10/01/2012", 625.12);
    bank.withdrawal("10/01/2012", 87.23);
    expect(bank.balance).toEqual("854.88");
  })

})

describe ("statement", function() {

  it("records multiple transactions", function (){
    bank.deposit("10/01/2012", 1000.00);
    bank.deposit("13/01/2012", 2000.00);
    bank.withdrawal("14/01/2012", 500.00);
    expect(bank.account[2]).toEqual("10/01/2012 || 1000.00 || || 1000.00");
    expect(bank.account[1]).toEqual("13/01/2012 || 2000.00 || || 3000.00");
    expect(bank.account[0]).toEqual("14/01/2012 || || 500.00 || 2500.00");
  });

  it("generates a statement entry in the correct deposit format", function() {
    bank.deposit("10/01/2012", 1000.00);

    expect(function () {
     bank.statement() }).toMatch("date || credit || debit || balance\n10/01/2012 || 1000.00 || || 1000.00")
  });

  it("generates a statement entry in the correct withdrawal format", function() {
    bank.withdrawal("14/01/2012", 500.00);
    expect(function () {
    bank.statement() }).toMatch("date || credit || debit || balance\n14/01/2012 || || 500.00 || -500.00")
  });

  it("generates a complete statement in the correct format", function() {
    bank.deposit("10/01/2012", 1000.00);
    bank.deposit("13/01/2012", 2000.00);
    bank.withdrawal("14/01/2012", 500.00);
    expect(function () {
    bank.statement() }).toMatch("date || credit || debit || balance\n14/01/2012 || || 500.00 || 2500.00\n13/01/2012 || 2000.00 || || 3000.00\n10/01/2012 || 1000.00 || || 1000.00")
  })

  it("generates a complete statement in the correct format (decimals maths)", function() {
    bank.deposit("10/01/2012", 100.23);
    bank.deposit("13/01/2012", 221.52);
    bank.withdrawal("14/01/2012", 67.10);
    expect(function () {
      bank.statement()
    }).toMatch("date || credit || debit || balance\n14/01/2012 || 67.10 || || 254.65\n13/01/2012 || 221.52 || || 321.75\n10/01/2012 || 100.23 || || 100.23")
  })

  })

  describe ("validityCheck", function (){

  it("checks whether a date is valid", function () {
      expect(function () {
        bank.deposit("This is not a date", 67.10)
      }).toThrowError("Invalid date - please use DD/MM/YYYY format")
    });
   });

   it("checks whether a date is valid", function () {
       expect(function () {
         bank.deposit("12325627", 67.10)
       }).toThrowError("Invalid date - please use DD/MM/YYYY format")
    });

    it("checks whether an amount is a number", function () {
        expect(function () {
          bank.deposit("31/12/2020", "not a value")
        }).toThrowError("Invalid amount - please provide a valid number with two decimnal places")
     });

     it("can accept hyphens for dates and will reformat", function() {
       bank.deposit("10-01-2012", 1000.00);
       expect(bank.account[0]).toEqual('10/01/2012 || 1000.00 || || 1000.00');
     });

     it("can accept periods for dates and reformat", function() {
       bank.deposit("10.01.2012", 1000.00);
       expect(bank.account[0]).toEqual('10/01/2012 || 1000.00 || || 1000.00');
     });
});
