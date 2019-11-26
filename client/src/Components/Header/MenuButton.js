import React from 'react'
import { Dropdown, Menu, Modal, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'


const MenuDropdownItem = () => {

  return(
  <Menu className = "menu-button" horizontal = "true">
    <Dropdown item text='Menu'>
      <Dropdown.Menu>
        <Dropdown.Item><Link to = '/' className = "menu-link">Explore World</Link></Dropdown.Item>
        {(!localStorage.usertoken)?(
        <Modal size = "mini" trigger = {<Dropdown.Item>Create A World</Dropdown.Item>}>
          <Modal.Header>Login or Sign up first to create a world</Modal.Header>
        <Modal.Content>
          <div className = "redirect-auth">
          <Link to = '/login'><Button primary size = "large"> Login </Button></Link> <br />
          <Link to = '/signup'><Button secondary size = "large"> Sign up </Button></Link>
          </div>
        </Modal.Content>
      </Modal>
      ):(<Dropdown.Item><Link to = '/add-world' className = "menu-link">Create A World</Link></Dropdown.Item>)} 
      </Dropdown.Menu>
    </Dropdown>
  </Menu>
)
}

export default MenuDropdownItem