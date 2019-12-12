import React, {useState} from 'react';
import { Button, Divider } from 'semantic-ui-react';
import axios from 'axios';
import BackNavigation from '../BackNavigation'
import { Form } from 'formsy-semantic-ui-react';
import { Message } from 'semantic-ui-react';
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
  
  const onValidSubmit = (e) => {
    axios.post('https://textworlds.herokuapp.com/api/user/signup', form)
      .then(response => {
        if (response.data.error){
          console.log(response.data.error)
          setErrors(response.data.error)
        }
        else{
          localStorage.setItem('usertoken', response.data)
          console.log("ywaytewls")
          history.goBack()
        }
      })
  }

  // if (localStorage.usertoken){
  //   history.goBack()
  // }

  return(
    <div>
      <BackNavigation />
      <div className = "page-name">Sign Up</div>
      <div className="ui grid">
        <div className="four wide column"></div>
        <div className="eight wide column">
          {/* <Link className = "signup-link" to = '/login'>Already have an account? Click here to log in</Link> <br /><br /> */}
          {(errors && errors.name)?<Message color = "pink">{errors.name}</Message>: null}
          {(errors && errors.email)?<Message color = "pink">{errors.email}</Message>: null}
          {(errors && errors.password)?<Message color = "pink">{errors.password}</Message>: null}
          {(errors && errors.repeat_password)?<Message color = "pink">{errors.repeat_password}</Message>: null}
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
                "isAlphanumeric": true,
                // "isAlphanumeric": "isAlphanumeric"
                "minLength": "2"
              }}
              validationErrors={{
                isExisty: 'Please input a user name',
                isAlphanumeric: 'You are using invalid characters',
                minLength: "Your user name should be at least 2 characters long",
              }}
              errorLabel={ <Message color="pink"/> }
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
              errorLabel={ <Message color="pink"/> }
            />
            <Form.Input
              // error='Please enter password'
              fluid
              label='password'
              name='password'
              placeholder='Password'
              type="password"
              value={form.password}
              onChange={(e) => {updateField(e)}}
              validations={"minLength:6"}
              validationErrors={{ minLength: 'Password must be at least 6 characters long' }}
              errorLabel={ <Message color="pink"/> }
            />
            <Form.Input
              // error='Repeat password here'
              fluid
              label='confirm password'
              name='repeat_password'
              placeholder='Confirm password'
              type="password"
              value={form.repeat_password}
              onChange={(e) => {updateField(e); comparePass(e)}}
              validations={"isExisty"}
              validationErrors={{ 
                isExisty: 'Please enter your password again' 
              }}
              errorLabel={ <Message color="pink"/> }
            />
            {passwordsMatch ?  <p></p> : <Message color='red'><p>- Passwords do not match</p></Message>}
            <Button type='submit'>Submit</Button>
            <Divider hidden />
          </Form>
        </div>
        <div> {Form.Input.repeat_password}</div>
        <div className="four wide column"></div>
      </div>
    </div>
  )
}

export default SignupForm