import React, { useContext, useState } from 'react'
import './style.css'
import { validContractForm } from '../../api/validation'
import axios from 'axios'
// Exte3rd partyrnal imports
import PerfectScrollbar from 'react-perfect-scrollbar'
import "react-datepicker/dist/react-datepicker.css"
import { useSpring, animated } from 'react-spring'
import { 
   Card,
   Form, 
   FormGroup, 
   Label, 
   Input,
   Row,
   Col,
   Alert
   
} from 'reactstrap'

// Components
import Button from '../common/Button'
import Selections from '../common/Selections'

// Context
import { ContractContext } from '../../contexts/ContractContext'
import { ClientContext } from '../../contexts/ClientContext'

const AddCrontract = ({localDispatch, state, selectedClient}) => {

   const Contract = useContext(ContractContext)
   const { clients, dispatch: clientDispatch } = useContext(ClientContext)
   const [isProcessing, setProcessState] = useState(false)
   const { inValidForm } = state
   const {

      contractNumber,
      name,
      startDate,
      endDate,
      fixedContractAmount,
      paymentMethod,
      periodicity,
      fixedPaymentAmount,
      hourlyRate,
      travelExpense,
      clientName,
      comments,
      clientId

    } = Contract

   const props = useSpring({ 
      to: {
         opacity: 1, 
      }, 

      from: { 
         opacity: 0,
         
      }, 
      delay: 350,
      
   })

   const setClientDetails = (e) => {
      
      const client = JSON.parse(e.currentTarget.value)
      console.log(client)
      Contract.dispatch({type: 'INPUT', field:'clientId', value: client.CLIENT_ID})
      Contract.dispatch({type: 'INPUT', field:'clientName', value: client.CLIENT_NAME})

      // const found = clients.filter(client => client.CLIENT_ID === parseInt(selectedClient) )
      // console.log(found)
      // return found[0].CLIENT_NAME
   }

   const handleSubmit = async (e) => {

      e.preventDefault()
      
      localDispatch({type: 'SUBMIT_FORM'})
      
      const _data = {

         clientId,
         contractNumber: parseInt(`${selectedClient}${contractNumber}`),
         name,
         fixedContractAmount,
         paymentMethod,
         periodicity,
         fixedPaymentAmount,
         hourlyRate,
         clientName,
         travelExpense,
         usedAmount: 0
      }

      console.log(_data)
     
      if(validContractForm(_data)) {
         setProcessState(true)
         localDispatch({type: 'VALID_FORM'})

         _data.startDate = startDate
         _data.endDate = endDate
         _data.comments = comments
         
        await Contract.addContract(_data)
         
        const resWithContracts = await axios.get('/api/clientwithcontract')

         clientDispatch({type: 'SET_WITHCONTRACTS', payload: resWithContracts.data})
         setProcessState(false)
      } else {

         localDispatch({type: 'INVALID_FORM'})
      }
      
   }

   return (

      <animated.div style={props}>
         <Card className="py-3 mb-2 shadow-sm" body>
            <div className="d-flex flex-column">
               <div className="p-2 header-box d-flex justify-content-between align-items-center sticky-top">
                  <h5 style={{color: '#a31423', fontWeight: 'bold'}}>Create Contract</h5>
               
               </div>
               <Form onSubmit={ handleSubmit } className="view-box-form">
                  <PerfectScrollbar className="px-3">
                     
                     <FormGroup>
                        <Label className="mb-0" for="name">Contract Name</Label>
                        <Input type="text" bsSize="sm" onChange={ (e) => Contract.dispatch({type: 'INPUT', field:'name', value: e.currentTarget.value}) }  value={ name } autoComplete="off" />
                     </FormGroup>

                     <FormGroup>
                        <Label className="mb-0" for="name">Contract Number</Label>
                        <Input type="number" bsSize="sm" onChange={ (e) => Contract.dispatch({type: 'INPUT', field:'contractNumber', value: e.currentTarget.value}) }  value={ contractNumber } autoComplete="off" />
                     </FormGroup>

                     <FormGroup>

                        <Selections label="Client" onChange={ setClientDetails }>
                           <option value={0} >Select Client</option>
                           {
                              clients.map(client => (
                                 <option key={ client.CLIENT_ID } value={JSON.stringify(client)} >{ client.CLIENT_NAME }</option>
                              ))
                           }
                        </Selections>
                     </FormGroup>
                     
                     <Row form>
                        <Col md={6}>
                           <FormGroup>
                              <Label className="mb-0" for="startDate">Start Date</Label> <br />
                              <Input type="date" value={startDate} onChange={ (e) => Contract.dispatch({type: 'INPUT', field:'startDate', value: e.currentTarget.value }) } />
                            
                           </FormGroup>
                        </Col>
                        <Col md={6}>
                           <FormGroup>
                              <Label className="mb-0" for="endDate">End Date</Label>
                              <Input type="date" value={endDate} onChange={ (e) => Contract.dispatch({type: 'INPUT', field:'endDate', value: e.currentTarget.value }) } />

                           </FormGroup>
                        </Col>
                        
                     </Row>
                  

                     <FormGroup>
                        <Label className="mb-0" for="fixedContractAmount">Fixed Amount Contract</Label>
                        <Input type="number" bsSize="sm" onChange={ (e) => Contract.dispatch({type: 'INPUT', field:'fixedContractAmount', value: e.currentTarget.value}) } value={ fixedContractAmount } autoComplete="off"/>
                     </FormGroup>

                     <FormGroup>
                        <Label className="mb-0" for="paymentMethod">Payment Method</Label>
                        <Input type="select" bsSize="sm" onChange={ (e) => Contract.dispatch({type: 'INPUT', field:'paymentMethod', value: e.currentTarget.value}) } value={ paymentMethod }>
                           <option>Periodisch</option>
                           <option>Effektiv</option>
                           <option>Vorauskasse</option>
                        </Input>
                     </FormGroup>

                     {
                        paymentMethod ===  'Periodically'? 
                        <Row form>
                           <Col md={6}>
                              <FormGroup>
                                 <Label className="mb-0" for="fixedPaymentAmount">Fixed Payment Amount</Label>
                                 <Input type="number" bsSize="sm" onChange={ (e) => Contract.dispatch({type: 'INPUT', field:'fixedPaymentAmount', value: e.currentTarget.value}) } value={ fixedPaymentAmount } autoComplete="off"/>
                              </FormGroup>
                           </Col>
                           <Col md={6}>

                              <FormGroup>
                                 <Label className="mb-0" for="periodicity">Periodicity</Label>
                                 <Input type="select" bsSize="sm" onChange={ (e) => Contract.dispatch({type: 'INPUT', field:'periodicity', value: e.currentTarget.value}) } value={ periodicity }>
                                    <option>Quarterly</option>
                                    <option>Monthly</option>
                                    <option>Yearly</option>
                                 </Input>
                              </FormGroup>
                           </Col>
                        </Row>: ''
                     }
                     
                     <FormGroup>
                        <Label className="mb-0" for="hourlyRate">Hourly Rate</Label>
                        <Input type="number" bsSize="sm" onChange={ (e) => Contract.dispatch({type: 'INPUT', field:'hourlyRate', value: e.currentTarget.value}) } value={ hourlyRate } autoComplete="off"/>
                     </FormGroup>

                     <FormGroup>
                        <Label className="mb-0" for="travelExpense">Travel Expense</Label>
                        <Input type="select" bsSize="sm" onChange={ (e) => Contract.dispatch({type: 'INPUT', field:'travelExpense', value: parseInt(e.currentTarget.value) }) } value={ travelExpense }>
                           <option value={1}>Ja</option>
                           <option value={0}>Nein</option>
                        </Input>
                     
                     </FormGroup>

                     <FormGroup>
                        <Label className="mb-0" for="Comments">Comments</Label>
                        <Input type="text" bsSize="sm" onChange={ (e) => Contract.dispatch({type: 'INPUT', field:'comments', value: e.currentTarget.value}) } value={ comments } autoComplete="off"/>
                     </FormGroup>

                     <div className="d-flex justify-content-between align-items-center">

                        {
                           !isProcessing?
                           <Button className="btn-exact"> Create Contract </Button>:
                           <Button type="button" className="btn-exact" > <i className="fas fa-cog fa-spin fa-lg"></i> Create Contract </Button>
                        }
                        {
                           inValidForm?
                              <Alert className="mb-0" color="warning">
                                 Please fill all fields
                              </Alert> : ''
                        }
                     </div>
                  </PerfectScrollbar>
               </Form>
            </div>
         </Card>
      </animated.div>
   )
}

export default AddCrontract
