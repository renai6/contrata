import React, { useContext, useReducer } from 'react'
import { useSpring, animated } from 'react-spring'
import { withRouter } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { isEmpty } from '../../api/validation'
import { 
   Container, 
   Row, 
   Col, 
} from 'reactstrap'

// Login includes
import LoginForm from './LoginForm'

// Login Reducer
import LoginReducer from './LoginReducer'


const Login = withRouter(({ history }) => {

   const initialState = {
      userName: '',
      password: '',
      formMessage: '',
      formPassMessage: '',
      inValidForm: false,
   }
   
   const Auth = useContext(AuthContext)

   const [state, dispatch] = useReducer(LoginReducer, initialState)

   const { userName, password } = state

   const props = useSpring({ 
      to: {
         opacity: 1, 
         marginTop: 0
      }, 

      from: { 
         opacity: 0, 
         marginTop: -500 
      }, 

      leave: { opacity: 0, transform: 'translate3d(100%,0,0)' },
      delay: 200
   })
  
   const handleSubmit = async (e) => {

      e.preventDefault() 

      dispatch({ type:'LOGIN' })

      if(!isEmpty(userName) && !isEmpty(password)) {

         const _data = {
            userName,
            password
         }

         try {
            
            const status = await Auth.authenticateUser(_data)
            
            if(status.success) {

               history.push('/')
            } else {

               if(status.errorType === 1) {

                  dispatch({ type:'FAILED_USERNAME', message: status.message })
               } else {
                  dispatch({ type:'FAILED_PASSWORD', message: status.message })
               }
               
            }
           

         } catch (error) {
            
            console.log(error)
         }
         
      } else {

         if(isEmpty(userName)) {

            dispatch({ type:'USENAME_EMPTY', message: 'Username is required' })
         }

         if( isEmpty(password)) {

            dispatch({ type:'PASSWORD_EMPTY', message: 'Provide a password' })
         }
         
      }
   }

   return (
      
      <animated.div style={ props }>

         <Container className="">
            <Row noGutters className="justify-content-center">

               <Col sm="12" md="6" lg="6" xl="6">
                  
                  <LoginForm state={state} dispatch={dispatch} handleSubmit={handleSubmit} />
                  
               </Col>
            </Row>
         </Container>
      </animated.div>
   )
})

export default Login
