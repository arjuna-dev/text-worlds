import React from 'react'
import { Dropdown, Menu, Modal, Button } from 'semantic-ui-react'
//import {Link} from 'react-router-dom'


const MenuDropdownItem = () => {

  return(
  <Menu className = "menu-button" horizontal = "true">
    <Dropdown item text='Menu'>
      <Dropdown.Menu>
        <Dropdown.Item><a href = '/' className = "menu-link">Explore World</a></Dropdown.Item>
        {(!localStorage.usertoken)?(
        <Modal size = "mini" trigger = {<Dropdown.Item>Create A World</Dropdown.Item>}>
          <Modal.Header>Login or Sign up first to create a world</Modal.Header>
        <Modal.Content>
          <div className = "redirect-auth">
          <a href = '/login'><Button primary size = "large"> Login </Button></a> <br />
          <a href = '/signup'><Button secondary size = "large"> Sign up </Button></a>
          </div>
        </Modal.Content>
      </Modal>
      ):(<Dropdown.Item><a href = '/add-world' className = "menu-link">Create A World</a></Dropdown.Item>)} 
      </Dropdown.Menu>
    </Dropdown>
  </Menu>
)
}

export default MenuDropdownItem