import React, { useContext } from 'react'

// 3rdparty imports
import { 

   Button,
   Modal, 
   ModalHeader, 
   ModalBody, 
   ModalFooter,
  
      
} from 'reactstrap'

// context
import { ContractContext } from '../../contexts/ContractContext'

const DeleteModal = ({ data, deleteWindowIsOpen, toggleDeleteWindow, model }) => {
   
   const {deleteProcess} = useContext(ContractContext)

   let message
   let name 

   switch (model) {
      case 'contract':

         name = data.name

         message =  <div className="">
                        Deleting a contract will remove all subcontracts and offer positions under it. Are you sure you want to <span className="text-danger"> <strong>delete</strong> </span> {name} contract?
                     </div>
         break;

      case 'subcontract':
     
         name = data.name

         message =  <div className="">
                        Deleting a contract will remove all offer positions under it. Are you sure you want to <span className="text-danger"> <strong>delete</strong> </span> {name} sub contract?
                     </div>
         break;
        
      case 'offerposition':
       
         name = data.offerName

         message =  <div className="">
                        Deleting an offer position will remove all expenses under it. Are you sure you want to <span className="text-danger"> <strong>delete</strong> </span> {name}?
                     </div>
         break;

      case 'expense':
       
         name = data.comments

         message =  <div className="">
                     Are you sure you want to <span className="text-danger"> <strong>delete</strong> </span> {name}?
                     </div>
         break;
   
      default:

         return false
   }

   const archiveProcess = async () => {

      const _data = {
       
         archived: 1
      }

      await deleteProcess(_data, model, data.id)

      toggleDeleteWindow(false)
   }
   
   return (

      <Modal isOpen={deleteWindowIsOpen} toggle={() => toggleDeleteWindow(false)} >
         
         <ModalHeader toggle={() => toggleDeleteWindow(false)}>Delete {name}</ModalHeader>
         <ModalBody>

            <div className="warning-box p-2">
               <div className="d-flex align-items-center">

                  <h6>Warning <span className="text-danger"><i className="fas fa-exclamation-triangle"></i></span></h6>
               </div>

               {message}
            </div>
            
         </ModalBody>

         <ModalFooter>
            <Button type="submit" color="danger" onClick={archiveProcess}>Continue</Button> {' '}
            <Button color="secondary" onClick={() => toggleDeleteWindow(false)}>Cancel</Button>
         </ModalFooter>
      </Modal>
   )

}

export default DeleteModal
