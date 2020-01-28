import React, { useContext, useEffect, useReducer } from 'react'
import './report.css'
import axios from 'axios'

import { 

   Row, 
   Col,  
   Card,
   Container

} from 'reactstrap'

import ContractDetail from './ContractDetail'
import OpenSubContract from './OpenSubContract'
import MonthlySubContract from './MonthlySubContract'
import OfferChart from './OfferChart'
import Details from './Details'

// Common
import Page from '../common/Page'
import Spinners from '../common/Spinner'
import Selections from '../common/Selections'
import Logo from '../common/Logo'
import logo from '../../brand/ec.jpg'
import Button from '../common/Button'
// import SearchBar from '../common/SearchBar'
// Context
import { ClientContext } from '../../contexts/ClientContext'
import { ContractContext } from '../../contexts/ContractContext'
// reducers

import ReportReducer from './reducer'

const initialState = {
   
   today: new Date(),
   clientId: '',
   contractId: '',
   subContractId: '',
   invoiceNumber: '',
   currentOffer: {},
   selectedOffer: {},
   currentContract: {},
   currentSubContract: {},
   selectedTasks: [],
   selectedMonth: '',
   selectedYear: 0,
   monthSubcontract: [],
   chartOptions: {
      colors: ['#f13c28', '#414141'],

      tooltip: {
         y: {
            formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {

               if(value) {
                  
                  return `CHF ${value.toLocaleString().split(',').join("'")}`
               }
               return value
            }
         }
      },
    
      labels: ['Bereits Genutzt', 'Offen'],
      dataLabels: {
         enabled: true,
       
         formatter: function (val, opts) {
             return `${parseInt(val)}%`
         },
      },

   },
   chartSeries: [],

   barOptions:{
      colors: ['#f13c28', '#7a7a7a'],
      tooltip: {
         y: {
            formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {

               if(value) {
                  
                  return `CHF ${value.toLocaleString().split(',').join("'")}`
               }
               return value
            }
         }
      },
      chart: {
         
          stacked: true,
       
      },
      xaxis: {
         type: 'category',
         categories: [],
      },
      legend: {
         position: 'right',
         offsetY: 40
      },
     
      plotOptions: {
          bar: {
              horizontal: false,
          },
      },

      dataLabels: {
         enabled: true,
       
         formatter: function (val, opts) {
             return `CHF ${parseInt(val).toLocaleString().split(',').join("'")}`
         },
      },
     
   },

   barSeries: [{
         name: 'Offertvolumen',
         data: []
      },{
         name: 'Genutzt',
         data: []
   }],

   barOfferOptions:{
      colors: ['#f13c28', '#7a7a7a'],
      tooltip: {
         y: {
            formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {

               if(value) {
                  
                  return `CHF ${value.toLocaleString().split(',').join("'")}`
               }
               return value
            }
         }
      },
      chart: {
         
          stacked: true,
       
      },
      xaxis: {
         type: 'category',
         categories: [],
      },
      legend: {
         position: 'right',
         offsetY: 40
      },
     
      plotOptions: {
          bar: {
              horizontal: false,
          },
      },

      dataLabels: {
         enabled: true,
       
         formatter: function (val, opts) {
             return `CHF ${parseInt(val).toLocaleString().split(',').join("'")}`
         },
      },
     
   },

   barOfferSeries: [{
         name: 'Offertvolumen',
         data: []
      },{
         name: 'Genutzt',
         data: []
   }],
   
}

const Report = () => {
   
   const { withContracts, dispatch: clientDispatch } = useContext(ClientContext)
   const { dispatch, contracts } = useContext(ContractContext)
   
   const [state, localDispatch] = useReducer(ReportReducer, initialState)   

   const { 
      currentContract,
      chartSeries,
      chartOptions,
      barOptions,
      barSeries,
      selectedMonth,
      monthSubcontract,
      barOfferOptions,
      barOfferSeries
   } = state

   useEffect(() => {


      (async () => {
         
         const resWithContracts = await axios.get('/api/clientwithcontract')
         clientDispatch({type: 'SET_WITHCONTRACTS', payload: resWithContracts.data})
      })()
      
      document.title = 'Reports'
      
   }, [clientDispatch])

   
   const buildBarOptions = (subContracts, openSubContracts) => {




      const barOptionCategory = openSubContracts.map(sc => sc.name)
      const barSeriesVolumen = openSubContracts.map(sc => sc.offerAmount - sc.usedAmount)
      const barSeriesGenutzt = openSubContracts.map(sc => sc.usedAmount)


      let barOfferOptionsCategory = []
      let barOfferSeriesVolumen = []
      let barOfferSeriesGenutzt = []


      for (const sc of subContracts) {
         for (const offer of sc.offerPositions) {
            
            barOfferOptionsCategory.push(offer.offerName)
            barOfferSeriesVolumen.push(offer.openAmount)
            barOfferSeriesGenutzt.push(offer.usedAmount)
         }
      }

      const newBarOptions = {

         colors: ['#f13c28', '#7a7a7a'],
         tooltip: {
            y: {
               formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
   
                  if(value) {
                     
                     return `CHF ${value.toLocaleString().split(',').join("'")}`
                  }
                  return value
               }
            }
         },
         chart: {
            
             stacked: true,
          
         },
         xaxis: {
            type: 'category',
            categories: barOptionCategory,
         },
         legend: {
            position: 'right',
            offsetY: 40
         },
        
         plotOptions: {
             bar: {
                 horizontal: false,
             },
         },
   
         dataLabels: {
            enabled: true,
          
            formatter: function (val, opts) {
                return `CHF ${parseInt(val).toLocaleString().split(',').join("'")}`
            },
         },
        
      }

      const newBarSeries = [{
            name: 'Offertvolumen',
            data: barSeriesVolumen
         },{
            name: 'Genutzt',
            data: barSeriesGenutzt
      }]

      const newBarOfferOptions = {
         colors: ['#f13c28', '#7a7a7a'],
         tooltip: {
            y: {
               formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
   
                  if(value) {
                     
                     return `CHF ${value.toLocaleString().split(',').join("'")}`
                  }
                  return value
               }
            }
         },
         chart: {
            
             stacked: true,
          
         },
         xaxis: {
            type: 'category',
            categories: barOfferOptionsCategory,
         },
         legend: {
            position: 'right',
            offsetY: 40
         },
        
         plotOptions: {
             bar: {
                 horizontal: false,
             },
         },
   
         dataLabels: {
            enabled: true,
          
            formatter: function (val, opts) {
                return `CHF ${parseInt(val).toLocaleString().split(',').join("'")}`
            },
         },
        
      }

      const newBarOfferSeries = [{
            name: 'Offertvolumen',
            data: barOfferSeriesVolumen
         },{
            name: 'Genutzt',
            data: barOfferSeriesGenutzt
      }]

      return {
         newBarOptions,
         newBarOfferOptions,
         newBarSeries,
         newBarOfferSeries
      }

   }


   const handleChange = (model, e) => {
   
      
      switch (model) {
         case 'client':

            dispatch({type:'SET_SELECTED_CLIENT', payload: parseInt(e)})
            localDispatch({type:'SET_LOCAL_SELECT_CONTRACT', payload: {} })
            break;
      
         case 'contract':
            
            if (parseInt(e.currentTarget.value)) {

               
               const index = contracts.findIndex(_ =>  parseInt(e.currentTarget.value) === _.id)
               const openSubContracts = contracts[index].subContracts.filter( sc => sc.status === 'Progress' )

               console.log(openSubContracts)

               const {

                  newBarOptions,
                  newBarOfferOptions,
                  newBarSeries,
                  newBarOfferSeries
      
               } = buildBarOptions(contracts[index].subContracts, openSubContracts)

               localDispatch({type:'SET_LOCAL_SELECT_CONTRACT', payload:contracts[index]})


               localDispatch({
                  type:'SET_BAR_CHART_SERIES',
                  payload:{ 
                     newBarOptions,
                     newBarOfferOptions,
                     newBarSeries,
                     newBarOfferSeries
                  }
               })

               localDispatch({type:'SET_CHART_SERIES', payload: [ (contracts[index].fixedContractAmount - contracts[index].usedAmount), contracts[index].usedAmount ] })

               dispatch({type:'CONTRACT_SELECT', payload: parseInt(e.currentTarget.value)})


            } else {
               
              
               localDispatch({type:'SET_LOCAL_SELECT_CONTRACT', payload: {} })
               localDispatch({type:'SET_CHART_SERIES', payload: [ 0, 0 ] })

               dispatch({type:'CONTRACT_SELECT', payload: parseInt(e.currentTarget.value)})
            }
            
            break;
          
         default:
           
            break;
      }

      
   }

   const getNumberofOffer = (subContract) => {
      
      const offers = subContract.offerPositions.map(offer => offer.status === 'Progress')

      return offers.length
   }

   const buildMonthlySubcontract = (e) => {
      
      if(parseInt(e.currentTarget.value)) {

         const forMonthName = new Date(`2019-0${parseInt(e.currentTarget.value)}-01`)

         var options = { month: 'long' };

         const monthName = forMonthName.toLocaleDateString('de-DE', options)
        
         const month = parseInt(e.currentTarget.value) - 1

         const subContracts = currentContract.subContracts.reduce((obj, sub) => {

         
            const date = new Date(sub.approvedDate)
           
         
            if(date.getMonth() === month) {

               obj.push(sub)
            }

            return obj
         }, [])

         localDispatch({type:'SET_SUBPROJECTS_ON_MONTH', payload: {subContracts, month: monthName} })
      }
      

   }


   return (

      <Page icon="fas fa-chart-bar" title="Reports" description="View reports">

         <Row className="report-head">
            <Col sm={12} xs={12} lg={4} md={4} xl={4}>

               {
                 withContracts.length? 
                  <Selections label="Clients" onChange={ (e) => handleChange('client', e.currentTarget.value) }>
                     <option value={0} >Select Client</option>
                     {
                        withContracts.map(client => (
                           <option key={ client.id } value={client.clientId}>{ client.name }</option>
                        ))
                     }
                     </Selections> : <Spinners className="mt-2" />
                     // <SearchBar callback={handleChange} /> : <Spinners className="mt-2" />
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

            <Col sm={12} xs={12} lg={5} md={5} xl={5} className="d-flex align-items-center justify-content-end">

                        
               <Button className="btn-exact-sm" onClick={ () => { window.print() } }> Export Report </Button>
            </Col>
         </Row>

         <Row className="gege">
                  
            <Col sm={12} xs={12} lg={12} md={12} xl={12}>
               
               <Card body className="border-0">
                  {
                     currentContract.hasOwnProperty('clientName') ? 
                     <Container>
                        <Row>       
                           <Col sm={12} xs={12} lg={12} md={12} xl={12}>
                              <div className="d-flex justify-content-between">
                                 <Logo logo={logo} height={50} width={55} />
                                 <div className="mt-5">
                                    <h5 style={{color: '#a31423', fontWeight: 'bold'}}>{currentContract.clientName}</h5>
                                 </div>
                                 <Logo logo={logo} height={50} width={55} />
                              </div>
                              
                           
                           </Col>
                        </Row>

                        <ContractDetail currentContract={currentContract} chartOptions={chartOptions} chartSeries={chartSeries} />

                        <OpenSubContract barOptions={barOptions} barSeries={barSeries}/>
                     
                        <MonthlySubContract selectedMonth={selectedMonth} buildMonthlySubcontract={buildMonthlySubcontract} monthSubcontract={monthSubcontract} />

                        <OfferChart barOfferOptions={barOfferOptions} barOfferSeries={barOfferSeries} />

                        <Details currentContract={currentContract} getNumberofOffer={getNumberofOffer} /> 

                     </Container> : <h5>Select Contract</h5>
                  }
                  
               </Card>
              
            </Col>
         </Row>
         
      </Page>
     
   )
}

export default Report

