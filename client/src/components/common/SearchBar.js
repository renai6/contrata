import React, { useContext, useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { 

   Input,
   Label,
   FormGroup,
   ListGroup, 
   ListGroupItem
} from 'reactstrap'


import { ClientContext } from '../../contexts/ClientContext'
const SearchBar = ({ callback }) => {

   const { clients } = useContext(ClientContext)
   const [filteredClients, setClients] = useState(clients)
   const [listIsVisible, setVisibility] = useState(false)
   const [search, setSearch] = useState('')
   const [selectedClient, setSelectedClient] = useState('')
   
   const handleSelectedClient = (cli) => {
      
    
      callback('client', cli.CLIENT_ID)
      setSearch('')
      setSelectedClient(cli.CLIENT_NAME)
      setVisibility(false)
   }

   const settingSearch = (e) => {

      setSearch(e.currentTarget.value)
      setSelectedClient(e.currentTarget.value)
   }

   useEffect(() => {

      const filterClients = () => {
        
         if(search.length > 0) {
   
            const filtered = clients.filter((item) => {
               return item.CLIENT_NAME.toLowerCase().match(search.toLowerCase())
               
            })
   
            setClients(filtered)
            setVisibility(true)
         } else {
            
            setVisibility(false)
         }
      }
    
      filterClients()
         
      
   }, [search, clients])




   return (
      <>
      
         <FormGroup className="mb-1">
            <Label className="mb-0" for="name">Client Name</Label>
            <Input type="search" bsSize="sm" onChange={ settingSearch } autoComplete="off" value={selectedClient} />
         </FormGroup>

         {
            listIsVisible?
            
               <ListGroup className='search-list'>
                  
                  <PerfectScrollbar className="pr-1 pb-3">

                     {
                        filteredClients.map((cli) => (
                           <ListGroupItem key={cli.CLIENT_ID} onClick={() => handleSelectedClient(cli) } className="ml-1 mr-2">{ cli.CLIENT_NAME }</ListGroupItem>
                           
                        ))
                     }
                  </PerfectScrollbar>
                  
                  
               </ListGroup>: ''
         }
      </>
   )
}

export default SearchBar
