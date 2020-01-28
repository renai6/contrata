import React from 'react'
import Avatar from '../common/Avatar'
import { 
  
   Card, 
   CardBody,
   Form,
   FormGroup,
   Label,
   Input,
   FormFeedback
} from 'reactstrap'

import Button from '../common/Button'

const LoginForm = ({state, dispatch, handleSubmit}) => {

   const { userName, password, formMessage, formPassMessage, inValidForm } = state

   return (

      <Card style={{margin:'10% auto'}}> 
         <CardBody>
            <Avatar />
            <Form onSubmit={handleSubmit} style={{margin:'0 auto'}} >
               <FormGroup>
                  <Label for="exampleEmail">Username</Label>
                  <Input invalid={inValidForm} onChange={ (e) => dispatch({type: 'INPUT', field:'userName', value: e.currentTarget.value}) } type="text" name="username" id="username" autoComplete="off" value={userName} />
                  {
                     inValidForm? <FormFeedback>{formMessage}</FormFeedback>: ''
                  }
                  
               </FormGroup>
               <FormGroup>
                  <Label for="exampleEmail">Password</Label>
                  <Input invalid={inValidForm} onChange={ (e) => dispatch({type: 'INPUT', field:'password', value: e.currentTarget.value}) } type="password" name="password" id="password" value={password} />
                  {
                     inValidForm? <FormFeedback>{formPassMessage}</FormFeedback>: ''
                  }
               </FormGroup>

               <div className="d-flex justify-content-between align-items-center">
                  <Button className="btn-exact">Anmelden</Button> 
                  <div className="d-flex flex-column align-items-center">
                     <small className="small-link mb-1">Create an account</small>
                     <small className="small-link">Forgot Password?</small>
                  </div>
               </div>
               
            </Form>
            
         </CardBody>
      </Card>
   )
}

export default LoginForm
