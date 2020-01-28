import React, { Fragment } from 'react'
import { useSpring, animated } from 'react-spring'
import PerfectScrollbar from 'react-perfect-scrollbar'
import ExpensePoint from './ExpensePoint'


const ExpenseItem = ({ expenses, openDeleteWindow }) => {

   const props = useSpring({ 
     
      to: {
         opacity: 1, 
         transform: 'translate3d(0px, 0, 0)'
      }, 

      from: { 
         opacity: 0, 
         transform: 'translate3d(-40px, 0, 0)'
      }, 
      delay: 300,
      
   })
   
   return (
      
    
      <Fragment>
         <div className="d-flex flex-column">
             
               <animated.div style={props}>
                  <div className="view-box">
                     <PerfectScrollbar className="pr-3 pb-2">

                        {
                           expenses.map((expense) => (
                              <ExpensePoint key={expense.id} expense={expense} openDeleteWindow={openDeleteWindow} />
                           ))
                        }
                     </PerfectScrollbar>
                  </div>
               </animated.div>
         
         </div>
      </Fragment>
     
     
   )
}

export default ExpenseItem