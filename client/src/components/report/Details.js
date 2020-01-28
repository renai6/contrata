import React from 'react'

import { 

   Row, 
   Col,  
   Table,

} from 'reactstrap'

const statusHumanize = (status) => {
   switch (status) {
      case 'Progress':
         
         return 'In Arbeit';
      case 'Closed':
         
         return 'Geschlossen';
      case 'Waiting':
         
         return 'Warten auf Instruktionen';
   
      case 'Offer':
         
         return 'Offertphase';
   
      default:
         return 'In Arbeit';;
   }
}


const Details = ({currentContract, getNumberofOffer}) => {
   return (
      <>
         <Row className="border-top">
                  
            <Col className="mt-3" sm={12} xs={12} lg={12} md={12} xl={12}>
               
               <h5 style={{color: '#a31423', fontWeight: 'bold'}}>Detailliste</h5>
            </Col>
         </Row>
         <Row>
            
            <Col className="mt-2" sm={12} xs={12} lg={12} md={12} xl={12}>

               <Table size="sm">
                  <thead style={{ color: '#a31423'}}>
                     <tr>
                        <th>Projektname</th>
                        <th>Offervolume</th>
                        <th>Bereits benutzt</th>
                        <th>Offen</th>
                        <th>Anzahl offene Offertpositionen</th>
                        <th>Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        currentContract.subContracts.map(subs => (
                           <tr key={subs.id}>
                              <td>{ subs.name }</td>
                              <td>{ subs.offerAmount }</td>
                              <td>{ subs.usedAmount }</td>
                              <td>{ subs.offerAmount - subs.usedAmount }</td>
                              <td>
                                 { 
                                    getNumberofOffer(subs)
                                 }
                              </td>
                              <td>{ statusHumanize(subs.status) }</td>
                           </tr>
                        ))
                     }
                     
                     
                  </tbody>
               </Table>
            </Col>
         </Row>  
      </>
   )
}

export default Details
