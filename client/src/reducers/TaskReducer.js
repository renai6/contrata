
const TaskReducer = (state, action) => {

   switch (action.type) {

      case '_LOADING': 

         return {

            ...state,
            isFetching: !state.isFetching
         }

      case 'SET': 

         return {

            ...state,
            tasks: [...action.payload],   
            filteredTasks: [...action.payload]
         }

      case 'SET_STATE_SELECTED': 
      
         state.filteredTasks[action.payload.index].selected = action.payload.value

         return {

            ...state,
         }

      case 'REMOVE_TASK_SELECTED': 
         
         console.log(action.payload)
         state.filteredTasks.splice(action.payload.taskIndex, 1)

         return {

            ...state,
         }

      case 'FILTER': 
         
         if(action.payload) {
            
            state.filteredTasks = state.tasks
               .filter(task => task.proj_id == action.payload.projectNr)
               .map(task => {

                  task.selected = false

                  return task
               })

            return {

               ...state,
            }

         } else {
            
            state.filteredTasks = state.tasks
            return {

               ...state,
            }
         }

         

      default:
         return state
   }
}

export default TaskReducer