import React, { useReducer, Fragment, lazy, Suspense, useContext, useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import './style.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
import axios from 'axios'
import { 

   Container, 
   Row, 
   Col,
   Alert,
      
} from 'reactstrap'

import AddContract from  './AddContract'
import ViewContract from  './ViewContract'
import ViewSubContract from  './ViewSubContract'
import HeadBanner from '../common/HeadBanner'
import SnackBar from '../common/SnackBar'
import Spinners from '../common/Spinner'
import SubContractItem from './SubContractItem'
import OfferPositionItem from './OfferPositionItem'
import ExpenseItem from './ExpenseItem'
import ViewOfferPosition from './ViewOfferPosition'
import AddSubContract from './AddSubContract'
import DeleteModal from './DeleteModal'
import AddOfferPosition from './AddOfferPosition'
import AddExpense from './AddExpense'
import ReportBanner from './ReportBanner'
// import SearchBar from '../common/SearchBar'
import Selections from '../common/Selections'

// Reducer
import reducer from  './reducers/reducer'

// context
import { ContractContext } from '../../contexts/ContractContext'
import { ClientContext } from '../../contexts/ClientContext'

const ContractItem = lazy( () => import('./ContractItem'))  

const initialState = {

   createIsOpen: true,
   viewContractIsOpen: false,

   createSubcontractIsOpen: false,
   subcontractIsOpen: false,
   subcontractItemIsOpen: false,

   offerPositionItemIsOpen: false,
   offerPositionIsOpen: false,
   expenseIsOpen: false,
 
   inValidForm: false,
   selectedObjectModel: {},
   selectedModel: '',
   forDelete: false,
   currentContract: {},
   currentSubContract: {},
   currentOfferPosition: {},
   width: 6
}

const Contract = () => {

   // Contexts and Reducer init
   const [state, localDispatch] = useReducer(reducer, initialState)
   const { clients, dispatch: clientDispatch, withContracts } = useContext(ClientContext)
   const { addSuccess, snackMessage, dispatch, contracts, selectedClient } = useContext(ContractContext)

   // local state
   const [subContractModal, toggleSCModal] = useState (false)
   const [offerPositionModal, toggleOPModal] = useState (false)
   const [expenseModal, toggleEModal] = useState (false)
   const [deleteWindowIsOpen, toggleDeleteWindow] = useState (false)
   // const [selectedClient, setSelectedClient] = useState (1)

   useEffect(() => {

      (async () => {
         
         try {

            const resWithContracts = await axios.get('/api/clientwithcontract')
            clientDispatch({type: 'SET_WITHCONTRACTS', payload: resWithContracts.data})
         } catch(e) {
            console.log(e)
         }
      })()
      
   }, [clientDispatch])

   useEffect(() => {

      (async () => {

         
         try {

            const resClients = await axios.get('/api/clients')
            clientDispatch({type: 'SET_CLIENTS', payload: resClients.data})
         } catch(e) {
            console.log(e)
         }
         
      })()

   }, [clientDispatch])

   const { 

      createIsOpen,
      width,
      subcontractIsOpen,
      viewContractIsOpen,
      currentContract,
      subcontractItemIsOpen,
      currentSubContract,
      currentOfferPosition,
      offerPositionItemIsOpen,
      offerPositionIsOpen,
      selectedObjectModel,
      selectedModel,
      expenseIsOpen
   } = state

   useEffect(() => {
     
    
      localDispatch({type: 'OPEN_CREATE_FORM'})
   }, [selectedClient])

   const props = useSpring({ 
      to: {
         opacity: 1, 
         marginLeft: 0
      }, 

      from: { 
         opacity: 0, 
         marginLeft: -500 
      }, 
      delay: 380,
      
   })

   // Contract
   const openViewContract = (contract) => {

      dispatch({ type: 'SET_CURRENTS', payload: contract.id, current: 'currentContractId' })
      localDispatch({type: 'OPEN_CONTRACT', payload: contract})
   }

   const openAddContract = () => {

      localDispatch({type: 'OPEN_CREATE_FORM'})
   }

   const openDeleteWindow = (data, model) => {

      localDispatch({type: 'SET_FOR_DELETE', data, model})
  
      toggleDeleteWindow(!deleteWindowIsOpen)
   
   }

  
   // Sub Contract
   const openCreateSubContract = () => {

      localDispatch({type: 'OPEN_SUB_CONTRACT_FORM' })
   }

   const openViewSubContract = (subContract) => {

      dispatch({ type: 'SET_CURRENTS', payload: subContract.id, current: 'currentSubContractId' })
      localDispatch({type: 'OPEN_SUB_CONTRACT', payload: subContract })
   }

   // Offer Position

   const openViewOfferPosition = (offerPosition) => {
      dispatch({ type: 'SET_CURRENTS', payload: offerPosition.id, current: 'currentOfferPositionId' })
      localDispatch({type: 'OPEN_OFFER_POSITION', payload: offerPosition })
   }

   const handleClientSelect = (model, e) => {
      
      dispatch({ type:'SET_SELECTED_CLIENT', payload: e }) 
   }


   return (
      <Fragment>

         <animated.div style={props}>

            <Container fluid>
               <Row>

                  <Col>
                     <div className="">
                        <HeadBanner title="Contracts" description="Client contracts" icon="fas fa-file-contract" withButton callback={openAddContract} />
                     </div>
                  </Col>
                
               </Row>

               <Row>
                  <Col>
                     <ReportBanner contracts={contracts} selectedClient={selectedClient} clients={withContracts}/>
                  </Col>
               </Row>

               <Row className="mt-3">

                  <Col sm={12} xs={12} lg={6} md={6} xl={6}>
                  
                     {
                        clients.length? 
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
                
               </Row>
               <Row>
                  <Col sm={12} xs={12} lg={width} md={width} xl={width} >  
                     {
                        viewContractIsOpen?

                           <Fragment> 
                              <div className="d-flex align-items-center mb-1">
                                 <h5 style={{color: '#a31423', fontWeight: 'bold'}}>Contract</h5>

                                 
                                 <span className="ml-auto icon" onClick={openAddContract}><i className="fas fa-caret-square-up fa-lg"></i></span>
                              </div>
                              <ViewContract  state={state} openCreateSubContract={openCreateSubContract} />
                           </Fragment> :
                           <Fragment>
                              
                              <h5 className="ml-3" style={{color: '#a31423', fontWeight: 'bold'}}>Contract Volume</h5>
                              {
                                 contracts.length > 0?
                                    <Suspense fallback={ <Spinners/> }>

                                       <ContractItem openViewContract={openViewContract} openDeleteWindow={openDeleteWindow} />
                                    
                                    </Suspense>:
                                    <Alert className="mt-2 shadow-sm" color="danger">
                                       List is empty.
                                    </Alert>
                              }
                              
                           </Fragment>
                        
                     }
                  
                  </Col>

                     {
                        
                        subcontractItemIsOpen?
                        <Col sm={12} xs={12} lg={width} md={width} xl={width} >
                           <div className="d-flex justify-content-between align-items-center mb-2">

                              <h5 className="ml-3" style={{color: '#a31423', fontWeight: 'bold'}}>Sub Contracts</h5>
                              <span className="icon mr-3 mb-1" onClick={() => toggleSCModal(!subContractModal)}><i className="fas fa-plus-circle fa-lg"></i></span>
                           </div>

                           <AddSubContract subContractModal={subContractModal} toggleSCModal={toggleSCModal} contract={currentContract} />
                        
                           {
                              
                              currentContract.subContracts.length > 0 ? 
                                 <SubContractItem subContracts={currentContract.subContracts}  openViewSubContract={openViewSubContract} openDeleteWindow={openDeleteWindow} />:
                                 <Alert color="warning">
                                    Empty <strong>Subcontract for {currentContract.name}</strong>, add one now!
                                 </Alert>
                           }
                           
                        </Col> : ''
                     }

                     {

                        subcontractIsOpen?
                        <Col sm={12} xs={12} lg={width} md={width} xl={width} >
                           <div className="d-flex align-items-center mb-1">
                              <h5 style={{color: '#a31423', fontWeight: 'bold'}}>Sub Contract</h5>

                              
                              <span className="ml-auto icon" onClick={() => openViewContract(currentContract)}><i className="fas  fa-caret-square-up fa-lg"></i></span>
                           
                           </div>

                           <ViewSubContract state={state} />
                        </Col> : ''
                     }

                     {

                        offerPositionItemIsOpen?
                        <Col sm={12} xs={12} lg={width} md={width} xl={width} >
                           <div className="d-flex justify-content-between align-items-center mb-2">

                              <h5 className="ml-3" style={{color: '#a31423', fontWeight: 'bold'}}>Offer Positions</h5>
                              <span className="icon mr-3 mb-1" onClick={() => toggleOPModal(!offerPositionModal)}><i className="fas fa-plus-circle fa-lg"></i></span>
                           </div>

                           <AddOfferPosition offerPositionModal={offerPositionModal} toggleOPModal={toggleOPModal} subContract={currentSubContract} />
                           {
                              currentSubContract.offerPositions.length > 0? 
                                 <OfferPositionItem offerPositions={currentSubContract.offerPositions} openViewOfferPosition={openViewOfferPosition} openDeleteWindow={openDeleteWindow} />:
                                 <Alert color="warning">
                                    Empty <strong>Offer Position for {currentSubContract.name}</strong>, add one now!
                                 </Alert>
                           }
                        
                        </Col> : ''
                     }

                     {

                        offerPositionIsOpen?

                           <Col sm={12} xs={12} lg={width} md={width} xl={width} >

                              <div className="d-flex align-items-center mb-1">
                                 <h5 style={{color: '#a31423', fontWeight: 'bold'}}>Offer Position</h5>
                                 
                                 <span className="ml-auto icon" onClick={() => openViewSubContract(currentSubContract)}><i className="fas  fa-caret-square-up fa-lg"></i></span>
                              </div>

                              <ViewOfferPosition state={state}  />
                           </Col> : ''
                     }

                 
                     {

                        createIsOpen?                     
                        <Col sm={12} xs={12} lg={width} md={width} xl={width} className="mb-3">
                           <Suspense fallback={ <Spinners/> }>

                              <AddContract localDispatch={localDispatch} state={state} selectedClient={selectedClient} /> 
                           </Suspense>
                           
                        </Col>: ''
                     }
                     
               </Row>
               <Row className="mt-3"> 
                  <Col sm={12} xs={12} lg={12} md={12} xl={12} >
                     <div className="d-flex justify-content-between align-items-center mb-2">

                        <h5 style={{color: '#a31423', fontWeight: 'bold'}}>Expenses</h5>
                        
                        <span className="icon mr-3 mb-1" onClick={() => toggleEModal(!expenseModal)}><i className="fas fa-plus-circle fa-lg"></i></span>
                     </div>
                     {/* <AddExpense toggleEModal={toggleEModal} expenseModal={expenseModal} offerPosition={currentOfferPosition} />
                     {
                        currentOfferPosition.expenses.length > 0?
                           <ExpenseItem expenses={currentOfferPosition.expenses} openDeleteWindow={openDeleteWindow} />:
                           <Alert color="warning">
                              Empty <strong>Expenses for {currentOfferPosition.offerName}</strong>, add one now!
                           </Alert>
                     } */}
                     
                  </Col> 
               </Row>
            </Container>

            <DeleteModal deleteWindowIsOpen={deleteWindowIsOpen} toggleDeleteWindow={toggleDeleteWindow} data={selectedObjectModel} model={selectedModel} />

            <animated.div style={props}>
               {
               
                  addSuccess? 
                  <SnackBar message={snackMessage} /> : ''
               }
            </animated.div> 
         </animated.div>
      </Fragment>
        
   )
}

export default Contract
