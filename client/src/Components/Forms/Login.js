import React, {useState} from 'react';
import { Button, Divider, Form } from 'semantic-ui-react';
import axios from 'axios';
import { Redirect } from 'react-router'

const LoginForm = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [form, setValues] = useState({
    email: '',
    password: ''
  });

  const updateField = (e) => setValues({
    ...form,
    [e.target.name]: e.target.value
  })

  const submitHandler = e => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/user/login', form)
      .then(response => {
        if (response.data && !response.data.error){
            localStorage.setItem('usertoken', response.data)
        }
        setLoggedIn(true)
      })
      .catch(error => {
        console.log(error)
      })
  }
    
    if (loggedIn == true){
      return <Redirect to="/" />
    }

  return(
  <div className="ui grid">
    <div className="four wide column"></div>
    <div className="eight wide column">

      <Form onSubmit={submitHandler}>
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
        <Button type='submit'>Submit</Button>
        <Divider hidden />
      </Form>
    </div>
    <div className="four wide column"></div>
  </div>
  )
}

export default LoginForm