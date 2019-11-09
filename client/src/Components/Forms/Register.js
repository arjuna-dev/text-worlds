import React, {useState} from 'react'
import { Button, Divider, Form } from 'semantic-ui-react'

const FormExampleFieldErrorLabel = () => {
  const [form, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

const updateField = (e) => setValues({
  ...form,
  [e.target.name]: e.target.value
})


  const submitHandler = e => {
    e.preventDefault();
    console.log(form)
  }
  
  return(
  <div className="ui grid">
    <div className="four wide column"></div>
    <div className="eight wide column">

      <Form onSubmit={submitHandler}>
        <Form.Input
          // error={{ content: 'Please enter a user name', pointing: 'below' }}
          fluid
          label='User name'
          name='username'
          placeholder='username'
          type="text"
          value={form.username}
          onChange={updateField}
        />
        <Form.Input
          // error='Please enter your email address'
          fluid
          label='email'
          name='email'
          placeholder='email'
          type="email"
          value={form.email}
          onChange={updateField}
        />
        <Form.Input
          // error='Please enter password'
          fluid
          label='password'
          name='password'
          placeholder='Password'
          type="password"
          value={form.password}
          onChange={updateField}
        />
        <Form.Input
          // error='Repeat password here'
          fluid
          label='confirm password'
          name='confirmPassword'
          placeholder='Confirm password'
          type="password"
          value={form.confirmPassword}
          onChange={updateField}
        />
        <Button type='submit'>Submit</Button>
        <Divider hidden />
      </Form>
    </div>
    <div className="four wide column"></div>
  </div>
  )
}

export default FormExampleFieldErrorLabel