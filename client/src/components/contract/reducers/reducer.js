
const ContractReducer = (state, action) => {

   switch (action.type) {

      case 'INPUT': 

         return {

            ...state,
            [action.field]: action.value
         }

      case 'SUBMIT_FORM':
         
         return {

            ...state,
            inValidForm: false,
         }

      case 'SET_FOR_DELETE':
      
            return {
   
               ...state,
               selectedObjectModel: action.data,
               selectedModel: action.model,
            }
      

      case 'VALID_FORM':
         
         return {

            ...state,
            inValidForm: false,
         }

      case 'OPEN_CONTRACT':

         
         return {

            ...state,
            
            offerPositionItemIsOpen: false,
            viewContractIsOpen: true,
            subcontractItemIsOpen: true,
            forDelete: false,
            subcontractIsOpen: false,
            createIsOpen: false,
            createSubcontractIsOpen: false,
            offerPositionIsOpen: false,
            expenseIsOpen: false,
            currentContract: action.payload,
            width: 6
         }


      case 'ARCHIVE_CONTRACT':
         
         return {

            ...state,
            offerPositionItemIsOpen: false,
            viewContractIsOpen: true,
            subcontractItemIsOpen: true,
            forDelete: true,
            createIsOpen: false,
            createSubcontractIsOpen: false,
            currentContract: action.payload,
            width: 6
         }

      case 'INVALID_FORM':
         
         return {

            ...state,
            inValidForm: true,
         }

      case 'OPEN_CREATE_FORM':
         
         return {

            ...state,
            offerPositionItemIsOpen: false,
            viewContractIsOpen: false,
            subcontractItemIsOpen: false,
            subcontractIsOpen: false,
            forDelete: false,
            createIsOpen: true,
            createSubcontractIsOpen: false,
            offerPositionIsOpen: false,
            expenseIsOpen: false,
            currentContract: {},
            width: 6

         }

      case 'CLOSE_CREATE_FORM':
         
         return {

            ...state,
            createIsOpen: false,
            width: 12
         }

      case 'OPEN_SUB_CONTRACT_FORM':
         
         return {

            ...state,
            forDelete: false,
            createIsOpen: false,
            createSubcontractIsOpen: true,
            width: 4
         }

      case 'OPEN_SUB_CONTRACT':
         
         return {

            ...state,
            forDelete: false,
            createIsOpen: false,
            createSubcontractIsOpen: false,
            subcontractItemIsOpen: false,
            subcontractIsOpen: true,
            offerPositionItemIsOpen: true,
            offerPositionIsOpen: false,
            expenseIsOpen: false,
            currentSubContract: action.payload,
            width: 4
         }

       
      case 'OPEN_OFFER_POSITION':
         
         return {

            ...state,
            forDelete: false,
            createIsOpen: false,
            createSubcontractIsOpen: false,
            subcontractItemIsOpen: false,
            subcontractIsOpen: true,
            offerPositionItemIsOpen: false,
            offerPositionIsOpen: true,
            expenseIsOpen: true,
            currentOfferPosition: action.payload,
            width: 4
         }

      default:
         return state
   }
}

export default ContractReducer