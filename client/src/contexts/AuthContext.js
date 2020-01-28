import React, { useReducer, useEffect } from 'react'
import axios from 'axios'
import { USER_LOADING, LOAD_USER_DATA, AuthReducer } from '../reducers/AuthReducer'

const initialAuthState = {
   isOnline: false,
   isLoading: true,
   token: null,
   user: null
}

export const AuthContext = React.createContext()

export const AuthProvider = props => {

   const [authState, dispatch] = useReducer(AuthReducer, initialAuthState)
   
   useEffect(() => {
      
      ( async () => {
         
         const token = localStorage.getItem('techVoiceToken')
      
         if(token) {

            axios.defaults.headers.common['X-Auth-Token'] = token

            try {

               const res = await axios.get('api/auth/user')
               
               const _data = {
                  token,
                  user: res.data
               }
      
               loadUserData(_data)

            } catch (error) {
               
               localStorage.removeItem('techVoiceToken')
         
               dispatch({ type: USER_LOADING })
            }
         
         } else {
            
            setTimeout(() => {
               dispatch({type: USER_LOADING})
            }, 1000)
         
         }
      }) ()

   }, [])

   const authenticateUser = async (payload) => {

      try {
       
         const res = await axios.post('api/auth', payload)

         axios.defaults.headers.common['X-Auth-Token'] = res.data.token

         localStorage.removeItem('techVoiceToken')

         localStorage.setItem('techVoiceToken', res.data.token)
         
         loadUserData(res.data)

         return {
            success: true,
         }

      } catch (error) {

         return { 
            
            success: false,
            message: error.response.data.msg,
            errorType: error.response.data.errorType,
         }
      }
   }

   const loadUserData = (_data) => {
      
      dispatch({
         type:LOAD_USER_DATA, 
         user: _data.user,
         token: _data.token
      })
   }   
   
   return (
      
      <AuthContext.Provider value={{ 
         ...authState,
         authenticateUser,
         dispatch
      }}>

         { props.children }
      </AuthContext.Provider>
   )
}
