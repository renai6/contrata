import React from 'react'
import Button from '../common/Button'
import { 

   Card,
   FormGroup,
   Label,
   CustomInput,
   Input,
   Form
} from 'reactstrap'

const AddInvoice = ({localDispatch, state, handleSubmit}) => {
   
   const today = new Date()
   const months = ['January', 'February']

   const {
      currentOffer,
      hours,
      amount
   } = state


   return (
      <Card body className="offer-box shadow">
         <h5 style={{color: '#a31423', fontWeight: 'bold'}}>{currentOffer.offerName}</h5>
         <Form onSubmit={handleSubmit}>   
         
            <FormGroup className="my-1">
               <Label className="mb-0" for="month">Month</Label>
               <CustomInput value={state.month} onChange={ (e) =>  localDispatch({type: 'INPUT', field: 'month', value:e.currentTarget.value }) } className="shadow-sm" bsSize="sm" type="select" id="month">
                  {
                     months.map((month,index) => (
                        <option key={ index } value={month}>{ month }</option>
                     ))
                  }
               </CustomInput>
            </FormGroup>
            <FormGroup className="mb-1">
               <Label className="mb-0" for="name">Year</Label>
               <Input value={today.getFullYear()} type="number" bsSize="sm" onChange={ (e) => console.log(e.currentTarget.value) }  autoComplete="off" />
            </FormGroup>
            <FormGroup className="mb-1">
               <Label className="mb-0" for="name">Hours</Label>
               <Input value={hours} type="number" bsSize="sm" onChange={ (e) =>  localDispatch({type: 'INPUT', field: 'hours', value:e.currentTarget.value }) }  autoComplete="off" />
            </FormGroup>
            
            <FormGroup>
               <Label className="mb-0" for="name">Amount</Label>
               <Input disabled type="text" bsSize="sm" autoComplete="off" onChange={ (e) =>  localDispatch({type: 'INPUT', field: 'amount', value:e.currentTarget.value }) } value={amount * hours} />
            </FormGroup>
            
            <Button className="btn-exact-sm">Save</Button>
         </Form>
      </Card>
   )
}

export default AddInvoice
