import React from 'react';
import LoginHub from './LoginHub';
import NotLoggedIn from './NotLoggedIn';

const LoginCheck = () => {
// IF USER IS LOGGED IN
return (
   <LoginHub /> 
);
return (
    <NotLoggedIn />
);
}
export default LoginCheck;