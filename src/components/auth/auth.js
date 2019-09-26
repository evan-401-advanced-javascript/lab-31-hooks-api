import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line
import { LoginContext } from './context.js';

const If = (props) => {
  return props.condition ? props.children : null;
};

console.log('auth loaded');


/**
 * Function that takes in the username and password entered in login and
 * then passes that info to authorizer.
 * If the username and password match we will render the props.children
 * @param props
 * @returns {*}
 * @constructor
 */
export default function Auth(props) {
  return (
    <LoginContext.Consumer>
      {(context) => {
        const okToRender = context.loggedIn
          && (props.capability
            ? context.user.capabilities && context.user.capabilities.includes(props.capability)
            : true);
        // eslint-disable-next-line
        return <If condition={okToRender}>{props.children}</If>;
      }}
    </LoginContext.Consumer>
  );
}

Auth.propTypes = {
  capability: PropTypes.string.isRequired,
};
