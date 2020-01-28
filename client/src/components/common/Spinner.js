import React from 'react'
import { Spinner } from 'reactstrap'
import './style.css'

const Spinners = (props) => {
   return (
      <div className={`spinner-banner ${props.className}`}>
      
         <div className="mb-2" >
            <Spinner style={{ width: '1rem', height: '1rem' }} type="grow" color="danger" className="ml-2" />
            <Spinner style={{ width: '1rem', height: '1rem' }} type="grow" color="danger" className="ml-2" />
            <Spinner style={{ width: '1rem', height: '1rem' }} type="grow" color="danger" className="ml-2" />
         </div>
      
      </div>
   )
}

export default Spinners