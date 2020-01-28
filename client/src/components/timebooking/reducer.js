
const today = new Date()
const TimeReducer = (state, action) => {

   switch (action.type) {

      case 'INPUT': 

         return {

            ...state,
            [action.field]: action.value
         }

      case 'OPEN_SELECTED':

         return {

            ...state,
            selectedIsOpen: !state.selectedIsOpen
         }

      case 'UPDATE_CURRENT_BOOK':

         state.currentBook[action.payload.field] = action.payload.value
         return {

            ...state,
            selectedIsOpen: !state.selectedIsOpen
         }

      case 'SET_INDEXES':

         state.indexes[action.payload.model] = action.payload.value

         return {

            ...state,
         }

      case 'CLEAR_SELECTED': 

         return {

            ...state,
            selectedOffer: {}
         }

      case 'EMPTY_SELECTED_TASK':
         
         return {

            ...state,
            selectedTasks: []
         }

      case 'REMOVE_SELECTED_TASK':

         const newSelected = state.selectedTasks.filter(task => task.TASK_ID !== action.payload)
         let newHours = 0

         newSelected.forEach(task => {

            newHours = task.time.reduce((accumulator, time) => {
            
               const munites = accumulator + parseInt(time.TIME_ELAPSED.split("T")[1].split(":")[1]);
               const hours = accumulator + parseInt(time.TIME_ELAPSED.split("T")[1].split(":")[0]);
               
               let m = munites/60
   
               return hours + parseFloat(m)
            }, 0)
         })
        


         return {

            ...state,
            selectedTasks: newSelected,
            totalHours: newHours
         }
   

      case 'ADD_SELECTED_TASK':
            
       
         const index = state.selectedTasks.findIndex(task => task.TASK_ID === action.payload.TASK_ID)

         const hours = action.payload.time.reduce((accumulator, time) => {
            
            const munites = accumulator + parseInt(time.TIME_ELAPSED.split("T")[1].split(":")[1]);
            const hours = accumulator + parseInt(time.TIME_ELAPSED.split("T")[1].split(":")[0]);
            
            let m = munites/60

            return hours + parseFloat(m)
         }, 0)
        

         if(index < 0) {

            state.selectedTasks.push(action.payload)
            state.totalHours = state.totalHours + hours
         } 

         return {

            ...state
         }

      case 'ADD': 

         return {

            ...state,
            toAdd: action.payload
         }

      case 'CLEAR_OFFER': 

         return {

            ...state,
            currentOffer: {}
         }

      case 'SET_LOCAL_SELECT_CONTRACT': 

         return {

            ...state,
            currentContract: action.payload,
            selectedTasks: []
         }

      case 'SET_LOCAL_SELECT_SUBCONTRACT': 

         return {

            ...state,
            currentSubContract: action.payload,
            selectedTasks: []
         }

      case 'SUCCESS': 

         return {

            ...state,
            hours: 1,
            month: 'January',
            year: today.getFullYear(),
            clientId: '',
            contractId: '',
            offerPositionId: '',
            subContractId: '',
            hourlyRate: '',
            amount: 100,
            invoiceNumber: '',
            toAdd: false
         }

      default:
         return state
   }
}

export default TimeReducer