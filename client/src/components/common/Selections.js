import React from 'react'
import { 
   FormGroup,
   Label,
   CustomInput

} from 'reactstrap'

/**
 * @requires 
 * Initial Value
 * Callback
 * 
 */
const Selections = ({children, label, noLabel,...rest}) => {
   return (
      <FormGroup>
         {
            noLabel? '' : <Label className="mb-0" for="contractName">{label}</Label>
         }
         

         <CustomInput {...rest} className="selection" bsSize="sm" type="select" id="contractName" name="contractName">
           
            {
               children
            }
         </CustomInput>
                               
      </FormGroup>
   )
}

export default Selections
