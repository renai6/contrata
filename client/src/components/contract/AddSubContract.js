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
   Col,
   Row,
   FormGroup, 
   Label, 
   Input,
      
} from 'reactstrap'
import * as moment from 'moment'

import Selections from '../common/Selections'

// context
import { ContractContext } from '../../contexts/ContractContext'
// reducer
import reducer from './reducers/subContractReducer'

const today = moment('9999-12-12').format('YYYY-MM-DD')

const initialState = {

   clientId: '',
   contractId: '',
   name: '',
   projectNr: '',
   offerDate: today,
   approvedDate: today,
   status: '',
   offerAmount: '',
   comments: '',
   invalidForm: false
}

const AddSubContract = ({subContractModal, toggleSCModal, contract }) => {
   
   const [state, dispatch] = useReducer(reducer, initialState)

   const Contract = useContext(ContractContext)

   const handleSubmit = async (e) => {

      e.preventDefault()

      dispatch({type: 'SUBMIT'})

      const _data = {

         clientId: contract.clientId,
         contractId: contract.id,
         subContractNr: 0,
         name: state.name,
         offerDate: state.offerDate,
         status: state.status,
         offerAmount: state.offerAmount,
         usedAmount: 0
      }

      if(validContractForm(_data)) {

         _data.approvedDate = state.approvedDate
         _data.projectNr = state.projectNr
         _data.comments = state.comments

         const success = await Contract.addSubContract(_data)

         if(success) {

            toggleSCModal(false)
            dispatch({type: 'CLEAR_FIELDS'})

            
         } else {

            dispatch({type: 'INVALID_FORM'})
         }

      } else {

         dispatch({type: 'INVALID_FORM'})
      }

   }
   
   return (

      <Modal isOpen={subContractModal} toggle={() => toggleSCModal(false)} >
         <ModalHeader toggle={() => toggleSCModal(false)}>New Sub Contract</ModalHeader>
         <Form onSubmit={ handleSubmit }>
            <ModalBody>
            

               <FormGroup>
                  <Label className="mb-0" for="name">Sub Contract Name</Label>
                  <Input invalid={state.invalidForm} type="text" bsSize="sm" onChange={ (e) => dispatch({type: 'INPUT', field:'name', value: e.currentTarget.value}) }  value={ state.name } autoComplete="off" />
               </FormGroup>
               
               <FormGroup>
                  <Label className="mb-0" for="name">Project Number</Label>
                  <Input invalid={state.invalidForm} type="text" bsSize="sm" onChange={ (e) => dispatch({type: 'INPUT', field:'projectNr', value: e.currentTarget.value}) }  value={ state.projectNr } autoComplete="off" />
               </FormGroup>

               <Row form>
                  <Col md={6}>
                     <FormGroup>
                        <Label className="mb-0" for="startDate">Offer Date</Label> <br />
                        
                        <Input type="date" value={state.offerDate} onChange={ (e) => dispatch({type: 'INPUT', field:'offerDate', value: e.currentTarget.value }) } />

                        
                     </FormGroup>
                  </Col>
                  <Col md={6}>
                     <FormGroup>
                        <Label className="mb-0" for="endDate">Approved Date</Label>
                        <Input type="date" value={state.approvedDate} onChange={ (e) => dispatch({type: 'INPUT', field:'approvedDate', value: e.currentTarget.value }) } />

                      
                     </FormGroup>
                  </Col>
               </Row>

               <FormGroup>
                  <Selections  invalid={state.invalidForm} label="Status" onChange={ (e) => dispatch({type: 'INPUT', field:'status', value: e.currentTarget.value}) }>
                  
                     <option value=""></option>
                     <option value="Offer">Offertphase</option>
                     <option value="Progress">In Umsetzung</option>
                     <option value="Closed">Geschlossen</option>
                     <option value="Waiting">Warten auf Instruktionen</option>
                    
                    
                     
                  </Selections>
               </FormGroup>

               <FormGroup>
                  <Label className="mb-0" for="name">Offer Amount</Label>
                  <Input invalid={state.invalidForm} type="number" bsSize="sm" onChange={ (e) => dispatch({type: 'INPUT', field:'offerAmount', value: e.currentTarget.value}) }  value={ state.offerAmount } autoComplete="off" />
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
               <Button color="secondary" onClick={() => toggleSCModal(false)}>Cancel</Button>
            </ModalFooter>
         </Form>
      </Modal>
   )

}

export default AddSubContract
