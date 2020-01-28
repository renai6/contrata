import React, {Fragment} from 'react'
import Button from '../common/Button'
import ContractPoint from './ContractPoint'
import { useSpring, animated } from 'react-spring'

const ViewOfferPosition = (props) => {

   const { currentOfferPosition, forDelete } = props.state

   const trans = useSpring({ 
     
      to: {
         opacity: 1, 
         transform: 'translate3d(0,0px,0)'
      }, 

      from: { 
         opacity: 0, 
         transform: 'translate3d(0,-40px,0)'
      }, 
      delay: 100,
      
   })
  
   return (
      <Fragment>
         <div className="d-flex flex-column mt-2">
            {
               forDelete?  
                  <div className="p-2 header-box d-flex justify-content-between align-items-center sticky-top">
                     <> 
                        <h5 className="m-0" style={{color: 'red'}}>{ currentOfferPosition.offerName } will be deleted</h5> 
                        <div>
                           <Button className="btn-exact-sm"> Continue </Button>
                        </div>
                     </> 
                  </div>: ''
            }
            
            <animated.div style={trans}>
               <div className="view-box">
                
                     <ContractPoint model="offerposition" id={currentOfferPosition.id} field="projectName" title="Project Name" value={ currentOfferPosition.projectName } icon="fas fa-file-signature" />

                     <ContractPoint model="offerposition" id={currentOfferPosition.id} field="offerNr" title="Offer Number" value={ currentOfferPosition.offerNr } icon="fas fa-id-card-alt" />

                     <ContractPoint model="offerposition" id={currentOfferPosition.id} field="projectNr" title="Project Number" value={ currentOfferPosition.projectNr } icon="fas fa-id-card-alt" />

                     <ContractPoint model="offerposition" id={currentOfferPosition.id} field="offerName" title="Offer Name" value={ currentOfferPosition.offerName } icon="fas fa-file-signature" />

                     <ContractPoint model="offerposition" id={currentOfferPosition.id} field="offerAmount" title="Offer Amount (CHF)" value={ currentOfferPosition.offerAmount } icon="fas fa-dollar-sign" />

                     <ContractPoint isDrop model="offerposition" id={currentOfferPosition.id} field="status" title="Status" value={ currentOfferPosition.status } icon="fas fa-wave-square" />

                     <ContractPoint model="offerposition" id={currentOfferPosition.id} field="comments" title="Comments" value={ currentOfferPosition.comments } icon="fas fa-comment" />

                
               </div>
            </animated.div>
         </div>
      </Fragment>
   )
}

export default ViewOfferPosition
