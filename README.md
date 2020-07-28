# Assignment

The homework assignment listed below, completed using JavaScript, React, and REST and any other relevant languages/technologies (if you would like, i.e. Java and Spring Boot) to really express your skills:

- A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
- Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.
- Make up a data set to best demonstrate your solution
- Check solution into GitHub, and send me a link to your project (make sure it is uploaded as a repository)

## Solution

Boilerplate code cloned from https://www.npmjs.com/package/simple-react-full-stack

- create a script that generates customer and transaction data and writes it to json files
- serve the data endpoints
- customer list is served
- component has a dropdown allowing you to select a customer
- customer's transaction data is loaded upon selection
- subcomponent shows the data as a table of purchases going back 3 months

### To run it

```
npm install
```
```
npm run dev
```

If your browser doesn't automatically open to `http://localhost:3000`, please navigate there yourself

### files of interest

- `generateData.js` generates the data- it has the point calculation and other data-manipulation code
- `openapi.yml` defines the rest api
- `src/server.js` has the server code
- `src/client` folder has the front-end code

### FAQ

Q: Why no Spring Boot?

A: This was already a lot of work so I wanted to do it in the quickest way possible with the fewest moving parts.

Q: Your data generation thing got a little complicated.

A: Yes, I probably should have just bit the bullet and set up a db and run a window function query but again, trying to keep the moving parts to a minimum

Q: No linter/test coverage?

A: Sorry, this was as much time as I was willing to commit to this.

Q: Why put all the data manipulation on the server?

A: When designing for mobile-first, I feel it's a good practice to minimize device resource utilization by offloading as many calculations as possible