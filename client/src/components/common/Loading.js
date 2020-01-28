import React from 'react'
import { Spinner } from 'reactstrap'
import Avatar from './Avatar'
import './style.css'

const Loading = () => {
   return (
      <div className="loading-banner">
         <Avatar />
         <div className="mb-2" >
            <Spinner style={{ width: '1rem', height: '1rem' }} type="grow" color="danger" className="ml-2" />
            <Spinner style={{ width: '1rem', height: '1rem' }} type="grow" color="danger" className="ml-2" />
            <Spinner style={{ width: '1rem', height: '1rem' }} type="grow" color="danger" className="ml-2" />
         </div>
         
         Loading Resource
      </div>
   )
}

export default Loading