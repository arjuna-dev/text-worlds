import React, {useState} from 'react';
import { Button, Divider, Form, Message } from 'semantic-ui-react';
import axios from 'axios';
import BackNavigation from '../Helpers/BackNavigation';
import { createBrowserHistory } from 'history';

let history = createBrowserHistory();

const LoginForm = () => {

  const [form, setValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState(null);

  const updateField = (e) => setValues({
    ...form,
    [e.target.name]: e.target.value
  })

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('https://textworlds.herokuapp.com/api/user/login', form)
      .then(
        response => {
        if (response.data.error){
          setErrors(response.data.error)
        }
        else{
          localStorage.setItem('usertoken', response.data)
          history.back();
        }
      })
  }

  // if (localStorage.usertoken){
  //   return <Redirect to = '/' />;
  // }

  return (<div>
    <BackNavigation />
    <div className = "page-name">Log In</div>
  <div className="ui grid">
    <div className="four wide column"></div>
    <div className="eight wide column">
    {(errors && errors.email)?<Message color = "pink">{errors.email}</Message>: null}
    {(errors && errors.password)?<Message color = "pink">{errors.password}</Message>: null}
      <Form onSubmit={submitHandler}>
        <Form.Input
          // error='Please enter your email address'
          fluid
          label = 'emailInput'
          name='email'
          placeholder ='email'
          type="email"
          value={form.email}
          onChange={updateField}
        />
        <Form.Input
          // error='Please enter password'
          fluid
          label='passwordInput'
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
    <div className="four wide column">
    </div>
  </div>
  </div>
  )
}

export default LoginForm