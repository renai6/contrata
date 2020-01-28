import React, { useReducer, useMemo, useCallback, useEffect } from 'react'
import axios from 'axios'
import * as moment from 'moment'
import ContractReducer from '../reducers/ContractReducer'

const today = moment('9999-12-12').format('YYYY-MM-DD')

const initialState = {

   clientId: 1,
   contractNumber: '',
   clientName: '',
   name: '',
   startDate: today,
   endDate: today,
   fixedContractAmount: '',
   paymentMethod: 'Periodically',
   periodicity: 'Quarterly',
   fixedPaymentAmount: 0,
   hourlyRate: '',
   travelExpense: true,
   comments: '',
   isFetching: false,
   contracts: [],
   addSuccess: false,
   snackMessage: '',
   currentContractId: 0,
   currentSubContractId: '',
   currentOfferPositionId: '',
   selectedClient: 0,
   subContractList: [],
   offerList: []
}

export const ContractContext = React.createContext()

export const ContractProvider = props => {

   const [state, dispatch] = useReducer(ContractReducer, initialState)

   useEffect(() => {
     
      const fetchContracts = async () => {
         
         
         const { data } = await axios.get(`/api/contracts/${state.selectedClient}`)
         dispatch({type: 'SET_CONTRACTS' , payload: data})

      }
     
      if(parseInt(state.selectedClient) !== 0) {

         fetchContracts()
      }
      
   }, [state.selectedClient, dispatch])
   
   const addContract = useCallback(async (_data) => {

      const { data } = await axios.post('/api/contracts/add', _data)

      data.subContracts = []

      if(state.currentContractId !== 0) {

         dispatch({type: 'ADD_CONTRACT', payload: data})
      }

      dispatch({type: 'ADD_SUCCESS', payload: 'Contract succesfully added!'})

      setTimeout(() => {
         
         dispatch({type: 'CLEAR_FIELDS'})
      }, 3000);

   }, [state])

   /**
    * 
    * @Object
    * @desc gets index of object in an array depending on the level provided
    * 
    */

   const digToObject = useCallback((_data, level) => {

      let contractIndex
      let subContractIndex
      let offerPositionIndex

      switch (level) {
         case 'two':
            
            contractIndex = state.contracts.findIndex((contract) => contract.id === _data.contractId )

            subContractIndex = state.contracts[contractIndex].subContracts.findIndex((subContract) => subContract.id === _data.subContractId )
   
            return{
               contractIndex,
               subContractIndex
            }

         case 'three':
            
            contractIndex = state.contracts.findIndex((contract) => contract.id === _data.contractId )

            subContractIndex = state.contracts[contractIndex].subContracts.findIndex((subContract) => subContract.id === _data.subContractId )
   
            offerPositionIndex = state.contracts[contractIndex].subContracts[subContractIndex].offerPositions.findIndex((offer) => offer.id === _data.offerPositionId )
   
            return{
               contractIndex,
               subContractIndex,
               offerPositionIndex
            }
      
         default:
            break;
      }
   },[state])

   const addSubContract = useCallback(async (_data) => {

      try {

         const { data } = await axios.post('/api/subcontracts/add', _data)
         const index = state.contracts.findIndex((contract) => contract.id === _data.contractId )

         const contractData = {
            index,
            field: 'usedAmount',
            value: parseInt(_data.offerAmount) + state.contracts[index].usedAmount,
            model: 'contract'
         }

         dispatch({type: 'UPDATE_CONTRACT', payload:contractData })

         data.offerPositions = []
         dispatch({type: 'ADD_SUB_CONTRACT',  payload:{ data, index } })
         dispatch({type: 'ADD_SUCCESS', payload: 'Sub Contract created succesfully!'})

         setTimeout(() => {
         
            dispatch({type: 'CLOSE_SNACK'})
         }, 3000);
   
         return true

      } catch (error) {
         
         return false
      }
      
   
   }, [state])

   const addOfferPosition = useCallback(async (_data) => {
    
      try {

         const { data } = await axios.post('/api/offerpositions/add', _data)
         
         const { contractIndex, subContractIndex } = digToObject(_data, 'two')

         
         const subContractData = {
            contractIndex,
            subContractIndex,
            field: 'usedAmount',
            value: parseInt(_data.offerAmount) + state.contracts[contractIndex].subContracts[subContractIndex].usedAmount,
         } 

         dispatch({type: 'UPDATE_SUB_CONTRACT', payload: subContractData })

         data.expenses = []
         data.books = []

         dispatch({type: 'ADD_OFFER_POSITION',  payload:{ data, contractIndex, subContractIndex } })
         dispatch({type: 'ADD_SUCCESS', payload: 'Offer position created succesfully!'})

         setTimeout(() => {
         
            dispatch({type: 'CLOSE_SNACK'})
         }, 3000);
   
         return true

      } catch (error) {
         
         return false
      }
   }, [digToObject, state.contracts])

   const addExpense = useCallback(async (_data) => {

      try {

         const { data } = await axios.post('/api/expenses/add', _data)

         const { contractIndex, subContractIndex, offerPositionIndex } = digToObject(_data, 'three')

         dispatch({type: 'ADD_EXPENSE',  payload:{ data, contractIndex, subContractIndex, offerPositionIndex } })
         dispatch({type: 'ADD_SUCCESS', payload: 'Expense created succesfully!'})

         setTimeout(() => {
         
            dispatch({type: 'CLOSE_SNACK'})
         }, 3000);
   
         return true

      } catch (error) {
         
         return false
      }
   }, [digToObject])

   const updateProcess = useCallback(async (_data) => {

      switch (_data.model) {
         case 'contract':
            try {

               await axios.put(`/api/contracts/update/${_data.id}`, _data.body)

               const index = state.contracts.findIndex((contract) => contract.id === _data.id )

               _data.index = index
               
               dispatch({type: 'UPDATE_CONTRACT', payload:_data })

            } catch(e) {
               console.log(e)
            }
      
            break;

         case 'subcontract':
            try {

               await axios.put(`/api/subcontracts/update/${_data.id}`, _data.body)

               _data.contractId = state.currentContractId
               _data.subContractId = _data.id

               const { contractIndex, subContractIndex } = digToObject(_data, 'two')

               _data.contractIndex = contractIndex

               _data.subContractIndex = subContractIndex

               dispatch({type: 'UPDATE_SUB_CONTRACT', payload:_data })
               
            } catch(e) {
               console.log(e)
              
            }
      
            break;

         case 'offerposition':
            try {

               await axios.put(`/api/offerpositions/update/${_data.id}`, _data.body)
               
               _data.contractId = state.currentContractId
               _data.subContractId = state.currentSubContractId
               _data.offerPositionId = _data.id

               const { contractIndex, subContractIndex, offerPositionIndex } = digToObject(_data, 'three')

               _data.contractIndex = contractIndex
               _data.subContractIndex = subContractIndex
               _data.offerPositionIndex = offerPositionIndex

               dispatch({type: 'UPDATE_OFFER_POSITION', payload:_data })
               
            } catch(e) {
               console.log(e)
               
            }
      
            break;
      
         default:

            return false
           
      }
   }, [digToObject, state])

   const deleteProcess = useCallback(async (_data, model, id) => {

      switch (model) {
         case 'contract':
            try {

               await axios.put(`/api/contracts/archive/${id}`, _data)

               const index = state.contracts.findIndex((contract) => contract.id === id )

               dispatch({type: 'DELETE_CONTRACT', payload:index })

               console.log(index)
            } catch(e) {
               console.log(e)
            }
      
            break;

         case 'subcontract':
            try {

               await axios.put(`/api/subcontracts/update/${id}`, _data)

               _data.contractId = state.currentContractId
               _data.subContractId = id

               const { contractIndex, subContractIndex } = digToObject(_data, 'two')

               dispatch({type: 'DELETE_SUB_CONTRACT', payload:{ contractIndex, subContractIndex } })
               
            } catch(e) {
               console.log(e)
              
            }
      
            break;

         case 'offerposition':
            try {

               await axios.put(`/api/offerpositions/update/${id}`, _data)

               _data.contractId = state.currentContractId
               _data.subContractId = state.currentSubContractId
               _data.offerPositionId = id

               const { contractIndex, subContractIndex, offerPositionIndex } = digToObject(_data, 'three')

               dispatch({type: 'DELETE_OFFERPOSITION', payload:{contractIndex, subContractIndex, offerPositionIndex} })
               
            } catch(e) {
               console.log(e)
               
            }
      
            break;
      
         case 'expense':
            try {

               await axios.put(`/api/expenses/update/${id}`, _data)

               _data.contractId = state.currentContractId
               _data.subContractId = state.currentSubContractId
               _data.offerPositionId = state.currentSubContractId

               const { contractIndex, subContractIndex, offerPositionIndex } = digToObject(_data, 'three')
            
               const expenseIndex = state.contracts[contractIndex]   
                                       .subContracts[subContractIndex]
                                          .offerPositions[offerPositionIndex]
                                             .expenses.findIndex((expense) => expense.id === id )

               dispatch({type: 'DELETE_EXPENSE', payload:{contractIndex, subContractIndex, offerPositionIndex, expenseIndex} })
               
            } catch(e) {
               console.log(e)
               
            }
      
            break;
      
         default:

            return false
           
      }
   }, [digToObject, state])

   const contextValue = useMemo(() => ({ 

      ...state,
      dispatch,
      addContract,
      addSubContract,
      addOfferPosition,
      updateProcess,
      deleteProcess,
      addExpense

   }), [

      state,
      dispatch,
      addContract,
      addSubContract,
      addOfferPosition,
      updateProcess,
      deleteProcess,
      addExpense
   ])

   return (
      
      <ContractContext.Provider value={contextValue}>

         { props.children }
      </ContractContext.Provider>
   )
}
