import React from 'react'

const Logo = ({logo, height, width}) => {
   return (
      <div className="d-flex justify-content-center my-3">
         <img src={logo} height={height} width={width} alt="logo" />
      </div>
   )
}

export default Logo