import React, { Fragment, useContext } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import axios from 'axios'
import { 

   Modal, 
   ModalHeader, 
   ModalBody, 
   ModalFooter,
   Row,
   Col,
   Table,
   Alert,
   FormGroup,
   Form,
   CustomInput,
   Label,
   Input
      
} from 'reactstrap'


import Button from '../common/Button'

// context
import { ContractContext } from '../../contexts/ContractContext'
import { TaskContext } from '../../contexts/TaskContext'

const TimeBookModal = ({ bookModal, setBookModal, selectedTasks, totalHours, localDispatch, selectedOffer, state, currentContract, currentSubContract}) => {

   const { dispatch, contracts } = useContext(ContractContext)
   const { filteredTasks, dispatch : taskDispatch } = useContext(TaskContext)

   const months = ['January', 'February']
   const {
    
      hours,
      amount,
      month,
      year
   } = state

   const setAmount = (e) => {
      console.log(selectedOffer)
      const hours = e.currentTarget.value
      const hourlyRate = currentContract.hourlyRate
      const expenses = selectedOffer.expenses? selectedOffer.expenses.reduce((sum, init) => {

         return sum + init.expenseAmount
      }, 0): 0

      localDispatch({type: 'INPUT', field: 'hours', value: hours })

      localDispatch({type: 'INPUT', field: 'amount', value: (hourlyRate*hours) + expenses })
   }

   const assignToOffer = async (e) => {
      
      e.preventDefault()
      
      if(selectedTasks.length > 0) {

         const _newBook = {

            hours: parseFloat(hours),
            month,
            year,
            subContractId: selectedOffer.subContractId,
            clientId: selectedOffer.clientId,
            contractId: selectedOffer.contractId,
            offerPositionId: selectedOffer.id,
            bookNumber: parseInt(`${selectedOffer.offerNr}${selectedOffer.id}`),
            amount: amount
         }

         
         const { data:newBook } = await axios.post(`/api/books/add`, _newBook)

         const contractIndex = contracts.findIndex(contract => contract.id === currentContract.id)
         const subContractIndex = contracts[contractIndex].subContracts.findIndex(contract => contract.id === currentSubContract.id)
         const offerPositionIndex = contracts[contractIndex].subContracts[subContractIndex].offerPositions.findIndex(offer => offer.id === selectedOffer.id)
         
         const _data = selectedTasks.map(task =>  ({
            bookId: newBook.id,
            IS_MERGE: 1,
            OFFER_ID: selectedOffer.id,
            TASK_NR: task.point_nr,
            TASK_ID: task.id,
            SUBPROJECT_ID: selectedOffer.subContractId,
            CLIENT_ID: selectedOffer.clientId,
            CONTRACT_ID: selectedOffer.contractId,
            CP_EST_HRS_COMPLETION: task.time_estimate,
            totalHours: parseFloat(totalHours.toFixed(2)),
            IS_ARCHIVED: task.is_archived,
            DESCRIPTION: task.instructions,
            DEVELOPER_COMMENTS: task.DEVELOPER_COMMENTS,
            month,
            year,
         }))

         newBook.offerTasks = _data

         dispatch({

            type:'ADD_TO_BOOK', 
            payload: {
               newBook,
               contractIndex,
               subContractIndex,
               offerPositionIndex,
            } 
         })
         
         const _taskData = selectedTasks.map(task =>  ({

            IS_MERGE: 1,
            TASK_ID: task.id,
            OFFER_ID: selectedOffer.id,
           
         }))

         const _offerData = {

            hours: selectedOffer.hours + parseFloat(hours),
            usedAmount: selectedOffer.usedAmount + amount,
            openHour: selectedOffer.openHour - parseFloat(hours),
            openAmount: selectedOffer.offerAmount - (selectedOffer.usedAmount + amount),
         }
         
         await axios.put(`/api/offerpositions/update/${selectedOffer.id}`, _offerData)
         await axios.put(`/api/tasks/update`, _taskData)
         await axios.post(`/api/offertasks/add`, _data)

         dispatch({

            type:'UPDATE_OFFER_POSITION', 
            payload: {
               newBook,
               contractIndex,
               subContractIndex,
               offerPositionIndex,
               field:'hours',
               value:_offerData.hours,
            } 
         })
         dispatch({

            type:'UPDATE_OFFER_POSITION', 
            payload: {
               newBook,
               contractIndex,
               subContractIndex,
               offerPositionIndex,
               field:'usedAmount',
               value:_offerData.usedAmount,
            } 
         })
         dispatch({

            type:'UPDATE_OFFER_POSITION', 
            payload: {
               newBook,
               contractIndex,
               subContractIndex,
               offerPositionIndex,
               field:'openHour',
               value:_offerData.openHour,
            } 
         })
         dispatch({

            type:'UPDATE_OFFER_POSITION', 
            payload: {
               newBook,
               contractIndex,
               subContractIndex,
               offerPositionIndex,
               field:'openAmount',
               value:_offerData.openAmount,
            } 
         })

         setBookModal(!bookModal)

         selectedTasks.forEach(task => {
            
            const taskIndex = filteredTasks.findIndex(_ => _.id === task.id )
            console.log(taskIndex)
            taskDispatch({type: 'REMOVE_TASK_SELECTED', payload: { taskIndex } })
         })
         

         localDispatch({type: 'INPUT', field: 'hours', value: '' })
         localDispatch({type: 'INPUT', field: 'amount', value: 0 })
         localDispatch({type: 'EMPTY_SELECTED_TASK' })
      }
   }

   return (
      <div>

         <Modal isOpen={bookModal} toggle={() => setBookModal(!bookModal)} className="offer-modal">
            <ModalHeader toggle={() => setBookModal(!bookModal)}>{selectedOffer.offerName}</ModalHeader>
            <Form onSubmit={assignToOffer} >
               <ModalBody>
                  <Row>
                     <Col style={{maxHeight: "400px"}} className="border-right" sm={12} xs={12} lg={6} md={6} xl={6}>
                        <Fragment>
                        {
                           selectedTasks.length > 0?
                              <PerfectScrollbar>
                                 <Table hover>
                                    <thead>
                                       <tr>
                                          <th>Task Nr</th>
                                          <th>Est. Hours</th>
                                          <th>Description</th>
                                          <th>Actions</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {
                                          selectedTasks.map(task => (
                                             <tr key={task.id}>
                                                <td>{task.point_nr}</td>
                                                <td>{ task.time_estimate }</td>
                                                <td>{ task.instructions }</td>
                                                <td style={{textAlign: 'center'}}> <span className="icon" onClick={() => localDispatch({type: 'REMOVE_SELECTED_TASK', payload: task.id })}><i className="fas fa-times"></i></span> </td>
                                             </tr>
                                          ))
                                       }
                                    
                                    </tbody>
                                 
                                 </Table>
                              </PerfectScrollbar>:
                              <Alert className="" color="warning">
                                 No Selected tasks
                              </Alert>
                        }
                        
                        </Fragment>
                     </Col>
                     <Col sm={12} xs={12} lg={6} md={6} xl={6}>
                        <div className="d-flex align-items-center justify-content-between">

                           <h5 style={{color: '#a31423', fontWeight: 'bold'}}>Selected tasks</h5> 
                           <h6 className="mb-0" style={{fontWeight: 'bold'}}>Total Hours: {totalHours.toFixed(2)}</h6> 

                        </div>
                       
                        <FormGroup className="my-1">
                           <Label className="mb-0" for="month">Month</Label>
                           <CustomInput value={month} onChange={ (e) =>  localDispatch({type: 'INPUT', field: 'month', value:e.currentTarget.value }) } bsSize="sm" type="select" id="month">
                              {
                                 months.map((month,index) => (
                                    <option key={ index } value={month}>{ month }</option>
                                 ))
                              }
                           </CustomInput>
                        </FormGroup>
                        <FormGroup className="mb-1">
                           <Label className="mb-0" for="name">Year</Label>
                           <Input value={year} type="number" bsSize="sm" onChange={ (e) => console.log(e.currentTarget.value) }  autoComplete="off" />
                        </FormGroup>
                        <FormGroup className="mb-1">
                           <Label className="mb-0" for="name">Hours</Label>
                           <Input value={hours} type="number" bsSize="sm" onChange={ (e) =>  setAmount(e) }  autoComplete="off" />
                        </FormGroup>
                        
                        <FormGroup>
                           <Label className="mb-0" for="name">Amount</Label>
                           <Input disabled type="text" bsSize="sm" autoComplete="off" value={amount} />
                        </FormGroup>
                        
                     </Col>
                  </Row>
               </ModalBody>
               <ModalFooter>
                  <Button className="btn-exact" >Add to Offer</Button>{' '}
                  <Button type="button" className="btn-exact-default" onClick={() => setBookModal(!bookModal)}>Close</Button>
               </ModalFooter>
            </Form>
         </Modal>
      </div>
   )
}

export default TimeBookModal
