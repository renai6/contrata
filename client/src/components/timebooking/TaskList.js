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
           console.log('wew')
            const {data} = await axios.get('/api/tasks')

            const _tasks = data.reduce(( arr, project ) => {

               project.tasks.forEach(task => {
                  
                  task.proj_nr = project.proj_nr
               })

               arr.push(...project.tasks)

               return arr
            }, []).map( task => {

               task.date_received = task.time[task.time.length - 1].date_received

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

    
   }, [])

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

                              const index = filteredTasks.findIndex(_ => _.point_nr === rowInfo.original.point_nr)
                              
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
                           accessor: "point_nr"
                        },
                        
                        {
                           Header: "Description",
                           accessor: "instructions"
                        },
                        {
                           Header: "Developer Comments",
                           accessor: "DEVELOPER_COMMENTS",
                        
                        },
                        {
                           Header: "Est. Hours",
                           accessor: "time_estimate",
                        
                        },
                        {
                           Header: "Last Date Logged",
                           accessor: "date_received",
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
