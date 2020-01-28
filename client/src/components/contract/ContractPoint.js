import React, { useState, useContext } from 'react'

// context
import { ContractContext } from '../../contexts/ContractContext'

const ContractPoint = ({ title, value, icon, id, field, model, isNumber, callback, isDrop, isDate }) => {

   const [edit, setEdit] = useState(false)
   const [editValue, setEditValue] = useState(value)

   const { 
      updateProcess,
  
   } = useContext(ContractContext)

   const handleSubmit = async (e) => {

      e.preventDefault()

      if(editValue.length < 1) {
         setEdit(false)
         setEditValue(value)

         return
      }

    
      
      const _data = {

         model: model,
         id: id,
         field: field,
         value: editValue,
         body: {
            
            [field]: editValue
         }
      }

      switch (model) {
         case "contract":
            
               await updateProcess(_data)
            break;

         case "book":

               callback(_data)
               
            break;
      
         default:

            await updateProcess(_data)
            break;
      }
      setEdit(false)
   }

   const selectChange = (e) => {
     
      setEditValue(e.currentTarget.value)
   }

   const getStatusValue = (data) => {
     
      switch (data) {
         case 'Progress':

            return 'In Arbeit'
            
         case 'Closed':
            
            return 'Geschlossen'
      
         case 'Waiting':
            
            return 'Warten auf Instruktionen'
      
         default:
            break;
      }
   }

   return (
      <div className="contract-point mb-2 shadow-sm">
         <div className="d-flex align-items-center">
            <span className="icon"><i className={ icon }></i></span>
            <p className="mb-0 ml-2"> <strong> { title } </strong></p>
         </div>

         {
            edit? 
               isNumber?
                  
                  <form onSubmit={ handleSubmit } className="mx-2 point-form">
                     <input type="number" className="point-input pl-1 pb-1" onBlur={() => setEdit(false) } onChange={ (e) => setEditValue(e.currentTarget.value) } value={editValue} autoFocus />
                  </form>:
                  isDrop?
                     
                     <form onSubmit={ handleSubmit } className="mx-2 point-form">
                        <select className="point-input pl-1 pb-1" onBlur={ handleSubmit } onChange={ selectChange } autoFocus>
                           <option value=""></option>
                           <option value="Progress">In Arbeit</option>
                           <option value="Closed">Geschlossen</option>
                           <option value="Waiting">Warten auf Instruktionen</option>
                        </select>
                     </form>:
                     isDate?
                        <form onSubmit={ handleSubmit } className="mx-2 point-form">
                           <input type="date" className="point-input pl-1" onBlur={() => setEdit(false) } onChange={ (e) => setEditValue(e.currentTarget.value) } value={editValue} autoFocus />
                        </form>:
                        <form onSubmit={ handleSubmit } className="mx-2 point-form">
                           <input type="text" className="point-input pl-1" onBlur={() => setEdit(false) } onChange={ (e) => setEditValue(e.currentTarget.value) } value={editValue} autoFocus />
                        </form>
               :<p onClick={ () => setEdit(!edit) } className="ml-2 mt-0 mb-0 point">{ isDrop? getStatusValue(value) : value }</p>
         }
        
      </div>
   )
}

export default ContractPoint
