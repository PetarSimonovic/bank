// Variables

let balance = 0
let account = []
let ledger = []
let statement_header = "date || credit || debit || balance\n"

// Functions

function deposit(date, amount) {
  let newBalance = (balance * 100)  + (amount * 100)
  balance = addDecimal(newBalance)
  account.unshift([date, amount.toFixed(2), "", balance])
};


function withdrawal(date, amount) {
  let newBalance = (balance * 100) - (amount * 100)
  balance = addDecimal(newBalance)
  account.unshift([date, "", amount.toFixed(2), balance])
}

function addDecimal(newBalance) {
  return (newBalance / 100).toFixed(2);
}

function printStatement() {
  let index = 0
  for (index = 0; index < account.length; index++) {
    console.log("in the loop")
    ledger.push(account[index].join(" || ").replace("  ", " "))
  };
  statement = statement_header.concat(ledger.join("\n"));
}
