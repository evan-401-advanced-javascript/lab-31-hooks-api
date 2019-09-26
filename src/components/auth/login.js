import superagent from 'superagent';
import React, { useState } from 'react';
import { LoginContext } from './context.js'; // eslint-disable-line

const API = process.env.REACT_APP_API;

const If = (props) => {
  return props.condition ? props.children : null;
};

/**
 * Allows a user to enter a username and password and then
 * passes that info the the auth file on submit.
 * @param props
 * @returns {*}
 * @constructor
 */
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeUsername(e) {
    console.log('changed username');
    setUsername(e.target.value);
  }

  function handleChangePassword(e) {
    console.log('changed password');
    setPassword(e.target.value);
  }

  function handleSubmit(e, loginMethodFromContext) {
    e.preventDefault();
    superagent
      .post(`${API}/signin`)
      .auth(username, password)
      .then((response) => {
        const token = response.text;
        loginMethodFromContext(token);
      })
      .catch(console.error);
  }

  return (
    <LoginContext.Consumer>
      {(context) => {
        return (
          <>
            <If condition={context.loggedIn}>
              <button onClick={context.logout}>
                Log Out
              </button>
            </If>
            <If condition={!context.loggedIn}>
              <div>
                <form onSubmit={e => handleSubmit(e, context.login)}>
                  <input
                    placeholder="username"
                    name="username"
                    onChange={handleChangeUsername}
                  />
                  <input
                    placeholder="password"
                    name="password"
                    type="password"
                    onChange={handleChangePassword}
                  />
                  <input type="submit" value="login"/>
                </form>
              </div>
            </If>
          </>
        );
      }}
    </LoginContext.Consumer>
  );
}
