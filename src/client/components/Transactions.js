import React, { useState,useEffect } from 'react';
import Items from './Items'

export default function Transactions({customer}) {
  const [transactions,setTransactions]=useState([])
  const [isLoading,setIsLoading]=useState(false)

  useEffect(()=>{
    setIsLoading(true)
    fetch(`/api/transactions/${customer.id}`)
    .then(res => res.json())
      .then(data=>{
        setTransactions(data)
        setIsLoading(false)
      })
  },[customer])

  return <div>
    <h1>{customer.name}'s Transactions</h1>
    {isLoading ? 
    <h2>Loading...</h2>
    :
      <div>
        {transactions.map(monthDetails=>
          <section key={monthDetails.month}>
            <h2>{monthDetails.month}</h2>
            <h3>Total Reward Points Earned This Month: {monthDetails.totalForMonth}</h3>
            <table>
              <thead>
                <tr>
                  <th>Transaction Date</th>
                  <th>Total Dollars Spent</th>
                  <th>Points Earned</th>
                  <th>Items Purchased</th>
                </tr>
              </thead>
              <tbody>
                {monthDetails.transactions.map((transaction,transactionIndex)=>
                <tr key={transactionIndex}>
                  <td>{transaction.createdAt}</td>
                  <td>${transaction.totalSpent}</td>
                  <td>{transaction.pointsEarned}</td>
                  <td>
                      <Items items={transaction.itemsPurchased} />
                  </td>
                </tr>
                )}
              </tbody>
            </table>
          </section>
        )}
      </div>
    }
    
  </div>
}