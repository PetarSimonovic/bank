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

### Instructions and functions

**deposit("DD/MM/YYYY", XXXX.XX)**

- to make a deposit provide a date in a string format and a monetary amount, including decimals but not including the currency.

**withdrawal("DD/MM/YYYY", XXXX.XX)**

- to make a withdrawal provide a date in a string format and a monetary amount, including decimals but not including the currency.

**printStatement**

- printStatement will print out a list of transactions in reverse-date order (ie starting with the most recent).


### Structure and design

1. **Account** array:  
    - Stores details of transaction activity.
    - Each transaction has a date, a type (credit or debit) and balance

2. **Balance** variable:
   - Stores the account holder's balance

3. **Withdrawal** function:
   - Accepts two arguments: date and amount
   - Reduces Balance by amount
   - date, amount debit and balance are added to Account

4. **Deposit** function:
   - Accepts two arguments: date and amount
   - Increases Balance by amount.
   - date, amount, credit and balance are added to Account

### Considerations

- Deposit and Withdrawal could be combined into a single "Transaction" function that accepts both positive and negative amounts as arguments then assigns a "credit" or "debit" status respectively. This could streamline the code base as it would require only one function rather than two. However, "Deposit" and "Withdrawal" are functions with unique names and specific actions, thereby avoiding potential ambiguity that could arise from the more-generic "Transaction" from a user perspective.

- Handling of decimal values, including addition and subtraction, is not straightforward because javascript's  floating point numbers are unable to represent some decimals with complete accuracy. This solution multiples values by 100 then returns the decimal when outputting the balance as a string

### Edge cases

- users could add the date or amount in an incorrect format or use values that are neither valid dates nor monetary amounts
