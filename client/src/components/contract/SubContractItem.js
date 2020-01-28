import React from 'react'
import { useSpring, animated } from 'react-spring'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { 
  
   ListGroupItem,
   ListGroup,
   
} from 'reactstrap'

const SubContractItem = ({subContracts, openViewSubContract, openDeleteWindow}) => {

   React.useEffect(() => {

      document.title = 'Contrata/Contracts/Sub Contracts'
   }, [])

   const props = useSpring({ 
     
      to: {
         opacity: 1, 
         transform: 'translate3d(0px, 0, 0)'
      }, 

      from: { 
         opacity: 0, 
         transform: 'translate3d(-40px, 0, 0)'
      }, 
      delay: 100,
      
   })

   return (

      <animated.div style={props}>

         <ListGroup className="view-box">
            <PerfectScrollbar className="px-3 pb-2">
               
               {
                  subContracts.map( (item) => (

                     <ListGroupItem key={item.id} className="px-3 py-2">
                        <div className="d-flex justify-content-between align-items-center">

                           <p className="m-0"> { item.name }</p>
                           <div className="d-flex acion-icons">
                           
                              <span className="icon" onClick={ () => openViewSubContract(item) }> <i className="fas fa-eye"></i></span>
                              <span className="icon ml-2" onClick={ () => openDeleteWindow(item, 'subcontract') }><i className="fas fa-trash"></i></span>
                           </div>
                        </div>
                     </ListGroupItem>
                  )) 
               }
            </PerfectScrollbar>
            
         </ListGroup>
      </animated.div>
   )
}

export default SubContractItem
