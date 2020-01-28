import React from 'react'
import { withRouter } from 'react-router-dom'
const SideNav = withRouter(({ history, sideNavIsOpen, showLinkTitle, ...rest }) => {

   const goTo  = (to) => {
      
      
      history.push(to)
      
   }
  
   return (
      
      <aside  className={sideNavIsOpen ? "sidenav active-sn" : "sidenav"}>
        
         <ul style={{textAlign: 'center'}}>

            <li  className= {
                     history.location.pathname=== "/contract" || history.location.pathname=== "/"?
                        'px-3 py-2 border-bottom border-top d-flex active-li' : 'px-3 py-2 border-bottom border-top d-flex'
                  }
                  
                  onClick={ () => goTo('/contract') }>
               <div style={{width: '40px'}}>
                  
                  <span className="icon-link"><i className="fas fa-file-contract fa-lg"></i></span> 
               </div> {showLinkTitle?  'Contracts': '' }
               
            </li>

            <li  className= {
                     history.location.pathname=== "/timebooking"?
                        'px-3 py-2 border-bottom d-flex active-li' : 'px-3 py-2 border-bottom d-flex'
                  }
                  
                  onClick={ () => goTo('/timebooking') }>

               <div style={{width: '40px'}}>
                  
                  <span className="icon-link"><i className="fas fa-clock fa-lg"></i></span> 
               </div> {showLinkTitle?  'Time Booking': '' }
               
            </li>
            <li className = {
                     history.location.pathname=== "/reports"?
                        'px-3 py-2 border-bottom d-flex active-li' : 'px-3 py-2 border-bottom d-flex'
                  }

                  onClick={ () => goTo('/reports') }>

               <div style={{width: '40px'}}>
                  
                  <span className="icon-link"><i className="fas fa-chart-bar fa-lg"></i></span>
               </div> {showLinkTitle?  'Reports': '' }

            </li>
         </ul>
      </aside>
    
   )
})

export default  SideNav  
