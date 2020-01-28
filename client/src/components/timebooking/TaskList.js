import React, { useEffect, useContext, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import axios from 'axios'
import ReactTable from 'react-table'
import * as moment from 'moment'
import 'react-table/react-table.css'

import { TaskContext } from '../../contexts/TaskContext'

const TaskList = ({localDispatch}) => {

   const { tasks, filteredTasks, dispatch  } = useContext(TaskContext)
   const [isFetching, setFetching] = useState(false)

   useEffect(() => {

      const fetchTasks = async () => {

         try {
           
            const {data} = await axios.get('/api/tasks')

            const _tasks = data.reduce(( arr, project ) => {

               project.tasks.forEach(task => {
                  
                  task.PROJECT_NR = project.PROJECT_NR
               })

               arr.push(...project.tasks)

               return arr
            }, []).map( task => {

               task.DATE_LOGGED = task.time[task.time.length - 1].DATE_LOGGED

               return task
            })

         
            dispatch({type: 'SET', payload: _tasks})
            
            setFetching(false)
         } catch (error) {
            console.log(error)
         }
        
      }

      if(tasks.length < 1) {
         setFetching(true)
         fetchTasks()
      }

    
   }, [dispatch, tasks])

   return (
      <>
         {
            !isFetching? 
               <ReactTable

                  getTdProps={(state, rowInfo, column, instance) => {
                     return {
                        
                        onClick: (e) => {
                           
                           if(rowInfo) {
                              
                              localDispatch({type:'ADD_SELECTED_TASK', payload: rowInfo.original})

                              const index = filteredTasks.findIndex(_ => _.TASK_NR === rowInfo.original.TASK_NR)
                              
                              dispatch({type: 'SET_STATE_SELECTED', payload: { index, value: !rowInfo.original.selected }})
                           }
                           
                        }
                     }
                  }}
                  data={filteredTasks}
                  columns={[{
                     Header: `Tasks`,
                     columns: [
                        {
                           Header: "Task NR",
                           accessor: "TASK_NR"
                        },
                        
                        {
                           Header: "Description",
                           accessor: "DESCRIPTION"
                        },
                        {
                           Header: "Developer Comments",
                           accessor: "DEVELOPER_COMMENTS",
                        
                        },
                        {
                           Header: "Est. Hours",
                           accessor: "CP_EST_HRS_COMPLETION",
                        
                        },
                        {
                           Header: "Last Date Logged",
                           accessor: "DATE_LOGGED",
                           Cell: (_) => <span>{ moment(_.value).format("YYYY-MM-DD")}</span>
                        
                        },
                        {
                           Header: "Added",
                           accessor: "selected",
                           Cell: (_) => <span>{ _.value ? 'Ja' : 'Nein'}</span>
                        
                        },
                     
                     
                     ]
                  }]}
         
                  defaultPageSize={6}
                  className="-highlight offer-box"
               /> : <Skeleton height={250} />

         }
      </>
      
   )
}

export default TaskList
