import React from 'react'
import { Button } from 'semantic-ui-react'

const ButtonSecondary = (props) => (
  <div>
    <Button secondary>{ props.children }</Button>
  </div>
)

export default ButtonSecondary