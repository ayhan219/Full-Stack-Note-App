import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'




const Home = ({isAuthenticated}) => {


  return (
    <div>
      <Header isAuthenticated={isAuthenticated} />
      

      </div>
    
  )
}

export default Home