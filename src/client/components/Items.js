import React, { useState,useEffect } from 'react';

export default function Items({items}) {
  return <table>
    <thead>
      <tr>
        <th>Name</th><th>Price</th>
      </tr>
    </thead>
    <tbody>
        {items.map((item,index)=>
        <tr key={index}>
          <td>{item.name}</td>
          <td>{item.price}</td>
        </tr>
        )}
    </tbody>
  </table>
}