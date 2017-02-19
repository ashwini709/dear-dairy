import React from 'react';

import styles from '../styles/login-view.less';

const LoginView = (props, { locale }) => {
  const { error, handleEmailChange, handlePasswordChange, onSubmit, password, username } = props;

  return (
    <div className='login-view'>
      <div className='login-view-container'>
        <h1 className='title'>Dear Dairy Login</h1>
        <form className='login-form' onSubmit={onSubmit}>
          <input
            className='username'
            name='username'
            onChange={handleEmailChange}
            placeholder='Username'
            tabIndex='1'
            type='name'
            value={username} />
          <input
            className='password'
            name='password'
            onChange={handlePasswordChange}
            placeholder='Password'
            tabIndex='1'
            type='password'
            value={password} />
          <button className='submit' tabIndex='3' type='submit'>
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
