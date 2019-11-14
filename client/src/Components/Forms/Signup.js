import React, {useState} from 'react';
import { Button, Divider } from 'semantic-ui-react';
import axios from 'axios';
import { Redirect} from 'react-router'
import { Link } from 'react-router-dom'
import BackNavigation from '../BackNavigation'
import { Form } from 'formsy-semantic-ui-react';
import { Label, Message } from 'semantic-ui-react';

const SignupForm = () => {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [form, setValues] = useState({
    name: '',
    email: '',
    password: '',
    repeat_password: ''
  });
  const [firstPassword, setFirstPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);


  const updateField = (e) => setValues({
    ...form,
    [e.target.name]: e.target.value
  })
    
  const checkFirstPassword = (e) => {
      setFirstPassword(e.target.value)
  }

  const comparePass = (e) => {
    if (firstPassword != e.target.value){
      setPasswordsMatch(false)
    } else {
      setPasswordsMatch(true)
    }
  }
  
  const onValidSubmit = e => {
    axios.post('http://localhost:4000/api/user/signup', e)
      .then(response => {
        if (response.data && !response.data.error){
          localStorage.setItem('usertoken', response.data)
          setLoggedIn(true)
        }
      })
      .catch(response => {
        console.log("response")
        console.log(response)
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
      <div className = "page-name">Sign Up</div>
      <div className="ui grid">
        <div className="four wide column"></div>
        <div className="eight wide column">
          <Link className = "signup-link" to = '/login'>Already have an account? Click here to log in</Link> <br /><br />
          <Form onValidSubmit={onValidSubmit}>
            <Form.Input
              // error={{ content: 'Please enter a user name', pointing: 'below' }}
              fluid
              label='User name'
              name='name'
              placeholder='name'
              type="text"
              value={form.name}
              onChange={updateField}
              validations={{
                // "isAlphanumeric": "isAlphanumeric"
                "minLength": "2"
              }}
              validationErrors={{ 
                isAlphanumeric: 'You are using invalid characters',
                minLength: "Your user name should be at least 2 characters long"
              }}
              errorLabel={ <Label color="red" pointing/> }
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
              validations="isEmail"
              validationErrors={{ isEmail: 'Email is not valid' }}
              errorLabel={ <Label color="red" pointing/> }
            />
            <Form.Input
              // error='Please enter password'
              fluid
              label='password'
              name='password'
              placeholder='Password'
              type="password"
              value={form.password}
              onChange={updateField, checkFirstPassword}
              validations={"minLength:8"}
              validationErrors={{ minLength: 'Password must be at least 8 characters long' }}
              errorLabel={ <Label color="red" pointing/> }
            />
            <Form.Input
              // error='Repeat password here'
              fluid
              label='confirm password'
              name='repeat_password'
              placeholder='Confirm password'
              type="password"
              value={form.repeat_password}
              onChange={updateField, comparePass}
              validations={"minLength:8"}
              validationErrors={{ 
                minLength: 'Password must be at least 8 characters long' 
              }}
              errorLabel={ <Label color="red" pointing/> }
            />
            {passwordsMatch ?  <p></p> : <Message color='pink'><p>Passwords do not match</p></Message>}
            <Button type='submit'>Submit</Button>
            <Divider hidden />
          </Form>
        </div>
        <div> hello{Form.Input.repeat_password}</div>
        <div className="four wide column"></div>
      </div>
    </div>
  )
}

export default SignupForm