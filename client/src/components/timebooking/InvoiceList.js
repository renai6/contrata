import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const InvoiceList = ({currentOffer}) => {
   return (
      <ReactTable
         data={currentOffer.invoices}
         columns={[{
            Header: `Invoices under ${currentOffer.offerName}`,
            columns: [
               {
                  Header: "Month",
                  accessor: "month"
               },
               {
                  Header: "Year",
                  accessor: "year",
               
               },
               {
                  Header: "Invoice Number",
                  accessor: "invoiceNumber"
               },
               {
                  Header: "Hours",
                  accessor: "hoursInvoice",
               
               },
               {
                  Header: "Amount (CHF)",
                  accessor: "amount",
                  Cell: (_) => <span>{parseFloat(_.value).toLocaleString('de-ch', { minimumFractionDigits: 2})}</span>
               
               },
            ]
         }]}

         defaultPageSize={6}
         className="-highlight offer-box"
      />
    
   )
}

export default InvoiceList
