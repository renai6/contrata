import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
const OfferList = ({offerList, localDispatch, setOfferTasksModal}) => {
   return (
      <ReactTable

         getTdProps={(state, rowInfo, column, instance) => {
            return {
               onClick: (e) => {
                  
                  if(rowInfo) {

                     localDispatch({type:'SET_INDEXES', payload: { model:'offer', value: rowInfo.index } })
                     localDispatch({type: 'INPUT', field: 'currentOffer', value:rowInfo.original})
                     localDispatch({type: 'INPUT', field: 'currentBook', value: {}})
                     setOfferTasksModal(true)

                     console.log('birhcg')
                  }
                  
               },
               
            }
         }}

         data={offerList}
         columns={[
            {
               Header: 'Offers',
               columns: [
                  {
                     Header: "Offer Number",
                     accessor: "offerNr"
                  },
                  {
                     Header: "Offer Name",
                     accessor: "offerName",
                  
                  },

                  {
                     Header: "Project Name",
                     accessor: "projectName"
                  },
                  {
                     Header: "Amount",
                     accessor: "offerAmount"
                  },
              
                  {
                     Header: "Used Amount (CHF)",
                     accessor: "usedAmount"
                  },
                  {
                     Header: "Open Amount (CHF)",
                     accessor: "openAmount"
                  },
                  {
                     Header: "Open Hours",
                     accessor: "openHour",
                     Cell: (_) => <span>{_.value.toFixed(2)}</span>
                  
                  },
                 
                  {
                     Header: "Comments",
                     accessor: "comments",
                  
                  },
                
               ]
            }
         ]}
         defaultPageSize={6}
         className="-highlight offer-box"
      />
   )
}

export default OfferList
