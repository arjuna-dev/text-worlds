import React, {useState} from 'react';
import { Button, Divider, Form } from 'semantic-ui-react';
import axios from 'axios';
import { Redirect} from 'react-router'
import { Link } from 'react-router-dom'
import BackNavigation from '../BackNavigation'
// import { Form } from 'formsy-semantic-ui-react';
import { Label, Message } from 'semantic-ui-react';
import { createBrowserHistory } from "history"

const history = createBrowserHistory();

const SignupForm = () => {
  
  const [form, setValues] = useState({
    name: '',
    email: '',
    password: '',
    repeat_password: ''
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [userNameLengthOk, setUserNameLengthOk] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [passwordLengthOk, setPasswordLengthOk] = useState(true);
  const [allFieldsOk, setAllFieldsOk] = useState(true);
  const [errors, setErrors] = useState(null);


  const updateField = (e) => setValues({
    ...form,
    [e.target.name]: e.target.value
  })
    

  const comparePass = (e) => {
    if (form.password !== e.target.value){
      setPasswordsMatch(false)
    } else {
      setPasswordsMatch(true)
    }
  }

  const checkLengthIs2 = (e) => {
    if (e.target.value.length < 2){
      setUserNameLengthOk(false)
    } else {
      setUserNameLengthOk(true)
    }
  }

  const checkLengthIs8 = (e) => {
    if (e.target.value.length < 8){
      setPasswordLengthOk(false)
    } else {
      setPasswordLengthOk(true)
    }
  }

  const checkEmail = (e) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(e.target.value).toLowerCase())){
        setIsEmail(false)
      } else {
        setIsEmail(true)
      }
  }

  const checkForInvalidFields = () => {
    if (!isEmail || !passwordLengthOk || !userNameLengthOk || !passwordsMatch) {
      setAllFieldsOk(false)
    } else {
      setAllFieldsOk(true)
    }
  }
  
  const onSubmit = e => {
    axios.post('http://localhost:4000/api/user/signup', e)
      .then(response => {
        if (response.data.error){
          console.log(response.data.error)
          setErrors(response.data.error)
        }
        else{
          localStorage.setItem('usertoken', response.data)
          history.goBack()
        }
      })
      .catch(response => {
        console.log("response")
        console.log(response)
      })
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
          {(errors && errors.name)?<Message color = "orange">{errors.name}</Message>: null}
          {(errors && errors.email)?<Message color = "orange">{errors.email}</Message>: null}
          {(errors && errors.password)?<Message color = "orange">{errors.password}</Message>: null}
          {(errors && errors.repeat_password)?<Message color = "orange">{errors.repeat_password}</Message>: null}
          <Form onSubmit={onSubmit}>
            <Form.Input
              fluid
              label='User name'
              name='name'
              placeholder='user name'
              type="text"
              value={form.name}
              onChange={(e) => {updateField(e); checkLengthIs2(e); checkForInvalidFields()}}
            />
            <Form.Input
              fluid
              label='email'
              name='email'
              placeholder='email'
              type="email"
              value={form.email}
              onChange={(e) => {updateField(e); checkEmail(e); checkForInvalidFields()}}
            />
            <Form.Input
              fluid
              label='password'
              name='password'
              placeholder='Password'
              type="password"
              value={form.password}
              onChange={(e) => {updateField(e); checkLengthIs8(e); checkForInvalidFields()}}
            />
            <Form.Input
              fluid
              label='confirm password'
              name='repeat_password'
              placeholder='Confirm password'
              type="password"
              value={form.repeat_password}
              onChange={(e) => {updateField(e); comparePass(e); checkForInvalidFields()}}
            />
            {allFieldsOk   ?  null : 
              <Message color='orange'>
                {passwordsMatch     ?  <p></p> : <p>• Passwords do not match</p>}
                {userNameLengthOk   ?  <p></p> : <p>• User name is too short</p>}
                {isEmail            ?  <p></p> : <p>• Not a valid email</p>}
                {passwordLengthOk   ?  <p></p> : <p>• Password should be at least 8 characters</p>}
              </Message>
            }
            
            <Button type='submit'>Submit</Button>
            <Divider hidden />
          </Form>
        </div>
        <div>{Form.Input.repeat_password}</div>
        <div className="four wide column"></div>
      </div>
    </div>
  )
}

export default SignupForm