import { Link } from 'react-router';

import styles from '../styles/login-view.less';

const LoginView = (props, { locale }) => {
  const { email, error, handleEmailChange, handlePasswordChange, onSubmit, password } = props;

  return (
    <div className='login-view'>
      <div className='login-view-container'>
        <h1 className='title'>Dear Dairy Login</h1>
        <form className='login-form' onSubmit={onSubmit}>
          <input
            className='email'
            name='email'
            onChange={handleEmailChange}
            placeholder='Email'
            tabIndex='1'
            type='name'
            value={email} />
          <input
            className='password'
            name='password'
            onChange={handlePasswordChange}
            placeholder='Password'
            tabIndex='1'
            type='password'
            value={password} />
          <button className='submit' tabIndex='3' type='submit'>
            Login
          </button>
        </form>
        <div className='alternate-option'>
          <hr />
          <div className='or-text'>OR</div>
          <Link to={`/signup`} className='to-signup'>
            <button className='signup-button' tabIndex='3' type='submit'>
              Signup for a new account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
