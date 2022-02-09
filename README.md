# Description
This is an simple REST api that allow users deposit naira to the platform and get transaction details after been authenticated. 
It is built with Nodejs, Typescript, Express, Mongodb and Flutterwave as payment gateway.

# Installation
<pre>$ npm install</pre>

# Running the App
<pre># development 
   npm run dev
</pre>

# Principles
This Api was built using clean architecture, Domain Driven Design to ensure that the code is easily testable and there are separation of concerns

# Run
This api is hosted on https://app-transc.herokuapp.com/

# End points
register: https://app-transc.herokuapp.com/users/register

login:https://app-transc.herokuapp.com/users/login

create transaction (Protected): https://app-transc.herokuapp.com/transactions/create
NB: Use this test card while creating the transaction
Card number: 5531 8866 5214 2950
cvv: 564
Expiry: 09/32

get all transactions: https://app-transc.herokuapp.com/transactions/get-all-transactions

get one transaction:https://app-transc.herokuapp.com/transactions/get-one-transaction/:id




