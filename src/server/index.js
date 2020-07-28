const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('dist'));
app.get('/api/customers',(req,res)=>res.send(require('../../data/customers.json')))
app.get('/api/transactions/:customerId',(req,res)=>{
  const customerId = req.params.customerId
  if(isNaN(customerId)) {
    res.status(422);
    res.send({message:'customerId must be a number. The given customerId was '+customerId});
  }
  try {
    res.send(
      JSON.parse(
        fs.readFileSync(`./data/transactions-${customerId}.json`,'utf8')
      )
    )
  } catch(e) {
    console.log(e)
    res.status(404);
    res.send({message:'customer not found with id '+customerId})
  }
})

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
