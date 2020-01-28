import React from 'react'
import { useSpring, animated } from 'react-spring'
import { 

   Container, 
   Row, 
   Col,  
  
} from 'reactstrap'

// Common
import HeadBanner from '../common/HeadBanner'

const Report = ({children, title, description, icon}) => {
   


   const trans = useSpring({ 
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
   
      <animated.div style={trans}>

         <Container className="mb-3" fluid>
            <Row  className="page-title" >
            
               <Col>
                  <div className="">
                     <HeadBanner title={title} description={description} icon={icon} withButton={false} />
                  </div>

               </Col>
            </Row>
           
           {children}
            
         </Container>
      </animated.div>
     
   )
}

export default Report

