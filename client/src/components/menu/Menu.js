import React from 'react'
import Button from '../common/Button'

const Menu = ({ dispatch }) => {

   return (
     
      <React.Fragment>
         <div className="d-flex justify-content-between align-items-center my-2">
            <div className="d-flex justify-content-center align-items-center circle">
               <p className="mb-0 item-nr">1</p>
            </div>

            <div className="flex-grow-1">
               <div className="lb-3">
                  <p className="ml-3 mb-0"><strong>Create Contract</strong></p>
               </div>
               <div>
                  <small className="ml-3 mb-0 mt-2">Create a contract for a client</small>
               </div>
            </div>

            <Button onClick={ () => dispatch({type: 'OPEN_CREATE_FORM' }) } className="btn-menu">START</Button>
         </div>

         <div className="d-flex justify-content-between align-items-center my-2">
            <div className="d-flex justify-content-center align-items-center circle">
               <p className="mb-0 item-nr">2</p>
            </div>

            <div className="flex-grow-1">
               <div className="lb-3">
                  <p className="ml-3 mb-0"><strong>Create Offer Positions</strong></p>
               </div>
               <div>
                  <small className="ml-3 mb-0 mt-2">Create offer positions for a subcontract</small>
               </div>
            </div>

            <Button className="btn-menu">START</Button>
         </div>

         <div className="d-flex justify-content-between align-items-center my-2">
            <div className="d-flex justify-content-center align-items-center circle">
               <p className="mb-0 item-nr">3</p>
            </div>

            <div className="flex-grow-1">
               <div className="lb-3">
                  <p className="ml-3 mb-0"><strong>Add Expenses</strong></p>
               </div>
               <div>
                  <small className="ml-3 mb-0 mt-2">Add expenses to a subcontract</small>
               </div>
            </div>

            <Button className="btn-menu">START</Button>
         </div>

         <div className="d-flex justify-content-between align-items-center my-2">
            <div className="d-flex justify-content-center align-items-center circle">
               <p className="mb-0 item-nr">4</p>
            </div>

            <div className="flex-grow-1">
               <div className="lb-3">
                  <p className="ml-3 mb-0"><strong>Sync data from Project-tool</strong></p>
               </div>
               <div>
                  <small className="ml-3 mb-0 mt-2">Fetch updated data from the Project Tool</small>
               </div>
            </div>

            <Button className="btn-menu">START</Button>
         </div>

         <div className="d-flex justify-content-between align-items-center my-2">
            <div className="d-flex justify-content-center align-items-center circle">
               <p className="mb-0 item-nr">5</p>
            </div>

            <div className="flex-grow-1">
               <div className="lb-3">
                  <p className="ml-3 mb-0"><strong>Create Invoice</strong></p>
               </div>
               <div>
                  <small className="ml-3 mb-0 mt-2">Create an invoice for the selected client</small>
               </div>
            </div>

            <Button className="btn-menu">START</Button>
         </div>

         <div className="d-flex justify-content-between align-items-center my-2">
            <div className="d-flex justify-content-center align-items-center circle">
               <p className="mb-0 item-nr">6</p>
            </div>

            <div className="flex-grow-1">
               <div className="lb-3">
                  <p className="ml-3 mb-0"><strong>Export Report</strong></p>
               </div>
               <div>
                  <small className="ml-3 mb-0 mt-2">Export report for the selected client</small>
               </div>
            </div>

            <Button className="btn-menu">START</Button>
         </div>

      </React.Fragment>
     
         
   )
}

export default Menu
