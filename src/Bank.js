// Variables

let balance = 0
let account = []


// functions

function deposit(date, amount) {
  balance += amount
  account.push([date, "||", amount, balance])
};
