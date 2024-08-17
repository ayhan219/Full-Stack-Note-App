import React, { createContext, useContext, useState } from 'react'



export const User = createContext();
const UserContext = ({children}) => {
    const [username, setUsername] = useState("");
  return (
    <User.Provider value={{username, setUsername}}>
        {children}
    </User.Provider>
  )
}

export default UserContext