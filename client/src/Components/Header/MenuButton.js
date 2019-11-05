import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import { createBrowserHistory } from "history"

const history = createBrowserHistory();

const MenuExampleDropdownItem = () => {

  return(
  <Menu className = "menu-button" horizontal>
    <Dropdown item text='Menu'>
      <Dropdown.Menu>
        <Dropdown.Item onClick = {(e) => {history.push('/'); window.location.reload(true)}}>Explore World</Dropdown.Item>
        <Dropdown.Item onClick = {(e) => {history.push('/add-world'); window.location.reload(true)}}>Add a World</Dropdown.Item>
        <Dropdown.Item>Adopt a character</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Menu>
)
}

export default MenuExampleDropdownItem