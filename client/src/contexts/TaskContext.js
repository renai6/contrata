import React, { useReducer } from 'react'
import TaskReducer from '../reducers/TaskReducer'

const initialState = {
   
   isFetching: false,
   tasks: [],
   filteredTasks: []
  
}

export const TaskContext = React.createContext()

export const TaskProvider = props => {

   const [state, dispatch] = useReducer(TaskReducer, initialState)

   return (
      
      <TaskContext.Provider value={{ 
         ...state,
         dispatch
      }}>

         { props.children }
      </TaskContext.Provider>
   )
}
