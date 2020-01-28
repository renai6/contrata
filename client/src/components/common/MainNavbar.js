import React, {useState, useContext} from 'react'
import { useSpring, animated } from 'react-spring'
import { withRouter } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { LOGOUT } from '../../reducers/AuthReducer'
import {
   Collapse,
   Navbar,
   NavbarBrand,
   Nav,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
  
} from 'reactstrap'


import gerFlag from '../../brand/ger-flag.png'
// import engFlag from '../../brand/eng-flag.png'
import Icon from './Icon'


const MainNavbar = withRouter(({ history, toggleSideNav, sideNavIsOpen, toggleshowLinkTitle, showLinkTitle }) => {

   const [isOpen, toggleIsOpen] = useState(false)
   const Auth = useContext(AuthContext)

   const props = useSpring({ 
      to: {
         opacity: 1, 
         marginTop: 0
      }, 

      from: { 
         opacity: 0, 
         marginTop: -500 
      }, 
     
   })

   const logOut = () => {

      localStorage.removeItem('techVoiceToken')

      Auth.dispatch({type: LOGOUT})
      history.push('/login')
   } 

   const animateSideMenu = () => {

      toggleSideNav(!sideNavIsOpen)

      if(!showLinkTitle) {

         setTimeout(() => {

            toggleshowLinkTitle(!showLinkTitle)
         }, 200)

      } else {

         toggleshowLinkTitle(!showLinkTitle)
      }


      
   }
  
   return (
      <animated.div className="main-nav sticky-top" style={ props }>
         <header className="main-nav" >
        
            <Navbar className="main-navbar flex-md-nowrap p-0 shadow" light expand="md">
               <div className="logo-box d-flex align-items-center">
                  <span onClick={ animateSideMenu } className="mx-3 text-light icon"><i className="fas fa-bars fa-lg"></i></span>
                  <NavbarBrand href="/" className="px-2 py-1 mr-0"> Contrata </NavbarBrand>
               </div>
              
               <button onClick={ () => toggleIsOpen(!isOpen) } type="button" className="navbar-toggler">
                  <span><i className="fas fa-ellipsis-v"></i></span>
               </button>

               <Collapse className="" isOpen={isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                     
                     <UncontrolledDropdown nav inNavbar className="ml-2">
                        <DropdownToggle nav caret>
                           {`${Auth.user.firstName} ${Auth.user.lastName}`}
                        </DropdownToggle>
                        <DropdownMenu right className="mb-2">
                           <DropdownItem onClick={ logOut } >
                              Logout
                           </DropdownItem>
                        </DropdownMenu>
                     </UncontrolledDropdown>

                     <UncontrolledDropdown className="ml-2" nav inNavbar>
                        <DropdownToggle nav>
                           <Icon height="13" width="15" src={gerFlag}  />
                        </DropdownToggle>
                        <DropdownMenu right className="mb-2">
                           <DropdownItem onClick={ logOut } >
                              Logout
                           </DropdownItem>
                        </DropdownMenu>
                     </UncontrolledDropdown>
                  </Nav>
               </Collapse>
            </Navbar>
         </header>
      </animated.div>
   )
})

export default  MainNavbar  
