import React from 'react'
import { withRouter, Link } from 'react-router-dom'

const ComponentNotFound = withRouter(({ location }) => {
   return (
      <div className="ml-3">
         <h3>Location not found <code> { location.pathname } </code></h3>
         <Link to="/">Home</Link>
      </div>
   )
})

export default ComponentNotFound
