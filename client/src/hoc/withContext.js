import React from 'react'

import { ContractProvider } from '../contexts/ContractContext'
const withContext = (Component) => {

   return (

      <ContractProvider>

         <Component  />
      </ContractProvider>
      
   )
}

export default withContext
