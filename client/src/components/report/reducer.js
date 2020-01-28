
const ReportReducer = (state, action) => {

   switch (action.type) {

      case 'SET_LOCAL_SELECT_CONTRACT': 

         return {

            ...state,
            currentContract: action.payload,
         }
         
      case 'SET_CHART_SERIES': 

         return {

            ...state,
            chartSeries: action.payload,
         }

      case 'SET_SUBPROJECTS_ON_MONTH': 

         return {

            ...state,
            monthSubcontract: action.payload.subContracts,
            selectedMonth: action.payload.month
         }

      case 'SET_BAR_CHART_SERIES': 

      
         state.barOptions = action.payload.newBarOptions
         state.barSeries = action.payload.newBarSeries

         state.barOfferOptions = action.payload.newBarOfferOptions
         state.barOfferSeries = action.payload.newBarOfferSeries

         return {

            ...state,
         }


      default:
         return state
   }
}

export default ReportReducer