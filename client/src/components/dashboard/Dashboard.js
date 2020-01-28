import React, { useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

import { 
   Card
  
} from 'reactstrap'

import { 

   Container,
   Row, 
   Col,  
      
} from 'reactstrap'

//  Commen
import HeadBanner from '../common/HeadBanner'

const Dashboard = () => {

   useEffect(() => {
    
      document.title = 'Dashboard'
   }, [])

   const props = useSpring({ 
      to: {
         opacity: 1, 
         marginLeft: 0
      }, 

      from: { 
         opacity: 0, 
         marginLeft: -500 
      }, 
      delay: 100,
      
   })

   return (
   
      <animated.div style={props}>

         <Container fluid>
            <Row>
               
               <Col>
                  <div className="">
                     <HeadBanner title="Dashboard" description="Reports, clients, and contracts" icon="fas fa-chart-area" withButton={false} />
                  </div>

               </Col>
            </Row>
            <Row>
            
               <Col>
                  
                     <Card body>

                        <Row>
                           <Col xs={12} sm={12} md={4} lg={4} xl={4} className="mb-2 d-flex align-items-center">
                            
                              <span style={{color: '#4caf50'}} className=""><i className="fas fa-file-contract fa-3x"></i></span>
                              <div className="ml-2 d-flex align-items-center flex-column">
                                 <h5>26</h5>
                                 <p className="m-0">Contracts</p>
                              </div>
                           </Col>
                           <Col xs={12} sm={12} md={4} lg={4} xl={4} className="mb-2  d-flex align-items-center">
                            
                              <span  style={{color: '#009688'}} className=""><i className="fas fa-file-contract fa-3x"></i></span>
                              <div className="ml-2 d-flex align-items-center flex-column">
                                 <h5>26</h5>
                                 <p className="m-0">Sub Contracts</p>
                              </div>
                           </Col>
                           <Col xs={12} sm={12} md={4} lg={4} xl={4} className="mb-2 d-flex align-items-center">
                              
                              <span  style={{color: '#E91E63'}} className=""><i className="fas fa-file-contract fa-3x"></i></span>
                              <div className="ml-2 d-flex align-items-center flex-column">
                                 <h5>26</h5>
                                 <p className="m-0">Offer Positions</p>
                              </div>
                           </Col>
                        </Row>
                       
                       
                     </Card>
                  

               </Col>
            </Row>
         </Container>
      </animated.div>
     
   )
}

export default Dashboard

