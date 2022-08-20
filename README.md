## Stock Market Game Simulation

The aim of our website is to monitor and update the stock prices of several companies in real
time or with every refresh (with a maximum lag <1 minute), and using this data to simulate a Stock
Market Game where a user can use virtual currency to invest and get a hands on experience on the
working of the market.


## Software and Libraries used 
- For Web Scraping-
  - Pymongo: The PyMongo distribution contains tools for interacting with MongoDB databases from Python.
  - Beautiful Soup: Beautiful Soup is a Python package for parsing HTML and XML documents.
  - Requests: Requests is a Python HTTP library. It makes HTTP requests simpler and more human-friendly.
  - Mongoose, Morgan, Lodash

- For DBMS 
  - GCP 
  - MONGODB 
  - ATLAS (To host the MongoDB server)

- Languages Used
  - Python
  - Javascript

- For creating the website
  - NODEJS, Javascript, HTML CSS, Embedded Javascript


## Features-
- Virtual Money
- Real Time Refreshes
- Fully functional User Login system

## Methodology

```mermaid
graph LR;
    A(SHORTLISTING TOP </br> 50 COMPANIES)-->B(SCRAPING THEIR </br> MARKET PRICES </br> FROM NSE);
    B-->C(USER JOINS </br> THE GAME AND </br> LOGS IN);
    C-->D(THE PRICES </br> ARE DISPLAYED IN </br> THE MARKETPLACE);
    D-->E(USER USES </br> VIRTUAL MONEY </br> TO BUY STOCKS);
    E-->F(MARKET </br> REFRESHES);
    F-->G(USER INCURS </br> EITHER A PROFIT </br> OR A LOSS);
```

## User Sign In process
``` mermaid
flowchart LR
    A(User lands on </br> the home page) ==> B[Users chooses to </br> create or joun a game]
    B ==> C[A unique ID is </br> generated for the user]
    C ==> D{User's entered </br> credentials are right?}
    D -->|No| E[The ID already </br> redistered, but one of </br> the entered credentials </br> isn't correct]
    E ==> A
    D -->|Yes| F[User Sign In </br> is succesfull]
```

## Game process
``` mermaid
flowchart LR
    A(User </br> Sign In is </br>  succesfull) ==> B{Balance is 0}
    B -->|Yes| C[Bring back </br> to main menu]
    B -->|No| D[Take input of </br> the company name, </br> amount and operation]
    D ==> E{Does user </br> want to buy or </br> sell that amount}
    E -->|Sell| F[Decrease the </br> amount of stocks user </br> has for that company, </br> add the amount to </br>  user's balance]
    E -->|Buy| G[Increase the amount </br> of stocks user has for that </br> company and decrease the </br> amount spent from </br> user's balance]
    G ==> H[Stock market </br>  updates and the </br>  game starts again]
    F ==> H
    H ==> B
```
## User Interface (Screenshots)

<section>
<img src="https://user-images.githubusercontent.com/59576063/185710959-9226c38d-c858-4aa5-bfb4-cca909321fd7.png" />
<h3 align="center">Landing Page </h3>
<img src="https://user-images.githubusercontent.com/59576063/185710967-b7a804d3-b403-409e-92dc-0b6f74dc2c7e.png" />
<h3 align="center">User Sign In Page </h3>
<img src="https://user-images.githubusercontent.com/59576063/185710975-d0ae04fd-f4e9-4b3f-8ecb-11d52afd373a.png" />
<h3 align="center">Market Place</h3>
<img src="https://user-images.githubusercontent.com/59576063/185710983-a0cceda7-b483-4016-a555-184aff943581.png" />
<h3 align="center">Buying Selling </h3>
</section>

---
- Some features of the website are still in work. (Ranklist etc.)

