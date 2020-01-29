import React, { useContext, useEffect, useReducer, lazy, Suspense, useState, useRef } from 'react'
import './time.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
import axios from 'axios'
import { 

   Form,
   Row, 
   Col,
   FormGroup,
   CustomInput,
   Container

} from 'reactstrap'

import Page from '../common/Page'
// import SearchBar from '../common/SearchBar'
// import AddInvoice from './AddInvoice'
import Selections from '../common/Selections'
import OfferList from './OfferList'
// import InvoiceList from './InvoiceList'
import SnackBar from '../common/SnackBar'
import Spinners from '../common/Spinner'
import TimeBookModal from './TimeBookModal'
import OfferTasksModal from './OfferTasksModal'
// reducer
import TimeReducer from './reducer'

// context
import { ContractContext } from '../../contexts/ContractContext'
import { ClientContext } from '../../contexts/ClientContext'
import { TaskContext } from '../../contexts/TaskContext'
// lazy

const TaskList = lazy(() => import('./TaskList')) 

const today = new Date()
const initialState = {
   
   hours: 0,
   month: 'January',
   year: today.getFullYear(),
   clientId: '',
   contractId: '',
   offerPositionId: '',
   subContractId: '',
   hourlyRate: '',
   amount: 0,
   invoiceNumber: '',
   toAdd: false,
   currentOffer: {},
   selectedOffer: {},
   currentContract: {},
   currentSubContract: {},
   currentBook: {},
   selectedTasks: [],
   indexes: {
      contract: -1,
      subcontract: -1,
      offer: -1,
      book: -1
   },
   totalHours: 0
}

const TimeBooking = () => {

   
   // Contexts
   const { dispatch: clientDispatch, withContracts } = useContext(ClientContext)
   const { addSuccess, snackMessage, dispatch, contracts, subContractList, offerList } = useContext(ContractContext)
   const [state, localDispatch] = useReducer(TimeReducer, initialState)   
   const { dispatch : taskDispatch } = useContext(TaskContext)
   
   useEffect(() => {
      
      (async () => {
          
         const resWithContracts = await axios.get('/api/clientwithcontract')
         clientDispatch({type: 'SET_WITHCONTRACTS', payload: resWithContracts.data})
      })()

      document.title = "Time Booker"

   }, [clientDispatch])

   // refs
   const offerSelect = useRef(null); 

   const [bookModal, setBookModal] = useState(false)
   const [offerTasksModal, setOfferTasksModal] = useState(false)


   const {
      currentOffer,
      selectedTasks,
      totalHours,
      selectedOffer,
      currentContract,
      currentBook,
      currentSubContract,
      indexes
   } = state

   const handleChange = (model, e) => {
      

      localDispatch({type: 'CLEAR_OFFER'})
      
      switch (model) {
         case 'client':

            dispatch({type:'SET_SELECTED_CLIENT', payload: parseInt(e.currentTarget.value)})
            break;
      
         case 'contract':
            
            const index = contracts.findIndex(_ =>  parseInt(e.currentTarget.value) === _.id)

            localDispatch({type:'SET_LOCAL_SELECT_CONTRACT', payload:contracts[index]})
            localDispatch({type:'SET_INDEXES', payload: { model:'contract', value: index } })

            dispatch({type:'CONTRACT_SELECT', payload: parseInt(e.currentTarget.value)})

            taskDispatch({type: 'FILTER'})
            break;

         case 'subcontract':
               
               
            const subIndex = currentContract.subContracts.findIndex(_ =>  parseInt(e.currentTarget.value) === _.id)
            console.log(currentContract.subContracts)

            dispatch({type:'SUBCONTRACT_SELECT', payload: parseInt(e.currentTarget.value)}) 
         

            localDispatch({type:'SET_LOCAL_SELECT_SUBCONTRACT', payload: currentContract.subContracts[subIndex]})
            localDispatch({type:'SET_INDEXES', payload: { model:'subcontract', value: subIndex } })
            taskDispatch({type: 'FILTER', payload: currentContract.subContracts[subIndex] })

       
            break;
      
         default:
            console.log(e.currentTarget.value)
            console.log(model)
            break;
      }
   }

   const setCurrentOffer = (id) => {
     
      const index = offerList.findIndex(_ => id === _.id)

      if(index !== -1) {
         
         localDispatch({type: 'INPUT', field: 'selectedOffer', value:offerList[parseInt(index)]})
      } else {

         localDispatch({type: 'CLEAR_SELECTED'})
      }
   }

   const openOfferModal = () => {

      if(Object.keys(selectedOffer).length) {

         setBookModal(true)

         if(offerSelect.current.classList.contains('miss')) {
            
            offerSelect.current.classList.remove('miss')
         }

      } else {

         if(Object.keys(selectedOffer).length < 1) {
            
            offerSelect.current.classList.add('miss')
         }
      }
   }

   const handleClientSelect = (model, e) => {

      dispatch({ type:'SET_SELECTED_CLIENT', payload: e }) 
   }
 
   return (
      <Page icon="fas fa-clock fa-2x" title="Time Booker" description="Book time on offer positions">
         
         <Row>
            <Col sm={12} xs={12} lg={4} md={4} xl={4}>

            
               {
                  withContracts.length? 
                     <Selections label="Clients" onChange={ (e) => handleClientSelect('client', e.currentTarget.value) }>
                        <option value={0} >Select Client</option>
                        {
                           withContracts.map(client => (
                              <option key={ client.id } value={client.clientId}>{ client.name }</option>
                           ))
                        }
                     </Selections> : <Spinners className="mt-2" />
                     // <SearchBar callback={handleClientSelect} /> : <Spinners className="mt-2" />
               }
               
            </Col>

            <Col sm={12} xs={12} lg={3} md={3} xl={3}>

            
               <Selections label="Contracts" onChange={  (e) => handleChange('contract', e) }>
                  <option value={0} >Select Data</option>
                  {
                     contracts.map(contract => (
                        <option key={ contract.id } value={contract.id}>{ contract.name }</option>
                     ))
                  }
               </Selections>
            </Col>

            <Col sm={12} xs={12} lg={3} md={3} xl={3}>

           
               <Selections label="Sub-Contracts" onChange={ (e) => handleChange('subcontract', e) }>
                  <option value={0}>Select Data</option>
                  {
                     subContractList.map(contract => (
                        <option key={ contract.id } value={contract.id}>{ contract.name }</option>
                     ))
                  }
               </Selections>
               
            </Col>
         </Row>

         <Row className="mt-2">
            <Col sm={12} xs={12} lg={12} md={12} xl={12}>

               <Container fluid>
                  <Row>
                     <Col sm={12} xs={12} lg={6} md={6} xl={6}>
                        <h5 className="flex-fill mt-1" style={{color: '#a31423', fontWeight: 'bold'}}>Assign tasks to offer</h5>
                        
                     </Col>
                     <Col sm={12} xs={12} lg={6} md={6} xl={6}>
                        <div className="d-flex align-items-center flex-fill">
                           <Form className="d-flex align-items-center mb-2 flex-fill mr-2" >
                              
                              <FormGroup className="mb-0 ml-2 flex-fill d-flex align-items-center">
                                 <h6 className="mb-0 mr-2 d-flex align-items-center" >Offer <span title="Select an offer" className="offer-title ml-2" ref={offerSelect}><i className="fas fa-caret-right fa-lg"></i></span></h6> 
                                 <CustomInput onChange={ (e) => setCurrentOffer(parseInt(e.currentTarget.value)) } className="shadow-sm ml-2" bsSize="sm" type="select" id="contractName" name="contractName">
                                 <option value={0}>Select Data</option>
                                 {
                                    
                                    offerList.map(offer => (
                                       <option key={ offer.id } value={offer.id}>{ offer.offerName }</option>
                                    ))
                                 }
                                 </CustomInput>
                                 
                              </FormGroup>
                           </Form>
                           <span onClick={ openOfferModal } className="icon mb-2"><i className="fas fa-tasks fa-lg"></i></span>
                           {
                              selectedTasks.length > 0?
                                 <span className="badge">{selectedTasks.length}</span> : ''
                           }
                        </div>
                     </Col>
                  </Row>
               </Container>
               
               <Suspense fallback={<Spinners />}>

                  <TaskList localDispatch={localDispatch} />
               </Suspense>
            </Col>
          
         </Row>

         <Row className="mt-3">
            <Col className="my-2">
               <h5 style={{color: '#a31423', fontWeight: 'bold'}}>Offers</h5>
            </Col>
         </Row>

         <Row>
            <Col sm={12} xs={12} lg={12} md={12} xl={12}>

               <OfferList offerList={offerList} localDispatch={localDispatch} setOfferTasksModal={setOfferTasksModal} />

            </Col>   
            {/* {
               currentOffer.offerName? 
                  <Col sm={12} xs={12} lg={6} md={6} xl={6}>

                     {
                        toAdd?
                           <AddInvoice state={state} localDispatch={localDispatch} handleSubmit={handleSubmit} /> :
                           <InvoiceList currentOffer={currentOffer}/>
                     }
                  </Col>:''
            } */}
            
         </Row>
         <TimeBookModal 
            bookModal={ bookModal } 
            setBookModal={ setBookModal } 
            selectedTasks={ selectedTasks } 
            totalHours={ totalHours }
            localDispatch={ localDispatch }
            selectedOffer={selectedOffer}
            currentContract={currentContract}
            currentSubContract={currentSubContract}
            state={state}
         />

         <OfferTasksModal 
            offerTasksModal={ offerTasksModal } 
            setOfferTasksModal={ setOfferTasksModal } 
            currentOffer={currentOffer}
            currentContract={currentContract}
            currentBook={currentBook}
            currentSubContract={currentSubContract}
            localDispatch={ localDispatch }
            indexes={indexes}
         />
         {
            
            addSuccess? 
               <SnackBar message={snackMessage} /> : ''
         }

      </Page>
   )
}

export default TimeBooking
