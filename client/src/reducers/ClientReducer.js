
const ContractReducer = (state, action) => {

   switch (action.type) {

      case '_LOADING': 

         return {

            ...state,
            isFetching: !state.isFetching
         }

      case 'SET_CLIENTS': 

         return {

            ...state,
            clients: [...action.payload]
         }

      case 'SET_WITHCONTRACTS': 

         return {

            ...state,
            withContracts: [...action.payload]
         }

      default:
         return state
   }
}

export default ContractReducer