import React, { useContext, useState, useEffect } from 'react'
import ReactTable from 'react-table'
import axios from 'axios'
import * as moment from 'moment'
import { 

   Modal, 
   ModalHeader, 
   ModalBody, 
   ModalFooter,
   Row,
   Col,
  
} from 'reactstrap'

import Button from '../common/Button'
import ContractPoint from '../contract/ContractPoint'

import { TaskContext } from '../../contexts/TaskContext'
import { ContractContext } from '../../contexts/ContractContext'

const OfferTasksModal = ({offerTasksModal, setOfferTasksModal, currentOffer, currentBook, localDispatch, indexes, currentContract}) => {
   console.log(currentOffer, currentBook)
   const [ addMode, setMode ] = useState(false)
   const [ addModeOn, setAddModeOn ] = useState(false) 
   const [ selectedTotalHours, setSelectedTotalHours ] = useState(0) 
   const [ selectedTasks, setSelectedTasks ] = useState([])

   const { filteredTasks, dispatch } = useContext(TaskContext)
   const {  dispatch: contractDispatch } = useContext(ContractContext)


   useEffect(() => {

      
      const computeTaskTime = async () => {

         let newHour = 0

         for (const task of selectedTasks) {

            const tempHours = task.time.reduce((accumulator, time) => {
               
               const munites = accumulator + parseInt(time.TIME_ELAPSED.split("T")[1].split(":")[1]);
               const hours = accumulator + parseInt(time.TIME_ELAPSED.split("T")[1].split(":")[0]);
               
               let m = munites/60
      
               return hours + parseFloat(m)
            }, 0)

            newHour = newHour + tempHours
            
         }
         
         setSelectedTotalHours(newHour)
      } 

      computeTaskTime()
      
   }, [selectedTasks])

   const setUpAddMode = () => {

      if (addModeOn) {
         
         setMode(false)
         setTimeout(_ => {
            setAddModeOn(false)
            
         }, 250)

      } else {
         setAddModeOn(true)

         setTimeout(_ => {
            setMode(true)
            
         }, 250)
      }
      
   }
   
   const deleteAddedTask = async (data) => {

      const _taskData = [{

         IS_MERGE: 0,
         TASK_ID: data.TASK_ID,
         OFFER_ID: currentOffer.id,
        
      }]

      try {
         
         
         await axios.put(`/api/tasks/update`, _taskData)
            
         await axios.delete(`/api/offertasks/archive/${data.id}`)

         const taskIndex = currentBook.offerTasks.findIndex(_ => _.TASK_ID === data.TASK_ID)

         const _payLoad = {
            contractIndex: indexes.contract,
            subContractIndex: indexes.subcontract,
            offerPositionIndex: indexes.offer,
            bookIndex: indexes.book,
            taskIndex
         }

         contractDispatch({ type:'REMOVE_BOOK_TASK', payload: _payLoad})

      } catch (error) {
         console.log(error)
      }
      
   }


   const saveBookChanges = async () => {
      
      
      const _data = selectedTasks.map(task =>  ({
         bookId: currentBook.id,
         OFFER_ID: currentOffer.id,
         TASK_NR: task.TASK_NR,
         TASK_ID: task.TASK_ID,
         SUBPROJECT_ID: currentOffer.subContractId,
         CLIENT_ID: currentOffer.clientId,
         CONTRACT_ID: currentOffer.contractId,
         CP_EST_HRS_COMPLETION: task.CP_EST_HRS_COMPLETION,
         totalHours: parseFloat(selectedTotalHours.toFixed(2)),
         IS_ARCHIVED: task.IS_ARCHIVED,
         DESCRIPTION: task.DESCRIPTION,
         DEVELOPER_COMMENTS: task.DEVELOPER_COMMENTS,
         month: currentBook.month,
         year: currentBook.year,
      }))

      const _taskData = selectedTasks.map(task =>  ({

         IS_MERGE: 1,
         TASK_ID: task.TASK_ID,
         OFFER_ID: currentOffer.id,
        
      }))
      
     

      try {

         const offers = await axios.post(`/api/offertasks/add`, _data)

         const newTaskList = [...currentBook.offerTasks,...offers.data]

         localDispatch({type:'UPDATE_CURRENT_BOOK', payload: { field:'offerTasks', value:newTaskList}})
         contractDispatch({
   
            type:'UPDATE_OFFER_POSITION', 
            payload: {
               
               contractIndex: indexes.contract,
               subContractIndex: indexes.subcontract,
               offerPositionIndex: indexes.offer,
               bookIndex: indexes.book,
               field:'offerTasks',
               value:newTaskList,
            } 
         })
         await axios.put(`/api/tasks/update`, _taskData)
         
         setUpAddMode()
         
      } catch (e) {
         console.log(e)
      }
     
   }

   const bookUpdate = async (_data) => {

      try{

         if(_data.field === 'hours') {

            const expenses = currentOffer.expenses.reduce((sum, init) => {

               return sum + init.expenseAmount
            }, 0)

            const hours = (currentOffer.hours - currentBook.hours) + parseFloat(_data.value)
            const amount = (hours * currentContract.hourlyRate) + expenses
            const usedAmount = (currentOffer.usedAmount - currentBook.amount) + amount
            const openAmount = currentOffer.offerAmount - usedAmount
            const openHour = openAmount / currentContract.hourlyRate

            const _offerData = {

               hours,
               usedAmount,
               openHour,
               openAmount
            }
            
            console.log(_offerData)

            contractDispatch({

               type:'UPDATE_OFFER_POSITION', 
               payload: {
                  
                  contractIndex: indexes.contract,
                  subContractIndex: indexes.subcontract,
                  offerPositionIndex: indexes.offer,
                  field:'hours',
                  value:_offerData.hours,
               } 
            })
            contractDispatch({
   
               type:'UPDATE_OFFER_POSITION', 
               payload: {
                  
                  contractIndex: indexes.contract,
                  subContractIndex: indexes.subcontract,
                  offerPositionIndex: indexes.offer,
                  field:'usedAmount',
                  value:_offerData.usedAmount,
               } 
            })
            contractDispatch({
   
               type:'UPDATE_OFFER_POSITION', 
               payload: {
                  
                  contractIndex: indexes.contract,
                  subContractIndex: indexes.subcontract,
                  offerPositionIndex: indexes.offer,
                  field:'openHour',
                  value:_offerData.openHour.toFixed(2),
               } 
            })
            contractDispatch({
   
               type:'UPDATE_OFFER_POSITION', 
               payload: {
                  
                  contractIndex: indexes.contract,
                  subContractIndex: indexes.subcontract,
                  offerPositionIndex: indexes.offer,
                  field:'openAmount',
                  value:_offerData.openAmount,
               } 
            })
            await axios.put(`/api/offerpositions/update/${currentOffer.id}`, _offerData)
         }
         
         await axios.put(`/api/books/update/${_data.id}`,_data.body)
         


         localDispatch({ type:'UPDATE_CURRENT_BOOK', payload: {field: _data.field, value: _data.editValue } })
         
         const _payLoad = {
            contractIndex: indexes.contract,
            subContractIndex: indexes.subcontract,
            offerPositionIndex: indexes.offer,
            bookIndex: indexes.book,
            field: _data.field,
            value: parseFloat(_data.value)
         }

         console.log(_payLoad)
         contractDispatch({ type:'UPDATE_BOOK', payload: _payLoad})

      } catch(e) {
         console.log(e)
      }
      
   }

   return (
      <div>

         <Modal isOpen={offerTasksModal} toggle={() => setOfferTasksModal(false)} className="offer-modal">
            <ModalHeader toggle={() => setOfferTasksModal(false)}>{currentOffer.offerName}</ModalHeader>
           
            <ModalBody className="py-1">
               <Row>
            
                  {
                     currentBook.hasOwnProperty('bookNumber')? 
                        <>
                           <Col sm={12} xs={12} lg={addMode? 6:4} md={addMode? 6:4} xl={addMode? 6:4} className="border-right">
                           {

                              addMode? 
                              <>
                                 <div className="d-flex justify-content-between my-2">
                                    <h5 className="mb-2" style={{color: '#a31423', fontWeight: 'bold'}}>Total Hours Used: {selectedTotalHours.toFixed(2)}</h5>
                                    <div>
                                       
                                       <span onClick={ saveBookChanges } title="Add Tasks" className="icon"><i className="fas fa-save fa-2x"></i></span> 
                                       <span onClick={ setUpAddMode } title="Add Tasks" className="icon ml-2"><i className="fas fa-times fa-2x"></i></span> 
                                    </div>
                                   
                                 </div>
                                 <ReactTable

                                    getTdProps={(state, rowInfo, column, instance) => {
                                       
                                      
                                       
                                       return {
                                          
                                          onClick: (e) => {
                                             
                                             if(rowInfo) {
                                                const tasks = selectedTasks
                                                const taskIndex = tasks.findIndex(_ => _.TASK_NR === rowInfo.original.TASK_NR)

                                                if(taskIndex < 0) {
                                                   setSelectedTasks(prevTasks => ([...prevTasks, rowInfo.original]))
                                                   const index = filteredTasks.findIndex(_ => _.TASK_NR === rowInfo.original.TASK_NR)
                                                   dispatch({type: 'SET_STATE_SELECTED', payload: { index, value: !rowInfo.original.selected }})
                                                } else {

                                                   const newTasks = tasks.filter(_ => _.TASK_NR !== rowInfo.original.TASK_NR)
                                                  
                                                   setSelectedTasks(newTasks)

                                                   const index = filteredTasks.findIndex(_ => _.TASK_NR === rowInfo.original.TASK_NR)

                                                   dispatch({type: 'SET_STATE_SELECTED', payload: { index, value: !rowInfo.original.selected }})
                                                }
                                             }

                                          },
                                            
                                       }
                                                
                                    }}
                                    data={filteredTasks}
                                    columns={[{
                                       Header: `Tasks`,
                                       columns: [
                                        
                                          {
                                             Header: "Description",
                                             accessor: "DESCRIPTION"
                                          },
                                          {
                                             Header: "Developer Comments",
                                             accessor: "DEVELOPER_COMMENTS",
                                          
                                          },
                                          {
                                             Header: "Est. Hours",
                                             accessor: "CP_EST_HRS_COMPLETION",
                                          
                                          },
                                          {
                                             Header: "Last Date Logged",
                                             accessor: "DATE_LOGGED",
                                             Cell: (_) => <span>{ moment(_.value).format("YYYY-MM-DD")}</span>
                                          
                                          },
                                          {
                                             Header: "Added",
                                             accessor: "selected",
                                             Cell: (_) => <span>{ _.value ? 'Yes' : 'No'}</span>
                                          
                                          },
                                       
                                       
                                       ]
                                    }]}
                           
                                    defaultPageSize={6}
                                    className="-highlight offer-box"
                                 />
                              </> :
                                 
                              <>
                                 <h5 className="mb-2" style={{color: '#a31423', fontWeight: 'bold'}}>Book Details</h5>
                              
                                 <ContractPoint callback={bookUpdate} isNumber model="book" field="bookNumber" id={currentBook.id} title="Book Number" value={ currentBook.bookNumber } icon="fas fa-file-contract" />
                                 <ContractPoint callback={bookUpdate} model="book" field="month" id={currentBook.id} title="Month" value={ currentBook.month } icon="fas fa-file-contract" />
                                 <ContractPoint callback={bookUpdate} isNumber model="book" field="year" id={currentBook.id} title="Year" value={ currentBook.year } icon="fas fa-file-contract" />
                                 <ContractPoint callback={bookUpdate} isNumber model="book" field="hours" id={currentBook.id} title="Hours" value={ currentBook.hours } icon="fas fa-file-contract" />

                              </>
                                

                                  
                                 }
                           </Col> 
                           
                           <Col sm={12} xs={12} lg={addModeOn? 6:8} md={addModeOn? 6:8} xl={addModeOn? 6:8}>
                              <div className="d-flex justify-content-end my-2">
                                 <span onClick={ setUpAddMode } title="Add Tasks" className="icon"><i className="fas fa-plus-circle fa-2x"></i></span> 
                                 <span onClick={() => localDispatch({type: 'INPUT', field: 'currentBook', value: {} })} title="Bookings" className="icon ml-2"><i className="fas fa-th-list fa-2x"></i></span>
                              </div>
                              <ReactTable

                                 getTdProps={(state, rowInfo, column, instance) => {
                                    
                                    return {
                                       
                                       onDoubleClick: (e) => {
                                          if(rowInfo) {

                                             deleteAddedTask(rowInfo.original)
                                          }
                                       },
                                       
                                    }
                                             
                                 }}

                                 data={currentBook.offerTasks}
                                 columns={[
                                    {
                                       Header: `Tasks`,
                                       columns: [
                                          {
                                             Header: "Task Number",
                                             accessor: "TASK_NR"
                                          },
                                          
                                          {
                                             Header: "Description",
                                             accessor: "DESCRIPTION"
                                          },
                                          {
                                             Header: "Developer Comments",
                                             accessor: "DEVELOPER_COMMENTS",
                                          
                                          },
                                          {
                                             Header: "Est. Hours",
                                             accessor: "CP_EST_HRS_COMPLETION",
                                          
                                          },
                                          
                                       ]
                                    }
                                 ]}
                                 defaultPageSize={6}
                                 className="-highlight offer-box mb-2"
                              />
                           </Col> 
                        </> :  ''
                        
                  }
                  {
                     currentBook.hasOwnProperty('bookNumber')? 
                     '' : <Col sm={12} xs={12} lg={12} md={12 } xl={12}>
                           <h5 className="my-2" style={{color: '#a31423', fontWeight: 'bold'}}>Total Hours: {currentOffer.hours} </h5>
                           <ReactTable

                              getTdProps={(state, rowInfo, column, instance) => {
                                 

                                 return {
                                    onClick: (e) => {
                                       if(rowInfo) {
                                       
                                          localDispatch({type:'SET_INDEXES', payload: { model:'book', value: rowInfo.index } })
                                          localDispatch({type: 'INPUT', field: 'currentBook', value:rowInfo.original})
                                             
                                       }
                                    },
                                       
                                 }
                              }}

                              data={currentOffer.books}
                              columns={[
                                 {
                                    Header: `Bookings`,
                                    columns: [
                                       {
                                          Header: "Book Number",
                                          accessor: "bookNumber"
                                       },
                                       
                                       {
                                          Header: "Month",
                                          accessor: "month"
                                       },
                                       {
                                          Header: "Year",
                                          accessor: "year",
                                       
                                       },
                                       {
                                          Header: "Used Amount",
                                          accessor: "amount",
                                       
                                       },
                                       {
                                          Header: "Used Hours",
                                          accessor: "hours",
                                       
                                       },
                                       {
                                          Header: "Date Created",
                                          accessor: "createdAt",
                                          Cell: (_) => <span>{ moment(_.value).format("YYYY-MM-DD")}</span>
                                       
                                       },

                                    ]
                                 }
                              ]}
                              defaultPageSize={6}
                              className="-highlight offer-box mb-2"
                           />
                        </Col>
                  }
                  
               </Row>
            </ModalBody>
            <ModalFooter>
               <Button type="button" className="btn-exact-default" onClick={() => setOfferTasksModal(false)}>Close</Button>
            </ModalFooter>
         </Modal>
      </div>
   )
}

export default OfferTasksModal
