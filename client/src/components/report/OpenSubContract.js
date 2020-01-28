import React from 'react'
import ApexCharts from 'react-apexcharts'

import { 

   Row, 
   Col,  
  

} from 'reactstrap'

const OpenSubContract = ({barOptions, barSeries}) => {
   return (
      <>
         <Row className="border-top">
                           
            <Col className="mt-3" sm={12} xs={12} lg={12} md={12} xl={12}>
               
               <h5 style={{color: '#a31423', fontWeight: 'bold'}}>Offenprojekte</h5>
            </Col>
         </Row>
         
         <Row>
   
            <Col sm={12} xs={12} lg={12} md={12} xl={12}>
               
               <ApexCharts
               
                  options={barOptions}
                  series={barSeries}
                  type="bar"
                  width="100%"
                  height="250"
               />
            </Col>
         </Row>
      </>
   )
}

export default OpenSubContract
