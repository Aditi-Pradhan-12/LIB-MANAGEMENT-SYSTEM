##project containing both node and express js

application name:
## LIBRARY MANAGEMENT SYSTEM:

This is the book record management API BACKEND apllication.

## ROUTES AND ENDPOINTS:
    >>USER PERSPECTIVE
    >>BOOKS PERSPECTIVE

## 1st API: /users
POST: We'll use the POST method to add the USERS to our DB through the server.
GET: To get the list of users.

## 2nd API: /users/{id}:
GET: to get the user by their ID
PUT: to update some info about the user by their ID
DELETE: to delete the user by their ID

*******before deleting the user, check if that person still have an issued book,if yes then check for the fine*********

## 3rd API: /users/subscription-details{id}
GET: to get the user's subscription details
    >>date of subscription
    >>validity of subscription
    >>fine-check if any

#### BOOKS' ENDPOINTS: /books
GET: to get all the info of available books 
POST: create/add a new book

### GET BOOKS WET THEIR IDs: /books{id}
GET: to get books by their id
PUT: to update info on the book by its id

### /books/issue:
GET: to get info on all the issued books

### collect books with fine: /books/issue/withfine:
GET: to get all the issued books with fine

### SUBSCRIPTION TYPE:
    >>3 MONTHS: BASIC
    >>6 MONTHS: STANDARD
    >>12 MONTHS/1YEAR: PREMIUM

>>if the subscription payment not recieved then pay the penalty fees


### COMMANDS:
    install package.json=> >>npm init
    **if we don't want to answer any of the questions while installing this package go with the command as-
    >> npm init -y
    to install express=> >> npm i express
    to install nodemon=> >> npm i nodemon --save-dev

express: dependency for developers and users
nodemon: dependency for devlopers only

2 files for storing the users data and books data
    >>books.json
    >>users.json

## http://localhost:8081/books/issued ##
this link is giving us the error that "book not found for thr given ID"
It is because, it's considering this-> "issued" as "/:id". So, it's juming onto the negative response.
we can overcome this issue by mentioning-> "/issuedk/by-user"