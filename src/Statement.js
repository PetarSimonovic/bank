class Statement {

  constructor(account) {
    this.statementHeader = 'date || credit || debit || balance\n'
    this.account = account
  }

  print () {
    this.statementHeader.concat(this.account.join('\n'))
  }

}
