import React, { useContext, Fragment, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import './App.css'

// 3rd party

// Components
import Login  from './components/login/Login'
import Contract  from './components/contract/Contract'
import Report  from './components/report/Report'
import TimeBooking  from './components/timebooking/TimeBooking'
// import Dashboard  from './components/dashboard/Dashboard'

// Common
import Loading from './components/common/Loading'
import ComponentNotFound  from './components/error/ComponentNotFound'
import MainNavbar from './components/common/MainNavbar'
import SideNav from './components/common/SideNav'


// Contexts
import { AuthContext } from './contexts/AuthContext'
// Providers

import { ContractProvider } from './contexts/ContractContext'
import { ClientProvider } from './contexts/ClientContext'
import { TaskProvider } from './contexts/TaskContext'

const App = () => {
   
   const Auth = useContext(AuthContext)
   const [sideNavIsOpen, toggleSideNav] = useState(true)
   const [showLinkTitle, toggleshowLinkTitle] = useState(true)

   console.log(process)
   return (
      <Fragment>
         
         {
            Auth.isLoading? <Loading /> :
            <Router>
               {
                  Auth.isOnline? 
                     <>
                        <MainNavbar toggleSideNav={toggleSideNav} sideNavIsOpen={sideNavIsOpen} toggleshowLinkTitle={toggleshowLinkTitle} showLinkTitle={showLinkTitle} />
                        <SideNav sideNavIsOpen={sideNavIsOpen} showLinkTitle={showLinkTitle} /> 
                       
                     </>
                     : ''
               }
               
               <main className={ Auth.isOnline && sideNavIsOpen? 'main-box pt-2':'pt-2 main-box-full' }>
                  <TaskProvider>
                     <ClientProvider>
                        <ContractProvider>
                           <Switch>
                              
                              <Route exact path="/" render={ props => 

                                 Auth.isOnline? (<Contract />) : (<Login />)
                              } />

                              <Route exact path="/login" render={ props => 
                                 Auth.isOnline? (<Redirect to="/contract" />) : (<Login />)
                              } />

                              <PrivateRoute exact path="/reports">
                                 <Report />
                              </PrivateRoute>

                              <PrivateRoute exact path="/contract">
                                 <Contract />   
                              </PrivateRoute>

                              <PrivateRoute exact path="/timebooking">
                              
                                 <TimeBooking />
                              </PrivateRoute>

                              <Route component={ComponentNotFound} />
                              
                           </Switch>

                        </ContractProvider>
                     </ClientProvider>
                  </TaskProvider>
                  
               </main>
            
            </Router>
         }
      </Fragment>
     
   )
}

export default App



