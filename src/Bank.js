class Bank {
  constructor () {
    this.balance = 0
    this.account = []
    this.statementHeader = 'date || credit || debit || balance\n'
    this.newBalance = 0
  };

  deposit (date, amount) {
    this.newBalance = (this.balance * 100) + (amount * 100)
    this.balance = this.addDecimal()
    this.account.unshift(`${date} || ${amount.toFixed(2)} || || ${this.balance}`)
  };

  withdrawal (date, amount) {
    this.newBalance = (this.balance * 100) - (amount * 100)
    this.balance = this.addDecimal()
    this.account.unshift(`${date} || || ${amount.toFixed(2)} || ${this.balance}`)
  }

  addDecimal () {
    return (this.newBalance / 100).toFixed(2)
  }

  statement () {
    this.statementHeader.concat(this.account.join('\n'))
  }
}
