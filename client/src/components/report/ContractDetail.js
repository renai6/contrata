import React from 'react'
import * as moment from 'moment'
import ApexCharts from 'react-apexcharts'

import { 

   Row, 
   Col,  
   Table,

} from 'reactstrap'

const ContractDetail = ({currentContract, chartOptions, chartSeries}) => {
   return (
      <>
        
         <Row>
            
            <Col className="mt-4" sm={12} xs={12} lg={6} md={6} xl={6}>

               <Table size="sm">
                  
                  <tbody>
                     <tr>
                     
                        <td>Vertragslaufzeit</td>
                        <td>{ moment(currentContract.startDate).format('YYYY.MM.DD') }{' bis '}{ moment(currentContract.endDate).format('YYYY.MM.DD') }</td>
                     </tr>
                     <tr>
                     
                        <td>Belastungsart</td>
                        <td>{ currentContract.paymentMethod }</td>
                     </tr>
                     <tr>
                        
                        <td>Anreisekosten</td>
                        <td>{ currentContract.travelExpense? "Yes":"No" }</td>
                     </tr>
                     <tr>
                        
                        <td>Vertragsvolumen</td>
                        <td>CHF {' ' + currentContract.fixedContractAmount.toLocaleString().split(',').join("'") }</td>
                     </tr>
                     <tr>
                        
                        <td>Bereits Genutzt</td>
                        <td>CHF {' ' + currentContract.usedAmount.toLocaleString().split(',').join("'") }</td>
                     </tr>
                     <tr>
                        
                        <td>Offen</td>
                        <td>CHF {' ' + (currentContract.fixedContractAmount - currentContract.usedAmount).toLocaleString().split(',').join("'") }</td>
                     </tr>
                  </tbody>
               </Table>
            </Col>
            <Col sm={12} xs={12} lg={6} md={6} xl={6}>

               <ApexCharts
                  
                  options={chartOptions}
                  series={chartSeries}
                  type="pie"
                  width="100%"
                  height="250"
               />
            </Col>
         </Row>
      </>
   )
}

export default ContractDetail
