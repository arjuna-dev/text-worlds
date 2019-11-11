import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import { createBrowserHistory } from "history"
import {Link} from 'react-router-dom'

const history = createBrowserHistory();

const MenuDropdownItem = () => {

  return(
  <Menu className = "menu-button" horizontal = "true">
    <Dropdown item text='Menu'>
      <Dropdown.Menu>
        <Link to = '/'><Dropdown.Item>Explore World</Dropdown.Item></Link>
        <Link to = '/add-world'><Dropdown.Item>Add a World</Dropdown.Item></Link>
        <Dropdown.Item>Adopt a character</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Menu>
)
}

export default MenuDropdownItem