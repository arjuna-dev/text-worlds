import React, {useState} from 'react';
import { Button, Divider, Form } from 'semantic-ui-react';
import axios from 'axios';
import { Redirect } from 'react-router'
import BackNavigation from '../BackNavigation';
import {Link} from 'react-router-dom'

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
    
    if (loggedIn === true){
      return <Redirect to="/" />
    }
    if (localStorage.usertoken){
      return <Redirect to="/" />
    }

  return(
  <div>
    <BackNavigation />
    <div className = "page-name">Log In</div>
  <div className="ui grid">
    <div className="four wide column"></div>
    <div className="eight wide column">
    <Link className = "signup-link" to = '/signup'>Haven't joined yet? Click here to Sign up</Link> <br /><br />
      <Form onSubmit={submitHandler}>
        <Form.Input
          // error='Please enter your email address'
          fluid
          label='Email'
          name='email'
          placeholder='email'
          type="email"
          value={form.email}
          onChange={updateField}
        />
        <Form.Input
          // error='Please enter password'
          fluid
          label='Password'
          name='password'
          placeholder='Password'
          type="password"
          value={form.password}
          onChange={updateField}
        />
        <Button type='submit'>Login</Button>
        <Divider hidden />
      </Form>
    </div>
    <div className="four wide column"></div>
  </div>
  </div>
  )
}

export default LoginForm