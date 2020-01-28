import React from 'react'

import { 

   Row, 
   Col,  
   Table,
   Alert

} from 'reactstrap'

import Selections from '../common/Selections'

const MonthlySubContract = ({selectedMonth, buildMonthlySubcontract, monthSubcontract}) => {
   return (
      <>
          <Row className="border-top">
            
            <Col className="mt-3" sm={12} xs={12} lg={12} md={12} xl={12}>
               <div className="d-flex justify-content-between">

                  <h5 style={{color: '#a31423', fontWeight: 'bold'}}>Im Monat {selectedMonth} angefallen Aufwände</h5>
                  <Selections onClick={buildMonthlySubcontract} noLabel >
                     <option value={0}></option>
                     <option value={1}>Januar</option>
                     <option value={2}>Februar</option>
                     <option value={3}>März</option>
                     <option value={4}>April</option>
                     <option value={5}>Mai</option>
                     <option value={6}>Juni</option>
                     <option value={7}>Juli</option>
                     <option value={8}>August</option>
                     <option value={9}>September</option>
                     <option value={10}>Oktober</option>
                     <option value={11}>November</option>
                     <option value={12}>Dezember</option>
                  </Selections> 
               </div>
            </Col>
         </Row>
         <Row>
   
            <Col className="py-2" sm={12} xs={12} lg={12} md={12} xl={12}>
               {
                  monthSubcontract.length > 0?
                     monthSubcontract.map(sub => (
                        <div key={sub.id} className="px-3">
                           <h6 className="mb-2">{sub.name}</h6>
                           {
                              sub.offerPositions.length?
                                 <div className="px-3">
                                    <Table size="sm">
                                       <thead>
                                          <tr>
                                             
                                             <th></th>
                                             <th>Offeriert</th>
                                             <th>Bereits Abgerechnet</th>
                                          
                                          </tr>
                                       </thead>
                                       <tbody>
                                          {
                                             sub.offerPositions.map(offer => (

                                                <tr key={offer.id}>
                                                   <th>{offer.offerName}</th>
                                                   <td>{`CHF ${offer.offerAmount.toLocaleString().split(',').join("'")}`} </td>
                                                   <td>{`CHF ${offer.usedAmount.toLocaleString().split(',').join("'")}`}</td>
                                                </tr>
                                             ))
                                          }
                                       </tbody>
                                    </Table>
                                 </div> : <Alert color="secondary">No offer data</Alert>
                           }
                        </div>
                     )) : <Alert color="secondary">No data for the month of {selectedMonth}</Alert>
               }
               
            </Col>
         </Row>
      </>
   )
}

export default MonthlySubContract
