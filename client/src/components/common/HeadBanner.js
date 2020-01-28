import React from 'react'

const HeadBanner = ({title, description, icon, callback, withButton}) => {
  return (
   <div className="d-flex justify-content-between align-items-center mb-2">
      <div className="d-flex justify-content-center align-items-center circle">
         <p className="mb-0 item-nr"><i className={icon}></i></p>
      </div>

      <div className="flex-grow-1">
         <div className="lb-3 d-flex justify-content-between align-items-center">
            <h5 className="ml-3 mb-0"><strong>{ title }</strong></h5>
            {
               withButton?
               <span className="icon mr-3 mb-1" onClick={callback}><i className="fas fa-plus-circle fa-2x"></i></span>: ''
            }
         </div>
         <div>
            <small className="ml-3 mb-0 mt-2">{ description }</small>
         </div>
      </div>

   </div>
  )
}

export default HeadBanner
