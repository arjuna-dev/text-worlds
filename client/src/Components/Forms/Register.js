import React from 'react'
import { Form } from 'semantic-ui-react'

const FormExampleFieldErrorLabel = () => (
  <Form>
    <Form.Input
      error={{ content: 'Please enter a user name', pointing: 'below' }}
      fluid
      label='User name'
      placeholder='First name'
    />
    <Form.Input
      error='Please enter your email address'
      fluid
      label='email'
      placeholder='email'
    />
    <Form.Input
      error='Please enter password'
      fluid
      label='password'
      placeholder='Password'
    />
    <Form.Input
      error='Repeat password here'
      fluid
      label='confirm password'
      placeholder='Confirm password'
    />
  </Form>
)

export default FormExampleFieldErrorLabel