import React from 'react'

import PerfectScrollbar from 'react-perfect-scrollbar'
import { 
   Alert,
   ListGroupItem,
   ListGroup,
      
} from 'reactstrap'

const ClientList = ({clients}) => {

   console.log(clients)
   return (
      <ListGroup className="view-box">

         <PerfectScrollbar className="px-3 pb-2">
            {

               clients.length > 0?
               clients.map(client => (
                  <ListGroupItem key={client.id} >
                     <div className="d-flex justify-content-between align-items-center">

                        <strong>
                           
                           <p className="m-0"> { client.name }</p>
                        </strong>

                        <div className="d-flex acion-icons">

                           <span className="icon" > <i className="fas fa-chart-line fa-lg"></i></span>
                          
                        </div>
                     </div>
                  </ListGroupItem>
               )):<Alert color="primary">
                     Not found
                  </Alert>
            }
            
         </PerfectScrollbar>

      </ListGroup>

   )
}

export default ClientList
