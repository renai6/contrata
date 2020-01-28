import React, { useContext } from 'react'
import { AuthContext } from './contexts/AuthContext'
import {
   Route,
   Redirect
 } from "react-router-dom"
 

const PrivateRoute = ({ component: Component, children, ...rest }) => {
   

   const Auth = useContext(AuthContext)

   return (
     
      <Route {...rest}>
         {

            Auth.isOnline ? children :
            ( 
               <Redirect
                  to={{
                     pathname: "/login",
                  }}
               />
            )
         }
      </Route>
   )
}

export default PrivateRoute
