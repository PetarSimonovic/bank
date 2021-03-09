describe ("Statement", function() {

    var statement;

    afterEach(function () {
      let account_one = ["14/01/2012 || || 500.00 || 2500.00"]
    });


    it("generates a statement entry in the correct deposit format", function() {
      let statement = new Statement(account_one)
      expect(function () {
        statement.print()
       }).toMatch("date || credit || debit || balance\n14/01/2012 || || 500.00 || 2500.00")
     });

    it("generates a statement entry in the correct withdrawal format", function() {
      bank.withdrawal("14/01/2012", 500.00);
      expect(function () {
        statement.print()
      }).toMatch("date || credit || debit || balance\n14/01/2012 || || 500.00 || -500.00")
    });

    it("generates a complete statement in the correct format", function() {
      expect(function () {
        statement.print()
      }).toMatch("date || credit || debit || balance\n14/01/2012 || || 500.00 || 2500.00\n13/01/2012 || 2000.00 || || 3000.00\n10/01/2012 || 1000.00 || || 1000.00")
    })

})
