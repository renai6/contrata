import React, { useReducer } from 'react'
import ClientReducer from '../reducers/ClientReducer'

const initialState = {
   
   isFetching: false,
   clients: [],  
   withContracts: [],  
  
}

export const ClientContext = React.createContext()

export const ClientProvider = props => {

   const [state, dispatch] = useReducer(ClientReducer, initialState)
   
   return (
      
      <ClientContext.Provider value={{ 
         ...state,
         dispatch
      }}>

         { props.children }
      </ClientContext.Provider>
   )
}
