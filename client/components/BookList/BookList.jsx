import React, { useEffect, useState } from 'react'

export default function BookList() {

    [book, setBooks]= useState([]);

    useEffect(()=>{
        fetch('http://localhost:5777/')
    },[])

    
  return (
    <div>BookList</div>
  )
}
