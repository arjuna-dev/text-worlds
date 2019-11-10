import React, {useState} from 'react';
import { Button, Divider, Form } from 'semantic-ui-react';
import axios from 'axios';
import { Redirect, Route } from 'react-router'
import { Link } from 'react-router-dom'
import BackNavigation from '../BackNavigation'

const SignupForm = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [form, setValues] = useState({
    name: '',
    email: '',
    password: '',
    repeat_password: ''
  });

  const updateField = (e) => setValues({
    ...form,
    [e.target.name]: e.target.value
  })

  const submitHandler = e => {
    e.preventDefault();
    console.log(form)
    axios.post('http://localhost:4000/api/user/signup', form)
      .then(response => {
        console.log(response)
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
    <div>
    <BackNavigation />
    <div className = "page-name">Sign Up</div>
  <div className="ui grid">
    <div className="four wide column"></div>
    <div className="eight wide column">
    <Link className = "signup-link" to = '/login'>Already have an account? Click here to log in</Link> <br /><br />
      <Form onSubmit={submitHandler}>
        <Form.Input
          // error={{ content: 'Please enter a user name', pointing: 'below' }}
          fluid
          label='User name'
          name='name'
          placeholder='name'
          type="text"
          value={form.name}
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
          name='repeat_password'
          placeholder='Confirm password'
          type="password"
          value={form.repeat_password}
          onChange={updateField}
        />
        <Button type='submit'>Submit</Button>
        <Divider hidden />
      </Form>
    </div>
    <div className="four wide column"></div>
  </div>
  </div>
  )
}

export default SignupForm