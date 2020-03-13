import React, { Fragment } from 'react'
import Button from '../common/Button'
import ContractPoint from './ContractPoint'
import * as moment from 'moment'
import { useSpring, animated } from 'react-spring'

const ViewSubContract = (props) => {

   const { currentSubContract, forDelete } = props.state

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
                     <h5 className="m-0" style={{color: 'red'}}>{ currentSubContract.name } will be deleted</h5> 
                     <div>
                        <Button className="btn-exact-sm"> Continue </Button>
                     </div>
                  </>
               </div> :  ''
            }
            
            <animated.div style={trans}>
               <div className="view-box">
                
                  <ContractPoint model="subcontract" id={currentSubContract.id} field="name" title="Sub Contract" value={ currentSubContract.name } icon="fas fa-file-contract" />

                  <ContractPoint model="subcontract" id={currentSubContract.id} field="subContractNr" title="Sub Contract Number" value={ currentSubContract.subContractNr } icon="fas fa-id-card-alt" />

                  <ContractPoint model="subcontract" id={currentSubContract.id} field="projectNr" title="Project Number" value={ currentSubContract.projectNr } icon="fas fa-id-card-alt" />

                  <ContractPoint model="subcontract" id={currentSubContract.id} field="offerDate" title="Offer Date" value={ moment(currentSubContract.offerDate).format('YYYY-MM-DD')  } icon="fas fa-dollar-sign" />

                  <ContractPoint model="subcontract" id={currentSubContract.id} field="approvedDate" title="Approved Date" value={ moment(currentSubContract.approvedDate).format('YYYY-MM-DD') } icon="fas fa-calendar-alt" />

                  <ContractPoint isNumber isCurrency model="subcontract" id={currentSubContract.id} field="offerAmount" title="Offer Amount" value={ currentSubContract.offerAmount } icon="fas fa-bus" />

                  <ContractPoint isDrop model="subcontract" id={currentSubContract.id} field="status" title="Status" value={ currentSubContract.status } icon="fas fa-wave-square" />

                  <ContractPoint model="subcontract" id={currentSubContract.id} field="comments" title="Comment" value={ currentSubContract.comments } icon="fas fa-comment" />
               
               </div>
            </animated.div>
         </div>
      </Fragment>
   )
}

export default ViewSubContract
