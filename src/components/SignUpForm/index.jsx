import { useState } from 'react';
import { TextInput, Button } from 'react-materialize';
import { useDispatch } from 'react-redux';
import { post } from '../../api';
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

  async function createUser(e) {
     e.preventDefault();

    if (!user.password || user.password !== user.confirmPassword) {
      alert('Passwords are not identical!')
      return;
    }

    const r = await post('users', user)
    dispatch({
      type: TYPES.CREATE_USER,
      payload: r.token
    });
    setIsAuthenticated(true)
  };

    return (
        <>
          <h2 className="center">Please, sign up 👇🏻</h2>
          <form className="z-depth-4 sign-up-form teal lighten-5" onSubmit={e => createUser(e)}>
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

              <Button node="button" waves="green">SIGN UP</Button>,

          </form>
        </>
    )
}

export {
  SignUpForm
}