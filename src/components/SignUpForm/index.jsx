import { useState } from 'react';
import { TextInput, Button } from 'react-materialize';
import { useDispatch } from 'react-redux';
import {fetchService} from '../../api/fetchService';
import * as TYPES from '../../store/actions';
import './style.scss';

function SignUpForm({setIsAuthenticated}) {
  const [user, setUser] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();

  async function createUser() {
    console.log(user)
    if (!!user.password && user.password === user.confirmPassword) {
      const response = await fetchService.createUser(user);
      dispatch({
          type: TYPES.CREATE_USER,
          payload: response
      });
      console.log(response)
      setIsAuthenticated(true)
    } else {
      alert('Passwords are not identical!')
    }

  };

    return (
        <>
          <h2 className="center">Please, sign up 👇🏻</h2>
          <form className="z-depth-4 sign-up-form teal lighten-5" onSubmit={e => e.preventDefault()}>
              <TextInput
                  id="email"
                  required
                  email
                  onChange={(e) => setUser({...user, email: e.target.value})}
                  label="Email"
                  validate
              />
              <TextInput
                  id="name"
                  required
                  onChange={(e) => setUser({...user, name: e.target.value})}
                  label="Name"
                  validate
              />
              <TextInput
                  id="password"
                  required
                  password
                  onChange={(e) => setUser({...user, password: e.target.value})}
                  label="Password"
                  validate
              />
              <TextInput
                  id="confirmPassword"
                  required
                  password
                  onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
                  label="Confirm password"
                  validate
              />

              <Button node="button" onClick={() => createUser()} waves="green">SIGN UP</Button>,

          </form>
        </>
    )
}

export {
  SignUpForm
}