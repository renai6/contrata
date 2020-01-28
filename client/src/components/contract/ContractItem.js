import React, { useContext, useEffect,  } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { 
  
   ListGroupItem,
   ListGroup,
   
} from 'reactstrap'

import { ContractContext } from '../../contexts/ContractContext'


const ContractItem = ({ openViewContract, openDeleteWindow }) => {
   
   const {contracts} = useContext(ContractContext)

   useEffect(() => {

      document.title = 'Contrata / Contracts'
   }, [])

   return (

      <ListGroup className="view-box">

         <PerfectScrollbar className="px-3 pb-2">

            {
               contracts.map( (item) => (

                  <ListGroupItem key={item.id} className="px-3 py-2">
                     <div className="d-flex justify-content-between align-items-center">

                        <p className="m-0"> { item.name }</p>
                        <div className="d-flex acion-icons">
                        
                           <span className="icon" onClick={ () => openViewContract(item) }> <i className="fas fa-eye"></i></span>
                           <span className="icon ml-2" onClick={ () => openDeleteWindow(item, 'contract') }><i className="fas fa-trash"></i></span>
                        </div>
                     </div>
                  </ListGroupItem>
               )) 
            }
         </PerfectScrollbar>
         
      </ListGroup>
     
   )
}

export default ContractItem
