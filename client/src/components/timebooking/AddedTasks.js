import React, { Fragment } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { 
   Alert,
   Table
} from 'reactstrap'

const AddedTasks = ({selectedTasks}) => {
   return (

      <Fragment>
         {
            selectedTasks.length > 0?
               <PerfectScrollbar>
                  <Table hover>
                     <thead>
                        <tr>
                        
                           <th>Task Nr</th>
                           <th>Est. Hours</th>
                        </tr>
                     </thead>
                  
                     <tbody>

                        {
                           selectedTasks.map(task => (
                              <tr key={task.TASK_ID}>
                        
                                 <td>{task.TASK_NR}</td>
                                 <td>{ task.CP_EST_HRS_COMPLETION }</td>
                              </tr>
                           ))
                        }
                     
                     </tbody>
                  
                  </Table>
               </PerfectScrollbar>:
               <Alert className="" color="warning">
                  No Selected tasks
               </Alert>
         }
         
      </Fragment>
   )
}

export default AddedTasks
