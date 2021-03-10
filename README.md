# Bank tech test


### Requirements

* Interact with your code via a REPL like IRB or the JavaScript console. (You don't need to implement a command line interface that takes input from STDIN.)
* Deposits, withdrawal.
* Account statement (date, amount, balance) printing.
* Data can be kept in memory (it doesn't need to be stored to a database or anything).

### Acceptance criteria

**Given** a client makes a deposit of 1000 on 10-01-2012  
**And** a deposit of 2000 on 13-01-2012  
**And** a withdrawal of 500 on 14-01-2012  
**When** she prints her bank statement  
**Then** she would see

```
date || credit || debit || balance
14/01/2012 || || 500.00 || 2500.00
13/01/2012 || 2000.00 || || 3000.00
10/01/2012 || 1000.00 || || 1000.00
```

### Instructions

- run ```npm install``` in the command line to install dependencies

- run ```npm test``` to execute tests and generate coverage details.

- The app functions in the browser console. It has no HTML interface.

### Instructions

1. bank = new Bank()

**deposits and withdrawal**

To make a deposit or withdrawal, provide a date (as a string in DD/MM/YYYY or DD-MM-YYYY format) and a numerical value with two decimal places. Do not include a currency symbol or currency code.

```js
bank.deposit("31/12/2020", 1000.00)

bank.withdrawal("31/12/2020", 1000.00)
```


**statement**

Use statement to print out a list of transactions in reverse chronological order, formatted in line with the brief's requirements.

```js
bank.statement
```

### Structure and design

1. **Account** array:  
    - Stores details of transaction activity as a string.
    - Each transaction has a date, an amount and a balance. It's formatting indicates whether it is a deposit or withdrawal.

2. **Balance** variable:
   - Stores the account holder's balance as a numerical value with two decimal places.

3. **Withdrawal** function:
   - Accepts two arguments: date and amount
   - Reduces Balance by amount
   - Date, amount and balance are added to Account

4. **Deposit** function:
   - Accepts two arguments: date and amount
   - Increases Balance by amount.
   - date, amount and balance are added to Account

5. **Statement** function:
  - Generates and returns a statement in line with given format.

### Considerations


**Refactoring deposit and withdrawal**

Deposit and Withdrawal could be combined into a single "Transaction" function that accepts both positive and negative amounts as arguments, then assigns a "credit" or "debit" status respectively.

This could streamline the code base, reducing the number of functions.

However, "Deposit" and "Withdrawal" are separate functions with unique names and specific actions. As a result, they reduce the potential for ambiguity among users that could arise from a more-generic "Transaction" function.

**Decimals**

Javascript's removal of trailing zeroes following a decimal raises a number of challenges. The zeroes can be retained using ```toFixed(2)```, converting the number into a string. However, this approach then prevents accurate addition and subtraction using that converted sum.

The solution applied is to remove decimals  by multiplying all amounts by 100. This allows decimals to be reinstated for the statement in a way that accounts for trailing zeroes.  

### Functions

**deposit**
Updates the account for a credit transaction

**withdrawal**
Updates the account for a debit transaction

**balanceUpdate**
Updates the account for a debit transaction

**addDecimal**
Returns decimal to balance, accounting for trailing zeroes

**statement**
Prints a statement with a header

**checkValidity**
Uses checkDate and checkAmount to perform some basic edge case checks

**checkDate**
Checks and formats the date; throws dateError if it detects an issue

**checkAmount**
Checks the amount is a number; throws amountError if it detects an issue

**dateError**
Raises an error if a date is not a date (according to checkDate)


**amountError**
Raises an error if an amount is not a number (according to checkAmount)


### Edge cases

- This solution offers some limited checks and balances against input edge cases.

It will:
  - check if an amount provided is a number
  - check whether the date provided has numerical values for days, months and years.

The date checking process will allow users to input dates using any separator (including DD-MM-YYYY, DD.MM.YYYY ) and will standardise to DD/MM/YYYY.

To resolve this issue, the ```checkDate``` function could be repurposed to create a timestamp that could be attached to each entry, allowing the account array to be sorted.

```js
this.validDate = `${year}${month}${day}`
```

### Known issues

- The statement cannot yet be sorted: it outputs debits and credits in the order they are made, not by date.

- Dates must be entered as strings, while amounts are entered as numeric values. This is cumbersome and confusing from a user perspective.

- There is no default date at present - the current date could be used as a default.

### Tech stack

- Written in javascript

- Testing in Jasmine and Karma

- linting in ESlint
