
const reducer = (state, action) => {

   switch (action.type) {
      
      case 'INPUT': 

         return {

            ...state,
            invalidForm: false,
            [action.field]: action.value
         }

      case 'INVALID_FORM': 

         return {

            ...state,
            invalidForm: true
         }

      case 'CLEAR_FIELDS': 

         return {

            ...state,
            clientId: '',
            contractId: '',
            subContractId: '',
            projectName: '',
            projectNr: '',
            offerNr: '',
            offerName: '',
            offerAmount: '',
            status: '',
            comments: '',
         }

      case 'SUBMIT': 

         return {

            ...state,
            invalidForm: false
         }

      default:
         return state
   }
}

export default reducer