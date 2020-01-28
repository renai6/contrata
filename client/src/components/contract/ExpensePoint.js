import React from 'react'

const ExpensePoint =  ({ expense, openDeleteWindow }) => {

   return (
      <div className="contract-point mb-2 shadow-sm">
         <div className="d-flex align-items-center">
            <span className="icon"><i className="fas fa-receipt"></i></span>
            <p className="mb-0 ml-2"> <strong> { expense.comments } </strong></p>
            <span className="ml-auto icon" onClick={() => openDeleteWindow(expense, 'expense') }><i className="fas fa-trash"></i></span>
         </div>
         <div className="px-2">
            <p className="ml-2 mt-0 mb-0">Travel Time: { expense.travelTime }</p>
            <p className="ml-2 mt-0 mb-0">Hourly Rate: { expense.hourlyRate }</p>
            <p className="ml-2 mt-0 mb-0">Expense Amount: CHF { expense.expenseAmount }</p>
         </div>
         
      </div>
   )
}

export default ExpensePoint
