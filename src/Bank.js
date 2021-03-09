class Bank {
  constructor () {
    this.balance = 0
    this.account = []
    this.completeStatement = ''
    this.statementHeader = 'date || credit || debit || balance\n'
    this.newBalance = 0
  };

  deposit (date, amount) {
    this.newBalance = (this.balance * 100) + (amount * 100)
    this.balance = this.addDecimal(this.newBalance)
    this.account.unshift([date, amount.toFixed(2), '', this.balance])
  };

  withdrawal (date, amount) {
    this.newBalance = (this.balance * 100) - (amount * 100)
    this.balance = this.addDecimal(this.newBalance)
    this.account.unshift([date, '', amount.toFixed(2), this.balance])
  }

  addDecimal (newBalance) {
    return (this.newBalance / 100).toFixed(2)
  }

  statement () {
    let index = 0
    let ledger = []
    for (index = 0; index < this.account.length; index++) {
      ledger.push(this.account[index].join(' || ').replace('  ', ' '))
    };
    this.completeStatement = this.statementHeader.concat(ledger.join('\n'))
    return this.completeStatement
  }
}
