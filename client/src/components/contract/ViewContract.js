import React, {Fragment} from 'react'
import ContractPoint from './ContractPoint'
import PerfectScrollbar from 'react-perfect-scrollbar'
import * as moment from 'moment'

import { useSpring, animated } from 'react-spring'

const ViewContract = (props) => {

   const { currentContract } = props.state

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
            
             
               <animated.div style={trans}>
                  <div className="view-box">
                     <PerfectScrollbar className="pr-3">
                        <ContractPoint model="contract" id={currentContract.id} field="name" title="Contract" value={ currentContract.name } icon="fas fa-file-contract" />

                        <ContractPoint model="contract" id={currentContract.id} field="contractNumber" title="Contract Number" value={ currentContract.contractNumber } icon="fas fa-id-card-alt" />

                        <ContractPoint model="contract" id={currentContract.id} field="clientName" title="Client Name" value={ currentContract.clientName } icon="fas fa-user" />
                       
                        <ContractPoint isDate model="contract" id={currentContract.id} field="startDate" title="Start Date" value={ moment(currentContract.startDate).format('YYYY-MM-DD') } icon="fas fa-calendar-alt" />

                        <ContractPoint isDate model="contract" id={currentContract.id} field="endDate" title="End Date" value={ moment(currentContract.endDate).format('YYYY-MM-DD') } icon="fas fa-calendar-alt" />

                        <ContractPoint isNumber model="contract" id={currentContract.id} field="fixedContractAmount" title="Fixed Contract Amount (CHF)" value={ currentContract.fixedContractAmount } icon="fas fa-dollar-sign" />

                        <ContractPoint isNumber model="contract" id={currentContract.id} field="fixedPaymentAmount" title="Fixed Payment Amount (CHF)" value= {currentContract.fixedPaymentAmount } icon="fas fa-dollar-sign" />

                        <ContractPoint isNumber model="contract" id={currentContract.id} field="hourlyRate" title="Hourly Rate" value={ currentContract.hourlyRate } icon="fas fa-hourglass-half" />

                        <ContractPoint model="contract" id={currentContract.id} field="travelExpense" title="Travel Expense" value={ currentContract.travelExpense? 'Yes': 'No' } icon="fas fa-bus" />

                        <ContractPoint model="contract" id={currentContract.id} field="comments" title="Comment" value={ currentContract.comments } icon="fas fa-comment" />

                     </PerfectScrollbar>
                  </div>
               </animated.div>
         
         </div>
      </Fragment>
   )
}

export default ViewContract
