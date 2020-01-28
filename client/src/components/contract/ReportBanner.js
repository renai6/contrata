import React from 'react'

import { 

   Card,   
   Container,
   Row,
   Col
} from 'reactstrap'

const ReportBanner = ({ contracts, selectedClient, clients }) => {

   const getClientName = () => {

      const index = clients.findIndex(client => parseInt(selectedClient) === client.clientId )
      
      if(index > -1) {

         return clients[index].name
      }

      return 'No Selection'
   }

   return (
      <Card body className="pb-1">
         <Container>
            <Row className="text-center">
               <Col className="mb-2 d-flex justify-content-center align-items-center" xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                     <span className="text-primary"><i className="fas fa-users fa-3x"></i></span>
                  </div>
                  <div className="ml-2 d-flex align-items-center flex-column">
                     <h5>Clients</h5>
                     <p className="mb-0">{clients.length}</p>
                  </div>
               </Col>
               <Col className="mb-2 d-flex justify-content-center align-items-center" xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                     <span className="text-primary"><i className="fas fa-user fa-3x"></i></span>
                  </div>
                  <div className="ml-2 d-flex align-items-center flex-column">
                     <h5>Current Client</h5>
                     <p className="mb-0">{ getClientName() }</p>
                  </div>
               </Col>
               <Col className="mb-2 d-flex justify-content-center align-items-center" xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                     <span className="text-primary"><i className="fas fa-file-contract fa-3x"></i></span>
                  </div>
                  <div className="ml-2 d-flex align-items-center flex-column">
                     <h5>Contracts</h5>
                     <p className="mb-0">{contracts.length}</p>
                  </div>
               </Col>
               
            </Row>
         </Container>
      </Card>
   )
}

export default ReportBanner
