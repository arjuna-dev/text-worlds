import React from 'react'
import { Button } from 'semantic-ui-react'

const ButtonPrimary = (props) => (
  <div>
    <Button primary>{ props.children }</Button>
  </div>
)

export default ButtonPrimary