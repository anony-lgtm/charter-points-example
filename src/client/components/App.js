import React, { useState,useEffect } from 'react';
import Transactions from './Transactions'
import '../app.css';

export default function App() {
  const [customers,setCustomers]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  const [selectedCustomer,setSelectedCustomer]=useState()
  useEffect(()=>{
    setIsLoading(true)
    fetch('/api/customers')
      .then(res => res.json())
      .then(data=>{
        setCustomers(data)
        setIsLoading(false)
      })
  },[])
  function handleChange(e) {
    setSelectedCustomer(customers.find(c=>c.id===parseInt(e.target.value)))
  }
  return <main>
    <label htmlFor="customerSelect">
      Select a customer: 
    </label>
    <select defaultValue="" id="customerSelect" onChange={handleChange}>
      <option value="" disabled={true}></option>
      {customers.map(customer=>
        <option key={customer.id} value={customer.id}>{customer.name}</option>
        )}
    </select>
    {isLoading ? 
    <h3>Loading...</h3>
    :
    (
      selectedCustomer ?
      <Transactions customer={selectedCustomer} />
      :
      <div/>
    )
    }
  </main>
}