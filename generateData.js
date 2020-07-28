/**
 * What this script does:
 * Reads in the openApi doc
 * Gets the customer and transaction schemas
 * Uses those schemas to generate fake data for a three month period
 * Calculates points based on the transaction totals
 * Splits up the transactions by month
 */

const fs = require('fs')
const YAML = require('yamljs')
const moment=require('moment')
const jsf = require('json-schema-faker')
jsf.extend('faker', () => require('faker'));

const apiSpec=YAML.load('openapi.yml')

const customersSchema=apiSpec.components.schemas.Customers
const transactionSchema=apiSpec.components.schemas.Transaction

//generate a bunch o' customers
customersSchema.items.properties.name.faker='name.findName'
customersSchema.minItems = 10
customersSchema.maxItems = 10
const customers=jsf.generate(customersSchema)
//give new ids to the customers to ensure uniqueness
customers.forEach((c,index)=>c.id=index)
fs.writeFileSync('data/customers.json',JSON.stringify(customers,null,2))

//generate orders
function makeTransactions(customerId) {
  transactionSchema.properties.itemsPurchased.minItems=1
  transactionSchema.properties.itemsPurchased.maxItems=5
  transactionSchema.properties.itemsPurchased.items.properties.name.faker='commerce.productName'
  const beginTime=moment().subtract(3,'months').format()
  transactionSchema.properties.createdAt.faker={
    'date.between': [beginTime,moment().format()]
  }
  //make the prices more realistic
  transactionSchema.properties.itemsPurchased.items.properties.price.minimum=0.01
  transactionSchema.properties.itemsPurchased.items.properties.price.maximum=200
  const transactions= jsf.generate({
    type:'array',
    items:transactionSchema,
    minItems:20,
    maxItems:100
  })
    .map(t=>({...t,pointsEarned:calculatePoints(
      Math.floor( //round down to dollars
        //add up the prices of the items purchased in the transaction
        t.itemsPurchased.reduce((accum,curr)=>accum+curr.price,0))
    ),totalSpent:t.itemsPurchased.reduce((accum,curr)=>accum+curr.price,0)}))
  transactions.sort((t1,t2)=>
    new Date(t2.createdAt).getTime()-new Date(t1.createdAt).getTime())
  const byMonth=splitTransactionsByMonth(transactions)
  fs.writeFileSync(`data/transactions-${customerId}.json`,JSON.stringify(byMonth,null,2))
}

function splitTransactionsByMonth(sortedTransactions) {
  let thisMonth=moment().format('MMMM')
  let lastMonth=moment().subtract(1,'months').format('MMMM')
  let monthBeforeLast=moment().subtract(2,'months').format('MMMM')
  let threeMonthsAgo=moment().subtract(3,'months').format('MMMM')

  function getTransactionsForMonth(month) {
    const inThisMonth= sortedTransactions
      .filter(t=>moment(t.createdAt).format('MMMM')===month)
    return {
      month,
      totalForMonth:sumUpThePoints(inThisMonth),
      transactions:inThisMonth
    }
  }
  return [thisMonth,lastMonth,monthBeforeLast,threeMonthsAgo]
    .map(getTransactionsForMonth)
}

function sumUpThePoints(transactions) {
  return transactions.reduce((total,t)=>t.pointsEarned+total,0)
}

customers.forEach(c=>makeTransactions(c.id))

function calculatePoints(dollars) {
  if(dollars > 100) {
    return 50+(dollars-100)*2
  } else if(dollars > 50) {
    return dollars-50
  }
  return 0
}