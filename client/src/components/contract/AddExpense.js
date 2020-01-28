import React, { useContext, useReducer, useState, useEffect } from 'react'
import { validContractForm } from '../../api/validation'

// 3rdparty imports
import { 

   Button,
   Modal, 
   ModalHeader, 
   ModalBody, 
   ModalFooter,
   Form, 
   FormGroup, 
   Label, 
   Input,
      
} from 'reactstrap'

//common
import Selections from '../common/Selections'
// context
import { ContractContext } from '../../contexts/ContractContext'
// reducer
import reducer from './reducers/expenseReducer'

const initialState = {

   clientId: '',
   contractId: '',
   subContractId: '',
   offerPositionId: '',
   expenseAmount: '',
   travelTime: 0,
   hourlyRate: '',
   comments: '',
   invalidForm: false
}

const AddOfferPosition = ({expenseModal, toggleEModal, offerPosition }) => {
   
   const [state, dispatch] = useReducer(reducer, initialState)
   const [expenseTypeFixed, setExpenseType] = useState(1)
   const Contract = useContext(ContractContext)

   useEffect(_ => {
      console.log(expenseTypeFixed)
   }, [expenseTypeFixed])

   const handleSubmit = async (e) => {

      e.preventDefault()

      dispatch({type: 'SUBMIT'})
      
      const [contract] = Contract.contracts.filter(_ => _.id === offerPosition.contractId)

      const _data = {

         clientId: offerPosition.clientId,
         contractId: offerPosition.contractId,
         subContractId: offerPosition.subContractId,
         offerPositionId: offerPosition.id,
         expenseAmount: state.expenseAmount,
         travelTime: state.travelTime,
         hourlyRate: contract.hourlyRate,
         comments: state.comments,
      }

      if(validContractForm(_data)) {

         const success = await Contract.addExpense(_data)

         if(success) {

            toggleEModal(false)
            dispatch({type: 'CLEAR_FIELDS'})
            
         } else {

            dispatch({type: 'INVALID_FORM'})
         }

      } else {

         dispatch({type: 'INVALID_FORM'})
      }

   }
   
   return (

      <Modal isOpen={expenseModal} toggle={() => toggleEModal(false)} >
         <ModalHeader toggle={() => toggleEModal(false)}>New Offer Position</ModalHeader>
         <Form onSubmit={ handleSubmit }>
            <ModalBody>

              
               <div className="d-flex align-items-center">

                  <h6>Expense Type <span className="text-warning"><i className="fas fa-exclamation-triangle"></i></span></h6>
               </div>

               <Selections noLabel onChange={ (e) => setExpenseType(parseInt(e.currentTarget.value)) }>
                  <option value={1} >Fester Betrag</option>
                  <option value={0} >Stundenabrechnung</option>
                  
               </Selections>
               

               <FormGroup>
                  <Label className="mb-0" for="name">Expense</Label>
                  <Input invalid={state.invalidForm} type="text" bsSize="sm" onChange={ (e) => dispatch({type: 'INPUT', field:'comments', value: e.currentTarget.value}) }  value={ state.comments } autoComplete="off" />
               </FormGroup>

               <FormGroup>
                  <Label className="mb-0" for="name">{ expenseTypeFixed? 'Fixed Expense Amount': 'Expense Amount' }</Label>
                  <Input invalid={state.invalidForm} type="number" bsSize="sm" onChange={ (e) => dispatch({type: 'INPUT', field:'expenseAmount', value: e.currentTarget.value}) }  value={ state.expenseAmount } autoComplete="off" />
               </FormGroup>

               {
                  expenseTypeFixed?
                     <FormGroup>
                        <Label className="mb-0" for="name">Travel Time (Hrs)</Label>
                        <Input invalid={state.invalidForm} type="text" bsSize="sm" onChange={ (e) => dispatch({type: 'INPUT', field:'travelTime', value: e.currentTarget.value}) }  value={ state.travelTime } autoComplete="off" />
                     </FormGroup> : ''
               }

               

            </ModalBody>
            <ModalFooter>
               {
                  state.invalidForm? <Button color="danger">Empty Fields Detected</Button> :<Button type="submit" color="primary">Save</Button>
               }
               {' '}
               <Button color="secondary" onClick={() => toggleEModal(false)}>Cancel</Button>
            </ModalFooter>
         </Form>
      </Modal>
   )

}

export default AddOfferPosition
