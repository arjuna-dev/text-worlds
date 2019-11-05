import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const options = [
  { key: 1, text: 'Explore Worlds',  value: 1, },
  { key: 2, text: 'Create New World', value: <Link to='/add-world' /> },
  { key: 3, text: 'World Forum', value: 3 },
  { key: 4, text: 'Adopt a Character', value: 4 }
]

const MenuButton = () => (
  <Menu compact>
    <Dropdown text='Menu' options={options} simple item />
  </Menu>
)

export default MenuButton;