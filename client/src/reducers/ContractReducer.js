
import * as moment from 'moment'

const today = moment('9999-12-12').format('YYYY-MM-DD')
const ContractReducer = (state, action) => {

   switch (action.type) {

      // Invoice
      case 'ADD_TO_BOOK': 

         state.contracts[action.payload.contractIndex]
            .subContracts[action.payload.subContractIndex]
               .offerPositions[action.payload.offerPositionIndex].books.push(action.payload.newBook)

         return {

            ...state,
         }

      case 'SET_SELECTED_CLIENT': 
      
         return {

            ...state,
            offerList: [],
            subContractList: [],
            contracts: [],
            selectedClient: action.payload
         }

      case 'SUBCONTRACT_SELECT': 

         const subIndex = state.subContractList.findIndex(contract => action.payload === contract.id)
        
         if(subIndex < 0) {
            return {

               ...state,
               
               offerList: []
            }
         }
         
         return {

            ...state,
            
            offerList: state.subContractList[subIndex].offerPositions
         }

      case 'CONTRACT_SELECT': 

         const index = state.contracts.findIndex(contract => action.payload === contract.id)
         
         if(index < 0) {

            return {

               ...state,
               offerList: [],
               subContractList: []
            }
         }

         return {

            ...state,
            offerList: [],
            subContractList: state.contracts[index].subContracts
         }


      /**
       * @DELETE
       */

      case 'DELETE_CONTRACT': 
 
         state.contracts.splice(action.payload, 1)
         return {

            ...state,
         }

      case 'DELETE_SUB_CONTRACT': 
 
         state.contracts[action.payload.contractIndex].subContracts.splice(action.payload.subContractIndex, 1)

         return {

            ...state,
         }

      case 'DELETE_OFFERPOSITION': 
 
         state.contracts[action.payload.contractIndex].subContracts[action.payload.subContractIndex].offerPositions.splice(action.payload.offerPositionIndex, 1)

         return {

            ...state,
         }

      case 'DELETE_EXPENSE': 
 
         state.contracts[action.payload.contractIndex]
            .subContracts[action.payload.subContractIndex]
               .offerPositions[action.payload.offerPositionIndex].expenses.splice(action.payload.expenseIndex, 1)

         return {

            ...state,
         }

      case 'REMOVE_BOOK_TASK': 

         state.contracts[action.payload.contractIndex]
            .subContracts[action.payload.subContractIndex]
               .offerPositions[action.payload.offerPositionIndex]
                  .books[action.payload.bookIndex].offerTasks.splice(action.payload.taskIndex, 1)
   
                           
         return {

            ...state,
         }



      /**
       * @UPDATE
       */

      case 'UPDATE_CONTRACT': 

         state.contracts[action.payload.index][action.payload.field] = action.payload.value

         return {

            ...state,
         }

      case 'UPDATE_SUB_CONTRACT': 
         
         state.contracts[action.payload.contractIndex]
            .subContracts[action.payload.subContractIndex][action.payload.field] =  action.payload.value

         return {

            ...state,
         }

      case 'UPDATE_OFFER_POSITION': 

         state.contracts[action.payload.contractIndex]
            .subContracts[action.payload.subContractIndex]
               .offerPositions[action.payload.offerPositionIndex][action.payload.field] =  action.payload.value

         return {

            ...state,
         }

      case 'UPDATE_BOOK': 

         state.contracts[action.payload.contractIndex]
            .subContracts[action.payload.subContractIndex]
               .offerPositions[action.payload.offerPositionIndex]
                  .books[action.payload.bookIndex][action.payload.field] =  action.payload.value
   
                           
         return {

            ...state,
         }

      // Setting

      case 'SET_CURRENTS':

         return {
            ...state,
            [action.current]: action.payload
         }

      case 'INPUT': 

         return {

            ...state,
            [action.field]: action.value
         }


      case '_LOADING': 

         return {

            ...state,
            isFetching: !state.isFetching
         }

      case 'SET_CONTRACTS': 

         return {

            ...state,
            contracts: [...action.payload]
         }

      
      // Adding

      case 'ADD_CONTRACT': 

         return {

            ...state,
            contracts: [...state.contracts, action.payload]
         }

      case 'ADD_SUB_CONTRACT': 
         
         state.contracts[action.payload.index].subContracts.push(action.payload.data)

         return {

            ...state,
         }

      case 'ADD_OFFER_POSITION': 
         
         state.contracts[action.payload.contractIndex]
            .subContracts[action.payload.subContractIndex]
               .offerPositions
                  .push(action.payload.data)

         return {

            ...state,
         }

      case 'ADD_EXPENSE': 
         
         state.contracts[action.payload.contractIndex]
            .subContracts[action.payload.subContractIndex]
               .offerPositions[action.payload.offerPositionIndex]
                  .expenses
                     .push(action.payload.data)

         return {

            ...state,
         }

      case 'ADD_SUCCESS': 

         return {

            ...state,
            addSuccess: true,
            snackMessage: action.payload
         }

      // Misc
      case 'CLOSE_SNACK': 

         return {

            ...state,
            addSuccess: false,
            snackMessage: ''
         }

      case 'CLEAR_FIELDS': 

         return {

            ...state,
            clientId: 0,
            contractNumber: '',
            clientName: '',
            name: '',
            contractNr: '',
            startDate: today,
            endDate: today,
            fixedContractAmount: '',
            paymentMethod: 'Periodically',
            periodicity: 'Quarterly',
            fixedPaymentAmount: '',
            hourlyRate: '',
            travelExpense: true,
            comments: '',
            addSuccess: false,
            snackMessage: ''
         }

      default:
         return state
   }
}

export default ContractReducer