## Stock Market Game Simulation

The aim of our website is to monitor and update the stock prices of several companies in real
time or with every refresh (with a maximum lag <1 minute), and using this data to simulate a Stock
Market Game where a user can use virtual currency to invest and get a hands on experience on the
working of the market.

## Features-
- Virtual Money
- Real Time Refreshes
- Fully functional User Login system

## Methodology

```mermaid
graph TD;
    A(SHORTLISTING TOP 50 COMPANIES)-->B(SCRAPING THEIR MARKET PRICES FROM NSE);
    B-->C(USER JOINS THE GAME AND LOGS IN);
    C-->D(THE PRICES ARE DISPLAYED IN THE MARKETPLACE);
    D-->E(USER USES VIRTUAL MONEY TO BUY STOCKS);
    E-->F(MARKET REFRESHES);
    F-->G(USER INCURS EITHER A PROFIT OR A LOSS);
```

## User Sign In process
``` mermaid
flowchart LR
    A(User lands on the home page) ==> B[Users chooses to create or joun a game]
    B ==> C[A unique ID is generated for the user]
    C ==> D{User's entered credentials are right?}
    D -->|No| E[The ID already redistered, but one of the entered credentials isn't correct]
    E ==> A
    D -->|Yes| F[User Sign In is succesfull]
```

## Game process
``` mermaid
flowchart TB
    A(User Sign In is succesfull) ==> B{Balance is 0}
    B -->|Yes| C[Bring back to main menu]
    B -->|No| D[Take input of the company name, amount and operation]
    D ==> E{Does user want to buy or sell that amount}
    E -->|Sell| F[Decrease the amount of stocks user has for that company, add the amount to user's balance]
    E -->|Buy| G[Increase the amount of stocks user has for that company and decrease the amount spent from user's balance]
    G ==> H[Stock market updates and the game starts again]
    F ==> H
    H ==> B
```


