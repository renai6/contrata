import React, { useContext, useReducer } from 'react'
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

import Selections from '../common/Selections'

// context
import { ContractContext } from '../../contexts/ContractContext'
// reducer
import reducer from './reducers/offerPositionReducer'

const initialState = {

   clientId: '',
   contractId: '',
   subContractId: '',
   projectName: '',
   projectNr: '',
   offerName: '',
   offerAmount: '',
   status: 'Progress',
   comments: '',
   invalidForm: false
}

const AddOfferPosition = ({offerPositionModal, toggleOPModal, subContract }) => {
   
   const [state, dispatch] = useReducer(reducer, initialState)

   const Contract = useContext(ContractContext)


   const handleSubmit = async (e) => {

      e.preventDefault()

      dispatch({type: 'SUBMIT'})

      const contractIndex = Contract.contracts.findIndex(contract => contract.id === subContract.contractId)

      const _data = {

         clientId: subContract.clientId,
         contractId: subContract.contractId,
         subContractId: subContract.id,
         projectName: subContract.name,
         offerNr: parseInt(`${subContract.clientId}${subContract.contractId}${subContract.id}`),
         offerName: state.offerName,
         offerAmount: state.offerAmount,
         openAmount: state.offerAmount,
         status: state.status,
         usedAmount: 0,
         hours: 0,
         openHour: parseFloat((state.offerAmount / Contract.contracts[contractIndex].hourlyRate).toFixed(2)),
         
      }
      console.log(_data)
      console.log(subContract)
      if(validContractForm(_data)) {

         _data.comments = state.comments
         _data.projectNr = subContract.projectNr

         const success = await Contract.addOfferPosition(_data)

         if(success) {

            toggleOPModal(false)
            dispatch({type: 'CLEAR_FIELDS'})
            
         } else {

            dispatch({type: 'INVALID_FORM'})
         }

      } else {
         
         dispatch({type: 'INVALID_FORM'})
      }

   }
   
   return (

      <Modal isOpen={offerPositionModal} toggle={() => toggleOPModal(false)} >
         <ModalHeader toggle={() => toggleOPModal(false)}>New Offer Position</ModalHeader>
         <Form onSubmit={ handleSubmit }>
            <ModalBody>

               <FormGroup>
                  <Label className="mb-0" for="name">Offer Name</Label>
                  <Input invalid={state.invalidForm} type="text" bsSize="sm" onChange={ (e) => dispatch({type: 'INPUT', field:'offerName', value: e.currentTarget.value}) }  value={ state.offerName } autoComplete="off" />
               </FormGroup>
            
               <FormGroup>
                  <Label className="mb-0" for="name">Project Name</Label>
                  <Input type="text" bsSize="sm"  value={ subContract.name } disabled />
               </FormGroup>
            
               <FormGroup>
                  <Label className="mb-0" for="name">Offer Amount</Label>
                  <Input invalid={state.invalidForm} type="number" bsSize="sm" onChange={ (e) => dispatch({type: 'INPUT', field:'offerAmount', value: e.currentTarget.value}) }  value={ state.offerAmount } autoComplete="off" />
               </FormGroup>
            
               
               <FormGroup>
                  <Selections  invalid={state.invalidForm} value={ state.status } label="Status" onChange={ (e) => dispatch({type: 'INPUT', field:'status', value: e.currentTarget.value}) }>
                     <option value=""></option>
                     <option value="Offer">Offertphase</option>
                     <option value="Progress">In Umsetzung</option>
                     <option value="Closed">Geschlossen</option>
                     <option value="Waiting">Warten auf Instruktionen</option>
                    
                     
                  </Selections>
                  
               </FormGroup>
            
               <FormGroup>
                  <Label className="mb-0" for="name">Comment</Label>
                  <Input invalid={state.invalidForm} type="text" bsSize="sm" onChange={ (e) => dispatch({type: 'INPUT', field:'comments', value: e.currentTarget.value}) }  value={ state.comments } autoComplete="off" />
               </FormGroup>
            
            </ModalBody>
            <ModalFooter>
               {
                  state.invalidForm? <Button color="danger">Empty Fields Detected</Button> :<Button type="submit" color="primary">Save</Button>
               }
               {' '}
               <Button color="secondary" onClick={() => toggleOPModal(false)}>Cancel</Button>
            </ModalFooter>
         </Form>
      </Modal>
   )

}

export default AddOfferPosition
