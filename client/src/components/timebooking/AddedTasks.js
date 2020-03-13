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
                              <tr key={task.id}>
                        
                                 <td>{task.id}</td>
                                 <td>{ task.time_estimate }</td>
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
