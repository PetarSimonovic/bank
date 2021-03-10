class Bank {
  constructor () {
    this.balance = 0
    this.account = []
    this.statementHeader = 'date || credit || debit || balance\n'
    this.newBalance = 0
    this.newStatement = ''
    this.validDate = 0
  };

  deposit (date, amount) {
    this.balanceUpdate(date, amount)
    this.account.unshift(`${this.validDate} || ${amount.toFixed(2)} || || ${this.balance}`)
  };

  withdrawal (date, amount) {
    this.balanceUpdate(date, -Math.abs(amount))
    this.account.unshift(`${date} || || ${amount.toFixed(2)} || ${this.balance}`)
  }

  balanceUpdate (date, amount) {
    this.checkValidity(date, amount)
    this.newBalance = (this.balance * 100) + (amount * 100)
    this.balance = this.addDecimal()
  }

  addDecimal () {
    return (this.newBalance / 100).toFixed(2)
  }

  statement () {
    this.newStatement = this.statementHeader.concat(this.account.join('\n'))
    return this.newStatement
  }

  checkValidity (date, amount) {
    this.checkDate(date)
    this.checkAmount(amount)
  }

  checkDate (date) {
    let day = date.substring(0, 2)
    let month = date.substring(3, 5)
    let year = date.substring(6, 10)
    if (isNaN(day) || isNaN(month) || isNaN(year) || date.length !== 10) {
      this.dateError()
    }
    this.validDate = `${day}/${month}/${year}`
  }

  checkAmount (amount) {
    if (isNaN(amount)) {
      this.amountError()
    }
  }

  amountError () {
    throw new Error('Invalid amount - please provide a valid number with two decimnal places')
  }

  dateError () {
    throw new Error('Invalid date - please use DD/MM/YYYY format')
  }
}
